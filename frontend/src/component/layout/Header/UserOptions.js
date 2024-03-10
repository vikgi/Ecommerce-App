import React, { Fragment , useState} from 'react';
import "./Header.css";
import {SpeedDial, SpeedDialAction} from "@material-ui/lab";
import Backdrop  from '@material-ui/core/Backdrop';
import userlogo from "../../../images/user.png"
import DashboardIcon from "@material-ui/icons/Dashboard";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ListAltIcon from "@material-ui/icons/ListAlt";
import {useNavigate} from "react-router-dom";
import { useAlert } from 'react-alert';
import {logout} from "../../../actions/userAction";
import { useDispatch , useSelector} from 'react-redux';
import {ShoppingCart} from "@material-ui/icons"






const UserOptions = ({user}) => {

    const {cartItems} = useSelector((state) => state.cart);

    const [open, setOpen] = useState(false);
    const options = [
        {icon: <ListAltIcon/>, name: "Orders", func: orders},
        {icon: <PersonIcon/>, name: "Profile", func: account},
        {icon: <ShoppingCart style={{color: cartItems.length >0?"tomato": "unset"}}/>, name: `Cart(${cartItems.length})`, func: cart},
        {icon: <ExitToAppIcon/>, name: "Logout", func: logoutUser},
    ];
    
    if(user.role === "admin"){
        options.unshift({icon: <DashboardIcon/>, name: "Dashboard", func: dashboard,});
    };

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const alert = useAlert();

    function dashboard(){
        navigate("/admin/dashboard");
    }

    function orders() {
        navigate("/orders");
    }

    function account() {
        navigate("/account");
    }

    function cart() {
        navigate("/Cart");
    }

    function logoutUser() {
        dispatch(logout());
        alert.success("Logout Success");
    }


  return (
    <Fragment>
        <Backdrop open={open} style={{zIndex: "10"}}/>
        <SpeedDial
            ariaLabel = "SpeedDial tooltip example"
            onClose= {() => setOpen(false)}
            onOpen={()=> setOpen(true)}
            open={open}
            direction="down"
            className="speedDial"
            style={{zIndex: "11"}}
            icon = {<img
                className="speedDialIcon"
                src={user.avatar.url ? user.avatar.url : userlogo}
                alt = "Profile"
            />}

        >
            {options.map((item) => (
                <SpeedDialAction 
                key={item.name}
                icon={item.icon} tooltipTitle={item.name}
                onClick={item.func} 
                tooltipOpen/>
                
            ))}
            
            

        </SpeedDial>
    </Fragment>
  )
};

export default UserOptions
