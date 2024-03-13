import { Dimensions, Image, StyleSheet, Text, View, Animated } from 'react-native';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useRef, useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import LoginForm from './LoginForm';
import * as Animatable from 'react-native-animatable';
import MaskedView from '@react-native-masked-view/masked-view';

const width = Dimensions.get('window').width;

export default Login = () => {
    const [fontLoaded, setFontLoaded] = useState(false);

    const animatedColors = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        startAnimation();
    }, []);

    const startAnimation = () => {
        Animated.loop(
            Animated.timing(animatedColors, {
                toValue: 10,
                duration: 30000,
                useNativeDriver: false,
            })
        ).start();
    };

    const GradientText = (props) => {
        return (
            <MaskedView maskElement={<Text {...props} />}>
                <LinearGradient
                    colors={['#5AEFB0', '#B5FEDF', '#5AEFB0']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}>
                    <Text {...props} style={[props.style, { opacity: 0 }]} />
                </LinearGradient>
            </MaskedView>
        );
    };

    let [defaultblue, yellow, deepBlue, green, darkGreen, darkCyan, defaultBlue] = ['#002760', '#404F00', '#00193E', '#0D1851', '#103F00', '#137278', '#002760'];

    const interpolatedColors = animatedColors.interpolate({
        inputRange: [0, 1, 2, 3, 4, 5, 6],
        outputRange: [defaultblue, yellow, deepBlue, green, darkGreen, darkCyan, defaultBlue]
    });

    useEffect(() => {
        async function loadFonts() {
            await Font.loadAsync({
                Poppins: require('../../assets/fonts/Poppins/Poppins-Bold.ttf'),
                Poppins_Regular: require('../../assets/fonts/Poppins/Poppins-Regular.ttf'),
                Poppins_LightItalic: require('../../assets/fonts/Poppins/Poppins-LightItalic.ttf'),
                Poppins_SemiBoldItalic: require('../../assets/fonts/Poppins/Poppins-SemiBoldItalic.ttf'),
                Poppins_MediumItalic: require('../../assets/fonts/Poppins/Poppins-MediumItalic.ttf'),
                Poppins_SemiBold: require('../../assets/fonts/Poppins/Poppins-SemiBold.ttf'),
                'SignikaNegative-Light': require('../../assets/fonts/Signika_Negative/static/SignikaNegative-Light.ttf'),
                'SignikaNegative-Bold': require('../../assets/fonts/Signika_Negative/static/SignikaNegative-Bold.ttf'),
                'SignikaNegative-Medium': require('../../assets/fonts/Signika_Negative/static/SignikaNegative-Medium.ttf'),
                'SignikaNegative-Regular': require('../../assets/fonts/Signika_Negative/static/SignikaNegative-Regular.ttf'),
                'SignikaNegative-SemiBold': require('../../assets/fonts/Signika_Negative/static/SignikaNegative-SemiBold.ttf'),
                'Righteous-Regular': require('../../assets/fonts/Righteous/Righteous-Regular.ttf'),
                'Prompt-Regular': require('../../assets/fonts/Prompt/Prompt-Regular.ttf')
            });
            setFontLoaded(true);
        }
        loadFonts();
    }, []);

    useEffect(() => {
        async function prepare() {
            await SplashScreen.preventAutoHideAsync();
        }
        prepare();
    }, []);

    if (!fontLoaded) {
        return null;
    } else {
        SplashScreen.hideAsync();
    }

    return (
        <View style={styles.container}>
            <Animated.View style={[StyleSheet.absoluteFill, { backgroundColor: interpolatedColors }]} />
            <LinearGradient
                colors={['#002760', '#002760', 'transparent', '#00193E']}
                style={StyleSheet.absoluteFill}
                start={{ x: 2, y: -3 }}
                end={{ x: -1, y: 0.5 }}
            >
                <View style={styles.loginBackContent}>
                    <Animatable.Image animation={'slideInDown'} direction="alternate" duration={10000} iterationCount={1} source={require('../../assets/icons/Graph.png')} style={[styles.backIcons, { top: '40%', right: '20%' }]} />
                    <Animatable.Image animation={'slideInDown'} direction="alternate" duration={10000} iterationCount={1} source={require('../../assets/icons/Day View.png')} style={[styles.backIcons, { left: '10%', bottom: '30%' }]} />
                    <Animatable.Image animation={'slideInDown'} direction="alternate" duration={10000} iterationCount={1} source={require('../../assets/icons/Video Conference.png')} style={[styles.backIcons, { right: -12, bottom: '20%' }]} />
                    <Animatable.Image animation={'slideInDown'} direction="alternate" duration={10000} iterationCount={1} source={require('../../assets/icons/Bar Chart.png')} style={[styles.backIcons, { right: -12, top: '20%' }]} />
                    <Animatable.Image animation={'slideInDown'} direction="alternate" duration={10000} iterationCount={1} source={require('../../assets/icons/Slice.png')} style={[styles.backIcons, { left: -20, top: '20%' }]} />
                    <Image source={require('../../assets/icons/gAI.png')} style={{ width: 80, height: 80 }} />
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ color: 'white', fontSize: 28, fontFamily: 'Poppins_Regular', top: 2 }}>genius</Text>
                        <GradientText style={{ fontSize: 28, fontFamily: 'Poppins' }}>minds.ai</GradientText>
                    </View>
                    <View style={{ marginBottom: 40 }}>
                        <Text style={{ fontFamily: 'Poppins_LightItalic', fontSize: (width / 60), left: (width / 7), bottom: (width / 60), color: 'white' }}>Re-Defininig Innovation</Text>
                    </View>
                    <View style={{ position: 'absolute', zIndex: 1, width: '100%', marginTop: '60%' }}>
                        <LoginForm />
                    </View>
                </View>
                <Animatable.Image animation={'slideInLeft'} duration={5000} direction="alternate" iterationCount={'infinite'} source={require('../../assets/icons/SeaImage.png')} style={{ width: '150%', height: 450, position: 'absolute', zIndex: 0, bottom: 0, left: '-20%', opacity: 0.5 }} />
                <View style={{ flexDirection: 'row', position: 'absolute', bottom: 0, width: '100%', alignItems: 'center', gap: 5, justifyContent: 'center', paddingBottom: 15, opacity: 0.7 }}>
                    <Text style={{ fontFamily: 'Poppins_Regular', fontSize: (width / 40), color: 'white' }}>Developed by</Text>
                    <Image source={require('../../assets/icons/SoftDesigners.png')} style={{ height: 15, width: 70, objectFit: 'contain' }} />
                </View>
            </LinearGradient>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    backgroundImage: {
        width: '100%',
        height: '100%',
        alignItems: 'center'
    },
    logo: {
        width: 3 * (width / 4),
        height: 3 * (width / 4),
    },
    companyName: {
        fontSize: (width / 10),
        padding: (width / 150),
        color: '#004A8E',
        fontFamily: 'Poppins',
        borderRadius: 10,
        paddingHorizontal: (width / 18),
        alignSelf: 'center'
    },
    loginBackContent: {
        gap: -7,
        flex: 1,
        alignItems: 'center',
        paddingTop: '20%'
    },
    backIcons: {
        width: 80,
        height: 80,
        position: 'absolute',
        objectFit: 'contain'
    }
});