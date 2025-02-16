import React, { FC, useState } from "react";
import { View, StyleSheet, FlatList, RefreshControl } from "react-native";
import transactionsJSON from "../types/transactions.json";
import { CardType, Transaction } from "../types/transactions";
import TransactionItem from "../components/TransactionItem";

const newTransactions: Transaction[] = [
  {
    id: "21",
    amount: 250.0,
    date: "2025-03-02",
    description: "Gift Purchase",
    type: CardType.DEBIT,
  },
  {
    id: "22",
    amount: 1000.0,
    date: "2025-03-03",
    description: "Bonus Received",
    type: CardType.CREDIT,
  },
];

const transactionsData = transactionsJSON as Transaction[];

const HistoryScreen: FC = () => {
  const [transactions, setTransactions] = useState(transactionsData);
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
    // Act as API call to fetch new data
    setTimeout(() => {
      setTransactions((prevTransactions) => [
        ...newTransactions,
        ...prevTransactions,
      ]);
      setRefreshing(false);
    }, 2000);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <TransactionItem transaction={item} />}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 18,
  },
});

export default HistoryScreen;
