import * as React from 'react';

import { StyleSheet, View } from 'react-native';
import { checkAppUpdate } from 'react-native-app-update-detect';

export default function App() {
  React.useEffect(() => {
    checkAppUpdate()
      .then((res: any) => {
        console.log(res);
      })
      .catch((err: any) => {
        console.log(err);
      });
  }, []);

  return <View style={styles.container} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
