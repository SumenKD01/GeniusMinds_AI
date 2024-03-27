import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AllUsages from '../components/StockManagementComponents/AllUsages';
import { Colors } from '../utils/Colors1';

const StockManagement = ({ res }) => {
  const [stockView, setStockView] = useState(true);
  const [usageView, setUsageView] = useState(false);

  function changeToStockView() {
    setStockView(true);
    setUsageView(false);
  }

  function changeToUsageView() {
    setUsageView(true);
    setStockView(false);
  }

  const inactiveNavButtonStyle = {
    borderTopWidth: 0.17,
    borderColor: 'silver',
    padding: 10,
    borderWidth: 0.20,
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    color: 'black',
    overflow: 'hidden'
  }

  const activeNavButtonStyle = {
    padding: 10,
    flex: 1,
    alignItems: 'center',
    borderTopWidth: 1,
    backgroundColor: Colors.appDarkBlue,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    color: 'white',
    overflow: 'hidden',
    borderColor: Colors.manufactureLabels,
  }

  return (
    <View style={styles.container}>
      <View>
          <AllUsages  res={res}/>
      </View>
    </View>
  );
}

export default StockManagement;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FC',
  },
  subModuleButton: {
    padding: 10,
    borderWidth: 0.2,
    flex: 1,
    alignItems: 'center',
  },
  subModuleButtonText: {
    fontWeight: 'bold'
  },
  footerNavigator: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    position: 'absolute',
    bottom: 0,
    gap: 5,
    paddingHorizontal: 5
  },
});
