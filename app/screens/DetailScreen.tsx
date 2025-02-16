import React from "react";
import { View, StyleSheet } from "react-native";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../navigation/AppNavigator";
import { Icon, Text } from "@ui-kitten/components";
import { CardType } from "../types/transactions";

type TransactionDetailScreenRouteProp = RouteProp<RootStackParamList, "Detail">;

interface Props {
  route: TransactionDetailScreenRouteProp;
}

const DebitLabel = () => (
  <View style={styles.debitCont}>
    <Text style={styles.text} status="control">
      DEBIT
    </Text>
  </View>
);
const CreditLabel = () => (
  <View style={styles.creditCont}>
    <Text style={styles.text} status="control">
      CREDIT
    </Text>
  </View>
);

const DetailScreen: React.FC<Props> = ({ route }) => {
  const { transaction } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.typeCont}>
        {transaction.type === CardType.DEBIT ? <DebitLabel /> : <CreditLabel />}
      </View>
      <Text category="s1" style={styles.desc}>
        {transaction.description}
      </Text>

      <Text style={styles.price} category="h1">
        RM {transaction.amount.toFixed(2)}
      </Text>
      <View style={styles.dateCont}>
        <Icon fill="#686D76" style={styles.calender} name="calendar" />
        <Text category="s1" style={styles.date}>
          {transaction.date}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 18,
    paddingBottom: 28,
    paddingHorizontal: 18,
    margin: 24,
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#FFFFFF",
  },
  typeCont: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    flexDirection: "row",
  },
  desc: {
    fontSize: 18,
    marginTop: 12,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 16,
  },
  price: {
    marginVertical: 12,
  },
  text: {
    marginHorizontal: 6,
    marginVertical: 2,
    fontWeight: "bold",
  },
  debitCont: {
    borderRadius: 4,
    margin: 4,
    padding: 4,
    backgroundColor: "#98D8EF",
  },
  creditCont: {
    borderRadius: 4,
    margin: 4,
    padding: 4,
    backgroundColor: "#77B254",
  },
  calender: {
    width: 18,
    height: 18,
    marginRight: 8,
  },
  date: {
    color: "#3D3D3D",
  },
  dateCont: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 32,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginVertical: 12,
    borderWidth: 1,
    borderColor: "#DDDDDD",
  },
});

export default DetailScreen;
