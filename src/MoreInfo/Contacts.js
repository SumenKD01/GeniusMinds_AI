import { Image, StyleSheet, Text, View } from "react-native";
const pathName = '../../assets/icons/';

export default Contacts = () => {
    return (
        <View style={styles.container}>
            <View style={styles.firstSection}>
                <Text style={styles.firstSectionHeading}>Get in touch</Text>
                <Image source={require(pathName+'consult.gif')} style={{width: 300, height: 170, objectFit: 'contain'}} />
            </View>
            <View style={styles.detailContainer}>
                <View>
                    <View style={styles.detailHead}>
                        <Image source={require(pathName+'Phone_Contacts.png')} style={{ width: 25, height: 25, marginLeft: -5 }} />
                        <Text style={styles.detailHeadText}>PHONE</Text>
                    </View>
                    <Text style={styles.detailValueText}>+91-7406578806 /+91-9663588196</Text>
                </View>
                <View>
                    <View style={styles.detailHead}>
                        <Image source={require(pathName+'Email_Contacts.png')} style={{ width: 25, height: 25, marginLeft: -5 }} />
                        <Text style={styles.detailHeadText}>EMAIL</Text>
                    </View>
                    <Text style={styles.detailValueText}>enquiry@softdesigners.co.in</Text>
                </View>
                <View>
                    <View style={styles.detailHead}>
                        <Image source={require(pathName+'Map_Contacts.png')} style={{ width: 25, height: 25, marginLeft: -5 }} />
                        <Text style={styles.detailHeadText}>LOCATION</Text>
                    </View>
                    <Text style={styles.detailValueText}>No.234/146, Thalaghattapura, Kanakapura main road, Uttarahalli Hobli, Bangalore South, Bangalore-560109</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#CFEBFF',
        flex: 1
    },
    firstSection: {
        backgroundColor: '#82C3FF',
        height: '40%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    firstSectionHeading: {
        fontFamily: 'Poppins',
        fontSize: 30
    },
    detailContainer: {
        backgroundColor: 'white',
        alignSelf: 'center',
        marginTop: '10%',
        width: '90%',
        padding: 20,
        borderRadius: 10,
        gap: 20,
        elevation: 20,
        shadowOffset: {
            width: 10,
            height: -5,
        },
    },
    detailHead: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
        marginBottom: 5
    },
    detailHeadText: {
        fontFamily: 'Poppins_SemiBold',
        fontSize: 14,
        top: 2
    },
    detailValueText: {
        fontFamily: 'Poppins_Regular',
        fontSize: 12
    }
});