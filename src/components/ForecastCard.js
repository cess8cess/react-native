import React, { Component } from "react";
import { Text, View, FlatList } from "react-native";


export default class ForecaseCard extends Component {

    render() {
        const { dt_txt, weather, main } = this.props.detail;

        console.log(dt_txt)

        const c = main.temp - 273.15;

        return (
            <View>
                <Text style={{ justifyContent: 'center', alignSelf: 'center', fontSize: 12, fontWeight: '900' }}>{dt_txt}</Text>
                <Text style={{ justifyContent: 'center', alignSelf: 'center', fontSize: 12, fontWeight: '300' }}>{weather[0].description}</Text>
                <Text style={{ justifyContent: 'center', alignSelf: 'center', fontSize: 12, fontWeight: '300' }}>{c.toFixed(2)} C</Text>
            </View>
        );
    }
}