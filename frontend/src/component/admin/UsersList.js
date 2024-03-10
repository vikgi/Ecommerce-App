import React, { Fragment, useEffect } from 'react';
import {useAlert} from "react-alert";
import { Button } from '@material-ui/core';
import MetaData from "../layout/MetaData";
import { Edit } from '@material-ui/icons';
import { Delete } from '@material-ui/icons';
import SideBar from "../admin/SideBar";
import {useSelector, useDispatch} from "react-redux";
import { Link } from 'react-router-dom';
import { DataGrid } from '@material-ui/data-grid';
import "./productlist.css";
import { useNavigate } from 'react-router-dom';
import { getAllUsers, clearErrors, deleteUser } from '../../actions/userAction';
import { DELETE_USER_RESET } from '../../constants/userConstants';


const UsersList = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const {error, users} = useSelector((state) => state.allUsers);
  const {error: deleteError, isDeleted, message} = useSelector((state) => state.profile);

  const deleteUserHandler = (id) => {
    dispatch(deleteUser(id));

  }

  useEffect(() => {
    if(error){
      alert.error(error);
      dispatch(clearErrors());
    }
    if(deleteError){
      alert.error(deleteError);
      dispatch(clearErrors());
    }
    if(isDeleted){
      alert.success(message);
      navigate("/admin/users");
      dispatch({type: DELETE_USER_RESET});
    }

    dispatch(getAllUsers());
  }, [dispatch, alert, deleteError, error, isDeleted, navigate, message]);

  const columns = [
    {field: "id", headerName: "User ID", minWidth: 180, flex:  0.8},

    {
      field: "email",
      headerName: "Email",
      minWidth: 200,
      flex: 1,
    },
    {
      field: "name",
      headerName: "Name",
      minWidth: 150,
      flex: 0.5,
    },
    {
      field: "role",
      headerName: "Role",
      minWidth: 150,
      flex: 0.3,
      cellClassName: (params) => {
        return params.getValue(params.id, "role") === "admin" ? "greenColor": "redColor";
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      flex: 0.3,
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Link to={`/admin/user/${params.getValue(params.id, "id")}`}>
              <Edit/>
            </Link>

            <Button onClick={()=> deleteUserHandler(params.id, "id")}>
              <Delete />
            </Button>

          </Fragment>
        )
      }
    },
  ];


  const rows = [];
  users && users.forEach ((item) => {
    rows.push({
      id: item._id,
      role: item.role,
      email: item.email,
      name: item.name,
    });
  });

  return (
  <Fragment>
    <MetaData title={`ALL USERS -Admin`} />

    <div className='dashboard'>
      <SideBar/>
      <div className='productListContainer'>
        <h1 id='productListHeading'>ALL USERS</h1>

        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          disableSelectionOnClick
          className='productListTable'
          autoHeight
        />

      </div>
    </div>


  </Fragment>
  );
}

export default UsersList;

