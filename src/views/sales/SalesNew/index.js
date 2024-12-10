import React, { useEffect } from 'react'
import ProductForm from 'views/sales/ProductForm/index'
import { toast, Notification } from 'components/ui'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { injectReducer } from 'store'
import reducer from 'views/stock/products/ProductList/store'
import authReducer from 'store/auth'
import userReducer from 'views/users/users/UserList/store'
import {getProductsUnpaginated } from 'views/stock/products/ProductList/store/dataSlice'
import { getAllClients } from 'views/users/users/UserList/store/dataSlice'
import { calculatePaymentBill } from './components/PaymentSummary'
import { apiCreateNewSale } from 'services/SaleService'

injectReducer("salesProducts", reducer)
injectReducer("users", userReducer)
injectReducer("auth", authReducer)

const ProductNew = () => {
    const navigate = useNavigate()

    const addProduct = async (data) => {
        const response = await apiCreateNewSale(data)
        return response.data
    }

    const dispatch = useDispatch()
    const products = useSelector(
        (state) => state.salesProducts.data.productList
    )

    const users = useSelector(
        (state) => state.users.data.clients
    )
    const createdBy = useSelector((state) => state.auth.user.name)

    // console.log(products);   
    const fetchData = ()=> {
        dispatch(getProductsUnpaginated())
        dispatch(getAllClients())
    }

    useEffect(()=> {
        fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleFormSubmit = async (values, setSubmitting) => {
        setSubmitting(true)

        const payResume = calculatePaymentBill(
            values?.products,
            values?.user,
            values?.inclure_ristourn,
            values?.inclure_precompte
        )

        const data = {
            clientName: values.clientName,
            products: values.products,
            date: new Date(values.date).toISOString(),
            status: '',
            payment_method: [
                {
                    cash: values.cash.toString(),
                    credit: values.credit.toString(),
                    ristourn: values.ristourn.toString(),
                    emballages: values.emballages.toString(),
                },
            ],
            ...payResume,
            invoice_number: values.invoice_number,
            createdBy: createdBy
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
            // navigate('/app/sales/sale-new')
            
        }
    }

    const handleDiscard = () => {
        navigate('/app/sales')
    }

    return (
        <>
            { 
                <ProductForm
                    type="new"
                    onFormSubmit={handleFormSubmit}
                    onDiscard={handleDiscard}
                    suggestions={[products, users]}
                    // initialData={{}}
                />
            }
        </>
    )
}

export default ProductNew
