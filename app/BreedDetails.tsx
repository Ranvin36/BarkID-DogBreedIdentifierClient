import { Image, StyleSheet, TouchableOpacity, View,Text, Dimensions, ScrollView} from "react-native"
import { MaterialIcons } from "@expo/vector-icons"
import { router, useLocalSearchParams } from "expo-router"
import axios from "axios"
import { useEffect, useState } from "react"
import BreedInfoBg from "@/components/BreedInfoBg"
import ScaleRate from "@/components/ScaleRate"
import { SafeAreaView } from "react-native-safe-area-context"
const {width:SCREEN_WIDTH} = Dimensions.get('window')

interface BreedProps{
    image_link:string,
    shedding:string,
    barking:string,
    min_life_expectancy:string,
    max_height_male:string,
    energy:string,
    max_life_expectancy:string,
    min_height_male:string,
    description:string

}

const BreedDetails:React.FC = () =>{
    const [breedDetails,setBreedDetails] = useState<BreedProps | null>(null)
    const {breed,probability} = useLocalSearchParams()
    async function GetBreedDetails(){
        const response = await axios.get(`https://api.api-ninjas.com/v1/dogs?name=${breed}`,{
            headers:{
                "x-api-key":"0RGWKoTvLHcv3JgAhR7vpw==QFCxDjpIp9PQV9W2"
            }
        })
        setBreedDetails(response.data[0])
    }

    useEffect(() =>{
        GetBreedDetails()
    },[])
    return(
        <ScrollView style={styles.container}>
            <SafeAreaView>
            <View style={styles.imageHeader}>
                <Image source={{uri:breedDetails?.image_link}} style={styles.imageBg}/>
                <TouchableOpacity style={styles.arrow} onPress={() => router.back()}>
                    <MaterialIcons name="keyboard-arrow-left" size={22} color="black" />
                </TouchableOpacity>
            </View>
            <View style={styles.breedInfo}>
                <View style={{paddingHorizontal:10}}>
                        <View>
                            <Text style={{fontFamily:"Poppins-Bold",fontSize:19}}>{breed.toString().toUpperCase()}</Text>
                            <Text style={{color:"#ccc",fontFamily:"Poppins-Light",fontSize:12,marginTop:-5}}>The Predicted Breed Has A Percentage Of {Number(probability).toFixed(2)*100}%</Text>
                        </View>
                        {breedDetails?.description ?                      
                            <View style={{marginVertical:10}}>
                                <Text style={{fontFamily:"Poppins-Light"}}>{breedDetails?.description}</Text>
                            </View>
                                                    :

                                                null
                        }
                        <ScaleRate max={breedDetails?.shedding} labelLeft="No Shedding" labelRight="Max Shedding" title="Shedding" index={1}/>
                        <ScaleRate max={breedDetails?.barking} labelLeft="Minimal Barking" labelRight="Max Barking" title="Barking" index={2}/>
                        <BreedInfoBg key1="Min Life Expectancy" key2="Max Life Expectancy" value1={breedDetails?.min_life_expectancy + " Yrs"} value2={breedDetails?.max_life_expectancy + " Yrs"}/>
                        <ScaleRate max={breedDetails?.energy} labelLeft="Low Energy" labelRight="High Energy" title="Energy" index={3}/>
                        <BreedInfoBg key1="Min Height Male" key2="Max Height Male" value1={breedDetails?.min_height_male+" In"} value2={breedDetails?.max_height_male+" In"}/>
                    </View>
            </View>
            </SafeAreaView>
        </ScrollView>
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
    },
    infoBg:{
        marginVertical:10,
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between",
        borderWidth:1,
        borderColor:"#1e69e3",
        borderRadius:20,
        paddingVertical:15,
        paddingHorizontal:20
    },
    line:{
        backgroundColor:"#f2f2f2",
        width:2,
        height:30
    },
    infoBgKey:{
        fontFamily:"Poppins-Light",
    },
    scaleCenter:{
        position:"relative",
        backgroundColor:"#1e69e3",
        // width:"100%",
        height:2,
        marginVertical:20
    },
    scale:{
        marginVertical:10,
        position:"absolute",
        flexDirection:"row",
        top:-25,
        left:0,
        justifyContent:"space-between",
        width:"100%"
    },
    scaleContainer:{
        marginVertical:5
    },
    scaleValue:{
        width:30,
        height:30,
        borderRadius:50,
        borderWidth:1,
        borderColor:"#1e69e3",
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:"#fff"
    },
    scaleBg:{
        backgroundColor:"#1e69e3",
        width:25,
        borderRadius:50,
        height:25
        
    }
})