import * as React from 'react';
import { useLocalSearchParams } from 'expo-router';

import { StyleSheet, View, Image } from 'react-native';
import { ReactNativeZoomableView } from '@openspacelabs/react-native-zoomable-view';

export default function ImageViewer() {
    const params = useLocalSearchParams();
    const { imageLink } = params;

    return (
        <View style={styles.container}>
            <View style={{ flexShrink: 1, height: "100%", width: "100%", backgroundColor: 'black' }}>
                <ReactNativeZoomableView
                    maxZoom={30}
                    contentWidth={300}
                    contentHeight={150}
                >
                    <Image
                        style={{ width: '100%', height: '100%', resizeMode: 'contain' }}
                        source={{ uri: imageLink }}
                    />
                </ReactNativeZoomableView>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});