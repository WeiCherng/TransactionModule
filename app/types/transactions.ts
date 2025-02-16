export interface Transaction {
  id: string;
  amount: number;
  date: string;
  description: string;
  type: CardType;
}

export enum CardType {
  DEBIT = "debit",
  CREDIT = "credit"
}