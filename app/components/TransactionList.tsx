import React, { FC } from "react";
import { RefreshControl, View } from "react-native";
import TransactionItem from "./TransactionItem";
import { Transaction } from "../types/transactions";
import { List, Text } from "@ui-kitten/components";

interface TransactionListProps {
  transactions: Transaction[];
  onRefresh: () => void;
  refreshing: boolean;
}

const TransactionList: FC<TransactionListProps> = ({
  transactions,
  onRefresh,
  refreshing,
}) => {
  return (
    <View>
      <Text category="h4">Recent Transactions</Text>
      <List
        data={transactions}
        renderItem={({ item }) => <TransactionItem transaction={item} />}
        keyExtractor={(item) => item.id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
};

export default TransactionList;
