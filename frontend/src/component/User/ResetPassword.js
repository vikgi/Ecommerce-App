import React, { Fragment,useState, useEffect} from 'react'
import "./ResetPassword.css";
import Loader from "../layout/loader/Loader";
import {useDispatch, useSelector} from "react-redux";
import {clearErrors,resetPassword} from "../../actions/userAction";
import {useAlert} from "react-alert";
import {useNavigate, useParams} from "react-router-dom";
import MetaData from '../layout/MetaData';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import LockIcon from '@material-ui/icons/Lock';
const ResetPassword = () => {

    const dispatch = useDispatch();
    const alert = useAlert();

    const navigate = useNavigate();
    const { token } = useParams();
    const {error, loading, success} = useSelector((state)=> state.forgotPassword);

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");


    useEffect(() => {
        console.log(token);
        if(error){
            alert.error(error);
            dispatch(clearErrors());
        }

        if(success){
           alert.success("Password Reset Successfully");
           navigate("/login");
        }

    }, [dispatch, error, alert, success,navigate, token]);


    const resetPasswordSubmit = (e) => {
        e.preventDefault();
        const myForm = new FormData();
        myForm.set("password", password)
        myForm.set("confirmPassword", confirmPassword);
        dispatch(resetPassword(token, myForm));
    };

  return (
     <Fragment>
        {loading? <Loader/>: 
            <Fragment>
        <MetaData title={"Change Password"}/>
        <div className="resetPasswordContainer">
            <div className="resetPasswordBox"> 
                <h2 className="resetPasswordHeading">RESET PASSWORD</h2>
                <form className="resetPasswordForm" encType = "multipart/form-data" onSubmit={resetPasswordSubmit}>
                    
                    <div>
                        <LockOpenIcon/>
                        <input
                            type="password"
                            placeholder="New Password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div>
                        <LockIcon/>
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            required
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>
                    
                    <input type="submit" value="Reset" className="resetPasswordBtn" />
                    



                </form>

            </div>
        </div>
    </Fragment>}
    </Fragment>
  )
}

export default ResetPassword
