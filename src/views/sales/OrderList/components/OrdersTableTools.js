import React from 'react'
import { Button } from 'components/ui'
import { HiDownload, HiPlusCircle } from 'react-icons/hi'
import OrderTableSearch from './OrderTableSearch'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import OrderDateRangeFilter from './OrderDateRangeFilter'
import { apiExportRistourne } from 'services/SaleService'
import moment from 'moment-timezone'

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
    // const selectedRows = useSelector(
    //     (state) => state.salesOrderList.state.selectedRows
    // )
    const sales = useSelector((state) => state.salesOrderList.data.orderByRange)

    const startDate = useSelector(
        (state) => state.salesOrderList.data.tableData.startDate
    )

    const endDate = useSelector(
        (state) => state.salesOrderList.data.tableData.endDate
    )
    const timeZone = 'Africa/Douala'
    let s_date = moment.tz(startDate, timeZone).startOf('day').toISOString()
    let e_date = moment.tz(endDate, timeZone).startOf('day').toISOString()

    const hanleExportRistourne = async () => {
        // console.log(sales);
        const success = await apiExportRistourne({ sales, s_date, e_date })
        // Create a blob URL and a temporary download link
        const url = window.URL.createObjectURL(new Blob([success.data]))
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', 'ristourne_client.zip') // Specify the filename
        document.body.appendChild(link)
        link.click()
        link.remove()
    }

    const salesTopic = `Etat des ventes sur la period du
     ${new Date(startDate).toLocaleDateString('en-GB')} au ${new Date(
        endDate
    ).toLocaleDateString('en-GB')}`
    const salesExportData = sales?.map((i) => {
        return {
            Facture: i.invoice_number,
            Nom: i.clientName,
            Date: new Date(i.date).toLocaleDateString('en-GB'),
            Total_HT: i.total_without_tax,
            Ristourne: i.ristourne,
            TVA: i.VAT_amount,
            Precompte: i.withdrawal_amount,
            Total_TTC: i.total_with_tax,
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
        link.setAttribute('download', 'Etat des ventes.csv')
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }

    return (
        <div className="flex flex-col lg:flex-row lg:items-center gap-4">
            {/* {selectedRows.length > 0 && <BatchDeleteButton />} */}
            <Link onClick={hanleExportRistourne}>
                <Button block size="sm" icon={<HiDownload />}>
                    Ristournes
                </Button>
            </Link>
            <Link
                onClick={() => handleSalesExport(salesExportData, salesTopic)}
            >
                <Button block size="sm" icon={<HiDownload />}>
                    Ventes
                </Button>
            </Link>
            <OrderDateRangeFilter />
            <OrderTableSearch />
            <Link
                className="block lg:inline-block md:mb-0 mb-4"
                to="/app/sales/sale-new"
            >
                <Button block variant="solid" size="sm" icon={<HiPlusCircle />}>
                    Ajouter un Facture
                </Button>
            </Link>
        </div>
    )
}

export default OrdersTableTools
