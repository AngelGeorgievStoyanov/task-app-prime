import { useLoaderData } from "react-router-dom";
import { IUser } from "../../utils/interfaces";
import EmployeesList from "../EmployeesList/EmployeesList";
import './Employees.css'


function Employees() {

    const employees = useLoaderData() as IUser[];


    return (
        <div className="div-all">

            <EmployeesList employees={employees}/>

        </div>
    )
}


export default Employees;