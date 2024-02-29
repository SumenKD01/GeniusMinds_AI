import { Modal, StyleSheet, Text, View } from "react-native"
import { Colors } from "../../utils/Colors1"
import CustomButton from "../../utils/CustomButton";

export default UsageEnteredMessage = ({ isVisible, onClose, message, continuing }) => {
    return (
        <Modal style={styles.container} visible={isVisible} animationType="fade" transparent={true}>
            <View style={styles.modalBackground}>
                <View style={styles.modalContent}>
                    {message === "Success" ?
                        <View>
                            <Text style={{ color: Colors.greenTag, alignSelf: 'center', textAlign: 'center', paddingBottom: 20 }}>
                                Usage Details has been entered successfully
                            </Text>
                            <Text>Want to add more consumptions / stocks ?</Text>
                            <View style={{ flexDirection: 'row', gap: 20, justifyContent: 'center', paddingTop: 20 }}>
                                <CustomButton functionPassed={onClose} colorPassed={Colors.darkBlue} textPassed={"Yes"} />
                                <CustomButton functionPassed={continuing} colorPassed={Colors.darkBlue} textPassed={"No"} />
                            </View>
                        </View> :
                        <View style={{ gap: 20, alignItems: 'center' }}>
                            <Text style={{ color: Colors.redHeaderButton, alignSelf: 'center', textAlign: 'center' }}>
                                Usage Details Submission Unsuccessfull
                            </Text>
                            <CustomButton functionPassed={onClose} colorPassed={Colors.darkBlue} textPassed={"OK"} />
                        </View>
                    }


                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        height: 250,
        padding: 10,
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
        width: 280,
        gap: 20,
        alignItems: 'center'
    }
});