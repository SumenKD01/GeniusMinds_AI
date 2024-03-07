import { Text, View, Image, StyleSheet, Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export default Contacts = () => {
    return (
        <LinearGradient colors={['#000C18', '#001E3E']}
            style={{ flex: 1, alignItems: 'center' }}>
            <View style={{ display: 'flex', alignItems: 'center' }}>
                <Image style={{ position: "absolute", top: -210, width: deviceWidth, objectFit: "contain" }} source={require('../../assets/icons/topbg.png')} />
                <Text style={{ color: 'white', fontSize: 24, marginTop: 50, marginBottom: 20 }}>Contact us</Text>  
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
    }
});