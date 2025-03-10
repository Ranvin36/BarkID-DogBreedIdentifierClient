import AsyncStorage from '@react-native-async-storage/async-storage';


export async function SaveObject(predicted_label:string,uri:any,predictionProbability:string){
    const date = new Date()

    const data = {
        "breed":predicted_label,
        "image":uri,
        "date": `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`,
        "probability":`${predictionProbability}`
    }
    try{
        const setPrediction = await AsyncStorage.getItem("recent_predictions")
        const predictions = setPrediction? JSON.parse(setPrediction) : []
        predictions.push(data)
        await AsyncStorage.setItem("recent_predictions",JSON.stringify(predictions))
    }
    catch(error){
        console.log(error)
    }
}

export async function getObject(){
    try{
        const recentPredictions = await AsyncStorage.getItem("recent_predictions")
        if(recentPredictions){
            return JSON.parse(recentPredictions)
        }
    }
    catch(error){
        console.log(error)
    }
    
}