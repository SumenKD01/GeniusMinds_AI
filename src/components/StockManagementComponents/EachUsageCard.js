import { useState } from "react";
import { Image, Modal, StyleSheet, Text, TouchableOpacity, View, Pressable, TouchableHighlight } from "react-native";
import * as Animatable from 'react-native-animatable';
import { Colors } from "../../utils/Colors1";

export default EachUsageCard = ({ productName, quantity, reason, timing, operation, providedTo, downloadSignLink, others }) => {
    let cardIcon;
    productName = productName.slice(0, 1).toUpperCase() + productName.slice(1,);
    providedTo = providedTo.toUpperCase();
    const [downloadProcessModal, setDownloadProcessModal] = useState(false);

    const pathImages = '../../../assets/icons/StockManagement/Icons/';

    const makeDateReadable = (date) => {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        let monthGot = months[Number(date.slice(0, 2)) - 1];
        let dateGot = date.slice(3, 5);
        let yearGot = date.slice(6, 10);
        return (dateGot + " " + monthGot + " " + yearGot);
    }

    const makeTimeReadable = (time) => {
        let hours = Number(time.slice(11, 13));
        let minutes = Number(time.slice(14, 16));

        let newformat = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12;
        minutes = minutes < 10 ? '0' + minutes : minutes;

        return (hours + ':' + minutes + ' ' + newformat);
    }

    function toggleDownloadProcessModal() {
        setDownloadProcessModal(downloadProcessModal === true ? false : true);
    }

    if (operation === 'Added') {
        cardIcon = require(pathImages + 'added.png');
    } else {
        reason = reason.slice(0, 1).toUpperCase() + reason.slice(1,);
        switch (reason) {
            case 'Lost':
                cardIcon = require(pathImages + 'lost.png');
                break;
            case 'Damaged':
                cardIcon = require(pathImages + 'damaged.png');
                break;
            case 'InternalUsage':
                reason = "Used"
                cardIcon = require(pathImages + 'used.png');
                break;
            default:
                cardIcon = require(pathImages + 'taken.png');
                break;
        }
    }

    const addedStyle = {
        backgroundColor: Colors.greenTag,
        padding: 5,
        borderRadius: 5,
        marginTop: 5,
        color: 'white',
        fontSize: 12
    }

    const takenStyle = {
        backgroundColor: Colors.redTag,
        padding: 5,
        borderRadius: 5,
        marginTop: 5,
        color: Colors.white,
        fontSize: 12
    }

    return (
        <Animatable.View style={styles.card} animation="slideInLeft">
            <TouchableOpacity style={{ zIndex: 2 }} onPress={toggleDownloadProcessModal}>
                <View style={styles.firstRow}>
                    <View style={{ flex: 5 }}>
                        <Text style={styles.cardHeading}>Camera Serial No. - {providedTo}</Text>
                        <View style={{ justifyContent: 'center' }}>
                            <Text style={{ color: 'white' }}>{makeDateReadable(timing)}</Text>
                            <Text style={{ color: 'white' }}>{makeTimeReadable(timing)}</Text>
                        </View>
                        {/* <Text style={{ lineHeight: 20, color: 'white' }}>{productName}</Text> */}
                    </View>
                    <View style={{ flex: 1, height: '100%' }}>
                        <Animatable.View animation="bounceIn" duration={1000}>
                            <TouchableOpacity style={styles.previewButton} onPress={toggleDownloadProcessModal} >
                                <Image source={require('../../../assets/icons/externalLink.png')} style={styles.paperIcon} />
                            </TouchableOpacity>
                        </Animatable.View>
                    </View>
                </View>
                {reason.length >= 10 &&
                    <View style={{ borderTopWidth: 1, borderColor: 'white', borderStyle: 'dashed', padding: 10, paddingTop: 0, flexDirection: 'row' }}>
                        <Text style={{ fontWeight: 'bold', marginTop: 10, color: 'white' }}>Violations - </Text>
                        <Text style={{ marginTop: 10, color: 'white' }}> {reason}</Text>
                    </View>
                }
                <Modal
                    visible={downloadProcessModal}
                    animationType="fade"
                    transparent={true}
                >
                    <Pressable style={styles.modalBackground} onPress={toggleDownloadProcessModal}>
                        <TouchableOpacity style={styles.modalContent} activeOpacity={1} >
                            <Text style={{ fontWeight: 'bold', fontSize: 16, backgroundColor: Colors.darkBlue, padding: 9, margin: -20, color: Colors.white }}>Image Preview </Text>
                            <View>
                                {productName &&
                                    <Image source={{
                                        uri:
                                            'https://androidapi220211216164156.azurewebsites.net/api/Approval/DownloadFile?filename=' + productName
                                    }} style={styles.signatureImage} />
                                }
                            </View>
                            <TouchableHighlight onPress={toggleDownloadProcessModal} style={styles.closeCrossbutton} underlayColor={Colors.redHeaderButton}  >
                                <Image source={require(pathImages + 'cross.png')} style={styles.closeIconStyle} />
                            </TouchableHighlight>
                        </TouchableOpacity>
                    </Pressable>
                </Modal>
            </TouchableOpacity>
            <Image source={require('../../../assets/icons/report-card.png')} style={{ position: 'absolute', height: '100%', zIndex: -1, width: '100%' }} />
        </Animatable.View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: 'transparent',
        overflow: 'hidden',
        borderRadius: 10
    },
    cardIconStyle: {
        width: 54,
        height: 54
    },
    closeIconStyle: {
        width: 20,
        height: 20
    },
    closeCrossbutton: {
        position: 'absolute',
        right: 0,
        top: 0,
        padding: 10
    },
    firstRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        padding: 10
    },
    cardHeading: {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'white',
    },
    paperIcon: {
        width: 22,
        height: 22,
        top: -10,
        right: -10
    },
    previewButton: {
        flexDirection: 'row',
        gap: 5,
        padding: 7,
        alignSelf: 'center',
        alignItems: 'center',
        paddingLeft: 15,
        justifyContent: 'center',
        borderRadius: 40,
    },
    reasonTag: {
        backgroundColor: 'white',
        position: 'absolute',
        textAlign: 'center',
        borderWidth: 1,
        fontWeight: 'bold',
        fontSize: 10,
        color: 'white',
        borderStyle: "dashed",
        padding: 1,
        top: 28,
        paddingHorizontal: 3,
        transform: [{ rotateY: '-30deg' }, { rotateZ: '-20deg' }],
    },
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.transparency,
    },
    modalContent: {
        padding: 20,
        backgroundColor: 'black',
        elevation: 5,
        width: 330,
        gap: 20
    },
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 10,
        paddingRight: 15,
        borderBottomWidth: 1
    },
    signatureImage: {
        height: 400,
        marginHorizontal: -20,
        objectFit: 'contain'
    }
});