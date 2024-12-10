import React, { useState, useEffect } from 'react'
import { Loading, Container, DoubleSidedImage } from 'components/shared'
import OrderProducts from './components/OrderProducts'
import PaymentSummary from './components/PaymentSummary'
import CustomerInfo from './components/CustomerInfo'
import { HiOutlineCalendar } from 'react-icons/hi'
import { apiGetSalesOrderDetails } from 'services/SaleService'
import { useLocation } from 'react-router-dom'
import isEmpty from 'lodash/isEmpty'

// const paymentStatus = {
//     0: {
//         label: 'Paid',
//         class: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-100',
//     },
//     1: {
//         label: 'Unpaid',
//         class: 'text-red-500 bg-red-100 dark:text-red-100 dark:bg-red-500/20',
//     },
// }

// const progressStatus = {
//     0: {
//         label: 'Fulfilled',
//         class: 'bg-cyan-100 text-cyan-600 dark:bg-cyan-500/20 dark:text-cyan-100',
//     },
//     1: {
//         label: 'Unfulfilled',
//         class: 'text-amber-600 bg-amber-100 dark:text-amber-100 dark:bg-amber-500/20',
//     },
// }

const OrderDetails = () => {
    const location = useLocation()

    const [loading, setLoading] = useState(false)
    const [data, setData] = useState({})

    useEffect(() => {
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const fetchData = async () => {
        const id = location.pathname.substring(
            location.pathname.lastIndexOf('/') + 1
        )
        if (id) {
            setLoading(true)
            const response = await apiGetSalesOrderDetails({ id })
            if (response) {
                setLoading(false)
                setData(response.data)
            }
        }
    }

    return (
        <Container className="h-full">
            <Loading loading={loading}>
                {!isEmpty(data) && (
                    <>
                        <div className="mb-6">
                            <div className="flex items-center mb-2">
                                <h3>
                                    <span>#Facture</span>
                                    <span className="ltr:ml-2 rtl:mr-2">
                                        {data.invoice_number}
                                    </span>
                                </h3>
                                
                            </div>
                            <span className="flex items-center">
                                <HiOutlineCalendar className="text-lg" />
                                <span className="ltr:ml-1 rtl:mr-1">
                                    {new Date(data.date).toLocaleDateString()}
                                </span>
                            </span>
                        </div>
                        <div className="xl:flex gap-4">
                            <div className="w-full">
                                <OrderProducts data={data.products} />
                                <div className="xl:grid grid-cols-2 gap-4">
                                    {/* <ShippingInfo data={data.shipping} /> */}
                                    <div></div>
                                    <PaymentSummary
                                        data={data}
                                    />
                                </div>
                                {/* <Activity data={data.activity} /> */}
                            </div>
                            <div className="xl:max-w-[360px] w-full">
                                <CustomerInfo data={data} />
                            </div>
                        </div>
                    </>
                )}
            </Loading>
            {!loading && isEmpty(data) && (
                <div className="h-full flex flex-col items-center justify-center">
                    <DoubleSidedImage
                        src="/img/others/img-2.png"
                        darkModeSrc="/img/others/img-2-dark.png"
                        alt="No order found!"
                    />
                    <h3 className="mt-8">No order found!</h3>
                </div>
            )}
        </Container>
    )
}

export default OrderDetails
