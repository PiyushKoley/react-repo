import React from "react";
import {  useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { logout } from "../../store/authSlice";

function LogoutBtn() {
    const dispatch = useDispatch();

    const logoutHandler = () => {
        authService.logout().then(() => {
            dispatch(logout());
        }).catch((error) => console.log(error));
    };

    return (
        <button className="inline-block bg-red-500 hover:bg-red-800 duration-200 text-white font-bold py-2 px-6 rounded"
        onClick={logoutHandler}>
            Logout
        </button>
    );
}

export default LogoutBtn;
