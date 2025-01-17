import React from 'react'
import { Button } from 'components/ui'
import { HiDownload, HiPlusCircle } from 'react-icons/hi'
import ProductTableSearch from './ProductTableSearch'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const ProductTableTools = () => {

    const clients = useSelector((state) => state.salesProductList.data.clients)

    const salesTopic = `List des client`
    const userExportData = clients?.map((i) => {
        return {
            NIU: i.uniqueCode,
            Nom: i.name,
            "Regime fiscal" : i.tax_system,
            Telephone: i.phone,
            Category: i.category,
            Location: i.location
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
        link.setAttribute('download', 'Liste Clients.csv')
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }

    return (
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
            {/* <ProductFilter /> */}
            <Link
                // className="block lg:inline-block md:mx-2 md:mb-0 mb-4"
                className="flex flex-col lg:flex-row lg:items-center gap-4"
                onClick={() => handleSalesExport(userExportData, salesTopic)}
            >
                <Button block size="sm" icon={<HiDownload />}>
                    Clients
                </Button>
            </Link>
            <ProductTableSearch />

            <Link
                className="block lg:inline-block md:mb-0 mb-4"
                to="/app/users/user-new"
            >
                <Button block variant="solid" size="sm" icon={<HiPlusCircle />}>
                    Ajouter un Utilisateur
                </Button>
            </Link>
        </div>
    )
}

export default ProductTableTools
