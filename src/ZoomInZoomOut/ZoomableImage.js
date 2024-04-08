import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router';
import { useState } from 'react';
import { Image, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  setGestureState
} from 'react-native-reanimated';

const END_POSITION = 200;

export default ZoomableImage = () => {
  const navigation = useNavigation();
  const router = useRouter();
  const params = useLocalSearchParams();
  const { imageLink } = params;
  let currentPosition = 0;

  const scale = useSharedValue(1);
  const savedScale = useSharedValue(1);
  const onLeft = useSharedValue(true);
  const position = useSharedValue(0);
  const [gesture, setGesture] = useState('pinch');
  const moveImage = require('../../assets/icons/move.png');
  const pinchImage = require('../../assets/icons/pinch.png');

  const pinchGesture = Gesture.Pinch()
    .onUpdate((e) => {
      scale.value = savedScale.value * e.scale;
    })
    .onEnd(() => {
      savedScale.value = scale.value;
    });

  const doubleTap = Gesture.Tap()
    .maxDuration(250)
    .numberOfTaps(2)
    .onStart(() => {
      console.log('Double tap!', scale.value);
      if(scale.value >= 3){
        scale.value = savedScale.value / 3;
      } else {
        scale.value = savedScale.value * 3;
      }
    });

  const panGesture = Gesture.Pan()
    .onStart(() => {
      // Save the current position when the pan gesture starts
      currentPosition = position.value;
    })
    .onUpdate((e) => {
      // Update the position based on the translation
      position.value = currentPosition + e.translationX;
    });

  const animatedStyle1 = useAnimatedStyle(() => {
    if (scale.value < 4.5 && scale.value > 1) {
      console.log(scale.value);
      return {
        transform: [{ scale: scale.value }]
      }
    } else {
      return {
        backgroundColor: 'black'
      };
    }
  });

  const animatedStyle2 = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: position.value }]
    }
  });

  function toggleGesture() {
    setGesture(gesture === 'pinch' ? 'move' : 'pinch');
  }

  return (
    <View style={{ backgroundColor: 'black', flex: 1, justifyContent: 'center' }}>
      <GestureDetector gesture={panGesture}>
        <Animated.View style={animatedStyle1} >
          <GestureDetector gesture={Gesture.Exclusive(doubleTap)}>
            <Animated.View style={animatedStyle2} >
              <Image source={{ uri: imageLink }} style={{ width: 400, height: 400, resizeMode: 'contain' }} />
            </Animated.View>
          </GestureDetector>
        </Animated.View>
      </GestureDetector >
      <TouchableOpacity style={{ position: 'absolute', right: 10, backgroundColor: 'rgba(252,252,252,0.5)', padding: 5, borderRadius: 10, bottom: '10%', zIndex: 2 }} onPress={toggleGesture}>
        <Image source={gesture === 'pinch' ? moveImage : pinchImage} style={{ width: 30, height: 30 }} />
      </TouchableOpacity>
    </View>
  );
}