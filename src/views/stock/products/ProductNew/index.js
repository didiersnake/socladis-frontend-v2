import React from 'react'
import ProductForm from 'views/stock/products/ProductForm'
import { toast, Notification } from 'components/ui'
import { useNavigate } from 'react-router-dom'
import { apiCreateProduct } from 'services/ProductsService'

const ProductNew = () => {
    const navigate = useNavigate()

    const addProduct = async (data) => {
        const response = await apiCreateProduct(data)
        return response.data
    }

    const handleFormSubmit = async (values, setSubmitting) => {
        let data = {
            name:
                values.format === 'Grand format'
                    ? values.name + ' 1L'
                    : values.name,
            category: values.category,
            format: values.format,
            unitPrice: values.unitPrice,
            sale_price: [
                {
                    grossiste: values.grossiste,
                    'semi-grossiste': values.Semi_grossiste,
                    detaillant: values.detaillant,
                    random: values.random,
                },
            ],
        }
        // console.log("values");
        setSubmitting(true)
        const success = await addProduct(data)
        setSubmitting(false)
        if (success) {
            toast.push(
                <Notification
                    title={'Ajouté avec succès'}
                    type="success"
                    duration={2500}
                >
                    Produit ajouté avec succès
                </Notification>,
                {
                    placement: 'top-center',
                }
            )
            navigate('/app/products')
        }
    }

    const handleDiscard = () => {
        navigate('/app/products')
    }

    return (
        <>
            <ProductForm
                type="new"
                onFormSubmit={handleFormSubmit}
                onDiscard={handleDiscard}
            />
        </>
    )
}

export default ProductNew
