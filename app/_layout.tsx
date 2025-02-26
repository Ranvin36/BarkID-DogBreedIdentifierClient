import React from 'react';
import {Stack} from 'expo-router';
import {useFonts} from "expo-font"


export default function TabLayout() {
  const [fontsLoaded] = useFonts({
    "Poppins-Bold": require('../assets/fonts/Poppins-Bold.ttf'),
    "Poppins-Light": require('../assets/fonts/Poppins-Light.ttf'),
    "Poppins-Regular": require('../assets/fonts/Poppins-Regular.ttf'),
  })

  if(fontsLoaded){
      return (
        <Stack screenOptions={{headerShown:false}}>
          <Stack.Screen name='BreedDetails'/>
          <Stack.Screen name='loader'/>
        </Stack>
      );
  }
  else{
    return null;
  }

}
