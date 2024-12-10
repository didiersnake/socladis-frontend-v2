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

    const salesTopic = `Etat du magasin vide sur la period du
     ${new Date(startDate).toLocaleDateString()} au ${new Date(endDate).toLocaleDateString()}`
     
    const purchaseExportData = sales?.map((i) => {
        return {
            Equipe: i.team,
            Plastic: i.plastic,
            date: new Date(i.date).toLocaleDateString(),
            Bouteilles: i.bottle,
            Format: i.format,
            Casier: i.cashier,
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
        link.setAttribute('download', 'Etat Stock Vide.csv')
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
                    Magasin Vide
                </Button>
            </Link>
            <OrderDateRangeFilter />
            <OrderTableSearch />
            <Link
                className="block lg:inline-block md:mb-0 mb-4"
                to="/app/empty-store/new"
            >
                <Button block variant="solid" size="sm" icon={<HiPlusCircle />}>
                    Ajouter 
                </Button>
            </Link>
        </div>
    )
}

export default OrdersTableTools
