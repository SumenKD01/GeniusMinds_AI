import { Image, KeyboardAvoidingView, Linking, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { useForm, Controller } from 'react-hook-form';
import * as Animatable from 'react-native-animatable';
import * as Font from 'expo-font';
import { useEffect, useState } from "react";
import InputTextType from "../components/InputTextType";
import APICall from "../utils/APICall";
import { useNavigation ,CommonActions} from '@react-navigation/native';
import { ActivityIndicator } from "react-native";
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../redux/actions/userActions';
import { Link,router } from "expo-router";


export default LoginForm = () => {
    const [fontLoaded, setFontLoaded] = useState(false);
    const navigation = useNavigation();
    const [authenticationLoader, setAuthenticationLoader] = useState(false);
    const [authenticationMessage, setAuthenticationMessage] = useState("Authenticating ......");
    const apiGot = "https://androidapi220230605081325.azurewebsites.net/api/approval/VerifyUserName";
    const dispatch = useDispatch();
    let formData;

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: {
            UserName: "",
            Password: ""
        },
    });

    function getUserInfo(dataGot, result) {
        if (result === "Got User Info") {
            dispatch(loginSuccess(dataGot));
        }
    }

    function resultFunc(resultCame) {
        console.log("Checked - ", resultCame);
        if (resultCame === "User Authentication Success") {
            let apiForUserInfo = "https://androidapi220230605081325.azurewebsites.net/api/approval/VerifyUserName1";
            setAuthenticationMessage("Authentication Successful");
            APICall(apiForUserInfo, formData, getUserInfo, "getUserInformation");
            setTimeout(() => {
                router.push({ pathname: '/(tabs)/', params: { user: 'jane' } });

                navigation.dispatch(CommonActions.reset({
                    routes: [{key: "(tabs)", name: "(tabs)"}]
                  })      )     
                       setAuthenticationLoader(false);
                setAuthenticationMessage("Authenticating ......");
            }, 2 * 1000);
        } else {
            setAuthenticationMessage("Authentication failed !! \n *Please enter details carefully*");
        }
    }

    function toggleAuthenticationModal() {
        setAuthenticationLoader(authenticationLoader ? false : true);
        setAuthenticationMessage("Authenticating ......");
    }

    const onSubmit = async (data) => {
        console.log("Data - ", data);
        formData = data;
        setAuthenticationLoader(true);
        console.log("Authentication Loading ...", authenticationLoader);
        APICall(apiGot, data, resultFunc, "checkAuthentication")
        reset();
    }

    useEffect(() => {
        async function loadFonts() {
            await Font.loadAsync({
                Poppins: require('../../assets/fonts/Poppins/Poppins-Bold.ttf')
            });
            setFontLoaded(true);
        }
        loadFonts();
    }, []);

    if (!fontLoaded) {
        return null;
    }

    return (
        <Animatable.View animation={'slideInUp'} style={styles.formView} >
            <View style={{ padding: 20, gap: 15, backgroundColor: 'transparent' }}>
                <Controller
                    control={control}
                    name="UserName"
                    rules={{
                        required: "Please enter your username !",
                    }}
                    render={({ field: { onChange, value } }) => (
                        <View>
                            <View style={[styles.inputFieldContainer, { borderColor: errors.UserName ? 'red' : 'white' }]}>
                                <View style={{ flex: 1 }}>
                                    <Image source={require('../../assets/icons/User.png')} style={{ width: 25, height: 25 }} />
                                </View>
                                <View style={{ flex: 11 }}>
                                    <InputTextType inputName={"Email Address"} changeValue={onChange} value={value} type={"email"} />
                                </View>
                            </View>
                            {
                                errors.UserName &&
                                <Text style={{ color: 'red', fontSize: 10 }}>{errors.UserName.message}</Text>
                            }
                        </View>
                    )}
                />
                <Controller
                    control={control}
                    name="Password"
                    rules={{
                        required: "Please enter your password !",
                    }}
                    render={({ field: { onChange, value } }) => (
                        <KeyboardAvoidingView>
                            <View style={[styles.inputFieldContainer, { borderColor: errors.Password ? 'red' : 'white' }]}>
                                <View style={{ flex: 1 }}>
                                    <Image source={require('../../assets/icons/Password.png')} style={{ width: 25, height: 25 }} />
                                </View>
                                <View style={{ flex: 11 }}>
                                    <InputTextType inputName={"Password"} changeValue={onChange} value={value} />
                                </View>
                            </View>
                            {
                                errors.Password &&
                                <Text style={{ color: 'red', fontSize: 10 }}>{errors.Password.message}</Text>
                            }
                        </KeyboardAvoidingView>
                    )}
                />
                <TouchableOpacity style={styles.loginButton} onPress={handleSubmit(onSubmit)}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
                {authenticationLoader &&
                    <Modal visible={authenticationLoader} transparent>
                        <TouchableOpacity style={styles.messageModalBack} onPress={toggleAuthenticationModal} activeOpacity={1}>
                            <TouchableOpacity style={styles.messageBox} activeOpacity={1}>
                                <View style={{ justifyContent: 'center', alignItems: 'center', gap: 20, borderRadius: 10, backgroundColor: 'white', padding: 20 }}>
                                    {!(authenticationMessage.includes("failed") || authenticationMessage.includes("Successful")) &&
                                        <ActivityIndicator size={'large'} color={['#4E729A', '#18C0C1']} />
                                    }
                                    {authenticationMessage.includes("failed") &&
                                        <Image source={require('../../assets/icons/exclamation.png')} style={styles.messageBoxIcon} />
                                    }
                                    {authenticationMessage.includes("Successful") &&
                                        <Image source={require('../../assets/icons/verified.png')} style={styles.messageBoxIcon} />
                                    }
                                    <Text style={{ color: authenticationMessage.includes("failed") ? 'red' : authenticationMessage.includes("Success") ? 'green' : 'black', textAlign: 'center' }}>{authenticationMessage}</Text>
                                    {authenticationMessage.includes("failed") &&
                                        <TouchableOpacity style={{ backgroundColor: '#18C0C1', paddingVertical: 5, borderRadius: 10, paddingHorizontal: 10 }} onPress={toggleAuthenticationModal}>
                                            <Text style={{ fontFamily: 'Poppins_Regular', color: 'white' }}>OK</Text>
                                        </TouchableOpacity>
                                    }
                                </View>
                            </TouchableOpacity>
                        </TouchableOpacity>
                    </Modal>
                }
            </View>
        </Animatable.View>
    );
}

