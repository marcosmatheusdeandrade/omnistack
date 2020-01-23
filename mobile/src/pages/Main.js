import React, {useState, useEffect} from 'react'
import {View, Text} from 'react-native'
import {StyleSheet, Image} from 'react-native'
import MapView, {Marker, Callout} from 'react-native-maps'
import {requestPermissionsAsync, getCurrentPositionAsync} from 'expo-location'

function Main({ navigation }) {

    const [currentRegion, setCurrentRegion] = useState(null);

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
    }, [])

    if (!currentRegion) {
        return null;
    }

    return <MapView initialRegion={currentRegion} style={{flex: 1}}>

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
}

const styles = StyleSheet.create({

    avatar: {
        width: 54,
        height: 54,
        borderRadius: 180,
        borderWidth: 4
    },

    callout: {
        width: 260
    },

    devName: {
        
    }
    
});

export default Main;