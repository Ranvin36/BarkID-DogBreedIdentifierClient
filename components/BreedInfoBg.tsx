import { View,Text, StyleSheet } from "react-native";


interface BreedDetails{
    key1:string,
    key2:string,
    value1:string,
    value2:string,
}

const BreedInfoBg:React.FC<BreedDetails>= ({key1,value1,key2,value2}) =>{
    return(
        <View style={styles.infoBg}>
            <View>
                <Text style={styles.infoBgKey}>{key1}</Text>
                <Text style={styles.infoBgValue}>{value1}</Text>
            </View>
            <View style={styles.line}></View>
            <View>
                <Text style={styles.infoBgKey}>{key2}</Text>
                <Text style={styles.infoBgValue}>{value2}</Text>
            </View>
        </View>
    )
}

export default BreedInfoBg;


const styles = StyleSheet.create({
    infoBg:{
        marginVertical:10,
        flexDirection:"row",
        alignItems:"center",
        // justifyContent:"space-between",
        justifyContent:"center",
        borderWidth:1,
        borderColor:"#1e69e3",
        borderRadius:20,
        paddingVertical:15,
        paddingHorizontal:20
    },
    line:{
        backgroundColor:"#f2f2f2",
        width:2,
        height:30,
        marginHorizontal:15
    },
    infoBgKey:{
        fontFamily:"Poppins-Light",
        textAlign:"center"
    },
    infoBgValue:{
        fontFamily:"Poppins-Bold",
        textAlign:"center"
    }
})