import React from 'react'
import { AdaptableCard } from 'components/shared'
import OrdersTable from './components/OrdersTable'
import OrdersTableTools from './components/OrdersTableTools'
import OrderDeleteConfirmation from './components/OrderDeleteConfirmation'
import { injectReducer } from 'store'
import reducer from './store'

injectReducer('salesOrderList', reducer)

const OrderList = () => {

    return (
        <AdaptableCard className="h-full" bodyClass="h-full">
            <div className="lg:flex items-center justify-between mb-4">
                <h3 className="mb-4 lg:mb-0">Ventes</h3>
                <OrdersTableTools />
            </div>
            <OrdersTable />
            <OrderDeleteConfirmation />
        </AdaptableCard>
    )
}

export default OrderList
