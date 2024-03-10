import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  Pressable,
  Image,
  Keyboard,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Modal, Portal, PaperProvider, Snackbar} from 'react-native-paper';
import {getCameraGalleryPermissions} from '../../utils/PermissionsFuncs';
import {
  primaryColor,
  descColor,
  title,
  subtitle,
  grayColor,
} from '../../utils/styles';
import database from '@react-native-firebase/database';

export default function NickName({navigation}): React.ReactElement {
  const [nickname, setNickName] = useState<string>('');
  const [userImage, setUserImage] = useState<any>(null);
  const [visible, setVisible] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [keyboardStatus, setKeyboardStatus] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [snackVisible, setSnackVisible] = useState<boolean>(false);

  const showModal = useCallback(() => setModalVisible(true), []);
  const hideModal = useCallback(() => setModalVisible(false), []);

  const check_nickname = useCallback((text: string) => {
    //닉네임 유효성검사
    const trim_nickname = text.trim();

    if (trim_nickname.length < 2 || trim_nickname.length > 10) {
      return false;
    } else if (trim_nickname.search(/\s/) !== -1) {
      return false;
    } else if (trim_nickname.search(/\s/) !== -1) {
      return false;
    } else if (
      /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/g.test(trim_nickname)
    ) {
      return false;
    }

    return true;
  }, []);

  const onchangeNickName = useCallback(
    (text: string) => {
      text = text.trim(); // 앞 뒤 공백제거
      text = text.replace(' ', ''); // 문자열안에 공백제거

      setNickName(text);
      let check = check_nickname(text);
      if (check) {
        setVisible(true); // 처음 닉네임 유효성검사 안해도 빨간색뜨는 기능 수정하기 위해 넣음
      }
      setError(check);
    },
    [check_nickname],
  );

  const getUserImgage = useCallback(() => {
    getCameraGalleryPermissions(setUserImage);
    hideModal();
  }, [hideModal, setUserImage]);

  const getDefaultImage = useCallback(() => {
    setUserImage({
      uri: 'https://cdn.pixabay.com/photo/2023/09/07/14/26/cat-8239223_1280.png',
      selectType: 'defult',
    });
    hideModal();
  }, [hideModal]);

  const nextPageMove = useCallback(async () => {
    console.log('next');
    //db user에서 닉네임 중복 페크
    const snapshot = await database().ref(`/users/${nickname}`).once('value');
    try {
      if (!snapshot.val()) {
        navigation.navigate('Targetcost1', {
          img: userImage,
          nickname,
        });
      } else {
        setSnackVisible(true);
      }
    } catch (err) {
      console.log(err);
    }
  }, [navigation, nickname, userImage]);

  useEffect(() => {
    //키보드 활성 상태인지 체크해서 선택 이미지 사이즈 줄임
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardStatus(true);
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardStatus(false);
    });
    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  return (
    <PaperProvider>
      <View style={styles.view}>
        <View style={styles.header}>
          <Text
            adjustsFontSizeToFit={true}
            numberOfLines={1}
            style={styles.headertitle}>
            처음이신가요?
          </Text>
        </View>
        <View style={styles.body}>
          <Pressable onPress={showModal}>
            <View
              style={
                keyboardStatus
                  ? styles.resize_user_img_backgroundBox
                  : styles.user_img_backgroundBox
              }>
              <View style={keyboardStatus ? styles.re_circle : styles.circle}>
                {userImage?.uri && (
                  <Image
                    resizeMode="contain"
                    resizeMethod="scale"
                    style={
                      keyboardStatus ? styles.re_userImage : styles.userImage
                    }
                    source={{uri: userImage.uri}}
                  />
                )}
              </View>
              <View
                style={
                  keyboardStatus ? styles.re_circle_icon : styles.circle_icon
                }>
                <MaterialCommunityIcons
                  name="camera-plus-outline"
                  color={'#777777'}
                  size={keyboardStatus ? 50 : 70}
                />
              </View>
            </View>
          </Pressable>
          <View style={{width: '100%'}}>
            <Text style={styles.nickname}>닉네임</Text>
            <TextInput
              style={styles.input}
              onChangeText={onchangeNickName}
              value={nickname}
              placeholder=""
              maxLength={10}
            />
            <Text
              adjustsFontSizeToFit={true}
              numberOfLines={1}
              style={
                !error && visible
                  ? {...styles.desctext, color: '#ff4f4f'}
                  : styles.desctext
              }>
              * 2~10자이내 특수문자,공백제외 (\~@#$%^&*)
            </Text>
          </View>
        </View>
        {console.log(!error || !userImage)}
        <View style={keyboardStatus ? styles.re_foot : styles.foot}>
          <TouchableWithoutFeedback
            //닉네임 제외사항 없고 이미지 없으때 disable 하나라도 없거나 제외사항이면 true가 된다.
            disabled={!error || !userImage}
            onPress={nextPageMove}>
            <Text
              style={
                !error || !userImage ? styles.disabledpress : styles.nextpress
              }>
              다음
            </Text>
          </TouchableWithoutFeedback>
        </View>
      </View>
      <Portal>
        <Modal
          visible={modalVisible}
          onDismiss={hideModal}
          contentContainerStyle={styles.modalContainer}>
          <Pressable onPress={getUserImgage}>
            <View style={styles.modalButton}>
              <Text style={styles.modalButtonText}>이미지 불러오기</Text>
            </View>
          </Pressable>
          <View style={styles.imageSelectModal} />
          <Pressable onPress={getDefaultImage}>
            <View style={styles.modalButton}>
              <Text style={styles.modalButtonText}>기본 이미지 선택하기</Text>
            </View>
          </Pressable>
        </Modal>
      </Portal>
      <Snackbar visible={snackVisible} onDismiss={() => setSnackVisible(false)}>
        사용중인 닉네임입니다.
      </Snackbar>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    paddingHorizontal: 40,
    paddingVertical: 70,
    backgroundColor: 'white',
  },
  header: {
    flex: 2,
    justifyContent: 'center',
  },
  body: {
    flex: 6,
    alignItems: 'center',
  },
  foot: {
    flex: 2,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  re_foot: {position: 'absolute', bottom: 12, right: 40},
  headertitle: {
    color: primaryColor,
    ...title,
  },
  user_img_backgroundBox: {
    marginVertical: 25,
    width: 200,
    height: 200,
  },
  resize_user_img_backgroundBox: {
    marginVertical: 15,
    width: 150,
    height: 150,
  },
  circle: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: grayColor,
    width: 200,
    height: 200,
    borderRadius: 200,
  },
  re_circle: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: grayColor,
    width: 150,
    height: 150,
    borderRadius: 150,
  },
  userImage: {
    width: 198,
    height: 198,
    borderRadius: 198,
  },
  re_userImage: {
    width: 148,
    height: 148,
    borderRadius: 148,
  },
  circle_icon: {
    position: 'absolute',
    left: 130,
    top: 130,
  },
  re_circle_icon: {
    position: 'absolute',
    left: 100,
    top: 100,
  },
  imageSelectModal: {width: '100%', height: 0.5, backgroundColor: grayColor},
  nickname: {
    color: primaryColor,
    marginBottom: 12,
    ...subtitle,
  },
  input: {
    borderWidth: 1.3,
    color: 'black',
    borderColor: '#3d3d3d',
    paddingHorizontal: 10,
    borderRadius: 10,
    marginBottom: 7,
    width: '100%',
    height: 48,
  },
  desctext: {
    color: descColor,
    fontFamily: 'GangyonModu-Light',
  },
  nextpress: {
    ...subtitle,
    color: primaryColor,
  },
  disabledpress: {
    ...subtitle,
    color: descColor,
  },
  modalContainer: {
    margin: 20,
    borderRadius: 10,
    backgroundColor: 'white',
  },
  modalButton: {
    paddingVertical: 28,
    alignItems: 'center',
  },
  modalButtonText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#3d3d3d',
  },
});
