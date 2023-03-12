import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import * as userService from '../../services/userService'
import Login from "../Login/Login";



const GuardedRoute = () => {

    const userId = sessionStorage.getItem('userId')

    const [verify, setVerify] = useState<boolean>(false)
    useEffect(() => {


        if (!userId) return;
        userService.verifyId(userId).then((data: boolean) => {
            setVerify(data)
        }).catch((err) => {
            console.log(err.message)
            setVerify(false)
        })
    }, [])

    return verify === true ? <Outlet /> : <Login/>

}
export default GuardedRoute;