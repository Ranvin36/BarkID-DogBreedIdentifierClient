import { router } from 'expo-router';
import { View,Text, StyleSheet,TouchableOpacity, FlatList, Image } from 'react-native';
import {AntDesign} from "@expo/vector-icons"
import { dummy } from '@/assets/dummy';
import PredictonsSlider from '@/components/PredictionsSlider';
import * as ImagePicker from "expo-image-picker"
import axios from "axios"

export default function HomeScreen() {

  const pickImage = async () => {
    let selectImage = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
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
      // console.log(formData._parts)
      try {
        const response = await axios.post("http://192.168.8.101:8080/predict", formData, {
            headers: {
                'Accept': 'application/json',
                "Content-Type": "multipart/form-data",
              }});
        router.push("/BreedDetails")
      } catch (error) {
                console.error(error);
      }}
  };
  

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.headerText}>BarkID</Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={() => router.push("/BreedDetails")}>
                <AntDesign name="user" size={20}/>
        </TouchableOpacity>
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
        <View>
            <FlatList data={dummy} showsHorizontalScrollIndicator={false} horizontal renderItem={({item}:any) =>{
              return(
                <PredictonsSlider item={item}/>
              )
            }}/>
        </View>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container:{
    backgroundColor:"#fff",
    height:"100%",
    paddingVertical:20,
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