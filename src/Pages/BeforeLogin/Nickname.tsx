import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  Pressable,
} from 'react-native';
import React, {useState} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {getCameraGalleryPermissions} from '../../utils/PermissionsFuncs';
import {
  primaryColor,
  descColor,
  title,
  subtitle,
  grayColor,
} from '../../utils/styles';

export default function Nickname({navigation}) {
  const [nickname, setNickname] = useState<string>('');
  const [userImage, setUserImage] = useState();
  const [visible, setVisible] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const onchangeNickname = (text: string) => {
    setNickname(text);
    let check = check_nickname(text);
    if (check) {
      setVisible(true); // 처음 닉네임 유효성검사 안해도 빨간색뜨는 기능 수정하기 위해 넣음
    }
    setError(check);
  };

  const check_nickname = (text: string) => {
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
  };

  const getUserImgage = () => {
    getCameraGalleryPermissions(setUserImage);
  };

  const nextPageMove = () => {
    console.log('image + nickname move');
    navigation.navigate('Targetcost1');
  };

  return (
    <View style={styles.view}>
      <View style={styles.header}>
        <Text style={styles.headertitle}>처음이신가요?</Text>
      </View>
      <View style={styles.body}>
        <Pressable onPress={getUserImgage}>
          <View style={styles.user_img}>
            <View style={styles.circle} />
            <View style={styles.circle_icon}>
              <MaterialCommunityIcons name="camera-plus-outline" size={50} />
            </View>
          </View>
        </Pressable>
        <View style={{width: '100%'}}>
          <Text style={styles.nickname}>닉네임</Text>
          <TextInput
            style={styles.input}
            onChangeText={onchangeNickname}
            value={nickname}
            placeholder=""
            maxLength={10}
          />
          <Text
            style={!error && visible ? {color: '#ff4f4f'} : styles.desctext}>
            2~10자이내 특수문자,공백제외 (\~@#$%^&*)
          </Text>
        </View>
      </View>
      <View style={styles.foot}>
        <TouchableWithoutFeedback disabled={!error} onPress={nextPageMove}>
          <Text style={!error ? styles.disabledpress : styles.nextpress}>
            다음
          </Text>
        </TouchableWithoutFeedback>
      </View>
    </View>
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
    flex: 3,
    justifyContent: 'center',
  },
  body: {
    flex: 7,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  foot: {
    flex: 2,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  headertitle: {
    color: primaryColor,
    ...title,
  },
  user_img: {
    width: 150,
    height: 150,
  },
  circle: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: grayColor,
    width: 150,
    height: 150,
    borderRadius: 150,
  },
  circle_icon: {
    position: 'absolute',
    left: 100,
    top: 100,
  },
  nickname: {
    color: 'black',
    marginBottom: 5,
    ...subtitle,
  },
  inputarea: {
    flexDirection: 'row',
  },
  input: {
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginBottom: 5,
    width: '100%',
    height: 48,
  },
  desctext: {
    color: descColor,
  },
  nextpress: {
    ...subtitle,
    color: primaryColor,
  },
  disabledpress: {
    ...subtitle,
    color: descColor,
  },
});
