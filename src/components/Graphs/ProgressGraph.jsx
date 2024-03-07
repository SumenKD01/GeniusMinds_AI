import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react';
import { LineGraph } from 'react-native-graph';
import { BarChart, PieChart,LineChart } from 'react-native-gifted-charts';

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
      setData(dataGot);
      setIsLoading(false);
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
        { value: 0, color: 'orange' },
      ],
      label: 'Jan',
    },
    {
      stacks: [
        { value: 7, color: '#4ABFF4' },

      ],
      label: 'Feb',
    },
    {
      stacks: [
        { value: 0, color: 'orange' },
  
      ],
      label: 'Mar',
    },
    {
      stacks: [
        { value: 0, color: '#4ABFF4' },
     
      ],
      label: 'Apr',
    },
    {
      stacks: [
        { value: 0, color: '#4ABFF4' },
        // { value: 11, color: 'orange', marginBottom: 2 },
        // { value: 10, color: '#28B2B3', marginBottom: 2 },
      ],
      label: 'May',
    },
    {
      stacks: [
        { value: 0, color: '#4ABFF4' },
        // { value: 11, color: 'orange', marginBottom: 2 },
        // { value: 10, color: '#28B2B3', marginBottom: 2 },
      ],
      label: 'Jun',
    },
    {
      stacks: [
        { value: 0, color: '#4ABFF4' },
        // { value: 11, color: 'orange', marginBottom: 2 },
        // { value: 10, color: '#28B2B3', marginBottom: 2 },
      ],
      label: 'July',
    },
    {
      stacks: [
        { value: 0, color: '#4ABFF4' },
       
      ],
      label: 'August',
    },
    {
      stacks: [
        { value: 0, color: '#4ABFF4' },
      
      ],
      label: 'September',
    },
    {
      stacks: [
        { value: 0, color: '#4ABFF4' },

      ],
      label: 'October',
    },
    {
      stacks: [
        { value: 0, color: '#4ABFF4' },
    
      ],
      label: 'November',
    },
    {
      stacks: [
        { value: 0, color: '#4ABFF4' },

      ],
      label: 'December',
    },
  ];

  const ptData = [
    {value: 160, date: '1 Apr 2022'},
    {value: 180, date: '2 Apr 2022'},
    {value: 190, date: '3 Apr 2022'},
    {value: 180, date: '4 Apr 2022'},
    {value: 140, date: '5 Apr 2022'},
    {value: 145, date: '6 Apr 2022'},
    {value: 160, date: '7 Apr 2022'},
    {value: 200, date: '8 Apr 2022'},
  
    {value: 220, date: '9 Apr 2022'},
    {
      value: 240,
      date: '10 Apr 2022',
      label: '10 Apr',
      labelTextStyle: {color: 'lightgray', width: 60},
    },
    {value: 280, date: '11 Apr 2022'},
    {value: 260, date: '12 Apr 2022'},
    {value: 340, date: '13 Apr 2022'},
    {value: 385, date: '14 Apr 2022'},
    {value: 280, date: '15 Apr 2022'},
    {value: 390, date: '16 Apr 2022'},
  
    {value: 370, date: '17 Apr 2022'},
    {value: 285, date: '18 Apr 2022'},
    {value: 295, date: '19 Apr 2022'},
    {
      value: 300,
      date: '20 Apr 2022',
      label: '20 Apr',
      labelTextStyle: {color: 'lightgray', width: 60},
    },
    {value: 280, date: '21 Apr 2022'},
    {value: 295, date: '22 Apr 2022'},
    {value: 260, date: '23 Apr 2022'},
    {value: 255, date: '24 Apr 2022'},
  
    {value: 190, date: '25 Apr 2022'},
    {value: 220, date: '26 Apr 2022'},
    {value: 205, date: '27 Apr 2022'},
    {value: 230, date: '28 Apr 2022'},
    {value: 210, date: '29 Apr 2022'},
    {
      value: 200,
      date: '30 Apr 2022',
      label: '30 Apr',
      labelTextStyle: {color: 'lightgray', width: 60},
    },
    {value: 240, date: '1 May 2022'},
    {value: 250, date: '2 May 2022'},
    {value: 280, date: '3 May 2022'},
    {value: 250, date: '4 May 2022'},
    {value: 210, date: '5 May 2022'},
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
    <View style={{gap: 20}}>
      <View style={styles.container}>
        <Text style={{ alignSelf: 'center', marginVertical: 20, fontFamily: 'Poppins_SemiBold' }}>Monthly Violation</Text>
        <BarChart
          width={282}
          barWidth={30}
          noOfSections={6}
          stackData={stackData1}
          dashWidth={'0.5'}
        />
      </View>
      <View style={styles.container}>
        <Text style={{ alignSelf: 'center', marginVertical: 20, fontFamily: 'Poppins_SemiBold' }}>Monthly Violation</Text>

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
      <View
      style={{
        paddingVertical: 100,
        paddingLeft: 20,
        backgroundColor: '#1C1C1C',
      }}>
          <LineChart
          areaChart
          data={ptData}
          rotateLabel
          width={260}
          hideDataPoints
          spacing={10}
          color="#00ff83"
          thickness={2}
          startFillColor="rgba(20,105,81,0.3)"
          endFillColor="rgba(20,85,81,0.01)"
          startOpacity={0.9}
          endOpacity={0.2}
          initialSpacing={0}
          noOfSections={6}
          maxValue={600}
          yAxisColor="white"
          yAxisThickness={0}
          rulesType="solid"
          rulesColor="gray"
          yAxisTextStyle={{color: 'gray'}}
          yAxisSide='right'
          xAxisColor="lightgray"
          pointerConfig={{
            pointerStripHeight: 160,
            pointerStripColor: 'lightgray',
            pointerStripWidth: 2,
            pointerColor: 'lightgray',
            radius: 6,
            pointerLabelWidth: 100,
            pointerLabelHeight: 90,
            activatePointersOnLongPress: true,
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
                  <Text style={{color: 'white', fontSize: 14, marginBottom:6,textAlign:'center'}}>
                    {items[0].date}
                  </Text>
  
                  <View style={{paddingHorizontal:14,paddingVertical:6, borderRadius:16, backgroundColor:'white'}}>
                    <Text style={{fontWeight: 'bold',textAlign:'center'}}>
                      {'$' + items[0].value + '.0'}
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
    backgroundColor: 'rgba(108,255,220,0.5)',
    borderRadius: 5,
  },

})