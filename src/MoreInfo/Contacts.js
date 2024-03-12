import { Text, View, Image, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

const pathName = '../../assets/icons/';

export default Contacts = () => {
    return (
        <LinearGradient colors={['#000C18', '#001E3E']}
            style={{ flex: 1, alignItems: 'center' }}>
            <Image style={{ position: "absolute", top: -deviceHeight * 0.75 , width: deviceWidth * 0.90, left: 0, objectFit: "contain" }} source={require('../../assets/icons/ContactbackImage.png')} />
            <Image style={{ position: "absolute", bottom: -deviceHeight * 0.60, right: 0 , width: deviceWidth*0.90, objectFit: "contain" }} source={require('../../assets/icons/ContactUsBackImage.png')} />
            <View style={{ display: 'flex', alignItems: 'center' }}>
                <Text style={{ color: 'white', fontSize: 30, marginTop: 50, marginBottom: 20, fontFamily: 'SignikaNegative-Bold' }}>Contact us</Text>
                <Image style={styles.mailimg} source={require('../../assets/icons/emailIcon.png')} />
            </View>

            <View style={styles.contactCards}>
                <LinearGradient colors={['rgba(38, 81, 81, 0.5)', 'rgba(184, 184, 184, 0.3)']}
                    start={{ x: 0.0, y: 0.25 }}
                    end={{ x: 0.5, y: 1.0 }} locations={[0.5, 1]}
                    style={styles.linearGradient}>

                    <View style={{ flex: 1 }}>
                        <Image style={styles.cardIcon} source={require('../../assets/icons/callicon.png')} />
                    </View>

                    <View style={{ flex: 4 }} >
                        <Text style={styles.textCard}>Call us</Text>
                        <Text style={styles.textCard}>+919667128978</Text>
                    </View>

                </LinearGradient>
                <LinearGradient colors={['rgba(38, 81, 81, 0.5)', 'rgba(184, 184, 184, 0.3)']}
                    start={{ x: 0.0, y: 0.25 }}
                    end={{ x: 0.5, y: 1.0 }} locations={[0.5, 1]}
                    style={styles.linearGradient}
                >
                    <View style={{ flex: 1 }}>
                        <Image style={styles.cardIcon} source={require('../../assets/icons/mailIcon.png')} />
                    </View>
                    <View style={{ flex: 4 }}>
                        <Text style={styles.textCard}>Mail us</Text>
                        <Text style={styles.textCard}>enquiry@softdesigners.com</Text>
                    </View>
                </LinearGradient>
                <LinearGradient colors={['rgba(38, 81, 81, 0.5)', 'rgba(184, 184, 184, 0.3)']}
                    start={{ x: 0.0, y: 0.25 }}
                    end={{ x: 0.5, y: 1.0 }} locations={[0.5, 1]}
                    style={styles.linearGradient}>
                    <View style={{ flex: 1, justifyContent: 'center' }}>
                        <Image style={styles.cardIcon} source={require('../../assets/icons/locationIcon.png')} />
                    </View>
                    <View style={{ flex: 4 }}>
                        <Text style={styles.textCard}>Address</Text>
                        <Text style={styles.textCard}>No.234/146, Thalaghattapura, Kanakapura main road, Bangalore, Karnataka, India 560109</Text>
                    </View>
                </LinearGradient>
            </View>
            <View style={{ marginTop: 50 }}>
                <Text style={{ fontFamily: 'Poppins_Regular', left: 45, padding: 10, color: 'white' }}>Follow us on:</Text>
                <View style={styles.icons}>
                    <TouchableOpacity
                        onPress={() => {
                            Linking.openURL('https://www.softdesigners.co.in/');
                        }}
                        style={styles.icon}
                    >
                        <Image
                            style={styles.socialIcons}
                            source={require(pathName + 'webCircle.png')}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            Linking.openURL(
                                'https://www.linkedin.com/company/soft-designers/'
                            );
                        }}
                        style={styles.icon}
                    >
                        <Image
                            style={styles.socialIcons}
                            source={require(pathName + 'linkedinCircle.png')}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            Linking.openURL('https://twitter.com/Soft_Designers');
                        }}
                        style={styles.icon}
                    >
                        <Image
                            style={styles.socialIcons}
                            source={require(pathName + 'twitterCircle.png')}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.icon}
                        onPress={() => {
                            Linking.openURL(
                                'https://www.facebook.com/profile.php?id=100070417177410'
                            );
                        }}
                    >
                        <Image
                            style={styles.socialIcons}
                            source={require(pathName + 'facebookCircle.png')}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    mailimg: {
        width: 150,
        height: 150
    },
    contactCards: {
        marginTop: 30,
        width: deviceWidth - 20,
        gap: 10
    },
    contactCard: {
        padding: 10,
        backgroundColor: '#287B71',
        color: 'white',
        borderWidth: 2,
        borderColor: 'rgba( 187, 187, 187 , 0.5)'
    },
    textCard: {
        color: 'white'
    },
    linearGradient: {
        flexDirection: 'row',
        padding: 10,
        color: 'white',
        borderWidth: 2,
        borderColor: 'rgba(108, 153, 134, 1)',
        borderRadius: 10,
    },
    socialIcons: {
        width: 30,
        height: 30
    },
    icons: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 25
    },
});