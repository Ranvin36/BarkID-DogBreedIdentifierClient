import { useEffect } from "react";
import { Image, StyleSheet, View, Text } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withTiming, withRepeat } from "react-native-reanimated";

export default function Loader() {
    const opacityValue = useSharedValue(1);

    // Animated style for opacity
    const opacityAnimation = useAnimatedStyle(() => {
        return {
            opacity: withRepeat(
                withTiming(opacityValue.value, { duration: 500 }),
                -1, // -1 means repeat infinitely
                true // reverse the animation (so it goes from 1 -> 0 -> 1)
            )
        };
    });

    useEffect(() => {
        opacityValue.value = 0
    },[])

    return (
        <View style={styles.loader}>
            <Animated.View style={[styles.content, opacityAnimation]}>
                <View>
                    <Image source={require("../assets/images/logo.png")} style={{ width: 150, height: 150 }} />
                </View>
                <View style={{ marginTop: -15 }}>
                    <Text style={{ textAlign: "center", fontFamily: "Poppins-Bold" }}>
                        Predicting...
                    </Text>
                </View>
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    loader: {
        backgroundColor: "#fff",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
    content: {
        flexDirection: "column",
        alignItems: "center",
    },
});
