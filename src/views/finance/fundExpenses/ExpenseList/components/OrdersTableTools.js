import React from 'react'
import { Button } from 'components/ui'
import { HiDownload, HiPlusCircle } from 'react-icons/hi'
import OrderTableSearch from './OrderTableSearch'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import OrderDateRangeFilter from './OrderDateRangeFilter'

const OrdersTableTools = () => {
    const sales = useSelector((state) => state.salesOrderList.data.orderByRange)

    const startDate = useSelector(
        (state) => state.salesOrderList.data.tableData.startDate
    )

    const endDate = useSelector(
        (state) => state.salesOrderList.data.tableData.endDate
    )

    const salesTopic = `Etat des Depenses sur la period du
     ${new Date(startDate).toLocaleDateString('en-GB')} au ${new Date(
        endDate
    ).toLocaleDateString('en-GB')}`
    const purchaseExportData = sales?.map((i) => {
        return {
            Motif: i.modif,
            Montant: i.amount,
            Bank: i.bank,
            Date: new Date(i.date).toLocaleDateString('en-GB'),
        }
    })
    
    const handleSalesExport = (data, topic) => {
        const csvHeader = Object.keys(data[0]).join(';') + '\n'
        const csvRows = data
            .map((row) => Object.values(row).join(';'))
            .join('\n')

        // Add the topic at the top of the file
        const csvContent = `${topic}\n\n${csvHeader}${csvRows}`

        // Create a blob and trigger download
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
        const url = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', 'Etat des Depenses.csv')
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
                    Depenses
                </Button>
            </Link>
            <OrderDateRangeFilter />
            <OrderTableSearch />
            <Link
                className="block lg:inline-block md:mb-0 mb-4"
                to="/app/cash-out/cash-out-new"
            >
                <Button block variant="solid" size="sm" icon={<HiPlusCircle />}>
                    Ajouter
                </Button>
            </Link>
        </div>
    )
}

export default OrdersTableTools
