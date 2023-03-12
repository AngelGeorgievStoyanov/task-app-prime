import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import * as userService from '../../services/userService'
import NotFound from "../NotFound/NotFound";



const GuardedRouteManager = () => {

    const fullName = sessionStorage.getItem('fullName')
    const userId = sessionStorage.getItem('userId')

    const [verify, setVerify] = useState<boolean>()


    useEffect(() => {
        if (fullName === 'manager') {

            if (!userId) return;
            userService.verifyManagerId(userId).then((data: boolean) => {
                setVerify(data)
            }).catch((err) => {
                console.log(err.message)
                setVerify(false)
            })
        } else {
            setVerify(false)
        }
    }, [])


    return verify === true ? <Outlet /> : <NotFound />

}
export default GuardedRouteManager;