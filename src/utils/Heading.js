import { StyleSheet } from "react-native";
import * as Animatable from 'react-native-animatable';
import { Colors } from "./Colors1";

export default Heading = ({textPassed}) => {
    return (
        <Animatable.Text style={styles.heading} animation="slideInLeft">
            {textPassed}
        </Animatable.Text>
    );
}

const styles = StyleSheet.create({
    heading: {
        color: Colors.white,
        fontWeight: 'bold',
        fontSize: 16,
        backgroundColor: Colors.gray,
        padding: 10,
        paddingHorizontal: 40,
        right: 30,
        borderTopRightRadius: 30,
        borderBottomRightRadius: 30,
    }
})