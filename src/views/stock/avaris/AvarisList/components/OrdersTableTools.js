import React from 'react'
import { Button } from 'components/ui'
import { HiDownload, HiPlusCircle } from 'react-icons/hi'
import OrderTableSearch from './OrderTableSearch'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import OrderDateRangeFilter from './OrderDateRangeFilter'


import { injectReducer } from 'store'
import reducer from 'views/stock/products/ProductList/store'
// import { getProductsUnpaginated } from 'views/stock/products/ProductList/store/dataSlice'

injectReducer('salesProducts', reducer)

const OrdersTableTools = () => {
    const sales = useSelector((state) => state.salesOrderList.data.orderByRange)

    const startDate = useSelector(
        (state) => state.salesOrderList.data.tableData.startDate
    )

    const endDate = useSelector(
        (state) => state.salesOrderList.data.tableData.endDate
    )

    const products = useSelector(
        (state) => state.salesProducts.data.productList
    )

    const getProductPrice = (prodcutName) => {
        const product = products.find((el) => el?.name === prodcutName)
        return Number(product?.unitPrice)
    }

    const salesTopic =
        'Etat des avaris sur la period du ' +
        `${new Date(startDate).toLocaleDateString()} au ${new Date(
            endDate
        ).toLocaleDateString()}`

    const purchaseExportData = sales?.map((i) => {
        return {
            Nom: i.name,
            Date: new Date(i.date).toLocaleDateString(),
            "Type d'Avaris": i.type,
            Quantité: i.quantity,
            'Prix Achat TTC':
                i.unit_price !== undefined && i.unit_price !== null
                    ? i.unit_price
                    : getProductPrice(i?.name),
            'Total TTC':
                i.total !== undefined && i.total !== null
                    ? i.total
                    : getProductPrice(i?.name) * Number(i.quantity),
        }
    })

    const Total_TTC_Footer = sales?.reduce((acc, curr) => {
        let total
        if (
            curr.total === undefined ||
            curr.total === null ||
            curr.total === ' '
        ) {
            total = getProductPrice(curr.name) * Number(curr.quantity)
        } else {
            total = curr.total
        }
        return acc + total
    }, 0)
    const footer = 'Total TCC ' + Total_TTC_Footer

    const handleSalesExport = (data, topic) => {
        const csvHeader = Object.keys(data[0]).join(';') + '\n'
        const csvRows = data
            .map((row) => Object.values(row).join(';'))
            .join('\n')

        // Add the topic at the top of the file
        const csvContent = `${topic}\n\n${csvHeader}${csvRows}\n\n${footer}`

        // Create a blob and trigger download
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
        const url = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', 'Etat des Avaris.csv')
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }

    return (
        <div className="flex flex-col lg:flex-row lg:items-center gap-4">
            {/* {selectedRows.length > 0 && <BatchDeleteButton />} */}
            <Link
                onClick={() =>
                    handleSalesExport(purchaseExportData, salesTopic)
                }
            >
                <Button block size="sm" icon={<HiDownload />}>
                    Avaris
                </Button>
            </Link>
            <OrderDateRangeFilter />
            <OrderTableSearch />
            <Link
                className="block lg:inline-block md:mb-0 mb-4"
                to="/app/damaged/damaged-new"
            >
                <Button block variant="solid" size="sm" icon={<HiPlusCircle />}>
                    Ajouter un Produit
                </Button>
            </Link>
        </div>
    )
}

export default OrdersTableTools
