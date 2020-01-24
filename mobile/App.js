import React from 'react';
import {StatusBar, YellowBox} from 'react-native'

import Routes  from './src/routes'

YellowBox.ignoreWarnings([
  'Unrecognized '
])

export default function App() {
  return (
    <>
      <StatusBar 
        barStyle="light-content"
        backgroundColor="#7D4E07"/>
      <Routes />
    </>
  );
}

