import { router } from 'expo-router';
import { View,Text, StyleSheet,TouchableOpacity, FlatList, Image } from 'react-native';
import {AntDesign} from "@expo/vector-icons"
import { dummy } from '@/assets/dummy';


export default function HomeScreen() {
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
      <TouchableOpacity style={styles.makePrediction}>
          <AntDesign name="plus" size={30} color="#1e69e3"/>
      </TouchableOpacity>
      <View style={styles.recentPredictions}>
        <Text style={{fontFamily:"Poppins-Light",fontSize:18}}>Recent Predictons</Text>
        <View>
            <FlatList data={dummy} renderItem={(item:any) =>{
              console.log(item)
              return(
                <View>
                  <Image source={{uri:item.image}} style={{width:100,height:100,borderRadius:30}} />
                </View>
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
    paddingHorizontal:20
  },
  header:{
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"space-between"

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
      alignItems:"center"
  },
  recentPredictions:{

  }
})