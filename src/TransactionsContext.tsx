import React, { createContext, ReactNode, useEffect, useState } from 'react'
import { api } from './services/api'

interface Transaction {
    id: number
    title: string
    type: string
    category: string
    amount: number
    createdAt: string
}

type TransactionIput = Omit<Transaction, 'id' | 'createdAt'>

interface TransactionsContextData {
    transactions: Transaction[]
    createTransaction: (transaction: TransactionIput) => void
}

interface TransactionProviderProps {
    children: ReactNode
}

export const TransactionsContext = createContext<TransactionsContextData>(
    {} as TransactionsContextData
)

export function TransactionsProvider({ children }: TransactionProviderProps) {
    const [transactions, setTransactions] = useState<Transaction[]>([])

    useEffect(() => {
        api.get('/transactions').then(response =>
            setTransactions(response.data.transactions)
        )
    }, [])

    function createTransaction(transaction: TransactionIput) {
        api.post('/transactions', transaction)
    }

    return (
        <TransactionsContext.Provider
            value={{ transactions, createTransaction }}
        >
            {children}
        </TransactionsContext.Provider>
    )
}
