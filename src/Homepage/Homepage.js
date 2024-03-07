import { Dimensions, Image, StyleSheet, Text, View, Animated, FlatList, Modal, TouchableOpacity, Linking, ScrollView } from 'react-native';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useRef, useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient'; 7
import * as Animatable from 'react-native-animatable';
import MaskedView from '@react-native-masked-view/masked-view';
import { Fonts } from '../utils/Fonts';
import { Link, router } from "expo-router";
import ProgressGraph from '../components/Graphs/ProgressGraph';

const width = Dimensions.get('window').width;

export default Homepage = () => {
    const apiGot = ""
    // const [recentInspectionData, setRecentInspectionData] = useState([]);
    const recentInspectionData = require('../../assets/JSON/recentInspections.json');
    const [fontLoaded, setFontLoaded] = useState(false);
    const [showImageView, setShowImageView] = useState(false);
    const [imageToShow, setImageToShow] = useState();
    const [imageIndex, setImageIndex] = useState(0);

    console.log("Data from JSON", recentInspectionData);

    const showImage = (data) => {
        setShowImageView(true);
        console.log("data Got", data.Inspection_No);
        let imageFoundAtIndex = recentInspectionData.findIndex(
            (eachData, index) => (eachData.Inspection_No === data.Inspection_No)
        );
        setImageIndex(imageFoundAtIndex);
        setImageToShow(recentInspectionData[imageFoundAtIndex].Photo);
    }

    let count = 1;

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
        APICall()
    }, []);

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#000C18', '#001E3E']}
                style={StyleSheet.absoluteFill}
                start={{ x: 2, y: -3 }}
                end={{ x: -1, y: 0.5 }}
            >
                <ScrollView contentContainerStyle={styles.HomeContent}>
                    {/* <Animatable.Image animation={'slideInDown'} direction="alternate" duration={10000} iterationCount={1} source={require('../../assets/icons/Graph.png')} style={[styles.backIcons, { top: '40%', right: '20%' }]} />
                    <Animatable.Image animation={'slideInDown'} direction="alternate" duration={10000} iterationCount={1} source={require('../../assets/icons/Day View.png')} style={[styles.backIcons, { left: '10%', bottom: '30%' }]} />
                    <Animatable.Image animation={'slideInDown'} direction="alternate" duration={10000} iterationCount={1} source={require('../../assets/icons/Video Conference.png')} style={[styles.backIcons, { right: -12, bottom: '20%' }]} />
                    <Animatable.Image animation={'slideInDown'} direction="alternate" duration={10000} iterationCount={1} source={require('../../assets/icons/Bar Chart.png')} style={[styles.backIcons, { right: -12, top: '20%' }]} />
                    <Animatable.Image animation={'slideInDown'} direction="alternate" duration={10000} iterationCount={1} source={require('../../assets/icons/Slice.png')} style={[styles.backIcons, { left: -20, top: '20%' }]} /> */}
                    <Animatable.Image animation={'slideInDown'} direction="alternate" duration={10000} iterationCount={1} source={require('../../assets/icons/ellipseBack.png')} style={{ right: -150, top: '20%', width: 400, height: 400, position: 'absolute', objectFit: 'contain' }} />
                    <View style={{ flexDirection: 'row', paddingHorizontal: 10, gap: 10, justifyContent: 'center' }}>
                        <View style={{ flex: 5, gap: -10 }}>
                            <Image source={require('../../assets/icons/frame4.png')} style={{ position: 'absolute', width: '100%', height: 150, borderRadius: 20 }} />
                            <Text style={{ color: '#0E6578', fontSize: 50, fontFamily: 'Poppins_SemiBold', paddingLeft: 10, top: 20 }}>45</Text>
                            <Text style={{ color: '#0A3944', fontSize: 15, fontFamily: 'Poppins_Regular', paddingLeft: 10, top: 20 }}>Today's Violations</Text>
                            <Image source={require('../../assets/icons/frame7.png')} style={{ position: 'absolute', height: 35, width: '100%', borderRadius: 20, right: -40, top: 10, objectFit: 'contain' }} />
                        </View>
                        <View style={{ flex: 6, gap: 16 }}>
                            <View style={{ gap: -10, paddingTop: 10 }}>
                                <Image source={require('../../assets/icons/frame5.png')} style={{ position: 'absolute', flex: 1, height: 70, width: '100%', borderRadius: 20 }} />
                                <Text style={{ color: '#0E6578', fontSize: 25, fontFamily: 'Poppins_SemiBold', paddingLeft: 15 }}>115</Text>
                                <Text style={{ color: '#0A3944', fontSize: 12.5, fontFamily: 'Poppins_Regular', paddingLeft: 15 }}>This Month Violations</Text>
                                <Image source={require('../../assets/icons/frame8.png')} style={{ position: 'absolute', height: 30, borderRadius: 20, width: '100%', right: -55, top: 5, objectFit: 'contain' }} />
                            </View>
                            <View style={{ gap: -10, paddingTop: 10 }}>
                                <Image source={require('../../assets/icons/frame5.png')} style={{ position: 'absolute', flex: 1, height: 70, width: '100%', borderRadius: 20 }} />
                                <Text style={{ color: '#0E6578', fontSize: 25, fontFamily: 'Poppins_SemiBold', paddingLeft: 15 }}>245</Text>
                                <Text style={{ color: '#0A3944', fontSize: 12.5, fontFamily: 'Poppins_Regular', paddingLeft: 15 }}>Total Violations</Text>
                                <Image source={require('../../assets/icons/frame9.png')} style={{ position: 'absolute', height: 30, width: '100%', borderRadius: 20, right: -55, top: 5, objectFit: 'contain' }} />
                            </View>
                        </View>
                    </View>
                    <TouchableOpacity onPress={() => router.push({ pathname: '/(tabs)/report' })} style={{ width: '100%', marginTop: 10 }} >
                        <LinearGradient colors={['#30D2F6', 'rgb(52, 170, 113)']} start={{ x: 1, y: 1 }} end={{ x: 0, y: 0 }} style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 12, paddingHorizontal: 20, borderRadius: 10, marginHorizontal: 10, marginVertical: 20 }}>
                            <View>
                                <Text style={{ color: 'white', fontSize: 16, fontFamily: Fonts.SignikaNegative_SemiBold }}>Violation Report</Text>
                                <Text style={{ color: 'white', fontSize: 12, opacity: 0.5, fontFamily: Fonts.SignikaNegative_Regular }}>List of all Violations</Text>
                            </View>
                            <View>
                                <Image  source={{
          uri:  'https://androidapi220211216164156.azurewebsites.net/api/Approval/DownloadFile?filename=AutoLine.png',
        }} style={{ width: 35, height: 35 }} />
                            </View>
                        </LinearGradient>
                    </TouchableOpacity>
                    <ProgressGraph />
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', paddingHorizontal: 10 }}>
                        <Text style={{ color: 'white', fontFamily: 'Poppins', fontSize: 20 }}>Recent Violations</Text>
                        <Image source={require('../../assets/icons/rightArrow.png')} style={{ width: 40, height: 40, borderRadius: 10 }} />
                    </View>
                    <FlatList
                        contentContainerStyle={styles.WorkPermitList}
                        data={recentInspectionData}
                        horizontal
                        renderItem={(item, index = count) => {
                            console.log(item.item.Photo, count++);
                            return <TouchableOpacity onPress={() => showImage(item.item)}>
                                <Image source={{ uri: item.item.Photo }} style={{ width: 125, height: 200, borderRadius: 10 }} />
                                <Text style={{ color: 'white', position: 'absolute', bottom: 40, fontSize: 12, fontFamily: Fonts.SignikaNegative_Medium, width: '100%', backgroundColor: 'rgba(52, 52, 52, 0.8)', textAlign: 'center', borderBottomLeftRadius: 10, borderBottomRightRadius: 10 }}>{item.item.Inspection_No}</Text>
                            </TouchableOpacity>
                        }
                        }
                    />
                    <Modal style={{ flex: 1, width: '100%' }} visible={showImageView} onRequestClose={() => setShowImageView(false)}>
                        {console.log("In Modal", recentInspectionData[imageIndex])}
                        <Image source={{ uri: recentInspectionData[imageIndex].Photo ? recentInspectionData[imageIndex].Photo : 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png' }} style={{ width: '100%', height: '100%', zIndex: 0, position: 'absolute' }} />
                        <View style={{ zIndex: 4, flexDirection: 'row', justifyContent: 'space-between', gap: 5, padding: 5, bottom: 20 }}>
                            {recentInspectionData.map((eachItem, index) => {
                                if (index === imageIndex) {
                                    return <Text style={{ borderBottomWidth: 2, borderColor: 'white', flex: 1 }}> </Text>
                                } else {
                                    return <Text style={{ borderBottomWidth: 2, borderColor: 'white', flex: 1, opacity: 0.2 }}> </Text>
                                }
                            })}
                        </View>
                        <View style={{ position: 'absolute', padding: 15, bottom: 0, backgroundColor: 'rgba(52, 52, 52, 0.5)', width: '100%' }}>
                            <Text style={{ fontFamily: Fonts.SignikaNegative_Medium, color: 'white' }}>{recentInspectionData[imageIndex].Inspection_No}</Text>
                            <Text style={{ fontFamily: Fonts.SignikaNegative_Medium, color: 'white' }}>{recentInspectionData[imageIndex].Result}</Text>
                            <Text style={{ fontFamily: Fonts.SignikaNegative_Medium, color: 'white' }}>{recentInspectionData[imageIndex].Stage}</Text>
                            <Text style={{ fontFamily: Fonts.SignikaNegative_Medium, color: 'white' }}>{recentInspectionData[imageIndex].Supervisor}</Text>
                            <Text style={{ fontFamily: Fonts.SignikaNegative_Medium, color: 'white' }}>{recentInspectionData[imageIndex]["Time_&_Date"]}</Text>
                        </View>
                        <View>
                            <View style={{ flexDirection: 'row' }}>
                                <TouchableOpacity style={{ width: '50%', height: 800, flex: 1, justifyContent: 'center', alignItems: 'flex-start' }} onPress={() => { imageIndex > 0 ? setImageIndex(imageIndex - 1) : console.log('no element') }}>
                                    {imageIndex > 0 &&
                                        <TouchableOpacity onPress={() => { setImageIndex(imageIndex - 1) }} style={{ padding: 10, bottom: 75 }}>
                                            <Image source={require('../../assets/icons/BackTo.png')} style={{ width: 50, height: 50 }} />
                                        </TouchableOpacity>
                                    }
                                </TouchableOpacity>
                                <TouchableOpacity style={{ width: '50%', height: '100%', justifyContent: 'center', alignItems: 'flex-end' }} onPress={() => { imageIndex < (recentInspectionData.length - 1) ? setImageIndex(imageIndex + 1) : console.log('no element') }}>
                                    {imageIndex < (recentInspectionData.length - 1) &&
                                        <TouchableOpacity onPress={() => { setImageIndex(imageIndex + 1) }} style={{ padding: 10, bottom: 75 }}>
                                            <Image source={require('../../assets/icons/NextPage.png')} style={{ width: 50, height: 50 }} />
                                        </TouchableOpacity>
                                    }
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                </ScrollView>
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
    HomeContent: {
        alignItems: 'center',
        paddingTop: '10%',
        paddingBottom: 50
    },
    backIcons: {
        width: 80,
        height: 80,
        position: 'absolute',
        objectFit: 'contain'
    },
    WorkPermitList: {
        gap: 7,
        height: 240,
        paddingLeft: 10
    },
});