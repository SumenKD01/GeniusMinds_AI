import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, ScrollView} from 'react-native';
import StockManagement from '../../StockManagement/StockManagement';

export default function Messages() {
  return (
    <ScrollView style={{ flex: 1 }}  >

      <StockManagement />
    </ScrollView>
  );
}
