import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';



export default function AppLayout() {
    return (
      <Tabs screenOptions={({ route }) => ({
				headerShown: false,
				tabBarActiveTintColor: 'cyan',
				tabBarInactiveTintColor: 'white',
				tabBarLabelStyle: {
					fontSize: 10,
				},
				tabBarStyle: {
					backgroundColor: '#004A8E',
					height: 55,
					borderTopRightRadius: 30,
					borderTopLeftRadius: 30,
					elevation: 0,
					position: 'absolute',
					bottom: 0,
					borderTopWidth: 0,
					paddingBottom: 5,
				},
		
			})} >
        <Tabs.Screen
          // Name of the dynamic route.
          name="index" 
          	options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name='home' color={color} size={size} />
            ),
          }}
          />


        <Tabs.Screen
          // Name of the dynamic route.
          name="messages"
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name='book' color={color} size={size} />
            ),
          }}
         
        />
                <Tabs.Screen
          // Name of the dynamic route.
          name="profile"
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name='book' color={color} size={size} />
            ),
          }}

          
       
        />
        <Tabs.Screen
          // Name of the dynamic route.
          name="menu"
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name='book' color={color} size={size} />
            ),
          }}
         
        />
      </Tabs>
    );
  }