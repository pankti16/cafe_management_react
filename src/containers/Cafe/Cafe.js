import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Btn } from "../../components/Controls/Button/Button";
import History from "../../routes/History";
import {
  addCafeActionRequest,
  deleteCafeActionRequest,
  getCafeListActionRequest,
  resetCafeActionRequest,
  updateCafeActionRequest,
} from "../../store/Cafe/CafeAction";
import { useDispatch, useSelector } from "react-redux";
import Table from "../../components/Table/Table";
import AddEditForm from "../../components/AddEditForm/AddEditForm";
import { IdRenderer, LogoRenderer } from "../../utils/CustomCellRenderer";
import DeleteConfirm from "../../components/DeleteConfirm/DeleteConfirm";
import { CafeText } from "../../utils/Texts";
import { useParams } from "react-router-dom";
import { SAGA_ACTIONS } from "../../utils/Constants";
import { replaceUnderscore } from "../../utils/Shared";

const Cafe = () => {
  //Get location prop from url params
  let { location } = useParams();
  const dispatch = useDispatch();
  const { cafes, cafeListLoading, cafeAction, cafeError, cafeErrMsg } =
    useSelector((state) => state.cafe);
  //Store selected cafe for performing actions like edit/delete
  const [activeCafe, setActiveCafe] = useState(undefined);
  //Store selected action like edit/delete/add
  const [actionType, setActionType] = useState("");
  //Store columns to pass to the table component
  const [columnDefs, setColumnDefs] = useState([]);
  //Handle final close
  const handleFinalClose = useCallback((isDelete) => {
    //If this is for delete then reset delete dialog variables
    if (isDelete) {
      setDeleteOpen(false);
      setTimeout(() => {
        setActiveCafe(undefined);
        setActionType("");
      }, 300);
    //Else reset add/edit dialog variables
    } else {
      setOpen(false);
      setTimeout(() => {
        setActiveCafe(undefined);
        setActionType("");
      }, 300);
    }
    //If redux variables are set reset them
    if (cafeAction || cafeError) {
      dispatch(resetCafeActionRequest());
    }
  }, [cafeAction, cafeError, dispatch]);
  //Handle form dialog
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = (id = undefined, resObj = undefined) => {
    //If passed object while closing and action type is set then make some api calls
    if (resObj) {
      if (actionType === SAGA_ACTIONS.UPDATE && id) {
        dispatch(updateCafeActionRequest(id, resObj));
      } else if (actionType === SAGA_ACTIONS.ADD) {
        dispatch(addCafeActionRequest(resObj));
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
      dispatch(deleteCafeActionRequest(activeCafe?.id));
    } else {
    //Else just close the dialog
      handleFinalClose(true);
    }
  };
  //Handle dialog open and waiting for response from api
  useEffect(() => {
    //If redux action state is set and no error then close dialog
    if (cafeAction) {
      if (
        cafeAction === actionType &&
        (actionType === SAGA_ACTIONS.UPDATE ||
          actionType === SAGA_ACTIONS.ADD) &&
        !cafeError
      ) {
        handleFinalClose(false);
      } else if (
        cafeAction === actionType &&
        actionType === SAGA_ACTIONS.DELETE &&
        !cafeError
      ) {
        handleFinalClose(true);
      }
    }
  }, [cafeAction, cafeError, cafeErrMsg, actionType, handleFinalClose]);

  useMemo(() => {
    //Get cafes when visit this page
    dispatch(getCafeListActionRequest(location));
  }, [dispatch, location]);

  useEffect(() => {
    //Do not proceed if cafes not loaded
    if (!cafes) return;
    //Form columns for table
    let _cols = Object.keys(Object.assign({}, ...cafes))
      ?.map((v) => {
        return v === "status"
          ? null
          : v === "id"
          ? { field: "id", cellRenderer: IdRenderer, headerName: replaceUnderscore(v) }
          : v === "location"
          ? { field: v, filter: true, headerName: replaceUnderscore(v) }
          : v === "description"
          ? { field: v, flex: 3, headerName: replaceUnderscore(v) }
          : v === "logo"
          ? { field: v, cellRenderer: LogoRenderer, headerName: replaceUnderscore(v) }
          : v === "employees"
          ? {
              field: v,
              onCellClicked: onEmpClick, headerName: replaceUnderscore(v)
            }
          : { field: v, headerName: replaceUnderscore(v) };
      })
      .filter(Boolean);
    setColumnDefs(_cols);
  }, [cafes]);
  //Handle dialog open when action type and action object is selected
  useEffect(() => {
    if (actionType && activeCafe) {
      if (actionType === SAGA_ACTIONS.UPDATE) {
        handleOpen();
      } else if (actionType === SAGA_ACTIONS.DELETE) {
        handleDeleteOpen();
      }
    }
  }, [activeCafe, actionType]);
  //Handle edit button click
  const onEdit = useCallback(
    (id) => {
      setActionType(SAGA_ACTIONS.UPDATE);
      setActiveCafe(cafes?.find((v) => v.id?.toString() === id?.toString()));
    },
    [cafes]
  );
  //Handle delete button click
  const onDelete = useCallback(
    (id) => {
      setActionType(SAGA_ACTIONS.DELETE);
      setActiveCafe(cafes?.find((v) => v.id?.toString() === id?.toString()));
    },
    [cafes]
  );
  //Handle employee click
  const onEmpClick = (params) => {
    History.push(`/employee/${params?.data?.id}`);
  };

  return (
    <div className="container my-5">
      <h1 className="h1 mb-4">{CafeText.title}</h1>
      <div className="d-flex flex-column">
        <Btn text={CafeText.addNewBtn} handleClick={() => {
          handleOpen();
          setActionType(SAGA_ACTIONS.ADD);
        }} />
        <Table
          loading={cafeListLoading}
          tableData={cafes}
          tableColumns={columnDefs}
          {...{ onEdit, onDelete }}
        />
        <AddEditForm
          {...{ open, handleClose, cafes }}
          formType={"cafe"}
          activeVal={activeCafe}
          isEdit={actionType === SAGA_ACTIONS.UPDATE}
        />
        <DeleteConfirm
          open={deleteOpen}
          handleClose={handleDeleteClose}
          name={activeCafe?.name}
          type={"cafe"}
        />
      </div>
    </div>
  );
};

export default Cafe;
