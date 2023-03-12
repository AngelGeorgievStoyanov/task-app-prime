import { useLoaderData } from "react-router-dom";
import { IUser } from "../../utils/interfaces";
import EmployeeCard from "../EmployeesList/EmployeeCard/EmployeeCard";
import './Profile.css';


function Profile() {


    const user = useLoaderData() as IUser

    return (
        <div className="div-profile">
            <EmployeeCard employee={user} />
        </div>
    )
}

export default Profile;