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
    const granted = await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      // PermissionsAndroid.PERMISSIONS.CAMERA,
    ]);
    console.log(granted);
    //카메라 권한만 허용 했을 깨
    if (
      // granted['android.permission.CAMERA'] === 'granted' &&
      granted['android.permission.READ_EXTERNAL_STORAGE'] === 'granted'
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
    {
      title: '한푼 두푼에서 알림 권한을 요청합니다.',
      message: '한푼두푼에서 알림 권한 설정요청합니다.',
      buttonNeutral: '나중에',
      buttonNegative: '아니요',
      buttonPositive: '네',
    },
  );
  return granted;
};
