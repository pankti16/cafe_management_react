import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Btn } from "../../components/Controls/Button/Button";
import {
  addEmployeeActionRequest,
  deleteEmployeeActionRequest,
  getEmployeeActionRequest,
  getEmployeeActionReset,
  getEmployeeListActionRequest,
  resetEmployeeActionRequest,
  updateEmployeeActionRequest,
} from "../../store/Employee/EmployeeAction";
import { useDispatch, useSelector } from "react-redux";
import Table from "../../components/Table/Table";
import AddEditForm from "../../components/AddEditForm/AddEditForm";
import DeleteConfirm from "../../components/DeleteConfirm/DeleteConfirm";
import { EmployeeText } from "../../utils/Texts";
import { useParams } from "react-router-dom";
import { getCafeListActionRequest } from "../../store/Cafe/CafeAction";
import { SAGA_ACTIONS } from "../../utils/Constants";
import { replaceUnderscore } from "../../utils/Shared";

const Employee = () => {
  //Get cafe prop from url params
  let { cafe } = useParams();
  const dispatch = useDispatch();
  const { employees, empListLoading, editEmp, empAction, empError, empErrMsg } =
    useSelector((state) => state.employee);
  const { cafes } = useSelector((state) => state.cafe);
  //Store selected employee for performing actions like edit/delete
  const [activeEmployee, setActiveEmployee] = useState(undefined);
  //Store selected action like edit/delete/add
  const [actionType, setActionType] = useState("");
  //Store columns to pass to the table component
  const [columnDefs, setColumnDefs] = useState([]);
  //Handle final close
  const handleFinalClose = useCallback(
    //If this is for delete then reset delete dialog variables
    (isDelete) => {
      if (isDelete) {
        setDeleteOpen(false);
        setTimeout(() => {
          setActiveEmployee(undefined);
          setActionType("");
        }, 300);
        //Else reset add/edit dialog variables
      } else {
        setOpen(false);
        setTimeout(() => {
          dispatch(getEmployeeActionReset());
          setActionType("");
        }, 300);
      }
      //If redux variables are set reset them
      if (empAction || empError) {
        dispatch(resetEmployeeActionRequest());
      }
    },
    [dispatch, empAction, empError]
  );
  //Handle form dialog
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = (resObj = undefined) => {
    //If passed object while closing and action type is set then make some api calls
    if (resObj) {
      if (actionType === SAGA_ACTIONS.UPDATE) {
        dispatch(updateEmployeeActionRequest(resObj));
      } else if (actionType === SAGA_ACTIONS.ADD) {
        dispatch(addEmployeeActionRequest(resObj));
      }
      //Else just close the dialog
    } else {
      handleFinalClose(false);
    }
  };
  //Handle delete confirm
  const [deleteOpen, setDeleteOpen] = React.useState(false);
  const handleDeleteOpen = () => setDeleteOpen(true);
  const handleDeleteClose = (isDelete = false) => {
    //If true is passed then make some api calls
    if (isDelete) {
      dispatch(deleteEmployeeActionRequest(activeEmployee?.id));
    } else {
      //Else just close the dialog
      handleFinalClose(true);
    }
  };
  //Handle dialog open and waiting for response from api
  useEffect(() => {
    //If redux action state is set and no error then close dialog
    if (empAction) {
      if (
        empAction === actionType &&
        (actionType === SAGA_ACTIONS.UPDATE ||
          actionType === SAGA_ACTIONS.ADD) &&
        !empError
      ) {
        handleFinalClose(false);
      } else if (
        empAction === actionType &&
        actionType === SAGA_ACTIONS.DELETE &&
        !empError
      ) {
        handleFinalClose(true);
      }
    }
  }, [empAction, empError, empErrMsg, actionType, handleFinalClose]);

  useMemo(() => {
    //Get cafes and employees when visit this page
    dispatch(getCafeListActionRequest());
    dispatch(getEmployeeListActionRequest(cafe));
  }, [dispatch, cafe]);

  useEffect(() => {
    //Do not proceed if employees not loaded
    if (!employees) return;
    //Form columns for table
    let _cols = Object.keys(Object.assign({}, ...employees))
      ?.map((v) => {
        return v === "status"
          ? null
          : { field: v, headerName: replaceUnderscore(v) };
      })
      .filter(Boolean);
    setColumnDefs(_cols);
  }, [employees]);
  //Handle dialog open when action type and action object is selected
  useEffect(() => {
    if (actionType === SAGA_ACTIONS.UPDATE) {
      if (!editEmp || editEmp?.length === 0) return;
      handleOpen();
    } else if (actionType === SAGA_ACTIONS.DELETE) {
      if (!activeEmployee) return;
      handleDeleteOpen();
    }
  }, [editEmp, actionType, activeEmployee]);
  //Handle edit button click
  const onEdit = useCallback(
    (id) => {
      setActionType(SAGA_ACTIONS.UPDATE);
      //   setActiveEmployee(employees?.find((v) => v.id?.toString() === id?.toString()));
      dispatch(getEmployeeActionRequest(id));
    },
    [dispatch]
  );
  //Handle delete button click
  const onDelete = useCallback(
    (id) => {
      setActionType(SAGA_ACTIONS.DELETE);
      setActiveEmployee(
        employees?.find((v) => v.id?.toString() === id?.toString())
      );
    },
    [employees]
  );

  return (
    <div className="container my-5">
      <h1 className="h1 mb-4">{EmployeeText.title}</h1>
      <div className="d-flex flex-column">
        <Btn
          disabled={cafes?.length === 0}
          text={EmployeeText.addNewBtn}
          handleClick={() => {
            handleOpen();
            setActionType(SAGA_ACTIONS.ADD);
          }}
        />
        <Table
          loading={empListLoading}
          tableData={employees}
          tableColumns={columnDefs}
          isEditDisable={cafes?.length === 0}
          {...{ onEdit, onDelete }}
        />
        <AddEditForm
          {...{ open, handleClose, cafes }}
          formType={"employee"}
          activeVal={editEmp}
          isEdit={actionType === SAGA_ACTIONS.UPDATE}
        />
        <DeleteConfirm
          open={deleteOpen}
          handleClose={handleDeleteClose}
          name={activeEmployee?.name}
          type={"employee"}
        />
      </div>
    </div>
  );
};

export default Employee;
