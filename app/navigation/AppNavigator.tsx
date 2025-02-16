import React, { FC } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Transaction } from "../types/transactions";
import HistoryScreen from "../screens/HistoryScreen";
import DetailScreen from "../screens/DetailScreen";
import AuthScreen from "../screens/AuthScreen";

export type RootStackParamList = {
  History: undefined;
  Detail: { transaction: Transaction };
  Auth: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator: FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="Auth"
    >
      <Stack.Screen name="Auth" component={AuthScreen} />
      <Stack.Screen name="History" component={HistoryScreen} />
      <Stack.Screen name="Detail" component={DetailScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
