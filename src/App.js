import React, { Component } from "react";
import { TouchableOpacity, FlatList, View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';
import CurrentCard from './components/CurrentCard';
import ForecastCard from './components/ForecastCard';


export default class App extends Component {

    state = { list: [], loaded: false, forecast: {}, showDetail: false };

    componentDidMount() {
        const cities = ['Cork', 'Istanbul', 'Sydney'];
        for (i = 0; i < cities.length; i++) {
            axios
                .get('http://api.openweathermap.org/data/2.5/weather?APPID=bd8326266ffeb1b662cf75fadf5dee2a',
                    {
                        params: {
                            q: cities[i]
                        }
                    }
                )
                .then(response =>
                    this.setState({
                        list: [...this.state.list, { current: response.data }]
                    })
                )
                .catch(e => console.log(e));

        }

        this.setState({ loaded: true });
    }

    getForecast(name) {
        axios
            .get('http://api.openweathermap.org/data/2.5/forecast?APPID=bd8326266ffeb1b662cf75fadf5dee2a',
                {
                    params: {
                        q: name
                    }
                }
            )
            .then(response =>
                this.setState({
                    forecast: response.data,
                    showDetail: true
                })
            )
            .catch(e => console.log(e));
    }

    renderDetail() {
        const { name } = this.state.forecast.city;
        const { list } = this.state.forecast;
        return (

            <View style={styles.detailStyle}>

                <TouchableOpacity style={{ marginTop: 40, marginLeft: 20 }} onPress={() => this.setState({ showDetail: false })}>
                    <Text> Back </Text>
                </TouchableOpacity>

                {this.renderList(list)}

            </View>
        );
    }

    renderList(list) {
        return (
            <View style={styles.container}>
                <FlatList
                    style={{ flex: 1, marginTop: 100 }}
                    data={list} keyExtractor={item => item.dt_txt}
                    renderItem={({ item }) => <ForecastCard
                        detail={item} />} />
            </View>
        );
    }

    render() {
        if (this.state.showDetail) {
            return this.renderDetail();
        }
        if (!this.state.loaded) {
            return <ActivityIndicator size="large" color="#0000ff" />
        }

        return (
            <View style={styles.container}>

                <FlatList
                    style={{ flex: 1, marginTop: 100 }}
                    data={this.state.list} keyExtractor={item => item.current.id + ''}
                    renderItem={({ item }) => <CurrentCard
                        onPress={() => this.getForecast(item.current.name)}
                        detail={item.current} />} />
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F5FCFF",
    },
    title: {
        fontSize: 20,
        textAlign: "center",
        margin: 10
    },
    detailStyle: {
        flex: 1
    }
});