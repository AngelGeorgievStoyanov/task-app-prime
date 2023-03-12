import { Link, useNavigate } from "react-router-dom";
import { IUser } from "../../../utils/interfaces";
import './EmployeeCard.css';
import * as userService from '../../../services/userService';


interface EmployeeCardProps {
    employee: IUser;

}

function EmployeeCard({ employee }: EmployeeCardProps) {


    const navigate = useNavigate();

    const fullName = sessionStorage.getItem('fullName')

    const deleteEmployee = async () => {
        if (!employee._id) return;
        await userService.deleteEmployeeById(employee._id).then((data) => {
            navigate('/users')
        }).catch((err: any) => {
            console.log(err)
        })
    }


    const goBack = () => {
        navigate(-1)
    }

    return (
        <section className="card-employee">
            <h3>Full name: {employee.fullName}</h3>
            <h3>Email: {employee.email}</h3>
            <h5>Phone: {employee.phone}</h5>
            <h5>Salary: {employee.salary}</h5>
            <h5>Date of birht: {employee.dateBirth.toString().split('T')[0].split('-').reverse().join('.')}</h5>
            <h5>Tasks: {employee.countOfTasks}</h5>
            {fullName === 'manager' ?
                <span >
                    <button>  <Link to={`/user/edit/${employee._id}`}>Edit employee</Link></button>
                    <button onClick={deleteEmployee} disabled={employee.fullName === 'manager' ? true : false} >Delete employee</button>
                </span> :
                <span >
                    <button>  <Link to={`/user/edit/${employee._id}`}>Edit profile</Link></button>
                    <button className="btnBack" onClick={goBack}>Back</button>
                </span>
            }
        </section>
    )
}

export default EmployeeCard;