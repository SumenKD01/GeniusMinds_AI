import {
    View,
    Text,
    TouchableOpacity,
    Image,
    StyleSheet,
    Linking,
    ScrollView,
} from 'react-native';
import React from 'react';

export default AboutUs = () => {
    return (
        <View style={Styles.container}>
            <ScrollView>
                <View style={{ marginTop: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={Styles.HeaderText}>About Us</Text>
                </View>
                <View style={{ marginTop: 30 }}>
                    <Text style={Styles.text}>
                        Soft Designers are the leaders in Environmental, Health and Safety
                        Solutions, Artificial Intelligence, Industry 4.0 and Lean
                        Manufacturing Solutions in pan India and US. We had started our
                        wonderful journey from 2014 in Bangalore (Bengaluru, Karnataka, India). The Team’s expertise in
                        Electrical, Electronics & Software programming helps the customers
                        to make us the No.1 choice for all the Projects.
                    </Text>

                    <Text style={[Styles.text, { marginTop: 15 }]}>
                        We offer end-to-end Turn Key solutions to Manufacturing companies to
                        improve their manufacturing productivity in real time.
                    </Text>
                </View>
                <View style={{ alignItems: 'center', marginTop: '15%', marginBottom: 20, gap: 20 }}>
                    <View>
                        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                            <Text style={{ fontSize: 30, fontFamily: 'Poppins', color: "#003571" }}>geniusminds.ai</Text>
                            <Text style={{ fontSize: 10, fontFamily: 'Poppins_SemiBold', alignSelf: 'flex-end', bottom: 13, marginLeft: 5, color: "#003571" }}>v1.0.1</Text>
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
                <View style={Styles.footer}>
                    <Text style={{ fontSize: 10 }}>Genius Minds 2024 from © www.softdesigners.co.in</Text>
                </View>
            </ScrollView>
        </View>
    );
};

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#CFEBFF',
    },
    text: {
        fontSize: 14,
        fontFamily: 'Poppins_Regular',
        color: '#000',
        fontWeight: '600',
        marginHorizontal: 30,
        textAlign: 'justify'
    },
    HeaderText: {
        fontSize: 30,
        fontFamily: 'Poppins',
        color: '#000',
        marginBottom: 10,
        marginHorizontal: 15,
        textAlign: 'center',
    },
    icons: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 25
    },
    icon: {
    },
    versionStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10

    },
    footer: {
        flexDirection: 'row',
        gap: 10,
        justifyContent: 'center'
    },
});
