import React, { useEffect, useState } from 'react'
import { api } from '../../services/api'
import { Container } from './styles'

export function TransactionsTable() {
    const [transactions, setTransactions] = useState<any[]>([])

    useEffect(() => {
        api.get('/transactions').then((res: any) => setTransactions(res.data))
    }, [])

    return (
        <Container>
            <table>
                <thead>
                    <tr>
                        <th>Título</th>
                        <th>Valor</th>
                        <th>Categoria</th>
                        <th>Data</th>
                    </tr>
                </thead>

                <tbody>
                    {!!transactions &&
                        transactions.map((transaction, index) => (
                            <tr key={index}>
                                <td>{transaction.title}</td>
                                <td className="deposit">
                                    {transaction.amount}
                                </td>
                                <td>{transaction.category}</td>
                                <td>{transaction.creatAt}</td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </Container>
    )
}
