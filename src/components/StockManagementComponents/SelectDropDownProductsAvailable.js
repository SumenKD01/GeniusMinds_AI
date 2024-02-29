import { FlatList, Image, Modal, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from 'react-native';
import { Colors } from '../../utils/Colors1';
import { useState } from 'react';
 
export default SelectDropDown = ({ isVisible, dataGiven, setItemFunc, onClose, setProduct }) => {
    const [selectedItem, setSelectedItem] = useState("");
    const pathImages = "../../../assets/icons/StockManagement/Icons/";
    console.log(dataGiven);
 
    function tickSetter(option) {
        setSelectedItem(option.productCode);
        setItemFunc(option.productName);
        setProduct(option);
        onClose();
    }
 
    return (
        <Modal style={styles.container} visible={isVisible} animationType="fade" transparent={true}>
            <TouchableOpacity style={styles.modalBackground} onPress={onClose}>
                <TouchableOpacity style={styles.modalContent} activeOpacity={1}>
                    <Text style={{ fontWeight: 'bold', fontSize: 16, backgroundColor: Colors.darkBlue, padding: 9, color: Colors.white, borderBottomWidth: 1 }}>Select Product </Text>
                    <View style={styles.tableLabel}>
                        <Text style={[{ fontWeight: 'bold' },styles.selectRowItemStyleForCode]}>Code</Text>
                        <Text style={[{ fontWeight: 'bold' }, styles.selectRowItemStyleForProduct]}> Product Name</Text>
                        <Text style={[{ flex: 3, fontWeight: 'bold' }, styles.selectRowItemStyleForAvailability]}>Available</Text>
                    </View>
                    <FlatList
                        data={dataGiven}
                        contentContainerStyle={styles.allProductList}
                        renderItem={({ item }) =>
                            <TouchableOpacity style={[styles.listItem,{backgroundColor: selectedItem === item.productCode?Colors.stockCardColor:Colors.modalGrayBackground}]} onPress={() => tickSetter(item)}>
                                <Text style={[styles.selectRowItemStyleForCode,{color: selectedItem === item.productCode?'white':'black'}]}>{item.productCode}</Text>
                                <Text style={[styles.selectRowItemStyleForProduct,{color: selectedItem === item.productCode?'white':'black'}]}>  {item.productName}</Text>
                                <Text style={[styles.selectRowItemStyleForAvailability,{color: selectedItem === item.productCode?'white':'black'}]}>{item.quantityAdded}</Text>
                            </TouchableOpacity>
                        }
                    />
                    <TouchableHighlight onPress={onClose} style={styles.closeCrossbutton} underlayColor={Colors.redHeaderButton}  >
                        <Image source={require(pathImages + 'cross.png')} style={styles.closeIconStyle} />
                    </TouchableHighlight>
                </TouchableOpacity>
            </TouchableOpacity>
        </Modal>
    );
}
 
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
    },
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.transparency,
    },
    modalContent: {
        backgroundColor: Colors.white,
        elevation: 5,
        width: 330,
        height: 300
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
    allProductList: {
        marginHorizontal: -10
    },
    tableLabel: {
        flexDirection: 'row',
        paddingVertical: 10,
        borderBottomWidth: 1
    },
    tickIcon: {
        width: 15,
        height: 15
    },
    listItem: {
        flexDirection: 'row',
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderBottomWidth: 0.2,
        justifyContent: 'space-between',
        backgroundColor: Colors.modalGrayBackground
    },
    selectRowItemStyleForCode: {
        flex: 2,
        textAlign: 'center'
    },
    selectRowItemStyleForProduct: {
        flex: 7,
        paddingLeft: 10,
        borderLeftWidth: 1
    },
    selectRowItemStyleForAvailability: {
        flex: 3,
        paddingLeft: 10,
        borderLeftWidth: 1
    }
});