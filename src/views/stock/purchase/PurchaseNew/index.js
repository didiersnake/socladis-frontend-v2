import React, { useEffect } from 'react'
import ProductForm from 'views/stock/purchase/PurchaseForm/index'
import { toast, Notification } from 'components/ui'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { injectReducer } from 'store'
import reducer from 'views/stock/products/ProductList/store'
import authReducer from 'store/auth'
import {getProductsUnpaginated } from 'views/stock/products/ProductList/store/dataSlice'
import { apiCreateNewPurchase } from 'services/PurchaseServie'

injectReducer("salesProducts", reducer)
injectReducer("auth", authReducer)

const ProductNew = () => {
    const navigate = useNavigate()

    const addProduct = async (data) => {
        const response = await apiCreateNewPurchase(data)
        return response.data
    }

    const dispatch = useDispatch()
    const products = useSelector(
        (state) => state.salesProducts.data.productList
    )
    const createdBy = useSelector((state) => state.auth.user.name)

    // console.log(products);   
    
    const loading = useSelector(
        (state) => state.salesProducts.data.loading
    )

    const fetchData = ()=> {
        dispatch(getProductsUnpaginated())
    }

    useEffect(()=> {
        fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleFormSubmit = async (values, setSubmitting) => {
        setSubmitting(true)
        const data = {
            name: values.name,
            quantity: values.quantity,
            date: new Date(values.date).toISOString(),
            invoice_number: values.invoice_number,
            purchase_type: values.purchase_type,
            createdBy: createdBy,
            updatedBy: createdBy,
        }
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
            navigate('/app/supply')
        }
        
    }

    const handleDiscard = () => {
        navigate('/app/supply')
    }

    return (
        <>
            {!loading && (
                <ProductForm
                    type="new"
                    onFormSubmit={handleFormSubmit}
                    onDiscard={handleDiscard}
                    suggestions={products}
                    // initialData={{}}
                />
            )}
        </>
    )
}

export default ProductNew
