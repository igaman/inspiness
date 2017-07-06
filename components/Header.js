import React, { Component} from 'react';
import { View, Image } from 'react-native';
import { Text } from 'native-base';
import style from './../style/Styles';
import moment from 'moment';
import {fr} from '../node_modules/moment/locale/fr';

const now = moment();

const localDate = now.locale('fr').format('dddd DD MMMM YYYY').toString();

const capitalizeFirstLetter = (string) => {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

const Header = () => (
	<View style={style.header} >
		<View style={style.headerLogo}>
			<Image source={require('./icons/logo.png')} style={style.logo} />
		</View>
		<Text style={style.dateText}>
			{capitalizeFirstLetter(localDate)}
		</Text>
	</View>
);

export default Header;