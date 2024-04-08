import { useState } from "react";
import { Image, Modal, StyleSheet, Text, TouchableOpacity, View, Pressable, TouchableHighlight } from "react-native";
import * as Animatable from 'react-native-animatable';
import { Colors } from "../utils/Colors1";
import { router } from "expo-router";

export default EachViolationCard = ({ productName, quantity, reason, timing, operation, providedTo, downloadSignLink, others }) => {
    const downloadLink = 'https://androidapi220211216164156.azurewebsites.net/api/Approval/DownloadFile?filename=';
    productName = productName.slice(0, 1).toUpperCase() + productName.slice(1,);
    providedTo = providedTo.toUpperCase();
    const [downloadProcessModal, setDownloadProcessModal] = useState(false);

    let allViolations = reason.split(",");

    const pathImages = '../../assets/icons/StockManagement/Icons/';

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

    return (
        <Animatable.View style={styles.card} animation="slideInLeft">
            <TouchableOpacity style={{ zIndex: 2 }} onPress={toggleDownloadProcessModal}>
                <View style={styles.firstRow}>
                    <View style={{ flex: 5 }}>
                        <View style={{ flexDirection: 'row', gap: 5 }}>
                            <Image source={require('../../assets/icons/camera-lens.png')} style={{ width: 20, height: 20 }} />
                            <Text style={styles.cardHeading}>Camera Serial No. {providedTo}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', right: 5 }}>
                            <Image source={require('../../assets/icons/calendar.png')} style={{ width: 30, height: 30 }} />
                            <Text style={{ color: 'white' }}>{makeDateReadable(timing)}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', gap: 5, marginBottom: -5 }}>
                            <Image source={require('../../assets/icons/clock.png')} style={{ width: 20, height: 20 }} />
                            <Text style={{ color: 'white' }}>{makeTimeReadable(timing)}</Text>
                        </View>
                    </View>
                    <View style={{ flex: 1, height: '100%' }}>
                        <Animatable.View animation="bounceIn" duration={1000}>
                            <TouchableOpacity style={styles.previewButton} onPress={toggleDownloadProcessModal} >
                                <Image source={require('../../assets/icons/externalLink.png')} style={styles.paperIcon} />
                            </TouchableOpacity>
                        </Animatable.View>
                    </View>
                </View>
                {reason.length >= 10 &&
                    <View style={{ borderTopWidth: 1, borderColor: 'white', borderStyle: 'dashed', margin: 10, width: '95%', paddingTop: 5, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 5 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ fontFamily: 'Poppins_SemiBold', marginTop: 10, color: 'white' }}>Violations - </Text>
                            <Text style={{ marginTop: 10, color: 'white' }}> {allViolations.length} </Text>
                        </View>
                        <View style={{ position: 'absolute, right: 0' }}>
                            <View style={{ width: '100%', flexDirection: 'row', gap: -5 }}>
                                {allViolations.map((eachItem, index) => {
                                    let returningIcon;
                                    switch (eachItem) {
                                        case 'Helmet': {
                                            returningIcon = require('../../assets/icons/ViolationIcons/Helmet.png');
                                        }
                                            break;
                                        case 'Vest': {
                                            returningIcon = require('../../assets/icons/ViolationIcons/Vest.png');
                                        }
                                            break;
                                        case 'Gloves': {
                                            returningIcon = require('../../assets/icons/ViolationIcons/Gloves.png');
                                        }
                                            break;
                                        case 'Glasses': {
                                            returningIcon = require('../../assets/icons/ViolationIcons/Goggles.png');
                                        }
                                            break;
                                        case 'Postures': {
                                            returningIcon = require('../../assets/icons/ViolationIcons/Posture.png');
                                        }
                                            break;  
                                        case 'Fall Detection': {
                                            returningIcon = require('../../assets/icons/ViolationIcons/FallDetection.png');
                                        }
                                            break;
                                        case 'Fire Extinguisher': {
                                            returningIcon = require('../../assets/icons/ViolationIcons/FireExtinguisher.png');
                                        }
                                            break;
                                        case 'Geofencing': {
                                            returningIcon = require('../../assets/icons/ViolationIcons/Geofencing.png');
                                        }
                                            break;
                                        case 'Shoes': {
                                            returningIcon = require('../../assets/icons/ViolationIcons/Shoes.png');
                                        }
                                            break;
                                        case 'Mask': {
                                            returningIcon = require('../../assets/icons/ViolationIcons/Mask.png');
                                        }
                                    }
                                    return <Image key={index + 1} source={returningIcon} style={{ width: 30, height: 30 }} />
                                })
                                }
                            </View>
                        </View>
                    </View>
                }
                <Modal
                    visible={downloadProcessModal}
                    animationType="fade"
                    transparent={true}
                    onRequestClose={() => setDownloadProcessModal(false)}
                >
                    <Pressable style={styles.modalBackground} onPress={toggleDownloadProcessModal}>
                        <TouchableOpacity style={styles.modalContent} activeOpacity={1} >
                            <Text style={{ fontWeight: 'bold', fontSize: 16, backgroundColor: Colors.darkBlue, padding: 9, margin: -20, color: Colors.white }}>Image Preview </Text>
                            <View>
                                {productName &&
                                    <Image source={{
                                        uri: downloadLink + productName
                                    }} style={styles.signatureImage} />
                                }
                            </View>
                            <TouchableHighlight onPress={toggleDownloadProcessModal} style={styles.closeCrossbutton} underlayColor={Colors.redHeaderButton}  >
                                <Image source={require(pathImages + 'cross.png')} style={styles.closeIconStyle} />
                            </TouchableHighlight>
                            <TouchableOpacity style={{ position: 'absolute', right: 10, backgroundColor: 'rgba(252,252,252,0.5)', padding: 5, borderRadius: 10, bottom: '10%', zIndex: 2 }} onPress={() => router.push({ pathname: '/MoreInfoPage/ZoomIn', params: { imageLink: downloadLink + productName } })} >
                                    <Image source={require('../../assets/icons/zoom.png')} style={{ width: 30, height: 30 }} />
                                </TouchableOpacity>
                        </TouchableOpacity>
                    </Pressable>
                </Modal>
            </TouchableOpacity>
            <Image source={require('../../assets/icons/report-card.png')} style={{ position: 'absolute', height: '100%', zIndex: -1, width: '100%' }} />
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
        height: 300,
        marginHorizontal: -20,
        objectFit: 'contain'
    }
});