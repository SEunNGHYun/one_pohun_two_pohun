import React, {useCallback} from 'react';
import {View, Text, StyleSheet, Pressable, TextInput} from 'react-native';
import {useRecoilValue} from 'recoil';
import {Modal, Portal, PaperProvider} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {grayColor} from '../../../utils/styles';
import type {Themes} from '../../../types/types';
import {appTheme} from '../../../recoils/states';

export default function MatchingRoom() {
  const theme = useRecoilValue<Themes>(appTheme);

  const movePage = useCallback(() => {}, []);
  return (
    <PaperProvider>
      <View style={{flex: 1, backgroundColor: 'white'}} />
      <Portal>
        <Modal visible={true} contentContainerStyle={styles.modalView}>
          <Text style={[styles.modalFont, {color: theme}]}>입장 코드</Text>
          <TextInput
            style={styles.codeFont}
            editable={false}
            selectTextOnFocus
            value={'Dsdsfsfghgewwscxzc235sfds'}
          />
          <Pressable onPress={movePage}>
            <View style={styles.modalBottom}>
              <Text style={styles.modalButtFont}>공유하기</Text>
              <MaterialCommunityIcons
                name="chevron-right"
                color={theme}
                size={44}
              />
            </View>
          </Pressable>
        </Modal>
      </Portal>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    padding: 18,
    borderRadius: 20,
  },
  modalFont: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 18,
  },
  codeFont: {
    fontSize: 18,
    fontWeight: 'bold',
    borderWidth: 0.6,
    borderColor: grayColor,
    padding: 10,
    marginBottom: 18,
  },
  modalButtFont: {fontSize: 22, fontWeight: 'bold'},
  modalBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
});
