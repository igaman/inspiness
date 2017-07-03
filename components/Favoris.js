import React, {Component} from 'react';
import { View, Image, AsyncStorage, ScrollView , ListView} from 'react-native';
import { Button, Icon, Text } from 'native-base';
import style from './../style/Styles';
import FavorisQuote from './FavorisQuote';

class Favoris extends Component {
	constructor (props) {
		super(props);
		this.state = {
			favoris: null,
		}
	}

	loadText = () => {
		if(this.props.screenProps.favoris !== null && this.props.screenProps.favoris.length > 0) {
			const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
			return(
				<ListView
				dataSource={ds.cloneWithRows(this.props.screenProps.favoris)}
				renderRow={(data) => <FavorisQuote quote={data} screenProps={{refresh: this.props.screenProps.refresh}}/>}
				/>
			);
		} else if(this.props.screenProps.favoris !== null && this.props.screenProps.favoris.length < 1) {
			return(
				<Text>You have not favorites</Text>
			);
		} else {
			return(
				<Text>You have not favorites</Text>
			);
		}
	}

	render() {
		console.log(this.props.screenProps.favoris, "favoris mean")
		return (
			<View>
				{this.loadText()}
			</View>
		);
	}
}

export default Favoris;
