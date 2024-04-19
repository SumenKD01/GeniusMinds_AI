import React, { useState } from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

export default DatePicker = () => {
  const [showPicker, setShowPicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (event, date) => {
    if (date !== undefined) {
      setSelectedDate(date);
    }
    setShowPicker(false);
  };

  return (
    <View style={styles.container}>
      <Button title="Open Date Picker" onPress={() => setShowPicker(true)} />
      {showPicker && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          onChange={handleDateChange}
        />
      )}
      <Text>Selected Date: {selectedDate.toDateString()}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});