import { Dimensions, Image, StyleSheet, Text, View, Animated, FlatList, Modal, TouchableOpacity, Linking, ScrollView } from 'react-native';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useRef, useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient'; 7
import * as Animatable from 'react-native-animatable';
import MaskedView from '@react-native-masked-view/masked-view';
import { Fonts } from '../utils/Fonts';
import { Link, router } from "expo-router";
import ProgressGraph from './ProgressGraph';

const width = Dimensions.get('window').width;

export default Homepage = () => {
    const apiGot = "https://androidapi220230605081325.azurewebsites.net/api/approval/Getviolation?PlantName=SEIPL,BLR";
    const downloadLink = "https://androidapi220211216164156.azurewebsites.net/api/Approval/DownloadFile?filename=";
    const extraImage = 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png';
    const [recentInspectionDataFromAPI, setRecentInspectionDataFromAPI] = useState([]);
    const recentInspectionData = require('../../assets/JSON/recentInspections.json');
    const [dashBoardData, setDashBoardData] = useState([]);
    const [apiError, setAPIError] = useState(false);
    const [fontLoaded, setFontLoaded] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [showImageView, setShowImageView] = useState(false);
    const [imageToShow, setImageToShow] = useState();
    const [imageIndex, setImageIndex] = useState(0);
    const jsonDataToPassInApi = {
        PlantName: 'SEIPL,BLR',
        FromDate: fromdate,
        ToDate: todate,
        OffsetRecords: '0',
        NextRecords: '1000',
    };

    const currentDate = new Date();
    const todate = getDateForAPI(currentDate, 'to');
    const fromdate = getDateForAPI(currentDate, 'from');


    function getDateForAPI(date, opt) {
        if (opt === 'from') {
            date.setFullYear(date.getFullYear() - 3);
        }
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${year}-${month}-${day}`;
    }

    function resultReport(dataGot, apiError) {
        if (apiError) {
            setIsLoading(false);
            console.log("We have error guys!");
        } else {
            if (dataGot.length) {
                dataGot = dataGot.reverse();
                setRecentInspectionDataFromAPI(dataGot.slice(0, 20));
                setIsLoading(false);
            } else {
                setIsLoading(false);
            }
        }
    }

    const showImage = (data) => {
        setShowImageView(true);
        let imageFoundAtIndex = recentInspectionDataFromAPI.findIndex(
            (eachData, index) => (eachData.fileName === data.fileName)
        );
        setImageIndex(imageFoundAtIndex);
        setImageToShow(recentInspectionDataFromAPI[imageFoundAtIndex].fileName);
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
        APICall(apiGot, jsonDataToPassInApi, resultReport, 'getReport');
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

    const dashBoardApi = "https://androidapi220230605081325.azurewebsites.net/api/approval/GetViolationCnt?PlantName=SEIPL,BLR"
    const dashBoardJsonDataToPassInApi = {
        PlantName: 'SEIPL,BLR',
    };

    function dashBoardApiResultReport(dataGot, apiError) {
        if (apiError) {
            setIsLoading(false);
            setAPIError(true);
        } else {
            if (dataGot) {
                setDashBoardData(dataGot);
                setIsLoading(false);
            } else {
                setIsLoading(false);
            }
        }
    }
    useEffect(() => {
        APICall(dashBoardApi, dashBoardJsonDataToPassInApi, dashBoardApiResultReport, 'getReportForChart');
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
                    <Animatable.Image animation={'slideInDown'} direction="alternate" duration={10000} iterationCount={1} source={require('../../assets/icons/ellipseBack.png')} style={{ right: -150, top: '20%', width: 400, height: 400, position: 'absolute', objectFit: 'contain' }} />
                    <View style={{ flexDirection: 'row', paddingHorizontal: 10, gap: 10, justifyContent: 'center', marginBottom: 50 }}>
                        <View style={{ flex: 5, gap: -10 }}>
                            <Image source={require('../../assets/icons/frame4.png')} style={{ position: 'absolute', width: '100%', height: 150, borderRadius: 20 }} />
                            <Text style={{ color: '#0E6578', fontSize: 50, fontFamily: 'Poppins_SemiBold', paddingLeft: 10, top: 20 }}>{dashBoardData.dailyCnt ? dashBoardData.dailyCnt : 0}</Text>
                            <Text style={{ color: '#0A3944', fontSize: 15, fontFamily: 'Poppins_Regular', paddingLeft: 10, top: 20 }}>Today's Violations</Text>
                            <Image source={require('../../assets/icons/frame7.png')} style={{ position: 'absolute', height: 35, width: '100%', borderRadius: 20, right: -40, top: 10, objectFit: 'contain' }} />
                        </View>
                        <View style={{ flex: 6, gap: 16 }}>
                            <View style={{ gap: -10, paddingTop: 10 }}>
                                <Image source={require('../../assets/icons/frame5.png')} style={{ position: 'absolute', flex: 1, height: 70, width: '100%', borderRadius: 20 }} />
                                <Text style={{ color: '#0E6578', fontSize: 25, fontFamily: 'Poppins_SemiBold', paddingLeft: 15 }}>{dashBoardData.monthCnt ? dashBoardData.monthCnt : 0}</Text>
                                <Text style={{ color: '#0A3944', fontSize: 12.5, fontFamily: 'Poppins_Regular', paddingLeft: 15 }}>This Month Violations</Text>
                                <Image source={require('../../assets/icons/frame8.png')} style={{ position: 'absolute', height: 30, borderRadius: 20, width: '100%', right: -55, top: 5, objectFit: 'contain' }} />
                            </View>
                            <View style={{ gap: -10, paddingTop: 10 }}>
                                <Image source={require('../../assets/icons/frame5.png')} style={{ position: 'absolute', flex: 1, height: 70, width: '100%', borderRadius: 20 }} />
                                <Text style={{ color: '#0E6578', fontSize: 25, fontFamily: 'Poppins_SemiBold', paddingLeft: 15 }}>{dashBoardData.dailyCnt ? dashBoardData.dailyCnt : 0}</Text>
                                <Text style={{ color: '#0A3944', fontSize: 12.5, fontFamily: 'Poppins_Regular', paddingLeft: 15 }}>Total Violations</Text>
                                <Image source={require('../../assets/icons/frame9.png')} style={{ position: 'absolute', height: 30, width: '100%', borderRadius: 20, right: -55, top: 5, objectFit: 'contain' }} />
                            </View>
                        </View>
                    </View>
                    <ProgressGraph />
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', paddingHorizontal: 10, marginTop: 30, marginBottom: 10 }}>
                        <Text style={{ color: 'rgba(244,209,96,1)', fontFamily: 'Poppins', fontSize: 20 }}>Recent Violations</Text>
                        <Image source={require('../../assets/icons/right-arrow-yellow.png')} style={{ width: 40, height: 40, borderRadius: 10 }} />
                    </View>
                    {recentInspectionDataFromAPI.length ?
                        <FlatList
                            contentContainerStyle={styles.WorkPermitList}
                            data={recentInspectionDataFromAPI}
                            horizontal
                            renderItem={(item, index = count) => {
                                return <TouchableOpacity onPress={() => showImage(item.item)} key={index + 1}>
                                    <Image source={{
                                        uri: downloadLink + item.item.fileName
                                    }} style={{ width: 300, height: 200, borderWidth: 0.4, borderColor: '#F4D160', borderRadius: 10 }} />

                                    <Text style={{ color: 'black', position: 'absolute', bottom: 40, fontSize: 12, fontFamily: Fonts.SignikaNegative_Medium, width: '90%', backgroundColor: '#F4D160', alignSelf: 'center', textAlign: 'center', borderTopLeftRadius: 10, borderTopRightRadius: 10 }}>{item.item.cam_Serialno}</Text>
                                </TouchableOpacity>
                            }
                            }
                        /> :
                        <Text>This is the Recent Inspection Data.</Text>
                    }
                    <Modal style={{ flex: 1, width: '100%' }} visible={showImageView} onRequestClose={() => setShowImageView(false)}>
                        {recentInspectionDataFromAPI[imageIndex] ?
                            <View style={{ backgroundColor: 'black' }}>
                                <Image source={{ uri: (recentInspectionDataFromAPI[imageIndex].fileName) ? (downloadLink + recentInspectionDataFromAPI[imageIndex].fileName) : extraImage }} style={{ width: '100%', height: '100%', zIndex: 0, position: 'absolute', objectFit: 'contain', bottom: 70 }} />
                                <View style={{ position: 'absolute', padding: 15, bottom: 0, backgroundColor: 'rgba(52, 52, 52, 0.5)', width: '100%' }}>
                                    <Text style={{ fontFamily: Fonts.SignikaNegative_Medium, color: 'white' }}>{recentInspectionDataFromAPI[imageIndex].cam_Serialno}</Text>
                                    <Text style={{ fontFamily: Fonts.SignikaNegative_Medium, color: 'white' }}>{recentInspectionDataFromAPI[imageIndex].fileName}</Text>
                                    <Text style={{ fontFamily: Fonts.SignikaNegative_Medium, color: 'white' }}>{recentInspectionDataFromAPI[imageIndex].violations}</Text>
                                    <Text style={{ fontFamily: Fonts.SignikaNegative_Medium, color: 'white' }}>{recentInspectionDataFromAPI[imageIndex].serial_no}</Text>
                                    <Text style={{ fontFamily: Fonts.SignikaNegative_Medium, color: 'white' }}>{recentInspectionDataFromAPI[imageIndex]["creation_Datetime"]}</Text>
                                </View>
                                <TouchableOpacity style={{ position: 'absolute', right: 10, backgroundColor: 'rgba(252,252,252,0.5)', padding: 5, borderRadius: 10, bottom: '20%', zIndex: 2 }}
                                    onPress={() => {
                                        router.push(
                                            {
                                                pathname: '/MoreInfoPage/ZoomableImage',
                                                params: { imageLink: downloadLink + recentInspectionDataFromAPI[imageIndex].fileName }
                                            }
                                        );
                                        setShowImageView(false);
                                    }} >
                                    <Image source={require('../../assets/icons/zoom.png')} style={{ width: 30, height: 30 }} />
                                </TouchableOpacity>
                                <View style={{ flexDirection: 'row' }}>
                                    <TouchableOpacity style={{ width: '50%', height: 800, flex: 1, justifyContent: 'center', alignItems: 'flex-start' }} onPress={() => { imageIndex > 0 ? setImageIndex(imageIndex - 1) : console.log('no element') }}>
                                        {imageIndex > 0 &&
                                            <TouchableOpacity onPress={() => { setImageIndex(imageIndex - 1) }} style={{ padding: 10, bottom: 75 }}>
                                                <Image source={require('../../assets/icons/BackTo.png')} style={{ width: 50, height: 50 }} />
                                            </TouchableOpacity>
                                        }
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{ width: '50%', height: '100%', justifyContent: 'center', alignItems: 'flex-end' }} onPress={() => { imageIndex < (recentInspectionData.length - 2) ? setImageIndex(imageIndex + 1) : console.log('no element') }}>
                                        {imageIndex < (recentInspectionData.length - 2) &&
                                            <TouchableOpacity onPress={() => { setImageIndex(imageIndex + 1) }} style={{ padding: 10, bottom: 75 }}>
                                                <Image source={require('../../assets/icons/NextPage.png')} style={{ width: 50, height: 50 }} />
                                            </TouchableOpacity>
                                        }
                                    </TouchableOpacity>
                                </View>
                            </View>
                            :
                            <Text>This is the Recent Inspection Data.</Text>
                        }
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
        gap: 20,
        height: 240,
        paddingLeft: 10,
        paddingRight: 20
    },
});