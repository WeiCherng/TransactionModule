import React, { FC, useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { CardType, Transaction } from "../types/transactions";
import { authenticateUser } from "../utils/authenticate";
import { RootStackParamList } from "../navigation/AppNavigator";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Text, Button, Icon, Card } from "@ui-kitten/components";

const EyeIcon = (props: any) => <Icon name="eye-outline" {...props} />;
const EyeOffIcon = (props: any) => <Icon name="eye-off-outline" {...props} />;

const DebitLabel = () => <Text category="label">DEBIT</Text>;
const CreditLabel = () => <Text category="label">CREDIT</Text>;

type ItemNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Detail"
>;

interface ItemProps {
  transaction: Transaction;
}

const TransactionItem: FC<ItemProps> = ({ transaction }) => {
  const navigation = useNavigation<ItemNavigationProp>();
  const [isAmountVisible, setIsAmountVisible] = useState(false);

  const handlePress = () => {
    navigation.navigate("Detail", { transaction });
  };

  const handleReveeal = async () => {
    if (!isAmountVisible) {
      const authenticated = await authenticateUser();
      if (authenticated) {
        setIsAmountVisible(true);
      }
    } else {
      setIsAmountVisible(false);
    }
  };

  return (
    <Card style={styles.card}>
      <TouchableOpacity onPress={handlePress} style={styles.container}>
        <View>
          <Text category="h6">{transaction.description}</Text>
          <Text category="s1">{transaction.date}</Text>
          {transaction.type === CardType.DEBIT ? (
            <DebitLabel />
          ) : (
            <CreditLabel />
          )}
        </View>
        <View style={styles.price}>
          {isAmountVisible ? (
            <>
              <Text category="h6">RM {transaction.amount.toFixed(2)}</Text>
              <Button
                accessoryRight={EyeOffIcon}
                appearance="ghost"
                status="basic"
                onPress={handleReveeal}
              />
            </>
          ) : (
            <>
              <Text category="h6">****</Text>

              <Button
                accessoryRight={EyeIcon}
                appearance="ghost"
                status="basic"
                onPress={handleReveeal}
              />
            </>
          )}
        </View>
      </TouchableOpacity>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    padding: 0,
  },
  date: {
    marginVertical: 16,
  },
  price: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  card: {
    marginVertical: 10,
    marginHorizontal: 16,
    padding: 0,
    backgroundColor: "#fff",
    borderRadius: 12,
    margin: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  icon: {
    marginRight: 0,
  },
});

export default TransactionItem;
