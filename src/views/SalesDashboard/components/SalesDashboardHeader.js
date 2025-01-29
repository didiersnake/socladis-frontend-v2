import React from 'react'
import { DatePicker } from 'components/ui'
import { setStartDate, setEndDate } from '../store/stateSlice'
import { useDispatch, useSelector } from 'react-redux'
import { getSalesDashboardData } from '../store/dataSlice'

const dateFormat = 'DD MMM, YYYY'

const { DatePickerRange } = DatePicker

const SalesDashboardHeader = () => {
    const dispatch = useDispatch()

    const startDate = useSelector(
        (state) => state.salesDashboard.state.startDate
    )
    const endDate = useSelector((state) => state.salesDashboard.state.endDate)

    const handleDateChange = (value) => {
        dispatch(setStartDate(value[0]))
        dispatch(setEndDate(value[1]))

        if (value[0] && value[1]) {
            dispatch(getSalesDashboardData({ startDate, endDate }))
        }
    }

    // const onFilter = () => {
    //     dispatch(getSalesDashboardData())
    // }

    return (
        <div className="lg:flex items-center justify-between mb-4 gap-3">
            <div className="mb-4 lg:mb-0">
                <h3>Sommaire des activités</h3>
                <p>Consultez vos ventes actuelles selon la plage de date</p>
            </div>
            <div className="flex flex-col lg:flex-row lg:items-center gap-3">
                <DatePickerRange
                    value={[startDate, endDate]}
                    onChange={handleDateChange}
                    inputFormat={dateFormat}
                    size="sm"
                />
            </div>
        </div>
    )
}

export default SalesDashboardHeader
