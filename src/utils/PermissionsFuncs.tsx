import React from 'react';
import {PermissionsAndroid} from 'react-native';
import {
  ImagePickerResponse,
  launchImageLibrary,
} from 'react-native-image-picker';
import {request, RESULTS, PERMISSIONS, check} from 'react-native-permissions';

export const getCameraGalleryPermissions = async (
  callback: React.Dispatch<React.SetStateAction<undefined>>,
) => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
      // PermissionsAndroid.PERMISSIONS.CAMERA,
    );
    console.log(granted);
    //카메라 권한만 허용 했을 깨
    if (
      // granted['android.permission.CAMERA'] === 'granted' &&
      granted === PermissionsAndroid.RESULTS.GRANTED
    ) {
      launchImageLibrary(
        {
          selectionLimit: 0,
          mediaType: 'photo',
          includeBase64: false,
          includeExtra: false,
        },
        callback,
      ); // 하지만 예제에서는 이렇게 하는걸...
    } else {
      console.log('노놉');
    }
  } catch (err) {
    console.warn(err);
  }
};

export const getPushNotification = async () => {
  const granted = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
  );
  return granted;
};
