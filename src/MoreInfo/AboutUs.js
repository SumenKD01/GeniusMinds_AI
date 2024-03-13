import { Text, View, Image, StyleSheet, Dimensions, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useFonts } from "expo-font";


const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export default AboutUs = () => {
    const [fontsLoaded] = useFonts({
        'Righteous-Regular': require('../../assets/fonts/Righteous/Righteous-Regular.ttf'),
        'Prompt-Regular': require('../../assets/fonts/Prompt/Prompt-Regular.ttf')
    });
    return (
        <ScrollView>
            <LinearGradient colors={['#000C18', '#001E3E']}
                style={{ flex: 1, alignItems: 'center' }}>
                <Text style={{ color: 'white', fontSize: 24, marginTop: 50, marginBottom: 20 }}>About Us</Text>
                <View style={{ marginTop: 80 }}>
                    <LinearGradient colors={['rgba(184, 184, 184, 0.2)', 'rgba(38, 38, 38, 0.3)']}
                        start={{ x: 0.0, y: 0.25 }}
                        end={{ x: 0.5, y: 1.0 }} locations={[0.5, 1]}
                        style={styles.aboutBox1}>
                        <Image style={{ width: 140, height: 140, marginBottom: 10, top: -70, position: "absolute" }} source={require('../../assets/icons/about1img.png')} />
                        <Text style={{ color: '#E1E79A', fontFamily: 'Righteous-Regular', fontSize: 20, marginBottom: 10, marginTop: 80 }}>
                            What we are?
                        </Text>
                        <Text style={{ color: 'white', fontFamily: 'Prompt-Regular', fontSize: 14 }}>
                            SoftDesigners are the leaders in Lean Manufacturing & Industry 4.0 Solutions in India and we had done projects across different parts of the world.
                        </Text>
                    </LinearGradient>
                </View>
                <View style={{ marginTop: 80, marginBottom: 100 }}>
                    <LinearGradient colors={['rgba(184, 184, 184, 0.2)', 'rgba(38, 38, 38, 0.3)']}
                        start={{ x: 0.0, y: 0.25 }}
                        end={{ x: 0.5, y: 1.0 }} locations={[0.5, 1]}
                        style={styles.aboutBox2}>
                        <Image style={{ width: 140, height: 140, marginBottom: 10, top: -70, position: "absolute" }} source={require('../../assets/icons/about2img.png')} />
                        <Text style={{ color: '#E1E79A', fontFamily: 'Righteous-Regular', fontSize: 20, marginBottom: 10, marginTop: 80 }}>
                            Why Soft Designer?
                        </Text>
                        <Text style={{ color: 'white', fontFamily: 'Prompt-Regular', fontSize: 14 }}>
                            <Text style={{ marginBottom: 20 }}>
                                We offer end-to-end Turn Key solutions to Manufacturing companies to improve their manufacturing productivity in real time.
                            </Text>
                            <Text>
                                We specialize in Lean manufacturing solutions, IOT (internet of things), AI (Artificial intelligence), Industry 4.0 and employees health and safety solutions.
                            </Text>
                        </Text>
                    </LinearGradient>
                </View>
            </LinearGradient>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    aboutBox1: {
        justifyContent: 'center',
        alignItems: 'center',
        width: deviceWidth - 20,
        padding: 10,
        color: 'white',
        borderWidth: 2,
        borderColor: 'rgba(145, 186, 235, 0.9)',
        borderRadius: 10,
        marginBottom: 10,
    },
    aboutBox2: {
        justifyContent: 'center',
        alignItems: 'center',
        width: deviceWidth - 20,
        padding: 10,
        color: 'white',
        borderWidth: 2,
        borderColor: 'rgba(67, 166, 125, 0.9)',
        borderRadius: 10,
        marginBottom: 10,
    }
});