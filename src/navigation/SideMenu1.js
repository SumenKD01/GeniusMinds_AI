import { Dimensions, Image, ScrollView, StyleSheet, Text, View, Modal, TouchableOpacity, Linking } from "react-native";
import { } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { useSelector } from "react-redux";
import * as Animatable from 'react-native-animatable';
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export default SideMenu = () => {
    const navigation = useNavigation();
    const arrRight = require('../../assets/icons/arrow-right.png');
    const arrDown = require('../../assets/icons/arrow-down.png');
    const [logoutConfirmationMessage, setLogoutConformationMessage] = useState(false);
    const [menuItemSideIcon1, setMenuItemSideIcon1] = useState(arrRight);
    const [menuItemSideIcon2, setMenuItemSideIcon2] = useState(arrRight);
    
    const userInfo = useSelector((state) => state.user.userProfile);

    function toggleLogoutConfirmation() {
        setLogoutConformationMessage(logoutConfirmationMessage ? false : true);
    }

    function expandAndon() {
        setMenuItemSideIcon1(menuItemSideIcon1 === arrRight ? arrDown : arrRight);
    }

    function expandReport() {
        setMenuItemSideIcon2(menuItemSideIcon2 === arrRight ? arrDown : arrRight);
    }

    function goToPage(pageGiven) {
        navigation.navigate(pageGiven);
        setMenuItemSideIcon2(arrRight);
        setMenuItemSideIcon1(arrRight);
    }

    return (
        <Animatable.View animation={'slideInUp'}>
            {console.log(menuItemSideIcon1, menuItemSideIcon2)}
            <ScrollView>
                <LinearGradient colors={['#000C18', '#001E3E']}
                    style={{ flex: 1, alignItems: 'center' }}>
                    <Image style={styles.polygon1} source={require('../../assets/icons/MenuIcons/Polygon1.png')} />
                    <Image style={styles.polygon2} source={require('../../assets/icons/MenuIcons/Polygon2.png')} />
                    <Image style={styles.polygon3} source={require('../../assets/icons/MenuIcons/Polygon3.png')} />

                    <View style={{ flex: 3, width: '90%', marginBottom: 30, marginTop: 50 }}>
                        <TouchableOpacity style={styles.menuBtn} onPress={() => router.push({ pathname: '/home' })}>
                            <Image source={require('../../assets/icons/MenuIcons/Home.png')} style={styles.menuBtnIcon} />
                            <Text style={styles.menuBtnText}>Home</Text>
                        </TouchableOpacity>
                        {/* pathname: '/(tabs)/report' */}
                        <TouchableOpacity style={styles.menuBtn} onPress={() => router.push({ pathname: '/report' })} >
                            <Image source={require('../../assets/icons/MenuIcons/Report.png')} style={styles.menuBtnIcon} onPress={() => router.push({ pathname: '/MoreInfoPage/ContactUs' })} />
                            <Text style={styles.menuBtnText}>Reports</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.menuBtn} onPress={() => router.push({ pathname: '/MoreInfoPage/AboutUsPage' })}>
                            <Image source={require('../../assets/icons/MenuIcons/About.png')} style={styles.menuBtnIcon} />
                            <Text style={styles.menuBtnText}>About Us</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ flexDirection: 'row', alignItems: "center" }} onPress={() => router.push({ pathname: '/MoreInfoPage/ContactUs' })}>
                            <Image source={require('../../assets/icons/MenuIcons/Contact.png')} style={styles.menuBtnIcon} />
                            <Text style={styles.menuBtnText}>Contact Us</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={{ flex: 3, width: '90%', alignItems: "center" }} onPress={toggleLogoutConfirmation}>
                        <LinearGradient colors={['rgba(22, 71, 124, 1)', 'rgba(46, 91, 125, 1)']}
                            start={{ x: 0.0, y: 0.25 }}
                            end={{ x: 0.5, y: 1.0 }} locations={[0.5, 1]}
                            style={{ width: '90%', borderRadius: 50, padding: 8, flexDirection: "row", gap: 10, alignItems: 'center', justifyContent: "center", }}>
                            <Image source={require('../../assets/icons/MenuIcons/Logout.png')} style={{ width: 30, height: 30 }} />
                            <Text style={{ color: 'white', fontSize: 20 }}>Logout</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                    <View style={{ flex: 1, justifyContent: "center", alignItems: 'center' }}>
                        <Image source={require('../../assets/icons/MenuIcons/grundfos-logo.png')} style={{ objectFit: "contain", width: 285 }} />
                    </View>
                    {/* <TouchableOpacity onPress={() => { Linking.openURL('https://www.privacypolicies.com/live/5a4ffcb1-ca15-4be1-bd6e-882f412f6967'); }}>
                            <Text style={{ color: 'white', fontSize: 10 }}>Terms & Privacy</Text>
                        </TouchableOpacity>
                        <Text style={{ fontSize: 7, color: 'white', marginTop: 5 }}>Genius Minds 2023 from ©www.softdesigners.co.in</Text> */}
                </LinearGradient>
            </ScrollView>
            <Modal visible={logoutConfirmationMessage} transparent>
                <TouchableOpacity style={{ flex: 1, backgroundColor: 'rgba(52, 52, 52, 0.8)', alignItems: 'center' }} activeOpacity={1} onPress={toggleLogoutConfirmation}>
                    <TouchableOpacity style={{ top: '40%', backgroundColor: 'white', padding: 20, gap: 20, borderRadius: 10 }} activeOpacity={1}>
                        <Text style={{ fontSize: 14, fontFamily: 'Poppins_Regular' }}>Are you sure want to logout?</Text>
                        <View style={{ flexDirection: 'row', gap: 20, alignItems: 'center', alignSelf: 'center' }}>
                            <TouchableOpacity style={{ backgroundColor: 'rgba(85, 144, 215, 1)', paddingVertical: 5, paddingHorizontal: 10 }} onPress={() => router.push({ pathname: '/' })}>
                                <Text style={{ color: 'white', fontFamily: 'Poppins_Regular' }}>Yes</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ backgroundColor: 'rgba(85, 144, 215, 1)', paddingVertical: 5, paddingHorizontal: 10 }} onPress={toggleLogoutConfirmation}>
                                <Text style={{ color: 'white', fontFamily: 'Poppins_Regular' }}>No</Text>
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                </TouchableOpacity>
            </Modal>
        </Animatable.View >
    )
}

const styles = StyleSheet.create({
    polygon1: {
        position: "absolute",
        width: deviceWidth * 0.8,
        left: deviceWidth * 0,
        top: -deviceHeight * 0.4,
        objectFit: 'contain'
    },
    polygon2: {
        position: "absolute",
        objectFit: "contain",
        width: deviceWidth * 0.6,
        right: -deviceWidth * 0.2,
        top: deviceHeight * 0.2
    },
    polygon3: {
        position: "absolute",
        objectFit: "contain",
        width: deviceWidth * 0.6,
        left: -deviceWidth * 0.21,
        top: deviceHeight * 0.5
    },
    menuBtn: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.2)',
        alignItems: "center"
    },
    menuBtnText: {
        color: "white",
        // color: '#DCF2FF',
        padding: 20,
        fontSize: 20
    },
    menuBtnIcon: {
        width: 40,
        height: 40
    }
});