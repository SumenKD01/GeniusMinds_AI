import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text,st } from 'react-native';
import StockManagement from '../../StockManagement/StockManagement';

export default function Messages() {
  return (
<SafeAreaView style={{ flex:1}}  >
    
    <StockManagement/>

    </SafeAreaView>
  );
}
