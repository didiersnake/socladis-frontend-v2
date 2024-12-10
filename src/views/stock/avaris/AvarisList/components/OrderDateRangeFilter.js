import DatePickerRange from 'components/ui/DatePicker/DatePickerRange'
import { cloneDeep } from 'lodash'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAvaris, setTableData } from '../store/dataSlice'



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
        dispatch(getAvaris(data))
    }

    const handleDateChange = (val)=> {
        const newTableData = cloneDeep(tableData)
        newTableData.startDate = val[0]
        newTableData.endDate = val[1]
        newTableData.pageIndex = 1
        if (val[0] && val[1]) {
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