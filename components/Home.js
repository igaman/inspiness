import React, {Component} from 'react';
import { View, ScrollView, ActivityIndicator } from 'react-native';
import { Button, Icon, Text } from 'native-base';
import axios from 'axios';
import style from './../style/Styles';
import QuoteDetail from './QuoteDetail';
import moment from 'moment';

const urlApi = 'http://polarfront.fr/wp-json/wp/v2/quotes';



class Home extends Component {

	constructor (props) {
		super(props);
		this.state = {
			quotes : [],
			isLoading: true,

		}
	}

	searchAndSort(quote) {
		const year = moment().format('YYYY');
		const day = moment().format('D');
		const month = (Number(moment().format('M')) - 1).toString();
		//diff 7200 milliseconds with the json
		let now = Number(new Date(year,month,day).getTime().toString().slice(0, -3)) + 7200;
		now = now.toString();
		//console.log('now ', now);
		const todayQuote = quote.filter(quote => quote.date_publish === now);
		const themeOrder = ['tech','politic','military','spirituality'];
		const newOrder = todayQuote.sort((x,y) => themeOrder.indexOf(x.theme) > themeOrder.indexOf(y.theme) ? 1 : -1);
		this.setState({quotes: newOrder, isLoading: false });
	}

	componentWillMount() {
		console.log('will mount');
		this.fetchData();
	}

	fetchData() {
		console.log('fetchData');
		axios.get(urlApi)
			.then((response) => {
				console.log('data:' +response.data);
				this.searchAndSort(response.data);
			})
			.catch((e) => {
				console.log(e);
			});
	}

	loaderDisplay() {
		if(this.state.isLoading) {
			return <ActivityIndicator style={style.spinner} color="#FF520F" size="large"/>
		} else {
			return null;
		}
	}

	renderHtmlText(text) {
		return text
			.replace(/<[^>]+>/gm, '')
			.replace(/&nbsp;/g, ' ')
			.replace(/&rsquo;/, '\'')
			.replace(/(&ldquo;)|(&rdquo;)/g, '"');
	}

	renderQuotes() {
		if(this.props.screenProps.foreground && this.props.screenProps.appState !== 'active') {
			this.fetchData();
			return this.state.quotes.map((quote) => {
				return(
					<QuoteDetail key={quote.id} quote={quote}/>
				);
			});
		} else {
			return this.state.quotes.map((quote) => {
				return(
					<QuoteDetail key={quote.id} quote={quote}/>
				);
			});
		}
	}


	render() {
		return (
			<View>
				<View >
					{this.loaderDisplay()}
				</View>
				<ScrollView>
					{this.renderQuotes()}
				</ScrollView>
			</View>
		);
	}
}

export default Home;