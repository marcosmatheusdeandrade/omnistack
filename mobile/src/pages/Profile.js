import React, {useState, useEffect} from 'react'
import {View, Text} from 'react-native'
import {WebView} from 'react-native-webview'


function Profile({navigation}) {
    const github_username = navigation.getParam('github_username') 

    return <WebView style={{flex: 1}} source={{uri: 'https://github.com/marcosmatheusdeandrade'}} />
}

export default Profile;