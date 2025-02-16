import * as LocalAuthentication from 'expo-local-authentication';

export const authenticateUser = async (): Promise<boolean> => {
  const hasHardware = await LocalAuthentication.hasHardwareAsync();
  const isEnrolled = await LocalAuthentication.isEnrolledAsync();

  if (hasHardware && isEnrolled) {
    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Authenticate to View',
      fallbackLabel: 'Use Passcode',
    });
    return result.success;
  }
  return false;
};
