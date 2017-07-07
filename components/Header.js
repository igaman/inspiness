import React, { Component} from 'react';
import { View, Image } from 'react-native';
import { Text } from 'native-base';
import style from './../style/Styles';
import moment from 'moment';
import {fr} from '../node_modules/moment/locale/fr';



class Header extends Component {
	constructor (props) {
		super(props);
		this.state = {
			appState: this.props.screenProps.appState
		}
	}

	capitalizeFirstLetter = (string) => {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}

	localDate = () => {
		return moment().locale('fr').format('dddd DD MMMM YYYY').toString();
	} 

	render() {
		return (
			<View style={style.header} >
				<View style={style.headerLogo}>
					<Image source={require('./icons/logo.png')} style={style.logo} />
				</View>
				<Text style={style.dateText}>
					{this.capitalizeFirstLetter(this.localDate())}
				</Text>
			</View>
		);
	}
}

export default Header;