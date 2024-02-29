import { TouchableOpacity, StyleSheet, Image, Text, View, TextInput, Button, Alert, Modal } from "react-native";
import { Avatar } from "react-native-paper";
import { useSelector } from 'react-redux';
// import * as Notifications from 'expo-notifications';
import { useEffect, useState } from "react";
import * as Animatable from 'react-native-animatable';

// Notifications.setNotificationHandler({
//     handleNotification: async () => ({
//         shouldShowAlert: true,
//         shouldPlaySound: true,
//         shouldSetBadge: true
//     }),
// });

export default Profile = () => {
    const userInfo = useSelector((state) => state.user.userProfile);
    const [showNotification, setShowNotification] = useState(false);
    const [showNotificationData, setShowNotificationData] = useState();

    // function toggleNotification(notificationData) {
    //     console.log("Notification Data inside the Toggle Function - ", notificationData);
    //     setShowNotificationData(notificationData);
    //     setShowNotification(showNotification ? false : true);
    // }

    // useEffect(() => {
    //     registerForPushNotificationsAsync();
    //     Notifications.addNotificationReceivedListener(handleNotification);
    // }, []);

    // const registerForPushNotificationsAsync = async () => {
    //     if (Platform.OS === 'android') {
    //         try {
    //             let token;
    //             const { status: existingStatus } = await Notifications.getPermissionsAsync();
    //             let finalStatus = existingStatus;
    //             if (existingStatus !== 'granted') {
    //                 const { status } = await Notifications.requestPermissionsAsync();
    //                 finalStatus = status;
    //             }
    //             if (finalStatus !== 'granted') {
    //                 throw new Error('Permission to receive push notifications denied');
    //             }
    //             console.log(finalStatus);
    //             token = (await Notifications.getExpoPushTokenAsync()).data;
    //             console.log(token);
    //         } catch (error) {
    //             console.log('Error getting Expo push token:', error);
    //         }
    //     }
    // };

    // const NotificationGot = (notificationData) => {
    //     console.log("Notification Data - ", notificationData);
    //     return (
    //         <Modal visible={showNotification} transparent>
    //             <TouchableOpacity style={styles.modalBackground} onPress={toggleNotification} activeOpacity={1}>
    //                 <TouchableOpacity activeOpacity={1} style={styles.modalContent}>
    //                     <Image source={require('../../../assets/icons/alert.gif')} style={{width: 40, height: 40}} />
    //                     <Text style={styles.notificationHeading}>{showNotificationData?.request?.content.title}</Text>
    //                     <Text style={styles.notificationBody}>{showNotificationData?.request?.content.body}</Text>
    //                     <View style={{flexDirection: 'row', gap: 20}}>
    //                         <TouchableOpacity onPress={toggleNotification} style={styles.notificationButtons}>
    //                             <Text style={styles.notificationButtonText}>Reject</Text>
    //                         </TouchableOpacity>
    //                         <TouchableOpacity onPress={toggleNotification} style={styles.notificationButtons}>
    //                             <Text style={styles.notificationButtonText}>Accept</Text>
    //                         </TouchableOpacity>
    //                         <TouchableOpacity onPress={toggleNotification} style={styles.notificationButtons}>
    //                             <Text style={styles.notificationButtonText}>Ignore</Text>
    //                         </TouchableOpacity>
    //                     </View>
    //                 </TouchableOpacity>
    //             </TouchableOpacity>
    //         </Modal>
    //     );
    // }

    // const handleNotification = (notificationData) => {
    //     toggleNotification(notificationData);
    // };

    return (
        <View style={styles.container}>
            <Text style={{ fontSize: 20, fontFamily: 'Poppins' }}>Profile</Text>
            <TouchableOpacity >
                <Animatable.View animation={'slideInDown'}>
                    <Avatar.Image
                        source={require('../../assets/icons/Profile/userProfile.gif')
                        }
                        size={120}
                    />
                </Animatable.View>
                {/* <View style={{ padding: 5, backgroundColor: 'white', borderRadius: 30, position: 'absolute', top: 0, right: 0 }} >
                    <Image source={require('../../../assets/icons/photoPenIcon.png')} style={styles.photoPenIcon} />
                </View> */}
            </TouchableOpacity>
            <Animatable.View style={styles.detailContainer} animation={'slideInLeft'}>
                <View style={styles.eachField}>
                    <Text style={styles.profiledataheaders}>Name</Text>
                    <Text style={styles.inputField}>{userInfo.fullName}</Text>

                    {/* <TextInput style={styles.inputField} value={userInfo.fullName} /> */}
                </View>
                <View style={styles.eachField}>
                    <Text style={styles.profiledataheaders}>Phone</Text>
                    <Text style={styles.inputField}>{userInfo.phone}</Text>

                </View>
                <View style={styles.eachField}>
                    <Text style={styles.profiledataheaders}>Email</Text>
                    <Text style={styles.inputField}>{userInfo.email}</Text>
                </View>
                <View style={styles.eachField}>
                    <Text style={styles.profiledataheaders}>Username</Text>
                    <Text style={styles.inputField}>{userInfo.empId}</Text>

                </View>
                <View style={styles.eachField}>
                    <Text style={styles.profiledataheaders}>Department</Text>
                    <Text style={styles.inputField}>{userInfo.dept}</Text>
                </View>
                {/* <TouchableOpacity underlayColor={'#FFF78A'} activeOpacity={1} onPress={() => alert('Pressed!')}>
                    <Text style={{ fontFamily: 'Poppins', textDecorationLine: 'underline', textAlign: 'right', color: 'white' }}>Change Password</Text>
                </TouchableOpacity> */}
                {/* <Button
                    title="Notification"
                    onPress={async () => {
                        await schedulePushNotification(userInfo);
                    }}
                /> */}
            </Animatable.View>
        </View>
    )
}

// async function schedulePushNotification(details) {
//     await Notifications.scheduleNotificationAsync({
//         content: {
//             title: "Welcome to Efficio, " + details.fullName,
//             body: 'We hope you have the best experience using this app. Your employee Id is ' + details.empId,
//             data: { data: 'goes here' }
//         },
//         trigger: {
//             seconds: 2,
//             repeats: false
//         },
//     });
// }

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
        backgroundColor: 'rgba(0, 0, 0, 0.6)'
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
        color: 'cyan'
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
        backgroundColor: 'rgba(52, 52, 52, 0.8)',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
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