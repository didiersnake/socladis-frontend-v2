import React, { useEffect } from 'react'
import { Loading } from 'components/shared'
import Statistic from './Statistic'
import SalesReport from './SalesReport'
import SalesByCategories from './SalesByCategories'
import LatestOrder from './LatestOrder'
import TopProduct from './TopProduct'
import { getSalesDashboardData } from '../store/dataSlice'
import { useDispatch, useSelector } from 'react-redux'
import CustomerStatistic from './CustomerStatistic'

const SalesDashboardBody = () => {
    const dispatch = useDispatch()

    const data = useSelector((state) => state.salesDashboard.data.dashboardData)
    console.log('data', data)

    const loading = useSelector((state) => state.salesDashboard.data.loading)

    useEffect(() => {
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const fetchData = () => {
        dispatch(getSalesDashboardData())
    }

    return (
        <Loading loading={loading}>
            <CustomerStatistic data={data?.statisticData} />

            {/* <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <SalesReport data={salesReportData} className="col-span-2" />
                <SalesByCategories data={salesByCategoriesData} />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <LatestOrder data={latestOrderData} className="lg:col-span-2" />
                <TopProduct data={topProductsData} />
            </div> */}
        </Loading>
    )
}

export default SalesDashboardBody
