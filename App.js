import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import {
  Linking,
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button,
} from 'react-native';
import { Camera } from 'expo-camera';
import { BarCodeScanner } from 'expo-barcode-scanner';
import * as WebBrowser from 'expo-web-browser';

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [scanned, setScanned] = useState(false);

  if (Platform.OS === 'web') {
    if (!Camera.isAvailableAsync()) {
      return <Text>Camera is not available.</Text>;
    }
    // setType(Camera.Constants.Type.front);
  } else {
    useEffect(() => {
      (async () => {
        const { status } = await Camera.requestPermissionsAsync();
        setHasPermission(status === 'granted');
      })();
    }, []);

    if (hasPermission === null) {
      return <Text>Requesting for camera permission.</Text>;
    }
    if (hasPermission === false) {
      return <Text>No access to camera</Text>;
    }
  }
  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    let res = WebBrowser.openBrowserAsync(data);
    if (Platform.os !== 'web') {
      // setScanned(false);
    }
  };
  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        type={type}
        barCodeScannerSettings={{
          shouldRenderIndicator: true,
          barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr],
        }}
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
      >
        <View style={styles.buttonContainer}>
          {scanned && (
            <TouchableOpacity
              style={styles.button}
              title={'Tap to Scan Again'}
              onPress={() => setScanned(false)}
            >
              <Text style={styles.text}> 再スキャンするには画面にタップしてください </Text>
            </TouchableOpacity>
          )}
        </View>
      </Camera>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  button: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 20,
    marginHorizontal: 15,
    marginBottom: 10,
  },
  noCamera: {
    color: '#888',
    fontSize: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
