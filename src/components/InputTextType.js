import { StyleSheet, TextInput } from "react-native";

export default InputTextType = ({ inputName, changeValue, value, type, placeholderStyle}) => {
    return (
        <TextInput
            style={!value ? styles.placeholderStyle : styles.inputField }
            placeholder={inputName}
            onChangeText={changeValue} 
            value={value}
            textContentType={type === "email" ? 'emailAddress' : 'name'}
            secureTextEntry={inputName === "Password"}
            placeholderTextColor={'#D1CECE'}
        />
    );
}

const styles = StyleSheet.create({
    inputField: {
        backgroundColor: 'transparent',
        height: 45,
        padding: 10,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        width: '100%',
        fontFamily: "Poppins_Regular",
        fontSize: 15,
        color: 'white'
    },
    placeholderStyle: {
        backgroundColor: 'transparent',
        height: 45,
        padding: 10,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        width: '100%',
        fontFamily: "Poppins_Regular",
        fontSize: 15,
        color: 'white',
        opacity: 0.4
    }
});