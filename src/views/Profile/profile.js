import {
  CCard,
  CRow,
  CCol,
  CNav,
  CNavItem,
  CNavLink,
  CTabContent,
  CTabs,
  CCardBody,
  CCardHeader,
} from '@coreui/react'
import React from 'react'
import SettingPageTitle from 'src/reusable/SettingPageTitle'
import Avatar from 'src/assets/images/bba-logo.png'
import Empleave from './tabs/EmpLeave'
import Emploan from './tabs/EmpLoan'
import EmpHealth from './tabs/EmpHealth'
import EmpPromotion from './tabs/EmpPromotion'
import EmpDiscipline from './tabs/EmpDiscipline'
import { fetchEmployeeProfile } from 'src/actions/employee'
import { useEffect, useState } from 'react'
//const { user } = useSelector((state) => state.employee)
const Profile = () => {
  const userID = localStorage.getItem('userID')
  const [userInfo, setuserInfo] = useState([])
  useEffect(async () => {
    setuserInfo(await fetchEmployeeProfile(userID))
    console.log('userinfo', userInfo)
  }, [])
  return (
    <div>
      <CCard className="p-5">
        <div className="hr-header">
          <SettingPageTitle title="Profile" />
        </div>
        <div className="d-flex mt-5">
          <div className="mr-3">
            <img
              src={userInfo?.Photo || ''}
              alt="avatar"
              width="150px"
              className="profile-avatar"
            />
          </div>
          <div className="row col-md-12">
            <div
              className="col-md-5 mr-2"
              style={{ borderRight: '2px dashed #ddd' }}
            >
              <h3>{userInfo?.NameEnglish}</h3>
              <h3>{userInfo?.NameBangla}</h3>
              <ul className="profile-list-info">
                <li className="text-muted mb-2">{userInfo?.Designation}</li>
                <li className="text-muted mb-2">
                  Employee ID : {userInfo?.RegistrationNumber}
                </li>
                <li className="text-muted mb-2">
                  Date of Join : <strong>{userInfo?.JoigningDate}</strong>
                </li>
              </ul>
            </div>

            <div className="col-md-5">
              <ul className="profile-list-info">
                <li className="mb-2">
                  <div>
                    <strong>Phone:</strong>
                  </div>
                  <span className="text-muted">{userInfo?.Mobile}</span>
                </li>
                <li className="mb-2">
                  <div>
                    <strong>Email:</strong>
                  </div>
                  <span className="text-muted">{userInfo?.email}</span>
                </li>
                <li className="mb-2">
                  <div>
                    <strong>Gender:</strong>
                  </div>
                  <span className="text-muted">{userInfo?.gender}</span>
                </li>
                <li className="mb-2">
                  <div>
                    <strong>BirthDate:</strong>
                  </div>
                  <span className="text-muted">{userInfo?.DateBirth}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </CCard>

      <CRow>
        <CCol xs="12" md="12" className="mb-4">
          <CCard>
            <CCardHeader></CCardHeader>
            <CCardBody>
              <form>
                <CTabs>
                  <CNav variant="tabs">
                    <CNavItem>
                      <CNavLink>Leave</CNavLink>
                    </CNavItem>
                    <CNavItem>
                      <CNavLink>Loan</CNavLink>
                    </CNavItem>
                    <CNavItem>
                      <CNavLink>Health</CNavLink>
                    </CNavItem>
                    <CNavItem>
                      <CNavLink>Promotion</CNavLink>
                    </CNavItem>
                    <CNavItem>
                      <CNavLink>Discipline</CNavLink>
                    </CNavItem>
                  </CNav>
                  <CTabContent className="col-md-12">
                    <Empleave />
                    <Emploan />
                    <EmpHealth />
                    <EmpPromotion />
                    <EmpDiscipline />
                  </CTabContent>
                </CTabs>
              </form>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </div>
  )
}

export default Profile
