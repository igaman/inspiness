import React, {Component} from 'react';
import { View, Image, AsyncStorage, ScrollView , ListView, Linking, TouchableOpacity} from 'react-native';
import { Button, Icon, Text } from 'native-base';
import style from './../style/Styles';
import FavorisQuote from './FavorisQuote';
import axios from 'axios';

const urlPub = 'http://polarfront.fr/wp-json/wp/v2/pub';
let pubLink, pubImg;

class Favoris extends Component {
	constructor (props) {
		super(props);
		this.state = {
			favoris: null,
			pubImg: null,
			pubLink: null
		}
	}

	componentWillMount() {
		axios.get(urlPub)
		.then(response => {
			console.log('data:' +response.data);
			this.generatePubAssets(response.data);
		})
		.catch((e) => {
			console.log(e);
		});
	}

	generatePubAssets(pub) {
		pubLink = pub.map( elem => elem.pub_link).toString();
		pubImg = pub.map( elem => elem.pub_thumbnail).toString();
		if(pubLink.length < 1 || pubLink.length < 1) {
			return;
		} else {
			this.setState({ pubLink: pubLink, pubImg: pubImg });
		}
	}

	loadText = () => {
		if(this.props.screenProps.favoris !== null && this.props.screenProps.favoris.length > 0) {
			const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
			return(
				<ScrollView>
					<View style={style.pubContainer}>
						<TouchableOpacity onPress={() => Linking.openURL(this.state.pubLink)}>
							<Image source={{ uri: this.state.pubImg }} style={style.pub} />
						</TouchableOpacity>
					</View>
					<ListView
					dataSource={ds.cloneWithRows(this.props.screenProps.favoris.reverse())}
					renderRow={(data) => <FavorisQuote quote={data} screenProps={{refresh: this.props.screenProps.refresh}}/>}
					/>
				</ScrollView>
			);
		} else if(this.props.screenProps.favoris !== null && this.props.screenProps.favoris.length < 1) {
			return(
				<View>
					<View style={style.pubContainer}>
						<TouchableOpacity onPress={() => Linking.openURL(this.state.pubLink)}>
							<Image source={{ uri: this.state.pubImg }} style={style.pub} />
						</TouchableOpacity>
					</View>
					<Text style={style.favTextMini}>Vous n'avez pas de favoris</Text>
				</View>
			);
		} else {
			return(
				<Text style={style.favTextMini}>Chargement ...</Text>
			);
		}
	}

	render() {
		return (
			<View>
				{this.loadText()}
			</View>
		);
	}
}

export default Favoris;
