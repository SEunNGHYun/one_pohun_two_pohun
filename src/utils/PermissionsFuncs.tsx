import React from 'react';
import {PermissionsAndroid} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import type {NewAsset} from '../types/types';

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
          selectionLimit: 1,
          mediaType: 'photo',
          quality: 1,
          includeBase64: false,
          includeExtra: false,
        },
        res => {
          if (res.didCancel) {
            return;
          }
          if (res) {
            if (res.assets) {
              let newRes: NewAsset = {
                ...res.assets[0],
                selectType: 'select',
              };
              callback(newRes);
            }
          }
        },
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
