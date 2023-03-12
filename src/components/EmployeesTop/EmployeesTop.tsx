import { useLoaderData } from "react-router-dom";
import { IUser } from "../../utils/interfaces";
import EmployeesList from "../EmployeesList/EmployeesList";



function EmployeesTop(){

    const employees = useLoaderData() as IUser[];

    return(
        <div className="div-all">

        <EmployeesList employees={employees}/>

    </div>
    )
}

export default EmployeesTop;