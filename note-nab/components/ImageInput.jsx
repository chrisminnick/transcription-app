import React, { useEffect } from 'react';
import {
  Alert,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Colors from '../constants/Colors';
import useCamera from '../hooks/useCamera';
import usePhotos from '../hooks/usePhotos';
import { IconSymbol } from '@/components/ui/IconSymbol';

function ImageInput({
  imageUri,
  onChangeImage,
  onCancel = () => {},
  mode = 'both',
}) {
  const camera = useCamera();
  const photos = usePhotos();

  const handlePress = async () => {
    if (!imageUri) {
      switch (mode) {
        case 'camera':
          selectImage('camera');
          break;
        case 'photos':
          selectImage('photos');
          break;
        case 'both':
        default:
          Alert.alert('Please choose', null, [
            { text: 'Photos', onPress: () => selectImage('photos') },
            { text: 'Camera', onPress: () => selectImage('camera') },
            { text: 'Cancel', style: 'cancel' },
          ]);
      }
    } else {
      Alert.alert('Remove', 'are you sure you want to remove this image?', [
        { text: 'Yes', onPress: () => onChangeImage(null) },
        { text: 'No' },
      ]);
    }
  };

  const selectImage = async (pickerType) => {
    try {
      if (pickerType === 'camera') {
        const result = await camera.takePhoto({
          allowsEditing: true,
          quality: 0.5,
        });
        result.canceled ? onCancel() : onChangeImage(result.assets[0].uri);
      } else {
        const result = await photos.selectImage({
          quality: 0.5,
        });
        result.canceled ? onCancel() : onChangeImage(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert('Image error', 'Error reading image');
      console.log(error);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <View style={styles.container}>
        {!imageUri ? (
          <IconSymbol name="camera" size={75} iconColor={colors.medium} />
        ) : (
          <Image source={{ uri: imageUri }} style={styles.image} />
        )}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    borderRadius: 15,
    justifyContent: 'center',
    height: 100,
    width: 100,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

export default ImageInput;
