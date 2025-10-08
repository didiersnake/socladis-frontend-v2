import React, { useEffect } from 'react'
import ProductForm from 'views/stock/avaris/AvarisForm/index'
import { toast, Notification } from 'components/ui'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { injectReducer } from 'store'
import reducer from 'views/stock/products/ProductList/store'
import authReducer from 'store/auth'
import userReducer from 'views/users/users/UserList/store'
import {getProductsUnpaginated } from 'views/stock/products/ProductList/store/dataSlice'
import { apiCreateNewAvaris } from 'services/AvarisService'

injectReducer("salesProducts", reducer)
injectReducer("users", userReducer)
injectReducer("auth", authReducer)

const ProductNew = () => {
    const navigate = useNavigate()

    const addProduct = async (data) => {
        const response = await apiCreateNewAvaris(data)
        return response.data
    }

    const dispatch = useDispatch()
    const products = useSelector(
        (state) => state.salesProducts.data.productList
    )
    const createdBy = useSelector((state) => state.auth.user.name)

    // console.log(products);

    const loading = useSelector((state) => state.salesProducts.data.loading)

    const fetchData = () => {
        dispatch(getProductsUnpaginated())
    }

    useEffect(() => {
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleFormSubmit = async (values, setSubmitting) => {
        const productPrice = () => {
            return products.find((el) => el?.name === values.name)?.unitPrice
        }

        setSubmitting(true)
        const data = {
            name: values.name,
            quantity: values.quantity,
            unit_price: productPrice(),
            total: (
                Number(values.quantity) * Number(productPrice())
            ).toString(),
            date: new Date(values.date).toISOString(),
            type: values.type,
            createdBy: createdBy,
            updatedBy: createdBy,
        }

        console.log(data)

        const success = await addProduct(data)
        setSubmitting(false)
        if (success) {
            toast.push(
                <Notification
                    title={'Ajouté avec succès'}
                    type="success"
                    duration={2500}
                >
                    Avaris ajouté avec succès
                </Notification>,
                {
                    placement: 'top-center',
                }
            )
            navigate('/app/damaged')
        }
    }

    const handleDiscard = () => {
        navigate('/app/damaged')
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
