import { router } from "expo-router"
import { View,Image,Text, StyleSheet, TouchableOpacity } from "react-native"


interface Item{
    image:string,
    breed:string,
    date:string,
    probability:string
}

interface PredictonsProps{
    item:Item
}

const PredictonsSlider:React.FC<PredictonsProps> = ({item}) => {
    function navigateBreedDetails(){
        router.push({pathname:"/BreedDetails",params:{breed:item.breed,probability:item.probability}})
    }
    return(
            <TouchableOpacity style={styles.predictionsContainer} onPress={navigateBreedDetails}>
              <Image source={{uri:item.image}} style={{width:140,height:140,borderRadius:20}} />
              <Text style={{fontFamily:"Poppins-Light"}}>{item.breed.toString().toLocaleUpperCase()}</Text>
              <Text style={{fontFamily:"Poppins-Regular"}}>{item.date}</Text>
            </TouchableOpacity>
    )
}

export default PredictonsSlider


const styles = StyleSheet.create({
    predictionsContainer:{
        marginVertical:5,
        marginLeft:20
    }   
})