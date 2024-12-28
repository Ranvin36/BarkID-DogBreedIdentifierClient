import { View,Text, StyleSheet} from "react-native"

interface ScaleRateProps{
    max:number | any,
    labelLeft:string,
    labelRight:string,
    title:string
}

const ScaleRate:React.FC<ScaleRateProps>= ({max,labelLeft,labelRight,title}) =>{
    return(
                    <View style={styles.scaleContainer}>
                        <Text style={styles.infoBgKey}>{title}</Text>
                        <View style={styles.scaleCenter}>
                            <View style={styles.scale}>
                            {Array.from({length:5} , (_,index) =>(
                                
                                    <View style={styles.scaleValue}>
                                        {index <= max &&  <View style={styles.scaleBg}></View>}
                                    </View>
                            ) )}
                            </View>
                            
                        </View>
                        <View>    
                            <View style={{justifyContent:"space-between",flexDirection:"row"}}>
                            <Text style={[styles.infoBgKey,{textAlign:"center"}]}>{labelLeft}</Text>
                            <Text style={[styles.infoBgKey,{textAlign:"center"}]}>{labelRight}</Text>
                            </View>                            
                        </View>
                    </View>

    )
}

export default ScaleRate


const styles = StyleSheet.create({
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
    }
})