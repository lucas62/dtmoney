import React, {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState
} from 'react'
import { api } from '../services/api'

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
    createTransaction: (transaction: TransactionIput) => Promise<void>
}

interface TransactionProviderProps {
    children: ReactNode
}

const TransactionsContext = createContext<TransactionsContextData>(
    {} as TransactionsContextData
)

export function TransactionsProvider({ children }: TransactionProviderProps) {
    const [transactions, setTransactions] = useState<Transaction[]>([])

    useEffect(() => {
        api.get('/transactions').then(response =>
            setTransactions(response.data.transactions)
        )
    }, [])

    async function createTransaction(transactionInput: TransactionIput) {
        const response = await api.post('/transactions', {
            ...transactionInput,
            createdAt: new Date()
        })
        const { transaction } = response.data

        setTransactions([...transactions, transaction])
    }

    return (
        <TransactionsContext.Provider
            value={{ transactions, createTransaction }}
        >
            {children}
        </TransactionsContext.Provider>
    )
}

export function useTransactions() {
    const context = useContext(TransactionsContext)

    return context
}
