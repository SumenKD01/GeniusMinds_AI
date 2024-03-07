import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React,{useEffect,useState} from 'react';
import { LineGraph } from 'react-native-graph';
import { BarChart,PieChart } from 'react-native-gifted-charts';

const ProgressGraph = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
	const [apiError, setAPIError] = useState(false);
	const [refreshing, setRefreshing] = useState(false);

    const apiGot =
		'https://androidapi220230605081325.azurewebsites.net/api/Violation/GetMonthlyViolation';
	const jsonDataToPassInApi = {
		PlantName: 'SEIPL,BLR',
		Year:'2024'
	};
    function resultReport(dataGot, apiError) {
		if (apiError) {
			setIsLoading(false);
			setAPIError(true);
		} else {
			
				setData(dataGot);
				setIsLoading(false);
		}
	}
    useEffect(() => {
		APICall(apiGot, jsonDataToPassInApi, resultReport, 'getReport');
	}, [refreshing]);
    console.log('StackData',data)

    const barData = [{value: 15}, {value: 30}, {value: 26}, {value: 40}];
    const pieData = [
        {value: 54, color: '#177AD5', text: '54%'},
        {value: 40, color: '#79D2DE', text: '30%'},
        {value: 20, color: '#ED6665', text: '26%'},
    ];
    const stackData1 = [
        {
          stacks: [
            {value: 2, color: 'orange'},
          ],
          label: 'Jan',
        },
        {
          stacks: [
            {value: 10, color: '#4ABFF4'},
          
          ],
          label: 'Feb',
        },
        {
          stacks: [
            {value: 14, color: 'orange'},
            {value: 18, color: '#4ABFF4', marginBottom: 2},
          ],
          label: 'Mar',
        },
        {
          stacks: [
            {value: 7, color: '#4ABFF4'},
            {value: 11, color: 'orange', marginBottom: 2},
            {value: 10, color: '#28B2B3', marginBottom: 2},
          ],
          label: 'Apr',
        },
        {
            stacks: [
              {value: 7, color: '#4ABFF4'},
              {value: 11, color: 'orange', marginBottom: 2},
              {value: 10, color: '#28B2B3', marginBottom: 2},
            ],
            label: 'May',
          },
          {
            stacks: [
              {value: 7, color: '#4ABFF4'},
              {value: 11, color: 'orange', marginBottom: 2},
              {value: 10, color: '#28B2B3', marginBottom: 2},
            ],
            label: 'Jun',
          },
          {
            stacks: [
              {value: 7, color: '#4ABFF4'},
              {value: 11, color: 'orange', marginBottom: 2},
              {value: 10, color: '#28B2B3', marginBottom: 2},
            ],
            label: 'July',
          },
          {
            stacks: [
              {value: 7, color: '#4ABFF4'},
              {value: 11, color: 'orange', marginBottom: 2},
              {value: 10, color: '#28B2B3', marginBottom: 2},
            ],
            label: 'August',
          },
          {
            stacks: [
              {value: 7, color: '#4ABFF4'},
              {value: 11, color: 'orange', marginBottom: 2},
              {value: 10, color: '#28B2B3', marginBottom: 2},
            ],
            label: 'September',
          },
          {
            stacks: [
              {value: 7, color: '#4ABFF4'},
              {value: 11, color: 'orange', marginBottom: 2},
              {value: 10, color: '#28B2B3', marginBottom: 2},
            ],
            label: 'October',
          },
          {
            stacks: [
              {value: 7, color: '#4ABFF4'},
              {value: 11, color: 'orange', marginBottom: 2},
              {value: 10, color: '#28B2B3', marginBottom: 2},
            ],
            label: 'November',
          },
          {
            stacks: [
              {value: 7, color: '#4ABFF4'},
              {value: 11, color: 'orange', marginBottom: 2},
              {value: 10, color: '#28B2B3', marginBottom: 2},
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
        <View style={styles.container}>
            <Text>ProgressGraph</Text>
            {/* <LineGraph points={points} animated={false} color='#4484B2' style={styles.graph} />
            <BarChart
        frontColor={'#177AD5'}
        barWidth={22}
        data={barData}
        /> */}
      <BarChart
            width={282}
            barWidth={25}

            noOfSections={4}
            stackData={stackData1}
            // backgroundColor={'white'}
            dashWidth={'25'}

            xAxisLabelTexts={'hello'}
            xa

            />
         
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
    )
}

export default ProgressGraph

const styles = StyleSheet.create({
    container: {
        backgroundColor:'cyan',
        padding: 10,
        top:15,
        borderRadius: 5,
        gap: 5,
       

    },
   
})