import { View,Image,Text, StyleSheet } from "react-native"


interface Item{
    image:string,
    name:string
}

interface PredictonsProps{
    item:Item
}

const PredictonsSlider:React.FC<PredictonsProps> = ({item}) => {
    return(
            <View style={styles.predictionsContainer}>
              <Image source={{uri:item.image}} style={{width:140,height:140,borderRadius:20}} />
              <Text style={{fontFamily:"Poppins-Light"}}>{item.name}</Text>
              <Text style={{fontFamily:"Poppins-Regular"}}>07/24</Text>
            </View>
    )
}

export default PredictonsSlider


const styles = StyleSheet.create({
    predictionsContainer:{
        marginVertical:5,
        marginLeft:20
    }   
})