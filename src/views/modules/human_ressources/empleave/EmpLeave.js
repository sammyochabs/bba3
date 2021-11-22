import { CButton, CCard } from "@coreui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchEmpDropdown,
  fetchLeave,
  fetchLeaveType,
} from "src/actions/HumanRessource/empleave";
import SettingPageTitle from "src/reusable/SettingPageTitle";
import EmpLeaveModal from "./EmpLeaveModal";
import EmpLeaveTable from "./EmpLeaveTable";
import {
  getUserPermissions,
  getUserProgramsPermisions,
} from "src/services/apiCalls";
import mainNavigation from "src/containers/_nav";
import apiClient from "src/services/api";

const EmpLeave = () => {
  const dispatch = useDispatch();
  const [programs, setPrograms] = useState({});

  const userID = localStorage.getItem("userID");
  useEffect(() => {
    dispatch(fetchLeave(userID));
    dispatch(fetchEmpDropdown(userID));
    dispatch(fetchLeaveType(userID));
  }, [dispatch]);

  const { empleave } = useSelector((state) => state.empleave);
  const { emplist } = useSelector((state) => state.emplist);

  const { leavelist } = useSelector((state) => state.leavelist);
  console.log(leavelist, "leavelist555");

  const [modal, setModal] = useState(false);
  const [employee, setEmployee] = useState({});
  const [filteredLeaveData, setFilteredLeaveData] = useState([]);
  const [accessAllEmployeeLeaves, setAccessAllEmployeeLeaves] = useState(true);
  const [isUpdate, setIsUpdate] = useState(false);

  const toggle = () => {
    setModal(!modal);
  };

  useEffect(() => {
    mainNavigation.then((res) => {
      console.log(res);
      setPrograms(res.programs);
    });
  }, [mainNavigation]);

  useEffect(() => {
    apiClient
      .get("/employee/view", {
        params: { UserID: userID },
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res);
        setEmployee(res?.data?.EmployeeView);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    if (programs && programs?.leaveManagement?.Permission === 1) {
      setFilteredLeaveData(empleave);
      setAccessAllEmployeeLeaves(true);
    } else if (
      programs &&
      programs?.leaveManagementEmployee?.Permission === 1
    ) {
      let result = empleave.filter((leave) => {
        console.log("leave", leave);

        return leave.EmployeeID === employee.EmployeeID;
      });
      console.log("result", result);
      setAccessAllEmployeeLeaves(false);
      setFilteredLeaveData(result);
    }
  }, [empleave, programs, employee]);

  console.log(programs);
  console.log("employee", employee);

  return (
    <CCard className="p-5">
      <div className="hr-header">
        <SettingPageTitle title="Employee Leave Request" />
        <CButton
          onClick={() => {
            if (
              (programs && programs.leaveManagement?.Add === 1) ||
              programs.leaveManagementEmployee?.Add === 1
            ) {
              // history.push("/HR/AddEducation");
              setIsUpdate(false);
              toggle();
            } else {
              alert("You dont have this permission");
            }
          }}
          color="info"
        >
          + Add new Employee Leave Request
        </CButton>
      </div>
      <EmpLeaveTable
        setIsUpdate={setIsUpdate}
        isUpdate={isUpdate}
        editPermission={
          programs && accessAllEmployeeLeaves === true
            ? programs.leaveManagement?.Edit
            : programs.leaveManagementEmployee?.Edit
        }
        viewPermission={
          programs && accessAllEmployeeLeaves === true
            ? programs.leaveManagement?.View
            : programs.leaveManagementEmployee?.View
        }
        deletePermission={
          programs && accessAllEmployeeLeaves === true
            ? programs.leaveManagement?.Delete
            : programs.leaveManagementEmployee?.Delete
        }
        approvePermission={
          accessAllEmployeeLeaves === false
            ? 0
            : programs?.loanManagement?.Permission
        }
        declinePermission={
          accessAllEmployeeLeaves === false
            ? 0
            : programs?.loanManagement?.Permission
        }
        leavesData={filteredLeaveData}
        userID={userID}
        emplist={emplist}
        leavelist={leavelist}
      />
      <EmpLeaveModal
        userID={userID}
        toggle={toggle}
        modal={modal}
        type={"Add"}
        title={"Add new Leave Request"}
        emplist={emplist}
        emplist={accessAllEmployeeLeaves === true ? emplist : [employee]}
        leavelist={leavelist}
        isUpdate={isUpdate}
      />
    </CCard>
  );
};

export default EmpLeave;
