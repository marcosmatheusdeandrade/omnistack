import React, {useState, useEffect} from 'react'
import {View, Text, TextInput, TouchableOpacity} from 'react-native'
import {StyleSheet, Image} from 'react-native'
import MapView, {Marker, Callout} from 'react-native-maps'
import {requestPermissionsAsync, getCurrentPositionAsync} from 'expo-location'
import {MaterialIcons} from '@expo/vector-icons'

import api from '../services/api'
import {connect} from '../services/socket'

function Main({ navigation }) {

    const [devs, setDevs] = useState([]);
    const [currentRegion, setCurrentRegion] = useState(null);
    const [techs, setTechs] = useState('')
    
    useEffect(() => {
        async function loadInitialPosition() {

            const {granted} = await requestPermissionsAsync();

            if (granted) {
                const {coords} = await getCurrentPositionAsync({
                    enableHighAccuracy: true,
                });

                const {latitude, longitude} = coords;

                setCurrentRegion({
                    latitude,
                    longitude,
                    latitudeDelta: 0.04,
                    longitudeDelta: 0.04
                })
            }
        }

        loadInitialPosition();
    }, []);

    async function loadDevs() {
    console.log('--------------------------')

        console.log(api)

        const {latitude, longitude} = currentRegion;

        const response = await api.get('/search', {
            params: {
                latitude,
                longitude,
                techs
            }
        });

        console.log('hummmmmmmmmmmmmmm')

        setDevs(response.data.devs);
        setupWebSocket();
    }

    function setupWebSocket() {
        const {latitude, longitude} = currentRegion;
        
        connect(latitude, longitude, techs);
    }

    if (!currentRegion) {
        return null;
    }

    return <> 
        <MapView initialRegion={currentRegion} style={{flex: 1}}>

            <Marker coordinate={{latitude: -27.211164, longitude: -49.6374491}}>
            
                <Image style={styles.avatar} source={{uri: 'https://www.designerd.com.br/wp-content/uploads/2019/04/imagens-blogs-chamar-atencao-publico-3.jpg'}} />

                <Callout onPress={() => {
                    navigation.navigate('Profile', {github_username: 'joao'})
                }}>
                    <View>
                        <Text>Marcos Matheus</Text>
                    </View>
                </Callout>
            </Marker>

        </MapView>

        <View style={styles.searchForm}>
                <TextInput
                    style={styles.searchInput}
                    placeHolder="Buscar Devs"
                    placeHolderTextColor="#999"
                    autoCapitalize="words"
                    autoCorrect={false}
                    />

                <TouchableOpacity onPress={loadDevs} style={styles.loadButton}>
                    <MaterialIcons name="my-location" size={20} color="#FFF" />
                </TouchableOpacity>
                    

        </View>
    </>
}

const styles = StyleSheet.create({

    avatar: {
        width: 54,
        height: 54,
        borderRadius: 180,
        borderWidth: 4
    },

    searchForm: {
        position: 'absolute',
        top: 20,
        left: 20,
        right: 20,
        zIndex: 5,
        flexDirection: 'row'
    },

        searchInput: {
            flex: 1, 
            height: 50,
            backgroundColor: '#FFF',
            color:'#333',
            borderRadius: 25,
            paddingHorizontal: 20,
            fontSize: 16,
            shadowColor: '#000',
            shadowOpacity: 0.2,
            shadowOffset:   { 
                width: 4,
                height: 4
           }
        },

        loadButton: {
            width: 50,
            height: 50,
            backgroundColor: 'green',
            borderRadius: 25,
            justifyContent: 'center',
            alignItems: 'center',
            marginLeft: 15
        }
});

export default Main;