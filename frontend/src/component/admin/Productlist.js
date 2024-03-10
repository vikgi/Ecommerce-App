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
import { clearErrors, deleteProduct, getAdminProduct } from '../../actions/productAction';
import "./productlist.css";
import { DELETE_PRODUCT_RESET } from '../../constants/productConstants';
import { useNavigate } from 'react-router-dom';
const Productlist = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const {error, products} = useSelector((state) => state.products);
  const {error: deleteError, isDeleted} = useSelector((state) => state.product);

  const deleteProductHandler = (id) => {
    dispatch(deleteProduct(id));

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
      alert.success("Product Deleted Successfully");
      navigate("/admin/dashboard");
      dispatch({type: DELETE_PRODUCT_RESET});
    }

    dispatch(getAdminProduct());
  }, [dispatch, alert, error, deleteError, isDeleted, navigate]);

  const columns = [
    {field: "id", headerName: "Product ID", minWidth: 200, flex:  0.5},

    {
      field: "name",
      headerName: "Name",
      minWidth: 350,
      flex: 1,
    },
    {
      field: "stock",
      headerName: "Stock",
      type: "number",
      minWidth: 150,
      flex: 0.3,
    },
    {
      field: "price",
      headerName: "Price",
      minWidth: 270,
      type: "number",
      flex: 0.5,
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
            <Link to={`/admin/product/${params.getValue(params.id, "id")}`}>
              <Edit/>
            </Link>

            <Button onClick={()=> deleteProductHandler(params.id, "id")}>
              <Delete />
            </Button>

          </Fragment>
        )
      }
    },
  ];


  const rows = [];
  products && products.forEach ((item) => {
    rows.push({
      id: item._id,
      stock: item.Stock,
      price: item.price,
      name: item.name,
    });
  });

  return (
  <Fragment>
    <MetaData title={`ALL PRODUCTS -Admin`} />

    <div className='dashboard'>
      <SideBar/>
      <div className='productListContainer'>
        <h1 id='productListHeading'>ALL PRODUCTS</h1>

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

export default Productlist
