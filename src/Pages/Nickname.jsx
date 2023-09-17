import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
} from 'react-native';
import React, {useState} from 'react';

export default function Nickname() {
  const [nickname, setNickname] = useState('');
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState(false);

  const onchangeNickname = text => {
    setNickname(text);
    let check = check_nickname(text);
    if (check) {
      setVisible(true); // 처음 닉네임 유효성검사 안해도 빨간색뜨는 기능 수정하기 위해 넣음
    }
    setError(check);
  };

  const check_nickname = text => {
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
    console.log('imgee!');
  };

  const nextPageMove = () => {
    console.log('image + nickname move');
  };

  return (
    <View style={styles.view}>
      <View style={styles.header}>
        <Text style={styles.headertitle}>처음이신가요?</Text>
      </View>
      <View style={styles.body}>
        <TouchableWithoutFeedback onPress={getUserImgage}>
          <View style={styles.circle} />
        </TouchableWithoutFeedback>
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

const title = {
  fontWeight: '800',
  fontSize: 55,
};

const subtitle = {
  fontSize: 28,
  fontWeight: '900',
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
    paddingHorizontal: 40,
    paddingVertical: 70,
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
    color: '#d54183',
    ...title,
  },
  circle: {
    backgroundColor: '#9e9e9e',
    alignItems: 'center',
    justifyContent: 'center',
    width: 150,
    height: 150,
    borderRadius: 150,
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
    color: '#9e9e9e',
  },
  nextpress: {
    ...subtitle,
    color: '#d54183',
  },
  disabledpress: {
    ...subtitle,
    color: '#9e9e9e',
  },
});
