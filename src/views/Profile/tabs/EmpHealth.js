import { CCard, CTabPane, CDataTable } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getHealthInfoListUser } from 'src/actions/HumanRessource/healthInfo'

const EmpHealth = () => {
  const dispatch = useDispatch()
  const [healthList, setHealthList] = useState([])
  useEffect(async () => {
    setHealthList(await getHealthInfoListUser(userID))
  }, [])
  const fields = [
    { key: 'HealthID', _style: { width: '8%' } },
    { key: 'HealthInfo', _style: { width: '60%' } },
    { key: 'FromDate', _style: { width: '40%' } },
    { key: 'ToDate', _style: { width: '40%' } },
    { key: 'Height', _style: { width: '30%' } },
    { key: 'Weight', _style: { width: '30%' } },
    { key: 'VisualPower', _style: { width: '40%' } },
    { key: 'BloodPressure', _style: { width: '40%' } },
    { key: 'MedicalClassification', _style: { width: '40%' } },
    { key: 'HealthWeakness', _style: { width: '40%' } },
  ]
  const userID = localStorage.getItem('userID')

  return (
    <CTabPane>
      <CDataTable
        items={healthList}
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

export default EmpHealth
