import { router } from 'expo-router';
import { View,Text, StyleSheet,TouchableOpacity, FlatList, Image, ScrollView, RefreshControl, StatusBar } from 'react-native';
import {AntDesign} from "@expo/vector-icons"
import { dummy } from '@/assets/dummy';
import PredictonsSlider from '@/components/PredictionsSlider';
import * as ImagePicker from "expo-image-picker"
import axios from "axios"
import { getObject, SaveObject } from '@/components/StoreObject';
import { useCallback, useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Loader from './loader';

export default function HomeScreen() {

  const [recentPredictions, setRecentPredictions] = useState([])
  const [refreshing,setRefreshing] = useState(false)
  const [loading, setLoading] = useState(false)
  const getRecentPredictions = async() => {
    const data = await getObject()
    setRecentPredictions(data)
  }

  const onRefresh = useCallback(() =>{
    setRefreshing(true),
    setTimeout(() =>{
      setRefreshing(false)
    },2000)
  },[])

  const pickImage = async () => {

    let selectImage = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      // aspect: [4, 3],
      quality: 1,
    });
  
    if (!selectImage.canceled) {
      const formData = new FormData();
      const fileName = selectImage.assets[0].uri.split('/').pop() || 'image.jpg';

      formData.append("image",{
        uri:selectImage.assets[0].uri,
        type: 'image/jpeg',
        name:fileName
      });


      try {
        setLoading(true)
        const response = await axios.post("https://dogbreedclassifier-931642089892.us-central1.run.app/predict", formData, {
          headers: {
            'Accept': 'application/json',
            "Content-Type": "multipart/form-data",
          }})
          
          const predictedBreed = response.data["Predicted Breed: "]
          const predictionProbability = response.data["Probability"]
          const transformedText = predictedBreed.replace(/_/g, " ");
          const savePrediction =  SaveObject(transformedText,selectImage.assets[0].uri,predictionProbability)
          setLoading(false)
        router.push({pathname:"/BreedDetails",params:{breed: transformedText,probability:predictionProbability}})

      } catch (error:any) {
        if (error.response) {
          console.error('Server responded with status:', error.response.status);
        }
      }
    }
      
  };

  useEffect(() => {
      getRecentPredictions();
  },[refreshing])
  
  if(loading){
    return(
      <Loader/>
    )
  }
  else{
    return (
      <ScrollView style={styles.container} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}>
        <SafeAreaView>
  
        <StatusBar  barStyle="dark-content"/>
        <View style={styles.header}>
          <View style={{flexDirection:"row",alignItems:"center"}}>
            <View>
              <Image source={require("../assets/images/logo.png")} style={{width:50,height:50}}/>
            </View>
            <Text style={styles.headerText}>BarkID</Text>
          </View>
  
        </View>
        <View style={{marginHorizontal:20}}>
          <TouchableOpacity style={styles.makePrediction} onPress={pickImage}>
              <AntDesign name="plus" size={30} color="#1e69e3"/>
          </TouchableOpacity>
        </View>
        <View style={styles.recentPredictions}>
          <View style={{paddingHorizontal:20}}>
            <Text style={{fontFamily:"Poppins-Light",fontSize:18}}>Recent Predictons</Text>
          </View>
          {recentPredictions ?          
            <View>
                <FlatList data={recentPredictions} showsHorizontalScrollIndicator={false} horizontal  renderItem={({item}:any) =>{
                  return(
                    <PredictonsSlider item={item}/>
                  )
                }}/>
            </View>
                            :
            <View style={{marginTop:30}}>
              <Text style={{fontFamily:"Poppins-Light", color:"#333",textAlign:"center"}}>No Predictions Made Recently</Text>
            </View>
        
        }
        </View>
              </SafeAreaView>
      </ScrollView>
    );
  }

}


const styles = StyleSheet.create({
  container:{
    backgroundColor:"#fff",
    height:"100%",
    paddingVertical:15,
  },
  header:{
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"space-between",
    paddingHorizontal:20
  },
  headerText:{
    fontFamily:"Poppins-Bold",
    fontSize:20,
    textAlign:"center"
  },
  button:{
    backgroundColor:"#f2f2f2",
    padding:10,
    borderRadius:50,
    textAlign:"center",
    alignSelf:"center",
    justifyContent:"center"
  },
  makePrediction:{
      backgroundColor:"#f2f2f2",
      marginVertical:20,
      width:"100%",
      height:300,
      borderRadius:30,
      borderWidth:1,
      borderColor:"#1e69e3",
      justifyContent:"center",
      alignItems:"center",

  },
  recentPredictions:{

  }
})