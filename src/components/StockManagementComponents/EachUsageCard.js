import { useState } from "react";
import { Image, Modal, StyleSheet, Text, TouchableOpacity, View, Pressable, TouchableHighlight } from "react-native";
import * as Animatable from 'react-native-animatable';
import { Colors } from "../../utils/Colors1";

export default EachUsageCard = ({ productName, quantity, reason, timing, operation, providedTo, downloadSignLink, others }) => {
    let cardIcon;
    productName = productName.slice(0, 1).toUpperCase() + productName.slice(1,);
    providedTo = providedTo.toUpperCase();
    const [downloadProcessModal, setDownloadProcessModal] = useState(false);

    const pathImages = "../../../assets/icons/StockManagement/Icons/";

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
        cardIcon = require(pathImages+'added.png');
    } else {
        reason = reason.slice(0, 1).toUpperCase() + reason.slice(1,);
        switch (reason) {
            case 'Lost':
                cardIcon = require(pathImages+'lost.png');
                break;
            case 'Damaged':
                cardIcon = require(pathImages+'damaged.png');
                break;
            case 'InternalUsage':
                reason = "Used"
                cardIcon = require(pathImages+'used.png');
                break;
            default:
                cardIcon = require(pathImages+'taken.png');
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
            <TouchableOpacity onPress={toggleDownloadProcessModal}>
                <View style={styles.firstRow}>
                    <View style={[styles.firstRow, { flex: 2 }]}>
                        <View style={{ justifyContent: 'center', alignItems: 'center', flex: 2 }}>
                            <View>
                                <Image source={cardIcon} style={styles.cardIconStyle} />
                            </View>
                            <Text style={operation === "Added" ? addedStyle : takenStyle}>{operation}</Text>
                            {
                                operation === "Taken" && reason.length <= 10 &&
                                <Text style={styles.reasonTag}>{reason}</Text>
                            }
                        </View>
                        <View style={{ flex: 5}}>
                            <Text style={styles.cardHeading}>{productName}</Text>
                            <View style={{justifyContent: 'center'}}>
                                <Text>{makeDateReadable(timing)}</Text>
                                <Text>{makeTimeReadable(timing)}</Text>
                            </View>
                            <Text style={{ lineHeight: 20 }}>{providedTo}</Text>
                        </View>
                    </View>
                    <View style={{ flex: 1 }}>
                        <Text style={{ borderLeftWidth: 0.2, fontSize: 20, marginBottom: 5, padding: 5, paddingHorizontal: 10 }}>{quantity}</Text>
                        <Animatable.View animation="bounceIn" duration={1000}>
                            <TouchableOpacity style={styles.previewButton} onPress={toggleDownloadProcessModal} >
                                <Text style={{ color: 'white', fontSize: 12, justifyContent: 'center' }}>Preview</Text>
                                <Image source={require(pathImages+"contract.png")} style={styles.paperIcon} />
                            </TouchableOpacity>
                        </Animatable.View>
                    </View>
                </View>
                {reason.length >= 10 &&
                    <Text style={{ textAlign: 'center', marginTop: 10 }}><Text style={{ fontWeight: 'bold' }}>Reason - </Text> {reason}</Text>
                }
                <Modal
                    visible={downloadProcessModal}
                    animationType="fade"
                    transparent={true}
                >
                    <Pressable style={styles.modalBackground} onPress={toggleDownloadProcessModal}>
                        <TouchableOpacity style={styles.modalContent} activeOpacity={1} >
                            <Text style={{ fontWeight: 'bold', fontSize: 16, backgroundColor: Colors.darkBlue, padding: 9, margin: -20, color: Colors.white }}>Signature Preview </Text>
                            <View style={[styles.card, { borderWidth: 0.2, marginTop: 10, marginHorizontal: -10, marginBottom: -30 }]}>
                                <View style={styles.firstRow}>
                                    <View style={[styles.firstRow, { flex: 2 }]}>
                                        <View style={{ justifyContent: 'center', alignItems: 'center', flex: 3 }}>
                                            <Text style={operation === "Added" ? addedStyle : takenStyle}>{operation}</Text>
                                        </View>
                                        <View style={{ flex: 5, gap: 4 }}>
                                            <Text style={styles.cardHeading}>{productName}</Text>
                                        </View>
                                    </View>
                                    <View style={{ flex: 1 }}>
                                        <Text style={{ borderLeftWidth: 0.2, fontSize: 20, marginBottom: 5, padding: 5, paddingHorizontal: 10 }}>{quantity}</Text>
                                    </View>
                                </View>
                                <View style={{ borderTopWidth: 0.2, marginTop: 10 }}>
                                    {downloadSignLink &&
                                        <Image source={{
                                            uri:
                                                'https://androidapi220211216164156.azurewebsites.net/api/Approval/DownloadFile?filename=' + downloadSignLink
                                        }} style={styles.signatureImage} />
                                    }
                                </View>
                            </View>
                            <TouchableHighlight onPress={toggleDownloadProcessModal} style={styles.closeCrossbutton} underlayColor={Colors.redHeaderButton}  >
                                <Image source={require(pathImages+'cross.png')} style={styles.closeIconStyle} />
                            </TouchableHighlight>
                        </TouchableOpacity>
                    </Pressable>
                </Modal>
            </TouchableOpacity>
        </Animatable.View>
    );
}

const styles = StyleSheet.create({
    card: {
        padding: 10,
        borderBottomWidth: 1,
        backgroundColor: Colors.white,
        borderColor: Colors.silverBorder,
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
        gap: 10
    },
    cardHeading: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    paperIcon: {
        width: 14,
        height: 14
    },
    previewButton: {
        flexDirection: 'row',
        gap: 5,
        backgroundColor: Colors.stockCardColor,
        padding: 7,
        alignSelf: 'center',
        alignItems: 'center',
        paddingLeft: 15,
        justifyContent: 'center',
        shadowColor: Colors.shadowColor,
        shadowOffset: { width: 10, height: 10 },
        shadowOpacity: 50,
        borderRadius: 40,
        elevation: 10
    },
    reasonTag: {
        backgroundColor: 'white',
        position: 'absolute',
        textAlign: 'center',
        borderWidth: 1,
        fontWeight: 'bold',
        fontSize: 10,
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
        backgroundColor: Colors.white,
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
        width: '100%',
        height: 200,
        objectFit: 'contain'
    }
});