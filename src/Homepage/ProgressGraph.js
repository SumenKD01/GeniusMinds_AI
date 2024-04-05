import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react';
import { BarChart, LineChartBicolor, PieChart, LineChart } from 'react-native-gifted-charts';

const ProgressGraph = () => {
  const [data, setData] = useState([]);
  const [dataDaily, setDataDaily] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [apiError, setAPIError] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const currentDate = new Date();

  // console.log(currentDate.getMonth()+1,'hdvhidfsjlbvkjofhsklvj');

  const apiGot =
    'https://androidapi220230605081325.azurewebsites.net/api/Violation/GetMonthlyViolation';
  const apiDaily =
    'https://androidapi220230605081325.azurewebsites.net/api/Violation/GetDailyViolation';


  const jsonDataToPassInApi = {
    PlantName: 'SEIPL,BLR',
    Year: '2024'
  };

  const jsonDataToPassInDaily = {
    "PlantName": "SEIPL,BLR",
    "Year": "2024",
    "Month": currentDate.getMonth() + 1 + ""
  };

  function resultReportMonthly(dataGot, apiError) {
    if (apiError) {
      setIsLoading(false);
      setAPIError(true);
    } else {
      let i = 1;
      let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      let newDataMap = Object.keys(dataGot).map((eachItem) => {
        return {
          stacks: [
            { value: dataGot[i + ""], color: '#F4D160' },
          ],
          label: months[(i++) - 1] + ""
        }
      });
      setIsLoading(false);
      setData(newDataMap);
    }
  }

  function resultReportDaily(dataGot, apiError) {
    if (apiError) {
      setIsLoading(false);
      setAPIError(true);
    } else {
      let i = 1;
      let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      let newDataMap = Object.keys(dataGot).map((eachItem) => {
        return {
          value: dataGot[eachItem],
          date: `${eachItem} ${months[currentDate.getMonth()-1]}`

        }
      });
      setIsLoading(false);
      setDataDaily(newDataMap);
    }
  }

  useEffect(() => {
    APICall(apiGot, jsonDataToPassInApi, resultReportMonthly, 'getReportForChart');
    APICall(apiDaily, jsonDataToPassInDaily, resultReportDaily, 'getReportForChart');
  }, [refreshing]);

  const barData = [{ value: 15 }, { value: 30 }, { value: 26 }, { value: 40 }];
  const pieData = [
    { value: 54, color: '#177AD5', text: '54%' },
    { value: 40, color: '#79D2DE', text: '30%' },
    { value: 20, color: '#ED6665', text: '26%' },
  ];

  const dailyDataTest = [
    { value: 160, date: '1 Mar' },
    { value: 180, date: '2 Mar' },
    { value: 190, date: '3 Mar' },
    { value: 180, date: '4 Mar' },
    {
      value: 140, date: '5 Mar', label: '05 Mar',
      labelTextStyle: { color: '#000', width: 60 },
    },
    { value: 145, date: '6 Mar' },
    { value: 160, date: '7 Mar' },
    { value: 200, date: '8 Mar' },

    { value: 220, date: '9 Mar' },
    {
      value: 240,
      date: '10 Mar 2024',
      labelTextStyle: { color: '#000', width: 60 },
      label: '10 Mar',

    },
    { value: 280, date: '11 Mar' },
    { value: 340, date: '13 Mar' },
    { value: 260, date: '12 Mar' },
    { value: 385, date: '14 Mar' },
    {
      value: 280, date: '15 Mar', label: '15 Mar',
      labelTextStyle: { color: '#000', width: 60 },
    },
    { value: 390, date: '16 Mar' },

    { value: 370, date: '17 Mar' },
    { value: 285, date: '18 Mar' },
    { value: 295, date: '19 Mar' },
    {
      value: 300,
      date: '20 Mar 2024',
      label: '20 Mar',
      labelTextStyle: { color: '#000', width: 60 },
    },
    { value: 280, date: '21 Mar' },
    { value: 295, date: '22 Mar' },
    { value: 260, date: '23 Mar' },
    { value: 255, date: '24 Mar' },

    {
      value: 190, date: '25 Mar', label: '25 Mar',
      labelTextStyle: { color: '#000', width: 60 },
    },
    { value: 220, date: '26 Mar' },
    { value: 205, date: '27 Mar' },
    { value: 230, date: '28 Mar' },
    { value: 210, date: '29 Mar' },
    {
      value: 200,
      date: '30 Mar',
      label: '30 Mar',
      labelTextStyle: { color: '#000', width: 60 },
    },
    { value: 240, date: '1 Apr' },
    { value: 250, date: '2 Apr' },
    { value: 280, date: '3 Apr' },
    { value: 250, date: '4 Apr' },
    { value: 210, date: '5 Apr' },
  ];





  return (
    <View style={{ gap: 20, paddingHorizontal: 10 }}>
      <Text style={{color: '#F4D160', fontFamily: 'Poppins_SemiBold', textAlign: 'center', fontSize: 20, marginBottom: -10, marginTop: -15}}> Statistics Insight </Text>
      <View style={styles.container}>
        <Text style={{ alignSelf: 'center', marginVertical: 20, fontFamily: 'Poppins_SemiBold' }}>Monthly Violations</Text>
        <BarChart
          width={250}
          barWidth={25}
          noOfSections={10}
          stackData={data}
          dashWidth={'0.5'}
        />
      </View>
      <View style={styles.container}>
        <Text style={{ alignSelf: 'center', marginVertical: 20, fontFamily: 'Poppins_SemiBold' }}>Daily Violations</Text>
        <LineChart
          areaChart
          data={dataDaily}
          rotateLabel
          width={250}
          height={260}
          spacing={10}
          color="#00ff83ff"
          thickness={2}
          hideDataPoints
          startFillColor="rgba(20,95,81,0.3)"
          endFillColor="rgba(20,85,81,0.01)"
          startOpacity={0.9}
          endOpacity={0.2}
          initialSpacing={0}
          noOfSections={6}
          maxValue={10}
          yAxisColor="#000"
          yAxisThickness={2}
          rulesType="solid"
          rulesColor="gray"
          yAxisTextStyle={{ color: '#000' }}
          yAxisSide='right'
          xAxisColor='#000'
          pointerConfig={{
            pointerStripHeight: 160,
            pointerStripColor: 'lightgray',
            pointerStripWidth: 2,
            pointerColor: '#000',
            radius: 2,
            pointerLabelWidth: 100,
            pointerLabelHeight: 90,
            activatePointersOnLongPress: false,
            autoAdjustPointerLabelPosition: false,
            pointerLabelComponent: items => {
              return (
                <View
                  style={{
                    height: 90,
                    width: 100,
                    justifyContent: 'center',
                    marginTop: -30,
                    marginLeft: -40,
                  }}>
                  <Text style={{ color: 'white', fontSize: 14, marginBottom: 6, textAlign: 'center' }}>
                    {items[0].date}
                  </Text>
                  <View style={{ paddingHorizontal: 14, paddingVertical: 6, borderRadius: 16, backgroundColor: 'white' }}>
                    <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>
                      {items[0].value}
                    </Text>
                  </View>
                </View>
              );
            },
          }}
        />
      </View>
    </View>
  )
}

export default ProgressGraph

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0,230,255,0.7)',
    borderRadius: 20,
    paddingVertical: 10,
    paddingBottom: 40,
    paddingLeft: 5,
    overflow: 'hidden',
    width: 335
  }
})