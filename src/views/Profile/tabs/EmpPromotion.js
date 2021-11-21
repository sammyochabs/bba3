import { CCard, CTabPane, CDataTable } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPromotionlistUser } from 'src/actions/HumanRessource/promotion.services'

const EmpPromotion = () => {
  const dispatch = useDispatch()
  const [promotionList, setpromotionList] = useState([])
  useEffect(async () => {
    setpromotionList(await fetchPromotionlistUser(userID))
  }, [])

  const fields = [
    { key: 'PromotionType', label: 'Type', _style: { width: '10%' } },
    { key: 'Designation', _style: { width: '10%' } },
    { key: 'Organization', _style: { width: '10%' } },
    { key: 'PostingType', _style: { width: '10%' } },
    { key: 'Location', _style: { width: '20%' } },
    {
      key: 'PromotionDate',
      label: 'Promotion/Charge Date',
      _style: { width: '10%' },
    },
    { key: 'DateFrom', _style: { width: '10%' } },
    { key: 'DateTo', _style: { width: '10%' } },
  ]
  const userID = localStorage.getItem('userID')

  return (
    <CTabPane>
      <CDataTable
        items={promotionList}
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
