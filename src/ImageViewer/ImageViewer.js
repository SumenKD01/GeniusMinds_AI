import React, { Component } from 'react';
import { StyleSheet, View, Modal } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';

export default ImageViewer = () => {
    const images = [{ url: 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/sample_img.png', },];
    const [isModelVisible, setIsModalVisible] = useState(true);

    function ShowModalFunction() {
        setIsModalVisible(false);
    }

    return (
        <View style={styles.MainContainer}>
            <Modal
                visible={this.state.isModelVisible}
                transparent={false}
                onRequestClose={() => this.ShowModalFunction()}>
                <ImageViewer imageUrls={images} />
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    MainContainer: {
        flex: 1,
        alignItems: 'center',
    },
});
