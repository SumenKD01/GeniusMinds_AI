import { LinearGradient } from "expo-linear-gradient";
import { Image, Modal, Text, TouchableOpacity, View } from "react-native";

export default ReportFilter = ({ isVisible, onClose }) => {
    console.log("I came here", isVisible, onClose);
    const fromDate = '15 Oct 2024';
    const typeOfViolations = ['Mask', 'Goggles', 'Fire Extinguisher', 'Vest', 'Fall Detection', 'Geofencing', 'Shoes', 'Helmet', 'Gloves', 'Posture'];
    return (
        <Modal visible={isVisible} transparent style={{ flex: 1 }}>
            <TouchableOpacity onPress={onClose} style={{ backgroundColor: 'rgba(52, 52, 52, 0.3)' }}>
                <TouchableOpacity activeOpacity={1}>
                    <LinearGradient colors={['rgba(140, 170, 212, 1)', 'rgba(24, 47, 77, 1)']} style={{ height: '100%', top: '23%', borderTopLeftRadius: 30, borderTopRightRadius: 30, padding: 20, alignItems: 'center' }}>
                        <Text style={{ fontFamily: "Poppins_SemiBold", fontSize: 20, color: 'white' }}>Filter</Text>
                        <View style={{ flexDirection: 'row', gap: 20 }}>
                            <View style={{ gap: 5, flex: 1 }}>
                                <Text style={{ fontSize: 14, fontFamily: 'Poppins_SemiBold', color: 'white', marginLeft: 10 }}>From</Text>
                                <TouchableOpacity style={{ flexDirection: 'row', backgroundColor: 'rgba(211, 211, 211, 0.3)', gap: 7, paddingHorizontal: 10, paddingVertical: 7, borderRadius: 10 }}>
                                    <Image source={require('../../../assets/icons/schedule-red.png')} style={{ width: 20, height: 20, marginRight: 7 }} />
                                    <Text style={{ fontSize: 16, fontFamily: 'Poppins_Regular', color: 'white' }}>{fromDate}</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ gap: 5, flex: 1 }}>
                                <Text style={{ fontSize: 14, fontFamily: 'Poppins_SemiBold', color: 'white', marginLeft: 'auto', marginRight: 10 }}>To</Text>
                                <TouchableOpacity style={{ flexDirection: 'row', backgroundColor: 'rgba(211, 211, 211, 0.3)', gap: 7, paddingHorizontal: 10, paddingVertical: 7, borderRadius: 10 }}>
                                    <Image source={require('../../../assets/icons/schedule-green.png')} style={{ width: 20, height: 20, marginRight: 7 }} />
                                    <Text style={{ fontSize: 16, fontFamily: 'Poppins_Regular', color: 'white' }}>{fromDate}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{ justifyContent: 'flex-start', width: '100%', marginTop: 20, gap: 7 }}>
                            <Text style={{ fontSize: 14, fontFamily: 'Poppins_SemiBold', color: 'white', marginLeft: 10 }}>Sort by</Text>
                            <View style={{ backgroundColor: 'rgba(211, 211, 211, 0.3)', borderRadius: 10, padding: 10 }}>
                                <TouchableOpacity style={{ flexDirection: 'row', gap: 10 }}>
                                    <Image source={require('../../../assets/icons/radio-button.png')} style={{ width: 20, height: 20 }} />
                                    <Text style={{ fontSize: 16, fontFamily: 'Poppins_Regular', color: 'white', bottom: 1 }}>Highest Violations</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ flexDirection: 'row', gap: 10 }}>
                                    <Image source={require('../../../assets/icons/radio-button.png')} style={{ width: 20, height: 20 }} />
                                    <Text style={{ fontSize: 16, fontFamily: 'Poppins_Regular', color: 'white', bottom: 1 }}>Lowest Violations</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ flexDirection: 'row', gap: 10 }}>
                                    <Image source={require('../../../assets/icons/radio-button.png')} style={{ width: 20, height: 20 }} />
                                    <Text style={{ fontSize: 16, fontFamily: 'Poppins_Regular', color: 'white', bottom: 1 }}>Most Recent</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{ justifyContent: 'flex-start', width: '100%', marginTop: 20, gap: 7, height: '25%' }}>
                            <Text style={{ fontSize: 14, fontFamily: 'Poppins_SemiBold', color: 'white', marginLeft: 10 }}>Select Violation Types</Text>
                            <View style={{ backgroundColor: 'rgba(211, 211, 211, 0.3)', borderRadius: 10, padding: 10, height: '100%', flexWrap: 'wrap', gap: 5, justifyContent: 'center' }}>
                                {
                                    typeOfViolations.map((eachItem) =>
                                        <TouchableOpacity style={{ flexDirection: 'row', gap: 5, marginRight: 15 }}>
                                            <Image source={require('../../../assets/icons/UncheckedBox.png')} style={{ width: 20, height: 20 }} />
                                            <Text style={{ fontSize: 16, fontFamily: 'Poppins_Regular', color: 'white', bottom: 1 }}>{eachItem}</Text>
                                        </TouchableOpacity>
                                    )
                                }
                            </View>
                        </View>
                        <View style={{ width: '100%', marginTop: 50, gap: 10, height: '25%', flexDirection: 'row' }}>
                            <TouchableOpacity style={{ flexDirection: 'row', gap: 10, flex: 1, justifyContent: 'center', backgroundColor: 'rgba(211, 211, 211, 0.3)', height: 40 , padding: 10, borderWidth: 1, borderColor: '#3AB8FF', borderRadius: 10}}>
                                <Text style={{ fontSize: 16, fontFamily: 'Poppins_Regular', color: 'white', bottom: 1 }}>Reset</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ flexDirection: 'row', gap: 10, flex: 1, justifyContent: 'center', backgroundColor: '#3AB8FF', height: 40 , padding: 10, borderRadius: 10}} onPress={onClose}>
                                <Text style={{ fontSize: 16, fontFamily: 'Poppins_Regular', color: 'white', bottom: 1 }}>Apply</Text>
                            </TouchableOpacity>
                        </View>
                    </LinearGradient>
                </TouchableOpacity>
            </TouchableOpacity>
        </Modal>
    )
}