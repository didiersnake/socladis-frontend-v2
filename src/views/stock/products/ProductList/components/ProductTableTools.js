import React from 'react'
import { Button } from 'components/ui'
import { HiPlusCircle } from 'react-icons/hi'
import ProductTableSearch from './ProductTableSearch'
import { Link } from 'react-router-dom'

const ProductTableTools = () => {
    return (
        <div className="flex flex-col lg:flex-row lg:items-center">
            <ProductTableSearch />
            {/* <ProductFilter /> */}
            <Link
                className="block lg:inline-block md:mx-2 md:mb-0 mb-4"
                to="/data/product-list.csv"
                target="_blank"
                download
            >

            </Link>
            <Link
                className="block lg:inline-block md:mb-0 mb-4"
                to="/app/product-new"
            >
                <Button block variant="solid" size="sm" icon={<HiPlusCircle />}>
                    Ajouter un Produit
                </Button>
            </Link>
        </div>
    )
}

export default ProductTableTools
