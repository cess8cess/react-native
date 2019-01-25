import React, { Component } from "react";
import { TouchableOpacity, Text, View, FlatList } from "react-native";
import axios from 'axios';

import ForecastCard from './ForecastCard';

export default class CurrentCard extends Component {

    render() {


        const { name, weather, main } = this.props.detail;

        const c = main.temp - 273.15;

        return (
            <View>
                <TouchableOpacity onPress={this.props.onPress}>
                    <View style={styles.containerStyle}>
                        <Text style={{ justifyContent: 'center', alignSelf: 'center', fontSize: 20, fontWeight: '900' }}>{name}</Text>
                        <Text style={{ justifyContent: 'center', alignSelf: 'center', fontSize: 14, fontWeight: '300' }}>{weather[0].description}</Text>
                        <Text style={{ justifyContent: 'center', alignSelf: 'center', fontSize: 30, fontWeight: '300' }}>{c.toFixed(2)} C</Text>
                    </View >
                </TouchableOpacity >

            </View>
        );
    }
}

const styles = {
    containerStyle: {
        borderWidth: 1,
        borderRadius: 2,
        borderColor: '#ddd',
        borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 10,
        height: 100,
        width: 200
    },
    detailStyle: {

    }
};