import React, {useCallback} from 'react';
import {View, Text, StyleSheet, Pressable, TextInput} from 'react-native';
import {Modal, Portal, PaperProvider} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {grayColor, primaryColor} from '../../../utils/styles';

export default function MatchingRoom() {
  const movePage = useCallback(() => {}, []);
  return (
    <PaperProvider>
      <View style={{flex: 1, backgroundColor: 'white'}} />
      <Portal>
        <Modal visible={true} contentContainerStyle={styles.modalView}>
          <Text style={styles.modalFont}>입장 코드</Text>
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
                color={primaryColor}
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
    color: primaryColor,
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
  modalButtFont: {fontSize: 22, fontWeight: 'bold', color: primaryColor},
  modalBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
});
