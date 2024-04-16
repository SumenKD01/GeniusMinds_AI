import React, { useState } from 'react';
import { View, Button } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import dayjs from 'dayjs';

const DatePicker = ({ isVisible, onClose }) => {

    const [date, setDate] = useState(dayjs());

    const openDatePicker = () => {
        onClose();
    };

    const onCancel = () => {
        onClose();
    };

    const onConfirm = (selectedDate) => {
        setDate(selectedDate);
        onClose();
    };

    return (
        <View>
            <Button title="Open Date Picker" onPress={openDatePicker} />
            {isVisible && (
                <DateTimePicker
                    value={date.toDate()}
                    mode="date" 
                    onChange={(event, selectedDate) => onConfirm(selectedDate)}
                />
            )}
        </View>
    );
};

export default DatePicker;