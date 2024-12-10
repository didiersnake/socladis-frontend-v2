import React, { useEffect } from 'react'
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

export const calculatePaymentBill = (
    products,
    user,
    inclure_ristourn,
    inclure_precompte
) => {
    const total_without_tax = products.reduce(
        (acc, curr) => acc + Number(curr.total),
        0
    )

    const ristourn =
     !inclure_ristourn ? 0 :user?.category !== 'random'
            ? 100 * products?.reduce(
        (acc, curr) => acc + Number(curr.quantity),
        0
    ): 0
    const VAT_amount = (total_without_tax * 0.1925)
    const withdrawal_amountCal = () => {
        let result 
        if(!inclure_precompte){ 
            result = 0
        }
        else if (user?.tax_system === 'réel') {
            result = total_without_tax * 0.02
        } else if (user?.tax_system === 'simplifié') {
            result = total_without_tax * 0.05
        } else if (user?.tax_system === 'liberatoir') {
            result = total_without_tax * 0.1
        } else if (user?.tax_system === 'liberatoir CGA') {
            result = total_without_tax * 0.05
        } else if (user?.tax_system === 'simplifié CGA') {
            result = total_without_tax * 0.025
        } else if (user?.tax_system === 'réel CGA') {
            result = total_without_tax * 0.01
        } else {
            result = total_without_tax * 0.1
        }
        return result
    }

    const withdrawal_amount = withdrawal_amountCal()
    //prix prouits ont modifie en TTC pour total_HT egale Total TTc 
    let total_with_tax = total_without_tax + ristourn + withdrawal_amount
    return {
        VAT_amount: VAT_amount.toFixed(2).toString(),
        total_with_tax: total_with_tax.toFixed(2).toString(),
        total_without_tax: total_without_tax.toFixed(2).toString(),
        withdrawal_amount: inclure_precompte ? withdrawal_amount.toFixed(2).toString() : "0",
        ristourne: ristourn.toString()
    }
    
}


const PaymentSummary = ({ products, user, inclure_ristourn, inclure_precompte }) => {
    const data = calculatePaymentBill(
        products,
        user,
        inclure_ristourn,
        inclure_precompte
    )
    useEffect(()=> {
    }, [products, inclure_precompte, inclure_ristourn, user])

    return (
        <Card className="">
            <h5 className="mb-4">Résumé des Facture </h5>
            <ul>
                <PaymentInfo label="TVA" value={data?.VAT_amount} />
                <PaymentInfo label="Ristourne" value={data?.ristourne} />
                <PaymentInfo
                    label="Precompte"
                    value={data?.withdrawal_amount}
                />
                {/* <PaymentInfo label="Total HT" value={data?.total_without_tax} /> */}

                <hr className="mb-3" />
                <PaymentInfo
                    label="Total TTC"
                    value={data?.total_with_tax}
                    isLast
                />
            </ul>
        </Card>
    )
}

export default PaymentSummary
