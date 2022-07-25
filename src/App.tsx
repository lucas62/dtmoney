import React, { useEffect, useState } from 'react'
import Modal from 'react-modal'
import { Dashboard } from './components/Dashboard'
import { Header } from './components/Header'
import { NewTransactionModal } from './components/NewTransactionModal'
import { api } from './services/api'
import { GlobalStyle } from './styles/global'
import { TransactionsProvider } from './TransactionsContext'

Modal.setAppElement('#root')

export function App() {
    const [isNewTransactionOpen, setIsNewTransactionOpen] =
        useState<boolean>(false)

    function handleOpenNewTransactionModal() {
        setIsNewTransactionOpen(true)
    }

    function handleCloseNewTransactionModal() {
        setIsNewTransactionOpen(false)
    }

    return (
        <TransactionsProvider>
            <Header onOpenNewTransactionModal={handleOpenNewTransactionModal} />
            <Dashboard />

            <NewTransactionModal
                isOpen={isNewTransactionOpen}
                onRequestClose={handleCloseNewTransactionModal}
            />

            <GlobalStyle />
        </TransactionsProvider>
    )
}
