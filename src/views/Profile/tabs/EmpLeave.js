import { CCard, CTabPane, CDataTable } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchLeaveUser } from 'src/actions/HumanRessource/empleave'

const EmpLeave = () => {
  const dispatch = useDispatch()
  const { empleave } = useSelector((state) => state.empleave)
  const fields = [
    { key: 'EmployeeLeaveID', label: 'ID', _style: { width: '5%' } },
    { key: 'Leave', label: 'Leave' },
    { key: 'Cause', label: 'Cause' },
    { key: 'FromDate', label: 'From Date' },
    { key: 'ToDate', label: 'To Date' },
    { key: 'Duration', label: 'Duration' },

    { key: 'Status', label: 'Status' },
  ]
  const userID = localStorage.getItem('userID')
  useEffect(() => {
    dispatch(fetchLeaveUser(userID))
  }, [dispatch])

  return (
    <CTabPane>
      <CDataTable
        items={empleave}
        fields={fields}
        columnFilter
        cleaner
        itemsPerPageSelect
        itemsPerPage={50}
        hover
        sorter
        striped
        pagination
        // loading
        // onRowClick={(item,index,col,e) => console.log(item,index,col,e)}
        // onPageChange={(val) => console.log('new page:', val)}
        // onPagesChange={(val) => console.log('new pages:', val)}
        // onPaginationChange={(val) => console.log('new pagination:', val)}
        // onFilteredItemsChange={(val) => console.log('new filtered items:', val)}
        // onSorterValueChange={(val) => console.log('new sorter value:', val)}
        // onTableFilterChange={(val) => console.log('new table filter:', val)}
        // onColumnFilterChange={(val) => console.log('new column filter:', val)}
      />
    </CTabPane>
  )
}

export default EmpLeave
