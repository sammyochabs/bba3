import { CCard, CTabPane, CDataTable } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getDisciplineListUser } from 'src/actions/HumanRessource/disciplines'

const EmpPromotion = () => {
  const dispatch = useDispatch()
  const [disciplineList, setdisciplineList] = useState([])
  useEffect(async () => {
    setdisciplineList(await getDisciplineListUser(userID))
  }, [])

  const fields = [
    { key: 'OffenceDescription', _style: { width: '40%' } },
    { key: 'PunishmentName', _style: { width: '40%' } },
    { key: 'PunishmentMemoDate', _style: { width: '40%' } },
    { key: 'PunishmentMemoN', _style: { width: '40%' } },
    { key: 'Appeal', _style: { width: '40%' } },
    { key: 'ReleaseMemoN', _style: { width: '40%' } },
    { key: 'ReleaseMemoDate', _style: { width: '40%' } },
  ]
  const userID = localStorage.getItem('userID')

  return (
    <CTabPane>
      <CDataTable
        items={disciplineList}
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

export default EmpPromotion
