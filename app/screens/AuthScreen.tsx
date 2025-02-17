import React, { useEffect, useState, FC } from "react";
import * as LocalAuthentication from "expo-local-authentication";
import { View, Alert, StyleSheet } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation/AppNavigator";
import { useNavigation } from "@react-navigation/native";
import Svg, { Path } from "react-native-svg";
import { Text, Button, Icon } from "@ui-kitten/components";

type AuthScreenNavigationProp = StackNavigationProp<RootStackParamList, "Auth">;

const LockIcon = (props: any) => <Icon name="lock" {...props} />;

const AuthScreen: FC = () => {
  const [isBiometricSupported, setIsBiometricSupported] = useState(false);
  const navigation = useNavigation<AuthScreenNavigationProp>();

  useEffect(() => {
    (async () => {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      setIsBiometricSupported(compatible);
    })();
  }, []);

  const handleAuth = async () => {
    const savedBiometrics = await LocalAuthentication.isEnrolledAsync();
    if (!savedBiometrics) {
      return Alert.alert(
        "Biometric Authentication",
        "No biometric found.",
        [{ text: "OK" }]
      );
    }

    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: "Authenticate with Biometrics",
      fallbackLabel: "Use Passcode",
    });

    // If success auth, navigate to Transaction List
    if (result.success) {
      navigation.navigate("History");
    } else {
      Alert.alert("Authentication Failed", "Please try again.", [
        { text: "OK" },
      ]);
    }
  };

  return (
    <View>
      <View style={styles.waveTop}>
        <Text category="h1" style={styles.text}>
          Secure Transaction History Module
        </Text>
      </View>
      <View>
        <Svg>
          <Path
            fill="#0000e6"
            fill-opacity="1"
            d="M0,256L24,229.3C48,203,96,149,144,160C192,171,240,245,288,272C336,299,384,277,432,229.3C480,181,528,107,576,85.3C624,64,672,96,720,122.7C768,149,816,171,864,192C912,213,960,235,1008,218.7C1056,203,1104,149,1152,144C1200,139,1248,181,1296,202.7C1344,224,1392,224,1416,224L1440,224L1440,0L1416,0C1392,0,1344,0,1296,0C1248,0,1200,0,1152,0C1104,0,1056,0,1008,0C960,0,912,0,864,0C816,0,768,0,720,0C672,0,624,0,576,0C528,0,480,0,432,0C384,0,336,0,288,0C240,0,192,0,144,0C96,0,48,0,24,0L0,0Z"
          ></Path>
        </Svg>
      </View>
      <View style={styles.waveBottom}>
        {isBiometricSupported && (
          <Button accessoryLeft={LockIcon} size="large" onPress={handleAuth}>
            Login with Biometrics
          </Button>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  text: {
    color: "#FFFFFF",
    textAlign: "center",
  },
  waveTop: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0000e6",
    height: 180,
  },
  waveBottom: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: "-10%",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default AuthScreen;
