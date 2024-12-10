import React from 'react'
import { Card } from 'components/ui'
import NumberFormat from 'react-number-format'

const PaymentInfo = ({ label, value, isLast }) => {
    return (
        <li
            className={`flex items-center justify-between${
                !isLast ? ' mb-3' : ''
            }`}
        >
            <span>{label}</span>
            <span className="font-semibold">
                <NumberFormat
                    displayType="text"
                    value={(Math.round(value * 100) / 100).toFixed(2)}
                    prefix={'CFA '}
                    thousandSeparator={true}
                />
            </span>
        </li>
    )
}

const PaymentSummary = ({ data }) => {
    return (
        <Card className="mb-4">
            <h5 className="mb-4">Résumé des paiements </h5>
            <ul>
                <PaymentInfo label="TVA" value={data.VAT_amount} />
                <PaymentInfo label="Ristourne" value={data.ristourne} />
                <PaymentInfo label="Precompte" value={data.withdrawal_amount} />
                <PaymentInfo label="Total HT" value={data.total_without_tax} />

                <hr className="mb-3" />
                <PaymentInfo
                    label="Total TTC"
                    value={data.total_with_tax}
                    isLast
                />
            </ul>
        </Card>
    )
}

export default PaymentSummary
