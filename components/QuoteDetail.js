import React, {Component} from 'react';
import { View, Image, AsyncStorage, TouchableOpacity} from 'react-native';
import { Icon, Text, Button} from 'native-base';
import style from './../style/Styles';

const quotePlainText = (text) => {
	return text
			.replace(/<[^>]+>/gm, '')
			.replace(/&nbsp;/g, ' ')
			.replace(/&rsquo;/, '\'')
			.replace(/(&ldquo;)|(&rdquo;)/g, '"')
			.trim();
}

const QuoteImage = (img) => {
	//use small img 300*300
	const imageExtension = img.slice(-4);
	return img.split(imageExtension)[0] +'-300x300'+ imageExtension;
}

const themeStyle = (theme) => {
	switch(theme) {
		case 'spirituality':
			return style.spirituality
			break;
		case 'military':
			return style.military
			break;
		case 'politic':
			return style.politic
			break;
		case 'tech':
			return style.tech
			break;
		default:
			return style.theme
			break;
	}
}
//deleteAll is for Test
const deleteAll = async() => {
	const value = await AsyncStorage.removeItem('quoteDB');
}

const saveQuote = async(quote) => {
	console.log('quoteId : ' ,quote.id);

	const info = [{
		id: quote.id,
		thumbnail: quote.thumbnail,
		title: quote.title.rendered,
		text: quotePlainText(quote.content.rendered),
		author: quote.author,
		quote_img: quote.quote_img
	}];

	try {
		//await AsyncStorage.setItem('quoteDB', null);
		let quoteStore = await AsyncStorage.getItem('quoteDB');
		if (quoteStore !== null){
			// We have data merge object!!
			quoteStore = JSON.parse(quoteStore);
			console.log('quoteDB have data ! '+ quoteStore);
			let checkQuote = quoteStore.find(quoteDB => quoteDB.id === quote.id);
			console.log('checkQuote type'+checkQuote);
			if(checkQuote === undefined) {
				//the quote is not in favoris, so Add it in favoris
				quoteStore = [...quoteStore, ...info];
				console.log('add the new quote => favoris');
				console.table(quoteStore);
				await AsyncStorage.setItem('quoteDB', JSON.stringify(quoteStore));
			} else {
				console.log('already in favoris');
				console.table(quoteStore);
				return false;
			}
		} else {
			// We don't have data, just save it!!
			console.log('quoteDB is empty ! ');
			await AsyncStorage.setItem('quoteDB', JSON.stringify(info));
		}
	} catch (error) {
		// Error saving data
		console.log('asyncStorage ', error);
	}
}

const quoteDetail = ({quote}) =>  {
	return(
		<View style={[ style.quoteContainer , themeStyle(quote.theme)]}>
			<Image source={{ uri: QuoteImage(quote.thumbnail) }} style={style.thumbnail}/>
			<Text style={style.quoteText}>{quotePlainText(quote.content.rendered)}</Text>
			<View style={{ marginTop: 10, alignItems: 'center'}}>
				<TouchableOpacity onPress={() => saveQuote(quote)}>
					<Image source={require('./icons/like.png')} style={style.saveIcon } />
				</TouchableOpacity>
			</View>
			<Text style={style.quoteAuthor}> ─ {quote.author} ─ </Text>
		</View>
	);
};

export default quoteDetail;
