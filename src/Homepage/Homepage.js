import { Dimensions, Image, StyleSheet, Text, View, Animated } from 'react-native';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useRef, useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient'; 7
import * as Animatable from 'react-native-animatable';
import MaskedView from '@react-native-masked-view/masked-view';

const width = Dimensions.get('window').width;

export default Homepage = () => {
    const [fontLoaded, setFontLoaded] = useState(false);

    useEffect(() => {
        async function loadFonts() {
            await Font.loadAsync({
                Poppins: require('../../assets/fonts/Poppins/Poppins-Bold.ttf'),
                Poppins_Regular: require('../../assets/fonts/Poppins/Poppins-Regular.ttf'),
                Poppins_LightItalic: require('../../assets/fonts/Poppins/Poppins-LightItalic.ttf'),
                Poppins_SemiBoldItalic: require('../../assets/fonts/Poppins/Poppins-SemiBoldItalic.ttf'),
                Poppins_MediumItalic: require('../../assets/fonts/Poppins/Poppins-MediumItalic.ttf'),
                Poppins_SemiBold: require('../../assets/fonts/Poppins/Poppins-SemiBold.ttf')
            });
            setFontLoaded(true);
        }
        loadFonts();
    }, []);

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

    useEffect(() => {
        async function prepare() {
            await SplashScreen.preventAutoHideAsync();
        }
        prepare();
    }, []);

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#002760', '#00193E']}
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
                    <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, width: '100%', gap: 10 }}>
                        <Image source={require('../../assets/icons/frame4.png')} style={{ width: 130, height: 130, borderRadius: 20, flex: 2 }} />
                        <View style={{ position: 'absolute', padding: 20 }}>
                            <Text style={{ color: '#0E6578', fontSize: 30, fontFamily: 'Poppins_SemiBold' }}>45</Text>
                            <Text style={{ color: '#0E6578', fontSize: 12, fontFamily: 'Poppins_Regular' }}>Today's Violations</Text>
                            <Image source={require('../../assets/icons/frame7.png')} style={{ position: 'absolute',height: 40, width: '100%', borderRadius: 20, right: -20, objectFit: 'contain' }} />
                        </View>
                        <View style={{ gap: 10, flex: 3 }}>
                            <Image source={require('../../assets/icons/frame5.png')} style={{ height: 60, width: '100%', borderRadius: 20 }} />
                            <Image source={require('../../assets/icons/frame5.png')} style={{ height: 60, width: '100%', borderRadius: 20 }} />
                        </View>
                        <View style={{ position: 'absolute', right: 80 , top: 0, gap: -10 }}>
                            <Text style={{ color: '#0E6578', fontSize: 30, fontFamily: 'Poppins_SemiBold' }}>115</Text>
                            <Text style={{ color: '#0E6578', fontSize: 10, fontFamily: 'Poppins_Regular' }}>This Month Violations</Text>
                            <Image source={require('../../assets/icons/frame8.png')} style={{ position: 'absolute',height: 30, width: '100%', borderRadius: 20, right: -90, top: 5, objectFit: 'contain' }} />
                        </View>
                        <View style={{ position: 'absolute', right: 110 , top: 70, gap: -10 }}>
                            <Text style={{ color: '#0E6578', fontSize: 30, fontFamily: 'Poppins_SemiBold' }}>245</Text>
                            <Text style={{ color: '#0E6578', fontSize: 10, fontFamily: 'Poppins_Regular' }}>Total Violations</Text>
                            <Image source={require('../../assets/icons/frame9.png')} style={{ position: 'absolute',height: 30, width: '100%', borderRadius: 20, right: -105, top: 5, objectFit: 'contain' }} />
                        </View>
                    </View>
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