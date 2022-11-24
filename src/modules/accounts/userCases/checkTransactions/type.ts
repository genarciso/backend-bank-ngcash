export interface ICheckTransactions {
    userId: string,
    date?: string,
    transactionCashIn: boolean,
    transactionCashOut: boolean
}