import React from 'react'
import { Summary } from '../Summary'
import { Transactions } from '../Transaction'
import { Container } from './styles'

export function Dashboard() {
    return (
        <Container>
            <Summary />
            <Transactions />
        </Container>
    )
}
