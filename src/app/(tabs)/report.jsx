import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, ScrollView } from 'react-native';
import ViolationEntry from '../../ViolationReport/ViolationEntry';

export default function Messages() {
  return (
    <ScrollView style={{ flex: 1 }} >
      <ViolationEntry />
    </ScrollView>
  );
}
