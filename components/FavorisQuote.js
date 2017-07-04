import React, { Component } from 'react';
import { View, Image, AsyncStorage, Alert, TouchableOpacity } from 'react-native';
import { Icon, Text, Button} from 'native-base';
import style from './../style/Styles';


export default class FavorisQuote extends Component {
	static propTypes = {
		quote: React.PropTypes.object,
	}

	quoteImage = (img) => {
		const imageExtension = img.slice(-4);
		return img.split(imageExtension)[0] +'-150x150'+ imageExtension;
	}

	deleteQuote = async(quote) => {
		try {
			const quoteStore = await AsyncStorage.getItem('quoteDB');
			quoteStore = JSON.parse(quoteStore);
			const index = quoteStore.findIndex(quoteDB => quoteDB.id === quote.id);
			quoteStore = [...quoteStore.slice(0, index), ...quoteStore.slice(index + 1)];
			console.log('remove quote => ',quote.id);
			console.table(quoteStore);
			await AsyncStorage.setItem('quoteDB', JSON.stringify(quoteStore));
			// this.refresh();
			this.props.screenProps.refresh()
		} catch(e) {
			console.log('Remove quote problem' + e);
		}
	}

	attention = (quote) => {
		Alert.alert(
			'Attention',
			'Êtes-vous sûr de vouloir supprimer ?',
			[
			{text: 'Annuler', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
			{text: 'OK', onPress: () => this.deleteQuote(quote)},
			]
		)
	}

	render(){
		const {id, author, thumbnail, text} = this.props.quote;
		return(
			<View id={id} style={style.favorisQuote}>
				<View style={style.favorisImage}>
					<Image source={{ uri: this.quoteImage(thumbnail) }} style={style.thumbnailMini}/>
					<TouchableOpacity style={style.favorisButton} rounded dark onPress={() => this.attention(this.props.quote)}>
						<Image source={require('./icons/delete.png')} style={style.deleteIcon}/>
					</TouchableOpacity>
				</View>
				<View style={style.favorisContent}>
					<Text style={style.quoteTextMini}>{text}</Text>
					<Text style={style.quoteAuthorMini}> ─ {author} ─ </Text>
				</View>
			</View>
		);
	};
}