import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import EachStockCard from "./EachStockCard";
import ProductFormModal from './ProductFormModal';
import { useState } from "react";
import { Colors } from "../../utils/Colors1";

import { useNavigation } from "@react-navigation/native";
// import Heading from "../utils/Heading";

export default AllStocks = () => {
    const allStocksData = require('../../../assets/json/StockManagementData/stocks.json');

    const [productFormModalView, setProductFormModalView] = useState(false);
    const pathImages = "../../../assets/icons/StockManagement/Icons/";
    const navigation=useNavigation();

    function productFormToggle() {
        setProductFormModalView(productFormModalView === true ? false : true);
    }

    return (
        <View>
            
            {/* <View style={styles.buttonContainer}>
                <Heading textPassed={"Current Stock"} />
                <TouchableOpacity style={styles.stockButtons} onPress={productFormToggle}>
                    <Text style={styles.buttonText}>Add New Product</Text>
                    <Image source={require('../assets/Icons/add.png')} style={styles.plusIcon} />
                </TouchableOpacity>
            </View> */}
            <View style={{ justifyContent: 'center' }}>
                <FlatList
                    data={allStocksData}
                    contentContainerStyle={styles.stockBody}
                    renderItem={({ item }) =>
                        <EachStockCard itemName={item.name} totalAvailable={item.available} totalUsed={item.used} manName={item.manufacturer} supName={item.supplier} />}
                />
            </View>
            <ProductFormModal isVisible={productFormModalView} onClose={productFormToggle} />
            <View style={styles.stockButtons}>
                <TouchableOpacity onPress={productFormToggle}>
                    <Text style={styles.buttonText}>Add New</Text>
                    <Text style={styles.buttonText}>Product</Text>
                    <Image source={require(pathImages+'add.png')} style={styles.plusIcon} />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    stockBody: {
        flexDirection: 'row',
        width: '87.5%',
        flexWrap: 'wrap',
        alignSelf: 'center',
        paddingBottom: 280,
        paddingTop: 20,
        gap: 10,
        width: 310
    },
    stockButtons: {
        backgroundColor: Colors.redHeaderButton,
        padding: 10,
        position: 'absolute',
        bottom: 200,
        right: 30,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
    buttonContainer: {
        flexDirection: 'row',
        gap: 20,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: 10,
    },
    buttonText: {
        color: Colors.white,
        fontSize: 12,
        textAlign: 'center'
    },
    heading: {
        color: Colors.white,
        fontWeight: 'bold',
        fontSize: 16,
        backgroundColor: Colors.gray,
        padding: 10,
        paddingHorizontal: 30,
        paddingRight: 40,
        right: 30,
        borderTopRightRadius: 30,
        borderBottomRightRadius: 30,
    },
    plusIcon: {
        position: 'absolute',
        width: 20,
        height: 20,
        right: -21,
        top: -21
    }
});