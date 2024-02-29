import { useState } from "react";
import { Image, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import SelectDropdown from 'react-native-select-dropdown';
import { Colors } from "../../utils/Colors1";

export default ProductFormModal = ({ onClose, isVisible }) => {
    const products = ['Gloves', 'Mask', 'Vest', 'Shoes', 'Goggles', 'Cap', 'Helmet'];
    const [productSelected, setProductSelected] = useState(products[0]);
    const [addOrUpdate, setAddOrUpdate] = useState('new');
    
    const pathImages = "../../../assets/icons/StockManagement/Icons/";

    function backToMainMenu() {
        setProductSelected(products[0]);
        setAddOrUpdate('new');
    }

    function whileClosingTheModal() {
        backToMainMenu();
        onClose();
    }

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={isVisible}
        >
            <View style={styles.modalBackground}>
                <View style={styles.modalContent}>
                    {addOrUpdate === null &&
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity onPress={() => setAddOrUpdate('new')} style={styles.button}>
                                <Text style={styles.buttonText}>Add New Product</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => setAddOrUpdate('update')} style={styles.button}>
                                <Text style={styles.buttonText}>Update Existing Product</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={onClose} style={styles.closeCrossbutton}>
                                <Image source={require(pathImages+'cancel.png')} style={styles.closeIconStyle} />
                            </TouchableOpacity>
                        </View>
                    }
                    {addOrUpdate === 'update' &&
                        <View style={styles.selectDropDownButtonContainer}>
                            <Text style={styles.label}>Select Product </Text>
                            <SelectDropdown
                                data={products}
                                search
                                defaultValue={products[0]}
                                onSelect={(selectedItem) => {
                                    setProductSelected(selectedItem);
                                }}
                                renderDropdownIcon={() => <Image source={require(pathImages+'arrow-down.png')} style={styles.dropDownIconStyle} />}
                                buttonStyle={styles.selectDropDownButton}
                                rowStyle={styles.selectDropDownRow}
                                rowTextStyle={styles.selectDropDownText}
                                buttonTextStyle={styles.selectDropDownButtonText}
                                selectedRowStyle={styles.selectedRowStyle}
                                buttonTextAfterSelection={(selectedItem) => {
                                    return selectedItem;
                                }}
                                rowTextForSelection={(item) => {
                                    return item;
                                }}
                            />
                        </View>
                    }
                    {addOrUpdate === 'new' &&
                        <View style={styles.inputFieldContainer}>
                            <Text style={styles.label}>Product Name</Text>
                            <TextInput style={styles.inputField} />
                        </View>
                    }
                    {addOrUpdate &&
                        <View style={styles.inputFieldContainer}>
                            <Text style={styles.label}>Manufacturer</Text>
                            <TextInput style={styles.inputField} />
                        </View>
                    }
                    {addOrUpdate &&
                        <View style={styles.inputFieldContainer}>
                            <Text style={styles.label}>Supplier</Text>
                            <TextInput style={styles.inputField} />
                        </View>
                    }
                    {addOrUpdate &&
                        <View style={styles.inputFieldContainer}>
                            <Text style={styles.label}>Quantity</Text>
                            <TextInput style={styles.inputField} keyboardType="number-pad" />
                        </View>
                    }
                    {addOrUpdate &&
                        <View style={styles.buttonContainer}>
                            {/* <TouchableOpacity onPress={backToMainMenu} style={styles.button}>
                                <Text style={styles.buttonText}>Back</Text>
                            </TouchableOpacity> */}
                            <TouchableOpacity onPress={whileClosingTheModal} style={styles.button}>
                                <Text style={styles.buttonText}>{addOrUpdate === 'new' ? "Add" : "Update"}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={whileClosingTheModal} style={styles.button}>
                                <Text style={styles.buttonText}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    }
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
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
    button: {
        padding: 10,
        backgroundColor: Colors.redHeaderButton,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        color: 'white',
        fontSize: 12,
        textAlign: 'center'
    },
    buttonContainer: {
        flexDirection: 'row',
        gap: 10
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
    dropDownIconStyle: {
        width: 10,
        height: 10
    },
    selectDropDownText: {
        fontSize: 16
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
        fontSize: 16
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
        paddingVertical: 1,
        paddingHorizontal: 5
    },
    selectedRowStyle: {
        backgroundColor: Colors.redHeaderButton
    }
});
