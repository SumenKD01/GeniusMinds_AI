import { useEffect, useState } from "react";
import { Image, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View, Button, Alert } from "react-native";
import SelectDropdown from 'react-native-select-dropdown';
import { useForm, Controller } from "react-hook-form";
import SignatureCanvas from "./SignatureCanvas";
import CustomButton from "../../utils/CustomButton";
import { TouchableHighlight } from "react-native";
import { Colors } from "../../utils/Colors1";
import Heading from "../../utils/Heading";
import APICall from "../../utils/APICall";
import UsageEnteredMessage from "./UsageEnteredMessage";
import SelectDropDownProductsAvailable from "./SelectDropDownProductsAvailable";

export default UsageFormModal = ({ onClose, isVisible }) => {
    const reasons = ['Used', 'Damaged', 'Lost', 'Others'];
    const apiGot = "https://androidapi220230605081325.azurewebsites.net/api/approval/AddUsageModule";
    const apiGotProduct = "https://androidapi220230605081325.azurewebsites.net/api/approval/GetStockItemsList";
    const userId = "rajqa";
    const plantName = "SEIPL,BLR";
    const jsonDataToPassInApiProduct = {
        "PlantName": plantName,
        "UserId": userId
    }
    const pathImages = "../../../assets/icons/StockManagement/Icons/";

    const [productData, setProductData] = useState([]);
    const [selectProductModalView, setSelectProductModalView] = useState(false);
    const [reasonSelected, setReasonSelected] = useState(reasons[0]);
    const [signatureModalView, setSignatureModalView] = useState(false);
    const [takenContent, setTakenContent] = useState(false);
    const [addedContent, setAddedContent] = useState(true);
    const [selectedProduct, setSelectedProduct] = useState("");
    const [signature, setSignature] = useState("");
    const [dataInsertMessageDisplay, setDataInsertMessageDisplay] = useState(false);
    const [successDataInsert, setSuccessDataInsert] = useState(false);

    //React Hook Form Field Details
    const {
        control,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm({
        defaultValues: {
            Id: "",
            PlantName: "",
            UserId: "",
            UsageTiming: "",
            ProductName: "",
            Quantity: "",
            Reason: reasons[0],
            Others: "",
            Operation: "Added",
            ProvidedTo: "",
            FileName1: ""
        },
    });

    function padWithLeadingZeros(num, totalLength) {
        return String(num).padStart(totalLength, '0');
    }

    function resultReport(dataGot, apiError) {
        if (!apiError) {
            if (dataGot.length) {
                let newData = dataGot.map((eachData) => {
                    let productName = eachData.productName.slice(0, 1).toUpperCase() + eachData.productName.slice(1);
                    let productCode = padWithLeadingZeros(eachData.productCode, 4);
                    return (
                        {
                            productCode: productCode,
                            productName: productName
                        }
                    );
                });
                setProductData(newData);
            }
        }
    }

    function timeNow() {
        //Getting Full Date and Time
        let time = new Date();

        //Getting Date in Format
        let month = time.getMonth() + 1 + "";
        month = month.length === 1 ? "0" + month : month;
        let date = time.getDate() + "";
        date = date.length === 1 ? "0" + date : date;
        let fullDate = month + "/" + date + "/" + time.getFullYear();

        //Getting Time in Format
        let hours = time.getHours() + "";
        hours = (hours.length === 1) ? "0" + hours : hours;
        let minutes = time.getMinutes() + "";
        minutes = (minutes.length === 1) ? "0" + minutes : minutes;
        let seconds = time.getSeconds() + "";
        seconds = (seconds.length === 1) ? "0" + seconds : seconds;
        let clockTime = hours + ":" + minutes + ":" + seconds;

        //Combining Date and Time and Return
        let fullTimeDetail = fullDate + " " + clockTime;
        return fullTimeDetail;
    }

    //Result after the data has been entered Successfully
    function resultFormSubmission(message) {
        if (message === "Success") {
            setDataInsertMessageDisplay(true);
            setSuccessDataInsert(true);
        } else {
            setDataInsertMessageDisplay(true);
            setSuccessDataInsert(false);
        }
    }

    //Open Data Insertion Message Box
    function toggleDataInsertMessage() {
        setDataInsertMessageDisplay(dataInsertMessageDisplay ? false : true);
        // setSuccessDataInsert(false);
    }

    //Handling Submit
    const onSubmit = (data) => {
        let newData;
        if (data.Operation === "Taken" && data.Others != "") {
            data.Reason = data.Others;
        }
        delete data.Others;
        data.UsageTiming = timeNow();
        data.UserId = userId;
        data.PlantName = plantName;

        if (data.Operation === "Added") {
            newData = {
                ...data,
                Reason: "",
                ProvidedTo: ""
            };
        } else {
            newData = data;
        }
        APICall(apiGot, newData, resultFormSubmission, "sendData");
        resetHookFunc();
    }

    //Toggling Select Product Modal
    function toggleSelectProduct() {
        setSelectProductModalView(selectProductModalView ? false : true);
    }

    //Reset the Form
    function resetHookFunc() {
        setSelectedProduct("");
        setReasonSelected(reasons[0]);
        setToAddedContent();
        setSignature("");
        reset();
    }

    //Open the Signature Modal
    const toggleSignatureModal = () => {
        setSignatureModalView(signatureModalView === true ? false : true);
    }

    //Make it Added Content Form
    const setToAddedContent = () => {
        setAddedContent(true);
        setTakenContent(false);
    }

    //Make it Taken Content Form
    const setToTakenContent = () => {
        setAddedContent(false);
        setTakenContent(true);
    }

    //Setting Signature
    const take_signature = (signGot) => {
        setSignature(signGot);
    }

    //Setting Signature
    const setting_product = (productGot) => {
        setSelectedProduct(productGot);
    }

    //Close Entire Modal Form
    function whileClosingTheModal() {
        setDataInsertMessageDisplay(false);
        setSuccessDataInsert(false);
        resetHookFunc();
        onClose();
    }

    useEffect(() => {
        APICall(apiGotProduct, jsonDataToPassInApiProduct, resultReport, "getReport");
    }, [isVisible]);

    return (
        <Modal
            animationType="slide"
            visible={isVisible}
            style={styles.modalStyle}
        >
            <View style={styles.modalBody}>
                <View style={{ justifyContent: 'flex-start' }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Heading textPassed={"Add Consumptions / Stocks"} />
                        <TouchableHighlight onPress={whileClosingTheModal} style={{ position: 'absolute', right: -10, top: 0, borderTopLeftRadius: 10, borderBottomLeftRadius: 10, padding: 10, overflow: 'hidden', backgroundColor: Colors.redHeaderButton }} underlayColor={Colors.darkBlue}>
                            <Image source={require(pathImages+"cross.png")} style={styles.crossIconStyle} />
                        </TouchableHighlight>
                    </View>
                    <View style={styles.form}>
                        <Controller
                            control={control}
                            name="ProductName"
                            rules={{
                                required: true,
                            }}
                            render={({ field: { onChange, value } }) => (
                                <SelectDropDownProductsAvailable isVisible={selectProductModalView} onClose={toggleSelectProduct} dataGiven={productData} setItemFunc={onChange} setProduct={setting_product} />
                            )}
                        />
                        {selectedProduct ?
                            <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 20, alignItems: 'center', backgroundColor: Colors.white, paddingLeft: 10 }}>
                                <Text style={{ flex: 3, color: Colors.black }}>{selectedProduct.productCode}</Text>
                                <Text style={{ flex: 8, color: Colors.black }}>|  {selectedProduct.productName}</Text>
                                <Text style={{ flex: 2, color: Colors.black }}>{"12"}</Text>
                                <View style={{ paddingLeft: 10 }}>
                                    <CustomButton imagePassed={require(pathImages+'pen.png')} textPassed={"Edit"} functionPassed={toggleSelectProduct} colorPassed={Colors.darkBlue} />
                                </View>
                            </View> :
                            <CustomButton textPassed={"Select Product"} functionPassed={toggleSelectProduct} colorPassed={Colors.darkBlue} />
                        }
                        {errors.ProductName && <Text style={styles.errorMessages}>You must select a product!</Text>}

                        <Controller
                            control={control}
                            name="Operation"
                            render={({ field: { onChange, value } }) => (
                                <View style={[styles.selectDropDownButtonContainer, { marginVertical: 20 }]}>
                                    <Text style={styles.label}>Operation</Text>
                                    <View style={{ flexDirection: 'row', gap: 20 }}>
                                        <TouchableOpacity style={styles.checkBoxContainer} onPress={() => { onChange("Added"); setToAddedContent() }}>
                                            <View style={styles.checkBox}>
                                                {addedContent &&
                                                    <Image source={require(pathImages+'check-mark.png')} style={styles.tickStyle} />
                                                }
                                            </View>
                                            <Text>Added</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.checkBoxContainer} onPress={() => { onChange("Taken"); setToTakenContent() }}>
                                            <View style={styles.checkBox}>
                                                {takenContent &&
                                                    <Image source={require(pathImages+'check-mark.png')} style={styles.tickStyle} />
                                                }
                                            </View>
                                            <Text>Taken</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            )}
                        />
                        <View style={styles.selectDropDownButtonContainer}>
                            <Text style={[styles.label, { flex: 4 }]}>Quantity</Text>
                            <Controller
                                control={control}
                                name="Quantity"
                                rules={{
                                    required: true,
                                    pattern: {
                                        value: /^[1-9][0-9]*$/,
                                        message: 'Please enter a number',
                                    },
                                }}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <TextInput
                                        style={[styles.inputField, { flex: 3, borderColor: errors.Quantity ? "red" : "black" }]}
                                        keyboardType="numeric"
                                        placeholder="Enter in digits"
                                        onBlur={onBlur}
                                        onChangeText={onChange}
                                        value={value}
                                    />
                                )}
                            />
                        </View>
                        {errors.Quantity && <Text style={styles.errorMessages}>You must enter a number greater than zero!</Text>}
                        {
                            takenContent &&
                            <Controller
                                control={control}
                                name="Reason"
                                render={({ field: { onChange, value } }) => (
                                    <View style={styles.selectDropDownButtonContainer}>
                                        <Text style={styles.label}>Select Product </Text>
                                        <SelectDropdown
                                            
                                            data={reasons}
                                            search
                                            defaultValue={reasons[0]}
                                            onSelect={(selectedItem) => {
                                                setReasonSelected(selectedItem);
                                                onChange(selectedItem);
                                            }}
                                            renderDropdownIcon={() => <Image source={require(pathImages+'arrow-down.png')} style={styles.dropDownIconStyle} />}
                                            buttonStyle={styles.selectDropDownButton}
                                            rowStyle={styles.selectDropDownRow}
                                            rowTextStyle={styles.selectDropDownText}
                                            buttonTextStyle={styles.selectDropDownButtonText}
                                            selectedRowStyle={styles.selectedRowStyle}
                                            buttonTextAfterSelection={() => reasonSelected}
                                            rowTextForSelection={(item) => {
                                                return item;
                                            }}
                                        />
                                    </View>
                                )}
                            />
                        }
                        {errors.Reason && <Text style={styles.errorMessages}>Please select a reason from above!</Text>}
                        {
                            takenContent && reasonSelected === 'Others' &&
                            <Controller
                                control={control}
                                name="Others"
                                rules={{
                                    required: true,
                                }}
                                render={({ field: { onChange, value } }) => (
                                    <View style={styles.inputFieldContainer}>
                                        <Text style={styles.label}>Enter your reason here [Others]</Text>
                                        <TextInput
                                            style={[styles.inputField, { borderColor: errors.Others ? "red" : "black" }]}
                                            onChangeText={onChange}
                                            value={value}
                                        />
                                    </View>
                                )}
                            />
                        }
                        {errors.Others && <Text style={styles.errorMessages}>Fill the other reason you have!</Text>}
                        {
                            takenContent &&
                            <Controller
                                control={control}
                                name="ProvidedTo"
                                rules={{
                                    required: true,
                                }}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <View style={styles.inputFieldContainer}>
                                        <Text style={styles.label}>Provided to</Text>
                                        <TextInput
                                            style={[styles.inputField, { borderColor: errors.ProvidedTo ? "red" : "black" }]}
                                            onChangeText={takenContent ? onChange : ""}
                                            onBlur={onBlur}
                                            value={value}
                                        />
                                    </View>
                                )}
                            />
                        }
                        {errors.ProvidedTo && <Text style={styles.errorMessages}>Please tell to whom you provided!</Text>}
                        <View style={{ alignItems: 'center', marginTop: 25 }}>
                            <Controller
                                control={control}
                                name="FileName1"
                                rules={{
                                    required: true,
                                }}
                                render={({ field: { onChange, value } }) => {
                                    return (
                                        <View>
                                            <SignatureCanvas isVisible={signatureModalView} onClose={toggleSignatureModal} insertingSign={onChange} addingSignState={take_signature} />
                                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                                                {
                                                    signature &&
                                                    <Text style={{ width: '70%', backgroundColor: Colors.white, padding: 10, color: Colors.darkBlue }}>{signature}</Text>
                                                }
                                                <View>
                                                    <CustomButton textPassed={!signature ? "Add Signature" : "Edit"} functionPassed={toggleSignatureModal} colorPassed={Colors.darkBlue} imagePassed={require(pathImages+"pen.png")} />
                                                </View>
                                            </View>
                                        </View>
                                    );
                                }}
                            />
                            {errors.FileName1 && <Text style={[styles.errorMessages, { marginTop: 5 }]}>Please upload your signature...</Text>}
                        </View>
                    </View>
                </View>
                <View style={styles.buttonContainer}>
                    <CustomButton textPassed={"Reset"} colorPassed={Colors.redHeaderButton} functionPassed={resetHookFunc} />
                    <CustomButton textPassed={"Submit"} colorPassed={Colors.darkBlue} functionPassed={handleSubmit(onSubmit)} />
                </View>
                <UsageEnteredMessage isVisible={dataInsertMessageDisplay} onClose={toggleDataInsertMessage} message={successDataInsert ? "Success" : "False"} continuing={whileClosingTheModal} />
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalBody: {
        padding: 10,
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: Colors.modalGrayBackground,
        gap: 10
    },
    signatureCanvasView: {
        height: 400
    },
    heading: {
        color: Colors.white,
        fontWeight: 'bold',
        fontSize: 16,
        backgroundColor: Colors.gray,
        alignSelf: 'flex-start',
        padding: 10,
        paddingHorizontal: 10,
        paddingRight: 40,
        marginLeft: -10,
        borderTopRightRadius: 30,
        borderBottomRightRadius: 30,
        borderRightColor: Colors.black
    },
    form: {
        paddingVertical: 20,
        gap: 20
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignSelf: 'flex-end',
        bottom: 10,
        width: '100%',
        gap: 50,
    },
    label: {
        fontWeight: 'bold'
    },
    closeCrossbutton: {
        position: 'absolute',
        right: -25,
        top: -25
    },
    closeIconStyle: {
        width: 20,
        height: 20
    },
    crossIconStyle: {
        width: 20,
        height: 20,
        padding: 10
    },
    dropDownIconStyle: {
        width: 10,
        height: 10
    },
    selectDropDownText: {
        fontSize: 16,
        color: 'red',
        width: 300,
        marginLeft: 0
    },
    selectDropDownRow: {
        height: 40
    },
    selectDropDownButton: {
        width: 150,
        height: 40,
        backgroundColor: Colors.white,
        borderWidth: 1
    },
    selectDropDownButtonText: {
        flex: 1,
    },
    selectDropDownButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    inputFieldContainer: {
        gap: 5
    },
    inputField: {
        borderWidth: 1,
        backgroundColor: Colors.white,
        paddingVertical: 1,
        paddingHorizontal: 5
    },
    selectedRowStyle: {
        backgroundColor: Colors.redHeaderButton
    },
    checkBox: {
        backgroundColor: Colors.white,
        justifyContent: 'center',
        alignItems: 'center',
        width: 20,
        height: 20,
        borderWidth: 2,
        borderRadius: 7
    },
    tickStyle: {
        width: 17,
        height: 17
    },
    checkBoxContainer: {
        flexDirection: 'row',
        gap: 7
    },
    errorMessages: {
        color: 'red',
        alignSelf: 'center',
        marginTop: -18
    }
});
