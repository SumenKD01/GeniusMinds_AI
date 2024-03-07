import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react';
import { BarChart, PieChart } from 'react-native-gifted-charts';

const ProgressGraph = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [apiError, setAPIError] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const apiGot =
    'https://androidapi220230605081325.azurewebsites.net/api/Violation/GetMonthlyViolation';
  const jsonDataToPassInApi = {
    PlantName: 'SEIPL,BLR',
    Year: '2024'
  };

  function resultReport(dataGot, apiError) {
    if (apiError) {
      setIsLoading(false);
      setAPIError(true);
    } else {
      console.log('StackData', dataGot);
      let i = 1;
      let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      let newDataMap = Object.keys(dataGot).map((eachItem) => {
        return {
          stacks: [
            { value: dataGot[i + ""], color: 'red' },
          ],
          label: months[(i++) - 1] + ""
        }
      });
      setIsLoading(false);
      console.log("Data Made", newDataMap);
      setData(newDataMap);
    }
  }
  useEffect(() => {
    APICall(apiGot, jsonDataToPassInApi, resultReport, 'getReportForChart');
  }, [refreshing]);

  const barData = [{ value: 15 }, { value: 30 }, { value: 26 }, { value: 40 }];
  const pieData = [
    { value: 54, color: '#177AD5', text: '54%' },
    { value: 40, color: '#79D2DE', text: '30%' },
    { value: 20, color: '#ED6665', text: '26%' },
  ];
  const stackData1 = [
    {
      stacks: [
        { value: 8, color: 'orange' },
      ],
      label: 'Jan',
    },
    {
      stacks: [
        { value: 7, color: 'orange' },
      ],
      label: 'Feb',
    },
    {
      stacks: [
        { value: 14, color: 'orange' },
      ],
      label: 'Mar',
    },
    {
      stacks: [
        { value: 7, color: 'orange' },
      ],
      label: 'Apr',
    },
    {
      stacks: [
        { value: 7, color: 'orange' }
      ],
      label: 'May',
    },
    {
      stacks: [
        { value: 7, color: 'orange' }
      ],
      label: 'Jun',
    },
    {
      stacks: [
        { value: 7, color: 'orange' }
      ],
      label: 'July',
    },
    {
      stacks: [
        { value: 7, color: 'orange' }
      ],
      label: 'August',
    },
    {
      stacks: [
        { value: 7, color: 'orange' }
      ],
      label: 'September',
    },
    {
      stacks: [
        { value: 7, color: 'orange' }
      ],
      label: 'October',
    },
    {
      stacks: [
        { value: 7, color: 'orange' }
      ],
      label: 'November',
    },
    {
      stacks: [
        { value: 7, color: 'orange' }
      ],
      label: 'December',
    },
  ];


  const points = [
    {
      date: new Date('2024-01-01'),
      value: 100,
    },
    {
      date: new Date('2024-01-03'),
      value: 150,
    },
    {
      date: new Date('2024-02-04'),
      value: 10,
    },
    {
      date: new Date('204-01-05'),
      value: 5,
    },
    {
      date: new Date('2024-01-06'),
      value: 50,
    },
    {
      date: new Date('2024-01-07'),
      value: 70,
    },
    {
      date: new Date('2024-01-08'),
      value: 10,
    },
    {
      date: new Date('2024-01-09'),
      value: 25,
    },
    {
      date: new Date('2024-01-10'),
      value: 100,
    },
    {
      date: new Date('2024-01-11'),
      value: 150,
    },
    {
      date: new Date('2024-02-12'),
      value: 10,
    },
    {
      date: new Date('204-01-13'),
      value: 5,
    },
    {
      date: new Date('2024-01-14'),
      value: 50,
    },
    {
      date: new Date('2024-01-15'),
      value: 70,
    },
    {
      date: new Date('2024-01-16'),
      value: 10,
    },
    {
      date: new Date('2024-01-17'),
      value: 25,
    },
  ]

  return (
    <View style={{ gap: 20 }}>
      <View style={styles.container}>
        <Text style={{ alignSelf: 'center', marginVertical: 20, fontFamily: 'Poppins_SemiBold' }}>Progress Graph</Text>
        <BarChart
          width={282}
          barWidth={30}
          noOfSections={6}
          stackData={data}
          dashWidth={'0.5'}
        />
      </View>
      <View style={styles.container}>
        <Text style={{ alignSelf: 'center', marginVertical: 20, fontFamily: 'Poppins_SemiBold' }}>Progress Graph</Text>
        <PieChart
          showText
          textColor="black"
          radius={150}
          textSize={20}
          focusOnPress
          showTextBackground
          textBackgroundRadius={20}
          data={pieData}
        />
      </View>
    </View>
  )
}

export default ProgressGraph

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(108,255,220,0.5)',
    borderRadius: 5,
    paddingVertical: 10,
    paddingBottom: 20,
    paddingLeft: 10
  },

})