const styles = StyleSheet.create({
    formView: {
        width: '100%',
        backgroundColor: 'transparent'
    },
    formHeading: {
        fontSize: 28,
        color: 'white',
        textAlign: 'center',
        fontFamily: 'Poppins'
    },
    formDesc: {
        fontSize: 16,
        color: 'white',
        textAlign: 'center',
        fontFamily: 'Poppins'
    },
    loginButton: {
        backgroundColor: '#B02FFF',
        borderRadius: 5,
        paddingVertical: 2,
        shadowColor: "#B02FFF",
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 1.5,
        shadowRadius: 4.65,
        elevation: 11,
    },
    buttonText: {
        fontFamily: 'Poppins',
        fontSize: 22,
        color: 'white',
        textAlign: 'center',
    },
    inputFieldContainer: {
        flexDirection: 'row',
        backgroundColor: 'rgba(52, 52, 52, 0.3)',
        alignItems: 'center',
        paddingHorizontal: 10,
        borderRadius: 2,
        borderWidth: 0.2,
        borderColor: 'white'
    },
    messageBox: {
        width: '80%',
        top: '40%',
        alignSelf: 'center',
        padding: 10
    },
    messageModalBack: {
        backgroundColor: 'rgba(52, 52, 52, 0.8)',
        flex: 1
    },
    messageBoxIcon: {
        height: 40,
        width: 40
    }
});