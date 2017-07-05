import React, { Component} from 'react';
import { View } from 'react-native';
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
		<Text style={style.headerText}>
			INSPINESS
		</Text>
		<Text style={style.dateText}>
			{capitalizeFirstLetter(localDate)}
		</Text>
	</View>
);

export default Header;