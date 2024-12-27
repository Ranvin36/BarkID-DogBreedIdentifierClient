import { Image, StyleSheet, TouchableOpacity, View,Text} from "react-native"
import { dummy } from "@/assets/dummy"
import { MaterialIcons } from "@expo/vector-icons"
import { router } from "expo-router"
import axios from "axios"
import { useEffect } from "react"

const BreedDetails:React.FC = () =>{
    async function GetBreedDetails(){
        const response = await axios.get('https://api.api-ninjas.com/v1/dogs?name=golden retriever',{
            headers:{
                "x-api-key":"0RGWKoTvLHcv3JgAhR7vpw==QFCxDjpIp9PQV9W2"
            }
        })
        console.log(response.data)

    }

    useEffect(() =>{
        GetBreedDetails()
    },[])
    return(
        <View style={styles.container}>
            <View style={styles.imageHeader}>
                <Image source={{uri:dummy[0].image}} style={styles.imageBg}/>
                <TouchableOpacity style={styles.arrow} onPress={() => router.back()}>
                    <MaterialIcons name="keyboard-arrow-left" size={22} color="black" />
                </TouchableOpacity>
            </View>
            <View style={styles.breedInfo}>
                <View>
                    <Text style={{fontFamily:"Poppins-Bold",fontSize:19}}>Golden Retriever</Text>
                    <Text style={{color:"#ccc",fontFamily:"Poppins-Light",fontSize:12,marginTop:-5}}>The Predicted Breed Has A Percentage Of 70%</Text>
                </View>
                <View style={{marginVertical:10}}>
                    <Text style={{fontFamily:"Poppins-Light"}}>The Caucasian Shepherd dog is a serious guardian breed and should never be taken lightly.</Text>
                </View>
            </View>

        </View>
    )
}

export default BreedDetails


const styles = StyleSheet.create({
    container:{
        height:"100%",
        paddingHorizontal:10,
        backgroundColor:"#fff"
    },
    imageHeader:{
        marginVertical:5,
        position:"relative"
    },
    imageBg:{
        width:"100%",
        borderRadius:40,
        height:350
    },
    arrow:{
        position:"absolute",
        left:20,
        top:20,
        backgroundColor:"#f2f2f2",
        width:30,
        height:30,
        borderRadius:50,
        justifyContent:"center",
        alignItems:"center"
    },
    breedInfo:{
        marginVertical:10,
        marginHorizontal:5
    }
})