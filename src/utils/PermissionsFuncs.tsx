import {PermissionsAndroid} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

export const getCameraGalleryPermissions = async callback => {
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
      const result = await launchImageLibrary(
        {
          selectionLimit: 0,
          mediaType: 'photo',
          includeBase64: false,
          includeExtra: true,
        },
        callback,
      );
      console.log('result', result);
    } else {
      console.log('노놉');
    }
  } catch (err) {
    console.warn(err);
  }
};
