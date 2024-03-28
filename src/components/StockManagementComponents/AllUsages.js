import {
	ActivityIndicator,
	Dimensions,
	FlatList,
	Image,
	Modal,
	RefreshControl,
	StatusBar,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from 'react-native';
import { useState, useEffect, useCallback, useRef } from 'react';
import EachUsageCard from './EachUsageCard';
import { Colors } from '../../utils/Colors1';
import APICall from '../../utils/APICall';
import CustomButton from '../../utils/CustomButton';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Animatable from 'react-native-animatable';
import ReportFilter from './ReportFilter';

const deviceHeight = Dimensions.get('window').height;

export default AllUsages = () => {
	const pathImages = '../../../assets/icons/';
	const currentDate = new Date();
	const todate = getDateForAPI(currentDate, 'to');
	const fromdate = getDateForAPI(currentDate, 'from');
	const apiGot =
		'https://androidapi220230605081325.azurewebsites.net/api/approval/Getviolation?PlantName=SEIPL,BLR';
	const jsonDataToPassInApi = {
		PlantName: 'SEIPL,BLR',
		FromDate: fromdate,
		ToDate: todate,
		OffsetRecords: '0',
		NextRecords: '1000',
	};

	const [usageFormModalView, setUsageFormModalView] = useState(false);
	const [data, setData] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [apiError, setAPIError] = useState(false);
	const [refreshing, setRefreshing] = useState(false);
	const [firstDataToDisplay, setfirstDataToDisplay] = useState('0');
	const [nextRecords, setNextRecords] = useState('10');
	const [totalRecords, setTotalRecords] = useState(0);
	const [filterModalView, setFilterModalView] = useState(false);

	const flatListRef = useRef(null);
	
	const onRefresh = useCallback(() => {
		setRefreshing(true);
		setTimeout(() => {
			setRefreshing(false);
		}, 2000);
	}, [firstDataToDisplay]);

	useEffect(() => {
		APICall(apiGot, jsonDataToPassInApi, resultReport, 'getReport');
	}, [refreshing, firstDataToDisplay, nextRecords]);

	const scrollToTop = () => {
		flatListRef.current.scrollToOffset({ animated: true, offset: 0 });
	};

	//Result after Usage Report has been captured
	function resultReport(dataGot, apiError) {
		if (apiError) {
			setIsLoading(false);
			setAPIError(true);
		} else {
			if (dataGot.length) {
				dataGot = dataGot.reverse();
				setTotalRecords(dataGot.length);
				setData(dataGot.slice(firstDataToDisplay, nextRecords));
				setIsLoading(false);
			} else {
				setIsLoading(false);
			}
		}
	}

	//Date Processing For API
	function getDateForAPI(date, opt) {
		if (opt === 'from') {
			date.setFullYear(date.getFullYear() - 3);
		}
		const day = String(date.getDate()).padStart(2, '0');
		const month = String(date.getMonth() + 1).padStart(2, '0');
		const year = date.getFullYear();
		return `${year}-${month}-${day}`;
	}

	//Usage Form Opening
	function usageFormOpen() {
		setUsageFormModalView(true);
	}

	function usageFormClose() {
		setUsageFormModalView(false);
	}

	function proceedToNextPage() {
		setfirstDataToDisplay(Number(firstDataToDisplay) + 10 + '');
		setNextRecords(Number(nextRecords) + 10 + '');
		scrollToTop();
	}

	function proceedToFirstPage() {
		scrollToTop();
		setfirstDataToDisplay('0');
		setNextRecords('10');
	}

	function proceedToPreviousPage() {
		if (firstDataToDisplay >= 10) {
			scrollToTop();
			setfirstDataToDisplay(Number(firstDataToDisplay) - 10 + '');
			setNextRecords(Number(nextRecords) - 10 + '');
		}
	}
	
	function toggleFilterModal(){
		setFilterModalView(filterModalView?false:true);
	}

	return (
		<SafeAreaView style={{ paddingTop: -50, flex: 1 }}>
			<LinearGradient colors={['#000C18', '#001E3E']} style={styles.UsageBody}>
				<LinearGradient colors={['rgba(49, 81, 111, 0.5)', 'rgba(9, 42, 73, 0.5)']}
					start={{ x: 0.0, y: 0.25 }}
					end={{ x: 0.5, y: 1.0 }} locations={[0.5, 1]}
					style={{ width: '100%', alignItems: 'center', position: 'absolute', top: 0 }}>
					<View style={{ flexDirection: 'row', alignItems: "center", width: '100%', paddingHorizontal: 7, paddingTop: 15, gap: 10 }}>
						<View style={{ flex: 17, backgroundColor: 'rgba(255, 255, 255, 0.5)', paddingHorizontal: 20, paddingVertical: 5, borderRadius: 50, flexDirection: "row", gap: 10, alignItems: "center" }}>
							<Image style={{ width: 20, height: 20 }} source={require('../../../assets/icons/SearchWhite.png')} />
							<TextInput
								placeholder="Search camera serial number"
								placeholderTextColor={'rgba(232, 232, 232, 1)'}
							>
							</TextInput>
						</View>
						<TouchableOpacity style={{ flex: 2}} onPress={toggleFilterModal}>
							<Image style={{ width: 30, height: 30 }} source={require('../../../assets/icons/filter.png')} />
						</TouchableOpacity>
					</View>
					<View style={{ flexDirection: 'row', gap: 10, marginTop: 10, marginBottom: 15 }}>
						<TouchableOpacity style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)', borderRadius: 50, paddingHorizontal: 10, paddingVertical: 5, justifyContent: "center" }}>
							<Text style={{ color: '#FFFFFF' }}>Today</Text>
						</TouchableOpacity>
						<TouchableOpacity style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)', borderRadius: 50, paddingHorizontal: 10, paddingVertical: 5, justifyContent: "center" }}>
							<Text style={{ color: '#FFFFFF' }}>This Week</Text>
						</TouchableOpacity>
						<TouchableOpacity style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)', borderRadius: 50, paddingHorizontal: 10, paddingVertical: 5, justifyContent: "center" }}>
							<Text style={{ color: '#FFFFFF' }}>This Month</Text>
						</TouchableOpacity>
						<TouchableOpacity style={{ backgroundColor: 'yelrgba(255, 255, 255, 0.5)low', borderRadius: 50, paddingHorizontal: 10, paddingVertical: 5, justifyContent: "center" }}>
							<Text style={{ color: '#FFFFFF' }}>This Year</Text>
						</TouchableOpacity>
					</View>
				</LinearGradient>
				{isLoading ? (
					<View style={styles.errorPage}>
						<View style={{ width: 150, height: 150, borderRadius: 100, borderWidth: 10, borderColor: 'rgba(160, 217, 251, 0.5)', justifyContent: 'center', alignItems: 'center', padding: 10 }}>
							<View style={{ width: 125, height: 125, borderRadius: 100, overflow: 'hidden', borderWidth: 2, borderColor: 'rgba(254, 254, 254, 0.9)', justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent' }}>
								<Image
									source={require('../../../assets/icons/loader.gif')}
									style={{ width: 100, height: 150, objectFit: 'contain', right: 5, bottom: 10 }}
								/>
								<Animatable.Image animation={'slideInLeft'} duration={2000} direction="alternate" iterationCount={'infinite'} source={require('../../../assets/icons/SeaImage.png')} style={{ width: '200%', height: 250, position: 'absolute', zIndex: 0, bottom: 0, left: '-10%', opacity: 0.5 }} />
							</View>
						</View>
					</View>
				) : apiError ? (
					<View style={styles.errorPage}>
						<Image
							source={require(pathImages + 'concentrate.png')}
							style={styles.errorIcon}
						/>
						<Text style={styles.errorPageText}>{'Internal Server Error!'}</Text>
					</View>
				) : data.length ? (
					<View style={{ paddingHorizontal: 10, paddingTop: 120 }}>
						<FlatList
							data={data}
							ref={flatListRef}
							contentContainerStyle={styles.UsageDisplayBody}
							renderItem={({ item }) => (
								<EachUsageCard
									productName={item.fileName}
									timing={item.creation_Datetime}
									reason={item.violations}
									providedTo={item.cam_Serialno}
								/>
							)}
							refreshControl={
								<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
							}
							ListFooterComponent={
								<View
									style={{
										flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 10,
										padding: 10,
										width: '100', zIndex: 2,
									}}
								>
									{firstDataToDisplay !== '0' && (
										<CustomButton
											textPassed={'Previous'}
											functionPassed={proceedToPreviousPage}
											colorPassed={Colors.white}
											textColor={Colors.black}
											borderColor={Colors.black}
										/>
									)}
									{firstDataToDisplay !== '0' && (
										<CustomButton
											textPassed={'First Page'}
											functionPassed={proceedToFirstPage}
											colorPassed={Colors.white}
											textColor={Colors.black}
											borderColor={Colors.black}
										/>
									)}
									{Number(firstDataToDisplay) + 10 < totalRecords && (
										<CustomButton
											textPassed={'Next'}
											functionPassed={proceedToNextPage}
											colorPassed={Colors.white}
											textColor={Colors.black}
											borderColor={Colors.black}
										/>
									)}
								</View>
							}
						/>
					</View>
				) : (
					<View style={styles.errorPage}>
						<Image
							source={require(pathImages + 'no-data.png')}
							style={styles.errorIcon}
						/>
						<Text style={styles.errorPageText}>{'No Data Available!'}</Text>
					</View>
				)}
				<Image
					source={require('../../../assets/icons/ReportBackImage.png')}
					style={{ width: '100%', bottom: 0, height: 220, position: 'absolute' }}
				/>
			</LinearGradient>
			<ReportFilter onClose={toggleFilterModal} isVisible={filterModalView}/>
			<StatusBar backgroundColor={'rgba(0, 0, 0, 1)'} barStyle={'light-content'} />
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	UsageBody: {
		gap: 10
	},
	UsageDisplayBody: {
		paddingBottom: deviceHeight - 300,
		gap: 10
	},
	UsageButtons: {
		backgroundColor: Colors.redHeaderButton,
		position: 'absolute',
		bottom: 200,
		right: 30,
		padding: 10,
		width: 110,
		height: 50,
		borderRadius: 10,
		justifyContent: 'center',
		alignItems: 'center',
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.3,
		shadowRadius: 4,
		elevation: 5,
	},
	buttonContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingVertical: 10,
		paddingRight: 15,
		marginTop: 10,
		borderBottomWidth: 1,
	},
	buttonText: {
		color: Colors.white,
		fontSize: 12,
		textAlign: 'center',
	},
	heading: {
		color: Colors.white,
		fontWeight: 'bold',
		fontSize: 16,
		backgroundColor: Colors.gray,
		padding: 10,
		paddingHorizontal: 10,
		paddingRight: 40,
		borderTopRightRadius: 30,
		borderBottomRightRadius: 30,
	},
	plusIcon: {
		position: 'absolute',
		width: 20,
		height: 20,
		right: -26,
		top: -21,
	},
	errorIcon: {
		height: 110,
		width: 110,
		marginBottom: 10
	},
	noMoreDataDisplay: {
		color: Colors.gray,
		padding: 20,
		alignSelf: 'center',
	},
	tapRefresh: {
		backgroundColor: Colors.white,
		alignSelf: 'center',
		paddingHorizontal: 30,
		paddingVertical: 10,
		overflow: 'hidden',
		borderBottomLeftRadius: 50,
		borderBottomRightRadius: 50,
		borderWidth: 0.2,
		borderTopWidth: 0,
		borderColor: Colors.gray,
	},
	tapRefreshIcon: {
		height: 20,
		width: 20,
	},
	errorPage: {
		height: 700,
		width: '100%',
		alignItems: 'center',
		justifyContent: 'center'
	},
	errorPageText: {
		fontSize: 20,
		textAlign: 'center',
		color: 'white',
		fontFamily: 'Poppins_SemiBold'
	},
	nextPrevButton: {
		width: 40,
		height: 40,
	},
});
