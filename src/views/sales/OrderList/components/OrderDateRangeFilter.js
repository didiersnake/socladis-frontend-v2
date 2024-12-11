import DatePickerRange from 'components/ui/DatePicker/DatePickerRange'
import { cloneDeep } from 'lodash'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getOrders, setTableData } from '../store/dataSlice'


const OrderDateRangeFilter = () => {
    const tableData = useSelector(
        (state) => state.salesOrderList.data.tableData
    )
    const startDate = tableData.startDate
    const endDate = tableData.endDate
    const dispatch = useDispatch()

    const dateFormat = 'DD MMM, YYYY'

    const fetchData = (data) => {
        dispatch(setTableData(data))
        dispatch(getOrders(data))
    }

    const handleDateChange = (val)=> {
        const newTableData = cloneDeep(tableData)
        // newTableData.startDate = val[0]
        // newTableData.endDate = val[1]
        if (val[0]) {
            const startDate = new Date(val[0])
            startDate.setDate(startDate.getDate() + 1) // Add 1 day to the start date
            // newTableData.startDate = startDate.toISOString()
            newTableData.startDate = startDate
        }

        if (val[1]) {
            const endDate = new Date(val[1])
            endDate.setDate(endDate.getDate() + 1) // Add 1 day to the end date
            // newTableData.endDate = endDate.toISOString()
            newTableData.endDate = endDate
        }
        newTableData.pageIndex = 1

        if (newTableData.startDate && newTableData.endDate) {
            fetchData(newTableData)
        }
    }
  return (
      <DatePickerRange
          value={[startDate, endDate]}
          onChange={handleDateChange}
          inputFormat={dateFormat}
          size="sm"
      />
  )
}

export default OrderDateRangeFilter