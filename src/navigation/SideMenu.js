import { Dimensions, Image, ScrollView, StyleSheet } from "react-native";
import { Text, View, Modal, TouchableOpacity,Linking } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Avatar } from "react-native-paper";
import * as Animatable from 'react-native-animatable';
import { Link,router } from "expo-router";

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

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
            <ScrollView style={styles.container}>
                {userInfo.plantName.includes('Grundfos') &&
                    <View style={{ alignItems: 'center', justifyContent: 'center', paddingTop: 10 }}>
                        <Image source={{ uri: 'https://coltarapumpsandseals.com.au/wp-content/uploads/2017/12/grundfos-logo.png' }} style={{ height: 50, width: 200 }} />
                    </View>
                }
                {userInfo.plantName.includes('Soft Designers1') &&
                    <View style={{ alignItems: 'center', justifyContent: 'center', paddingTop: 10 }}>
                        <Image source={{ uri: 'https://www.softdesigners.co.in/wp-content/uploads/2022/05/Softdesigners-logo.png' }} style={{ height: 80, width: 240, objectFit: 'contain' }} />
                    </View>
                }
                <TouchableOpacity style={styles.userInfoSection} onPress={() => goToPage('Profile')}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View style={{ flex: 1, padding: 10 }}>
                            <Avatar.Image
                                source={require('../../assets/icons/userProfile.gif')
                                }
                                size={70}
                            />
                        </View>
                        <View style={{ flex: 4, padding: 10 }}>
                            <Text style={styles.title}>{userInfo.fullName}</Text>
                            <Text style={styles.caption}>{userInfo.email}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
                {/* <TouchableOpacity style={[styles.menuButtons, { backgroundColor: (menuItemSideIcon1 === arrDown) ? '#489CFF' : 'rgba(141, 194, 255, 0.30)' }]} onPress={expandAndon}>
                    <Text style={[styles.menuButtonText]}>Andon</Text>
                    <Image source={menuItemSideIcon1} style={{ width: 20, height: 20, right: 20 }} />
                </TouchableOpacity>
                {(menuItemSideIcon1 === arrDown) &&
                    <View>
                        <TouchableOpacity style={styles.subMenuButtons} onPress={() => goToPage('AcknowledgeIssue')}>
                            <Text style={styles.subMenuButtonText}>Acknowledge Issue</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.subMenuButtons} onPress={() => goToPage('CloseIssue')}>
                            <Text style={styles.subMenuButtonText}>Close Issue</Text>
                        </TouchableOpacity>
                    </View>
                }
                <TouchableOpacity style={[styles.menuButtons, { backgroundColor: (menuItemSideIcon2 === arrDown) ? '#489CFF' : 'rgba(141, 194, 255, 0.30)' }]} onPress={expandReport}>
                    <Text style={[styles.menuButtonText]}>Reports</Text>
                    <Image source={menuItemSideIcon2} style={{ width: 20, height: 20, right: 20 }} />
                </TouchableOpacity>
                {(menuItemSideIcon2 === arrDown) &&
                    <View>
                        <TouchableOpacity style={styles.subMenuButtons} onPress={() => goToPage('Issues')}>
                            <Text style={styles.subMenuButtonText}>Issue Report</Text>
                        </TouchableOpacity>
                    </View>
                }
                  <TouchableOpacity style={styles.menuButtons} onPress={() => goToPage('ChatBot')} >
                    <Text style={styles.menuButtonText}>Chat Bot</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuButtons} onPress={() => goToPage('ChatBotHead')} >
                    <Text style={styles.menuButtonText}>Chat Bot Main</Text>
                </TouchableOpacity> */}
                <TouchableOpacity style={styles.menuButtons} onPress={() =>  router.push({ pathname: '/MoreInfoPage/AboutUs' })}>
                    <Text style={styles.menuButtonText}>About Us</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuButtons} onPress={() => router.push({ pathname: '/MoreInfoPage/AboutUs' })}>
                    <Text style={styles.menuButtonText}>Contact Us</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuButtons} onPress={toggleLogoutConfirmation}>
                    <Text style={styles.menuButtonText}>Logout</Text>
                </TouchableOpacity>
                <View style={styles.footer}>
                    <View style={{ alignItems: 'center', marginTop: '10%', marginBottom: 50, gap: 20 }}>
                        <View>
                            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                                <Text style={{ fontSize: 30, fontFamily: 'Poppins', color: '#003571' }}>geniusminds.ai</Text>
                                <Text style={{ fontSize: 10, fontFamily: 'Poppins_SemiBold', alignSelf: 'flex-end', bottom: 13, marginLeft: 5, color: '#003571' }}>v1.0.0</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={{ fontSize: 7, fontFamily: 'Poppins_Regular' }}>Developed by  </Text>
                                <Image
                                    source={{ uri: 'https://cdn-hipjp.nitrocdn.com/UVqClfNzszdreQcdMkVmNGxHoABDKrFo/assets/static/optimized/wp-content/uploads/2022/05/f283e8cf3d1b2793cdcdf6b4f2102c76.Softdesigners-logo.png' }}
                                    style={{
                                        height: 30,
                                        width: 80,
                                        objectFit: 'contain'
                                    }}
                                />
                            </View>
                        </View>
                    </View>
                    <TouchableOpacity onPress={() => {
                                Linking.openURL('https://www.privacypolicies.com/live/5a4ffcb1-ca15-4be1-bd6e-882f412f6967');
                            }}>                                
                        <Text style={{ color: 'blue', fontSize: 10 }}>Terms & Privacy</Text>
                
                    </TouchableOpacity>
                    <Text style={{ fontSize: 10 }}>Efficio 2023 from ©www.softdesigners.co.in</Text>
                </View>
            </ScrollView>
            <Modal visible={logoutConfirmationMessage} transparent>
                <TouchableOpacity style={{ flex: 1, backgroundColor: 'rgba(52, 52, 52, 0.8)', alignItems: 'center' }} activeOpacity={1} onPress={toggleLogoutConfirmation}>
                    <TouchableOpacity style={{ top: '40%', backgroundColor: 'white', padding: 20, gap: 20, borderRadius: 10 }} activeOpacity={1}>
                        <Text style={{ fontSize: 14, fontFamily: 'Poppins_Regular' }}>Are you sure want to logout?</Text>
                        <View style={{ flexDirection: 'row', gap: 20, alignItems: 'center', alignSelf: 'center' }}>
                            <TouchableOpacity style={{ backgroundColor: 'rgba(85, 144, 215, 1)', paddingVertical: 5, paddingHorizontal: 10 }} onPress={() =>   router.push({ pathname: '/' })}>
                                <Text style={{ color: 'white', fontFamily: 'Poppins_Regular' }}>Yes</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ backgroundColor: 'rgba(85, 144, 215, 1)', paddingVertical: 5, paddingHorizontal: 10 }} onPress={toggleLogoutConfirmation}>
                                <Text style={{ color: 'white', fontFamily: 'Poppins_Regular' }}>No</Text>
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                </TouchableOpacity>
            </Modal>
        </Animatable.View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: height,
        backgroundColor: '#CFEBFF',
    },
    userInfoSection: {
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        borderRadius: 10,
        margin: 10,
    },
    title: {
        fontSize: 16,
        fontFamily: 'Poppins_SemiBold',
        color: 'white'
    },
    caption: {
        fontSize: 10,
        fontFamily: 'Poppins_Regular',
        color: 'white'
    },
    mainButtons: {
        padding: 5,
        heigth: 60,
        backgroundColor: '#003571',
        paddingHorizontal: 10,
        borderRadius: 5
    },
    mainButtonText: {
        color: 'white',
        fontFamily: 'Poppins',
        fontSize: 14
    },
    menuButtons: {
        backgroundColor: 'rgba(141, 194, 255, 0.30)',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        height: 50,
        borderBottomWidth: 0.2
    },
    menuButtonText: {
        color: 'black',
        fontSize: 16,
        fontFamily: 'Poppins_SemiBold',
        left: 25
    },
    subMenuButtons: {
        justifyContent: 'center',
        height: 40
    },
    subMenuButtonText: {
        fontSize: 14,
        fontFamily: 'Poppins_Regular',
        left: 40
    },
    footer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 30,
        paddingBottom: 50
    }
});