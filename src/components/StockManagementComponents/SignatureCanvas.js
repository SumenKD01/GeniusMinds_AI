import React, { useRef, useState } from "react";
import { StyleSheet, View, Modal, Text, TouchableOpacity } from "react-native";
import * as FileSystem from 'expo-file-system';
import SignatureScreen from "react-native-signature-canvas";
import CustomButton from "../../utils/CustomButton";
import { Colors } from "../../utils/Colors1";

export default SignatureCanvas = ({ isVisible, onClose, insertingSign, addingSignState }) => {
    const [imageUploaded, setImageUploaded] = useState(false);
    const ref = useRef();
    const handleOK = (sign) => {
        let signatureMade = uploadBase64(sign);
        // console.log(sign.slice(0,20));
        // insertingSign(sign.slice(0,20));
        // addingSignState(sign.slice(0,20));
        // setImageUploaded(true);
    };

    const handleClear = () => {
        ref.current.clearSignature();
    };

    const handleConfirm = () => {
        ref.current.readSignature();
        if (!ref.current) {
            console.log("No Sign is Given");
        }
    };

    const handleClose = () => {
        setImageUploaded(false);
        onClose();
    };

    //Conversion of base64 to png

    const uploadBase64 = async (base64String) => {
        const base64Data = base64String.replace('data:image/png;base64,', '');
        try {
            const uri = FileSystem.cacheDirectory + 'signature-image-temp.jpg';
            await FileSystem.writeAsStringAsync(uri, base64Data, {
                encoding: FileSystem.EncodingType.Base64,
            });
            const uploadResult = await uploadImageAsync(uri);
            insertingSign(uploadResult);
            addingSignState(uploadResult);
            setImageUploaded(true);
        } catch (e) {
            console.error('Error:', e);
        }
    };

    const uploadImageAsync = async (imageUri) => {
        try {
            const timestamp = new Date().getTime();
            const uniqueFileName = `${timestamp}_${imageUri.split('/').pop()}`;

            const formData = new FormData();
            formData.append('file', {
                uri: imageUri,
                type: 'multipart/form-data',
                name: uniqueFileName
            });

            // console.log('nameData', formData._parts[0][1].name);
            let form = formData._parts[0][1].name;
            // console.log('URL', form);

            const xhr = new XMLHttpRequest();

            xhr.open(
                'POST',
                'https://androidapi220211216164156.azurewebsites.net/api/Approval/SaveProfilePic'
            );

            xhr.send(formData);
            // console.log("Form",form); 

            xhr.onreadystatechange = () => {
                if (xhr.readyState === XMLHttpRequest.DONE) {
                    // Handle response here
                    if (xhr.status == 200) {
                        // console.log(xhr.response);
                        // console.log('Upload completed:', xhr.responseText);
                        // console.log("Returning Value",form);
                    }
                }
            };
            return form;
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };


    const style = `.m-signature-pad--footer {display: none; marginTop: 0px;}`;

    return (
        <Modal style={styles.container} visible={isVisible} animationType="fade" transparent={true}>
            <View style={styles.modalBackground}>
                <View style={styles.modalContent}>
                    {!imageUploaded ?
                        <View style={{ gap: 20 }}>
                            <View style={styles.signatureCanvasView}>
                                <SignatureScreen ref={ref} onOK={handleOK} webStyle={style} />
                            </View>
                            <View style={styles.row}>
                                <CustomButton functionPassed={handleClear} textPassed={"Clear"} colorPassed={Colors.darkBlue} />
                                <CustomButton functionPassed={handleConfirm} textPassed={"Confirm"} colorPassed={Colors.darkBlue} />
                                <CustomButton functionPassed={handleClose} textPassed={"Cancel"} colorPassed={Colors.darkBlue} />
                            </View>
                        </View> :
                        <View style={styles.containerStyleAfterUpload}>
                            <Text style={{ color: Colors.greenTag, fontSize: 20 }}>Image Uploaded Successfully!</Text>
                            <CustomButton functionPassed={handleClose} textPassed={"OK"} colorPassed={Colors.darkBlue} />
                        </View>
                    }
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        height: 250,
        padding: 10,
    },
    row: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        alignItems: "center",
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
    signatureCanvasView: {
        height: 300
    },
    containerStyleAfterUpload: {
        height: 100,
        gap: 30,
        justifyContent: 'center',
        alignItems: 'center'
    }
});