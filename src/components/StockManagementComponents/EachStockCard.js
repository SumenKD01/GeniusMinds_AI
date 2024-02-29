import { Image, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';
import { useState } from "react";
import { Colors } from "../../utils/Colors1";

export default EachStockCard = ({ itemName, totalAvailable, totalUsed, manName, supName }) => {
    const [showManufacturerSupplier, setShowManufacturerSupplier] = useState(false);
    const [showAnimation, setShowAnimation] = useState("slideInDown"); 
    
    const stockCardColor = Colors.stockCardColor;

    const pathImages = "../../../assets/icons/StockManagement/Icons/";

    function showManufacturerSupplierFunc() {
        setShowManufacturerSupplier(true);
        setShowAnimation("slideInDown");
        setTimeout(() => {
            setShowAnimation("slideInUp");
            setShowManufacturerSupplier(false);
        }, 4 * 1000);
    }
    return (
        <Animatable.View animation="bounceInDown">
            <TouchableOpacity onPress={showManufacturerSupplierFunc}>
                <LinearGradient colors={[stockCardColor, stockCardColor, Colors.lightBlue, stockCardColor, stockCardColor]} start={[0.0, 0.0]}
                    end={[1.0, 1.0]} style={styles.card}>
                    {!showManufacturerSupplier &&
                        <View>
                            <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center', marginBottom: 10 }}>
                                <Image source={require(pathImages+'cubes.png')} style={styles.iconStyle} />
                                <Text style={styles.usedStock}>{itemName}</Text>
                            </View>
                            <Text style={styles.label}>Available:</Text>
                            <Text style={styles.availableStock}>{totalAvailable}</Text>
                            <Text style={styles.label}>Used:</Text>
                            <Text style={styles.usedStock}>{totalUsed}</Text>
                        </View>
                    }
                    {showManufacturerSupplier &&
                        <Animatable.View animation={showAnimation} style={styles.manufactureCard} duration={1000}>
                            <View style={{ flex: 1 }}>
                                <Text style={styles.manLabel}>Manufacturer Name:</Text>
                                <Text style={styles.manSupStyle}>{manName}</Text>
                            </View>
                            <View style={{ flex: 1 }}>
                                <Text style={styles.manLabel}>Supplier Name:</Text>
                                <Text style={styles.manSupStyle}>{supName}</Text>
                            </View>
                        </Animatable.View>
                    }
                </LinearGradient>
            </TouchableOpacity>
        </Animatable.View >
    );
}

const styles = StyleSheet.create({
    iconStyle: {
        width: 30,
        height: 30
    },
    card: {
        width: 150,
        height: 180,
        borderRadius: 10,
        padding: 10
    },
    availableStock: {
        color: '#ffffff',
        fontSize: 40,
        borderBottomWidth: 0.2,
        borderBottomColor:  '#ffffff',
        marginBottom: 10,
        marginTop: -10,
        paddingLeft: 10
    },
    usedStock: {
        color:  '#ffffff',
        fontSize: 20,
    },
    label: {
        color: '#ffffff',
        fontSize: 10
    },
    manLabel: {
        color: 'red',
        fontSize: 10
    },
    manSupStyle: {
        fontSize: 15,
        color: '#ffffff'
    },
    manufactureCard: {
        position: 'absolute',
        padding: 10,
        gap: 10,
        backgroundColor: '#ffffff',
        width: 150,
        height: 180
    }
})