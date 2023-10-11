import React from 'react';
import {RecoilRoot} from 'recoil';
import Navi from './src/navi/Navigation';
import codePush from 'react-native-code-push';

function App() {
  return (
    <RecoilRoot>
      <Navi />
    </RecoilRoot>
  );
}
export default App;
//export default codePush(App);
