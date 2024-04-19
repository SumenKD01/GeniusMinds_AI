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
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';
import ReportFilter from './ReportFilter';
import EachViolationCard from './EachViolationCard';
import { Colors } from '../utils/Colors1';
import APICall from '../utils/APICall';
import CustomButton from '../utils/CustomButton';

const deviceHeight = Dimensions.get('window').height;

export default AllViolations = () => {
	const pathImages = '../../assets/icons/';
	const currentDate = new Date();
	const [todate, setToDate] = useState(getDateForAPI(currentDate, 'to'));
	const [fromdate, setFromDate] = useState(getDateForAPI(currentDate, 'from'));
	const apiGot = 'https://androidapi220230605081325.azurewebsites.net/api/approval/GetviolationByDate?PlantName=SEIPL,BLR&Fromdate=' + fromdate + '&todate=' + todate;
	console.log(apiGot);

	const jsonDataToPassInApi = {
		PlantName: 'SEIPL,BLR'
	};

	const [data, setData] = useState([]);
	const [apiData, setApiData] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [apiError, setAPIError] = useState(false);
	const [refreshing, setRefreshing] = useState(false);
	const [firstDataToDisplay, setfirstDataToDisplay] = useState(0);
	const [nextRecords, setNextRecords] = useState(10);
	const [totalRecords, setTotalRecords] = useState(0);
	const [filterModalView, setFilterModalView] = useState(false);

	const [todayfilterButton, setTodayFilterButton] = useState(false);
	const [weekfilterButton, setWeekFilterButton] = useState(false);
	const [monthfilterButton, setMonthFilterButton] = useState(false);
	const [yearfilterButton, setYearFilterButton] = useState(false);
	const [filterButtonSelected, setFilterButtonSelected] = useState('');

	const flatListRef = useRef(null);

	const onRefresh = useCallback(() => {
		setRefreshing(true);
		setTimeout(() => {
			setRefreshing(false);
		}, 2000);
	}, [firstDataToDisplay]);

	useEffect(() => {
		APICall(apiGot, jsonDataToPassInApi, resultReport, 'getReport');
	}, [refreshing, todate, fromdate]);

	const scrollToTop = () => {
		flatListRef.current.scrollToOffset({ animated: true, offset: 0 });
	};

	function resultReport(dataGot, apiError) {
		if (apiError) {
			console.log("Error is there");
			setIsLoading(false);
			setAPIError(true);
		} else {
			if (dataGot.length) {
				console.log("Error is not there");
				dataGot = dataGot.reverse();
				setTotalRecords(dataGot.length);
				setData(dataGot.slice(firstDataToDisplay, nextRecords));
				setApiData(dataGot);
				setIsLoading(false);
			} else {  
				setData([]);
				setApiData([]);
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

	function proceedToNextPage() {
		setData(apiData.slice(firstDataToDisplay + 10, nextRecords + 10));
		setfirstDataToDisplay(firstDataToDisplay + 10);
		setNextRecords(nextRecords + 10);
		scrollToTop();
	}

	function proceedToFirstPage() {
		setData(apiData.slice(0, 10));
		setfirstDataToDisplay(0);
		setNextRecords(10);
		scrollToTop();
	}

	function proceedToPreviousPage() {
		if (firstDataToDisplay >= 10) {
			setData(apiData.slice(firstDataToDisplay - 10, nextRecords - 10));
			setfirstDataToDisplay(firstDataToDisplay - 10);
			setNextRecords(nextRecords - 10);
		}
	}

	function toggleFilterModal() {
		setFilterModalView(filterModalView ? false : true);
	}

	function searchFromAvailableReport(text) {
		if (text === "") {
			setData(apiData);
		}
		let filteredReport = apiData.filter((eachItem) => (eachItem.cam_Serialno.includes(text)));
		setData(filteredReport);
	}

	const selectedFilterButtonStyle = {
		backgroundColor: '#D9D9D9',
		borderRadius: 50,
		paddingHorizontal: 10,
		paddingVertical: 5,
		justifyContent: "center"
	}

	function changeToFromDate(option) {
		setIsLoading(true);
		if (option === filterButtonSelected) {
			setFromDate(getDateForAPI(currentDate, 'from'));
			setTodayFilterButton(false);
			setWeekFilterButton(false);
			setMonthFilterButton(false);
			setYearFilterButton(false);
			return;
		}
		switch (option) {
			case 'today':
				console.log("Today", fromdate, todate);
				setFromDate(todate);
				setTodayFilterButton(true);
				setWeekFilterButton(false);
				setMonthFilterButton(false);
				setYearFilterButton(false);
				setFilterButtonSelected(option);
				break;
			case 'week':
				var curr = new Date();
				day = curr.getDay();
				firstday = new Date(curr.getTime() - 60 * 60 * 24 * day * 1000);
				setFromDate(getDateForAPI(firstday));
				setTodayFilterButton(false);
				setWeekFilterButton(true);
				setMonthFilterButton(false);
				setYearFilterButton(false);
				setFilterButtonSelected(option);
				console.log("Week");
				break;
			case 'month':
				var curr = new Date();
				firstday = new Date(curr.getFullYear(), curr.getMonth(), 1);
				setFromDate(getDateForAPI(firstday));
				setTodayFilterButton(false);
				setWeekFilterButton(false);
				setMonthFilterButton(true);
				setYearFilterButton(false);
				setFilterButtonSelected(option);
				console.log("Month");
				break;
			case 'year':
				var curr = new Date();
				firstday = new Date(curr.getFullYear(), 0, 1);
				setFromDate(getDateForAPI(firstday));
				setTodayFilterButton(false);
				setWeekFilterButton(false);
				setMonthFilterButton(false);
				setYearFilterButton(true);
				setFilterButtonSelected(option);
				console.log("Year");
		}
	}

	return (
		<View style={{ paddingTop: -50, flex: 1 }}>
			<LinearGradient colors={['#000C18', '#001E3E']} style={styles.UsageBody}>
				<LinearGradient colors={['rgba(49, 81, 111, 0.5)', 'rgba(9, 42, 73, 0.5)']}
					start={{ x: 0.0, y: 0.25 }}
					end={{ x: 0.5, y: 1.0 }}
					locations={[0.5, 1]}
					style={{ width: '100%', alignItems: 'center', position: 'absolute', top: 0, zIndex: 4 }}>
					<View style={{ flexDirection: 'row', alignItems: "center", width: '100%', paddingHorizontal: 7, paddingTop: 15, gap: 10 }}>
						<View style={{ flex: 17, backgroundColor: 'rgba(255, 255, 255, 0.5)', paddingHorizontal: 20, paddingVertical: 5, borderRadius: 50, flexDirection: "row", gap: 10, alignItems: "center" }}>
							<Image style={{ width: 20, height: 20 }} source={require('../../assets/icons/SearchWhite.png')} />
							<TextInput
								placeholder="Search camera serial number"
								placeholderTextColor={'rgba(232, 232, 232, 1)'}
								onChangeText={searchFromAvailableReport}
								style={{ color: 'white' }}
							>
							</TextInput>
						</View>
						<TouchableOpacity style={{ flex: 2 }} onPress={toggleFilterModal}>
							<Image style={{ width: 30, height: 30 }} source={require('../../assets/icons/filter.png')} />
						</TouchableOpacity>
					</View>
					<View style={{ flexDirection: 'row', gap: 10, marginTop: 10, marginBottom: 15 }}>
						<TouchableOpacity style={todayfilterButton ? selectedFilterButtonStyle : styles.filterButton} onPress={() => changeToFromDate('today')}>
							<Text style={{ color: todayfilterButton ?'black':'#FFFFFF'  }}>Today</Text>
						</TouchableOpacity>
						<TouchableOpacity style={weekfilterButton ? selectedFilterButtonStyle : styles.filterButton} onPress={() => changeToFromDate('week')}>
							<Text style={{ color: weekfilterButton ?'black':'#FFFFFF'  }}>This Week</Text>
						</TouchableOpacity>
						<TouchableOpacity style={monthfilterButton ? selectedFilterButtonStyle : styles.filterButton} onPress={() => changeToFromDate('month')}>
							<Text style={{ color: monthfilterButton ?'black':'#FFFFFF'  }}>This Month</Text>
						</TouchableOpacity>
						<TouchableOpacity style={yearfilterButton ? selectedFilterButtonStyle : styles.filterButton} onPress={() => changeToFromDate('year')}>
							<Text style={{ color: yearfilterButton ?'black':'#FFFFFF'  }}>This Year</Text>
						</TouchableOpacity>
					</View>
				</LinearGradient>
				{isLoading ? (
					<View style={styles.errorPage}>
						{console.log("Today", fromdate, todate)}
						<View style={{ width: 150, height: 150, borderRadius: 100, borderWidth: 10, borderColor: 'rgba(160, 217, 251, 0.5)', justifyContent: 'center', alignItems: 'center', padding: 10 }}>
							<View style={{ width: 125, height: 125, borderRadius: 100, overflow: 'hidden', borderWidth: 2, borderColor: 'rgba(254, 254, 254, 0.9)', justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent' }}>
								<Image
									source={require('../../assets/icons/loader.gif')}
									style={{ width: 100, height: 150, objectFit: 'contain', right: 5, bottom: 10, transform: [{ rotateY: '180deg' }] }}
								/>
								<Animatable.Image animation={'slideInLeft'} duration={2000} direction="alternate" iterationCount={'infinite'} source={require('../../assets/icons/SeaImage.png')} style={{ width: '200%', height: 250, position: 'absolute', zIndex: 0, bottom: 0, left: '-10%', opacity: 0.5 }} />
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
					<View style={{ paddingHorizontal: 10, paddingTop: 120, zIndex: 1 }}>
						<FlatList
							data={data}
							ref={flatListRef}
							contentContainerStyle={styles.UsageDisplayBody}
							renderItem={({ item }, index) => (
								<EachViolationCard
									key={index + 1}
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
										width: '100%', zIndex: 100, position: 'absolute'
									}}
								>
									{firstDataToDisplay !== 0 && (
										<CustomButton
											textPassed={'Previous'}
											functionPassed={proceedToPreviousPage}
											colorPassed={'rgba(252,252,252,0.5)'}
											textColor={Colors.white}
											borderColor={Colors.white}
										/>
									)}
									{firstDataToDisplay !== 0 && (
										<CustomButton
											textPassed={'First Page'}
											functionPassed={proceedToFirstPage}
											colorPassed={'rgba(252,252,252,0.5)'}
											textColor={Colors.white}
											borderColor={Colors.white}
										/>
									)}
									{Number(firstDataToDisplay) + 10 < totalRecords && (
										<CustomButton
											textPassed={'Next'}
											functionPassed={proceedToNextPage}
											colorPassed={'rgba(252,252,252,0.5)'}
											textColor={Colors.white}
											borderColor={Colors.white}
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
					source={require('../../assets/icons/ReportBackImage.png')}
					style={{ width: '100%', bottom: 0, height: 220, position: 'absolute', zIndex: 0 }}
				/>
			</LinearGradient>
			<ReportFilter onClose={toggleFilterModal} isVisible={filterModalView} />
			<StatusBar backgroundColor={'rgba(50, 80, 130, 1)'} barStyle={'light-content'} />
		</View>
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
	filterButton: {
		backgroundColor: 'rgba(255, 255, 255, 0.5)',
		borderRadius: 50,
		paddingHorizontal: 10,
		paddingVertical: 5,
		justifyContent: "center"
	}
});