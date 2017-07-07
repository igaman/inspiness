import React, { Component } from "react";
import { View, StatusBar, AppRegistry, AsyncStorage, AppState } from "react-native";
import { Icon, Text } from "native-base";
import { TabNavigator, NavigationActions } from "react-navigation";

import Header from "./components/Header";
import Home from "./components/Home";
import Favoris from "./components/Favoris";

const Tabs = TabNavigator(
	{
		Accueil: { screen: Home },
		Favoris: { screen: Favoris }
	},
	{
		tabBarPosition: "bottom",
		tabBarOptions: {
			showIcon: false,
			showLabel: true,
			activeTintColor: "#0FBAB7",
			inactiveTintColor: "#0FBAB7",
			labelStyle: {
				fontSize: 14,
				fontFamily: "Oswald-Bold",
				color: "#FF520F"
			},
			indicatorStyle: {
				height: 2,
				backgroundColor: "#FF520F"
			},
			style: {
				backgroundColor: "#FFF",
				padding: 0,
				margin: 0
			}
		}
	}
);

const navigateAction = NavigationActions.navigate({
	routeName: "Favoris",
	params: {},

	// navigate can have a nested navigate action that will be run inside the child router
	action: NavigationActions.navigate({ routeName: "Favoris" })
});

export default class App extends Component {
	state = { favoris: null, appState: AppState.currentState, foreground: false };

	componentDidMount() {
		AppState.addEventListener('change', this._handleAppStateChange);
	}

	componentWillUnmount() {
		AppState.removeEventListener('change', this._handleAppStateChange);
	}

	_handleAppStateChange = (nextAppState) => {
		if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
			console.log('App has come to the foreground trigger!');
			this.setState({foreground: true});
		} else {
			this.setState({foreground: false});
		}
		this.setState({appState: nextAppState});
	}

	refresh = async () => {
		try {
			const value = await AsyncStorage.getItem("quoteDB");
			const listOfTasks = (await JSON.parse(value)) || [];
			if (value !== null) {
				// if favoris exist
				console.log("value: " + typeof listOfTasks);
				this.setState({ favoris: listOfTasks });
			}
			//console.log("working", this.state);
		} catch (error) {
			console.log(error);
		}
	};

	render() {
		return (
			<View style={{ flex: 1 }}>
				<StatusBar backgroundColor="#FFF" barStyle="dark-content" />
				<Header screenProps={{ appState: this.state.appState}}/>
				<View>
					<Text>Current state is: {this.state.appState}</Text>
				</View>
				<Tabs
					onNavigationStateChange={(prevState, currentState) => {
						this.refresh();
					}}
					screenProps={{ favoris: this.state.favoris, refresh: this.refresh, foreground: this.state.foreground, appState: this.state.appState }}
				/>
			</View>
		);
	}
}

AppRegistry.registerComponent("inspiness", () => App);
