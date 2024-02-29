import {
	ActivityIndicator,
	FlatList,
	Image,
	RefreshControl,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import { useState, useEffect, useCallback, useRef } from 'react';
import EachUsageCard from './EachUsageCard';
import UsageFormModal from './UsageFormModal';
import { Colors } from '../../utils/Colors1';
import APICall from '../../utils/APICall';
import { useNavigation } from '@react-navigation/native';
import CustomButton from '../../utils/CustomButton';
import { LinearGradient } from 'expo-linear-gradient';


export default AllUsages = () => {
	const [usageFormModalView, setUsageFormModalView] = useState(false);
	const [data, setData] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [apiError, setAPIError] = useState(false);
	const [refreshing, setRefreshing] = useState(false);
	const [firstDataToDisplay, setfirstDataToDisplay] = useState('0');
	const [nextRecords, setNextRecords] = useState('10');
	const [totalRecords, setTotalRecords] = useState(0);
	const flatListRef = useRef(null);
	const pathImages = '../../../assets/icons/StockManagement/Icons/';
	const navigation = useNavigation();

	const scrollToTop = () => {
		flatListRef.current.scrollToOffset({ animated: true, offset: 0 });
	};

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

	//Refreshing
	const onRefresh = useCallback(() => {
		setRefreshing(true);
		setTimeout(() => {
			setRefreshing(false);
		}, 2000);
	}, [firstDataToDisplay]);

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

	useEffect(() => {
		APICall(apiGot, jsonDataToPassInApi, resultReport, 'getReport');
	}, [refreshing, firstDataToDisplay, nextRecords]);

	return (
		<View>
			<LinearGradient colors={['#000C18', '#001E3E']} style={styles.UsageBody}>
				{isLoading ? (
					<View style={styles.errorPage}>
						<ActivityIndicator size='large' color={Colors.darkBlue} />
					</View>
				) : apiError ? (
					<View style={styles.errorPage}>
						<Image
							source={require(pathImages + '../concentrate.png')}
							style={styles.errorIcon}
						/>
						<Text style={styles.errorPageText}>{'Internal Server Error!'}</Text>
					</View>
				) : data.length ? (
					<View>
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
										flexDirection: 'row',
										flexWrap: 'wrap',
										justifyContent: 'center',
										gap: 10,
										padding: 10,
										width: '100%',
										zIndex: 2,
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
							source={require(pathImages + '../no-data.png')}
							style={styles.errorIcon}
						/>
						<Text style={styles.errorPageText}>{'No Data Available!'}</Text>
					</View>
				)}
				<UsageFormModal
					isVisible={usageFormModalView}
					onClose={usageFormClose}
				/>
			</LinearGradient>
		</View>
	);
};

const styles = StyleSheet.create({
	UsageBody: {
		gap: 10,
		paddingHorizontal: 10,
		paddingTop: 10
	},
	UsageDisplayBody: {
		paddingBottom: 380,
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
		height: 150,
		width: 150,
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
		height: 600,
		width: '100%',
		alignItems: 'center',
		justifyContent: 'center',
		position: 'absolute',
	},
	errorPageText: {
		fontSize: 30,
		textAlign: 'center',
	},
	nextPrevButton: {
		width: 40,
		height: 40,
	},
});
