import { CCard, CTabPane, CDataTable } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchEmpLoansUser } from 'src/actions/HumanRessource/emploan'

const EmpLoan = () => {
  const dispatch = useDispatch()
  const { empLoan } = useSelector((state) => state.empLoan)
  const fields = [
    { key: 'EmployeeLoanID', label: 'ID', _style: { width: '5%' } },
    { key: 'SanctionDate', label: 'Request Date', _style: { width: '15%' } },
    { key: 'LoanType', label: 'Loan Type' },
    { key: 'LoanFunds', label: 'Loan Funds' },
    { key: 'LoanAmount', label: 'Amount' },
    { key: 'SanctionDate', label: 'Sanction Date' },
    { key: 'Status', label: 'Status', _style: { width: '10%' } },
  ]
  const userID = localStorage.getItem('userID')
  useEffect(() => {
    dispatch(fetchEmpLoansUser(userID))
  }, [dispatch])

  return (
    <CTabPane>
      <CDataTable
        items={empLoan}
        fields={fields}
        columnFilter
        cleaner
        itemsPerPageSelect
        itemsPerPage={50}
        hover
        sorter
        striped
        pagination
      />
    </CTabPane>
  )
}

export default EmpLoan
