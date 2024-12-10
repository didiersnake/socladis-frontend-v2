import React from 'react'
import { Button } from 'components/ui'
import { HiDownload, HiPlusCircle } from 'react-icons/hi'
import OrderTableSearch from './OrderTableSearch'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import OrderDateRangeFilter from './OrderDateRangeFilter'

// const BatchDeleteButton = () => {
//     const dispatch = useDispatch()

//     const onBatchDelete = () => {
//         dispatch(setDeleteMode('batch'))
//     }

//     return (
//         <Button
//             variant="solid"
//             color="red-600"
//             size="sm"
//             icon={<HiOutlineTrash />}
//             onClick={onBatchDelete}
//         >
//             Suppression par lots
//         </Button>
//     )
// }


const OrdersTableTools = () => {
    const sales = useSelector(
        (state) => state.salesOrderList.data.purchaseByRange
    )

    const startDate = useSelector(
        (state) => state.salesOrderList.data.tableData.startDate
    )

    const endDate = useSelector(
        (state) => state.salesOrderList.data.tableData.endDate
    )

    const salesTopic = `Etat des achats sur la period du
     ${new Date(startDate).toLocaleDateString()} au ${new Date(endDate).toLocaleDateString()}`
    const purchaseExportData = sales?.map((i) => {
        return {
            Facture: i.invoice_number,
            Nom: i.name,
            Date: new Date(i.date).toLocaleDateString(),
            Quantité: i.quantity,
            Type_d_Achat : i.purchase_type,
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
        link.setAttribute('download', 'Etat des achats.csv')
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }

    return (
        <div className="flex flex-col lg:flex-row lg:items-center gap-4">
            {/* {selectedRows.length > 0 && <BatchDeleteButton />} */}
            <Link onClick={() => handleSalesExport(purchaseExportData, salesTopic)} >
                <Button block size="sm" icon={<HiDownload />}>
                    Achats
                </Button>
            </Link>
            <OrderDateRangeFilter />
            <OrderTableSearch />
            <Link
                className="block lg:inline-block md:mb-0 mb-4"
                to="/app/supply/supply-new"
            >
                <Button block variant="solid" size="sm" icon={<HiPlusCircle />}>
                    Ajouter un Produit
                </Button>
            </Link>
        </div>
    )
}

export default OrdersTableTools
