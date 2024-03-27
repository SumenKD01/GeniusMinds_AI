import { TouchableOpacity, StyleSheet, Image, Text, View, TextInput, Button, Alert, Modal } from "react-native";
import { Avatar } from "react-native-paper";
import { useSelector } from 'react-redux';
import { useEffect, useState } from "react";
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from "expo-linear-gradient";

export default Profile = () => {
    const userInfo = useSelector((state) => state.user.userProfile);

    return (
        <LinearGradient colors={['#000C18', '#001E3E']} style={styles.container}>
            <View style={{ flexDirection: 'row', gap: 5, marginTop: 20, alignSelf: 'flex-start', marginLeft: 20 }}>
                <Image source={require('../../assets/icons/goBack.png')} style={{ width: 30, height: 30 }} />
                <Text style={{ fontSize: 20, fontFamily: 'Poppins', color: 'white' }}>My Account</Text>
            </View>
            <View style={{ flexDirection: 'row', gap: 15, marginTop: 20, alignSelf: 'flex-start', marginLeft: 20, justifyContent: 'center', alignItems: 'center', }}>
                <TouchableOpacity >
                    <Animatable.View animation={'slideInDown'}>
                        <Avatar.Image
                            source={require('../../assets/icons/Profile/userProfile.gif')
                            }
                            size={70}
                        />
                    </Animatable.View>
                </TouchableOpacity>
                <View>
                    <Text style={{ fontSize: 16, fontFamily: 'Poppins_SemiBold', color: 'white' }}>{userInfo.fullName}</Text>
                    <Text style={{ fontSize: 16, fontFamily: 'Poppins_Regular', color: 'white' }}>{userInfo.empId}</Text>
                </View>
            </View>
            <View style={{ position: 'absolute', top: 0, right: 0 }}>
                <Animatable.View animation="bounceIn" duration={1000}>
                    <Image source={require('../../assets/backgrounds/ProfileBackgroundDown.png')} style={{ width: 400, height: 400 }} />
                </Animatable.View>
            </View>
            <View style={{ position: 'absolute', bottom: 0, left: 0 }}>
                <Animatable.View animation="bounceIn" duration={1000}>
                    <Image source={require('../../assets/backgrounds/ProfileBackgroundUp.png')} style={{ width: 400, height: 400, opacity: 0.5 }} />
                </Animatable.View>
            </View>
            <Animatable.View style={styles.detailContainer} animation={'slideInLeft'}>
                <View style={styles.eachField}>
                    <Text style={styles.profiledataheaders}>Name</Text>
                    <View style={{ flexDirection: 'row', gap: 5, justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }} >
                        <Text style={styles.inputField}>{userInfo.fullName}</Text>
                        <TouchableOpacity style={{ backgroundColor: '#2B4B8A', paddingHorizontal: 10, paddingTop: 1, borderRadius: 10 }}>
                            <Text style={{ color: 'white', fontFamily: 'Poppins_Regular', top: 1 }}>Edit</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.eachField}>
                    <Text style={styles.profiledataheaders}>Phone</Text>
                    <View style={{ flexDirection: 'row', gap: 5, justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }} >
                        <Text style={styles.inputField}>{userInfo.phone}</Text>
                        <TouchableOpacity style={{ backgroundColor: '#2B4B8A', paddingHorizontal: 10, paddingTop: 1 , borderRadius: 10}}>
                            <Text style={{ color: 'white', fontFamily: 'Poppins_Regular', top: 1 }}>Edit</Text>
                        </TouchableOpacity>
                    </View>

                </View>
                <View style={styles.eachField}>
                    <Text style={styles.profiledataheaders}>Email</Text>
                    <View style={{ flexDirection: 'row', gap: 5, justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }} >
                        <Text style={styles.inputField}>{userInfo.email}</Text>
                        <TouchableOpacity style={{ backgroundColor: '#2B4B8A', paddingHorizontal: 10, paddingTop: 1 , borderRadius: 10}}>
                            <Text style={{ color: 'white', fontFamily: 'Poppins_Regular', top: 1 }}>Edit</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.eachField}>
                    <Text style={styles.profiledataheaders}>Username</Text>
                    <View style={{ flexDirection: 'row', gap: 5, justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }} >
                        <Text style={styles.inputField}>{userInfo.empId}</Text>
                        <TouchableOpacity style={{ backgroundColor: '#2B4B8A', paddingHorizontal: 10, paddingTop: 1 , borderRadius: 10}}>
                            <Text style={{ color: 'white', fontFamily: 'Poppins_Regular', top: 1 }}>Edit</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.eachField}>
                    <Text style={styles.profiledataheaders}>Department</Text>
                    <Text style={styles.inputField}>{userInfo.dept}</Text>
                </View>
            </Animatable.View>
            <Animatable.View style={styles.detailContainer} animation={'slideInLeft'}>
                <View style={styles.eachField}>
                    <Text style={styles.profiledataheaders}>Password</Text>
                    <View style={{ flexDirection: 'row', gap: 5, justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }} >
                        <Text style={styles.inputField}>*********</Text>
                        <TouchableOpacity>
                            <LinearGradient colors={['#FF487F', '#862C8E']} style={{ paddingHorizontal: 5, paddingTop: 2 , borderRadius: 10}} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
                                <Text style={{ color: 'white', fontFamily: 'Poppins_Regular', fontSize: 11 }}>Change</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                </View>
            </Animatable.View>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({

    container: {
        backgroundColor: '#CFEBFF',
        flex: 1,
        alignItems: 'center',
        paddingTop: 20,
        gap: 20
    },
    profileIcon: {
        width: 100,
        height: 100
    },
    detailContainer: {
        width: '90%',
        gap: 20,
        padding: 20,
        borderRadius: 15,
        backgroundColor: 'rgba(9,42,73, 0.5)'
    },
    eachField: {
        borderBottomWidth: 0.2,
        borderColor: 'white'
    },
    saveButton: {
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 20,
        marginHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    profiledataheaders: {
        fontSize: 11,
        fontFamily: 'Poppins_Regular',
        color: '#FFEF9C'
    },
    buttonIcons: {
        height: 30,
        width: 30,
        marginHorizontal: 5
    },
    photoPenIcon: {
        width: 20,
        height: 20
    },
    inputField: {
        color: 'white',
        fontFamily: 'Poppins_Regular'
    },
    modalContent: {
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 15,
        padding: 15,
        width: '80%',
        borderRadius: 10
    },
    modalBackground: {
        backgroundColor: 'rgba(52, 52 ,52, 0.5)'
    },
    notificationButtons: {
        backgroundColor: '#4C6078',
        paddingHorizontal: 10,
        paddingVertical: 5
    },
    notificationButtonText: {
        color: 'white',
        fontFamily: 'Poppins_SemiBold'
    },
    notificationHeading: {
        fontFamily: 'Poppins',
        fontSize: 14
    },
    notificationBody: {
        fontFamily: 'Poppins_Regular',
        fontSize: 12
    }
});