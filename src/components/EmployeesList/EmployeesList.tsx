import { IUser } from "../../utils/interfaces";
import EmployeeCard from "./EmployeeCard/EmployeeCard";

interface EmployeesListProps {
    employees: IUser[];
}

function EmployeesList({ employees }: EmployeesListProps) {

   

    return (

        <>

            {employees.length > 0 ?
                employees.map(x => <EmployeeCard key={x._id} employee={x} />)
                :
                <>
                    <div>
                        <h1>WELCOME!</h1>
                        <h4>No employees found!</h4>
                    </div>

                </>
            }


        </>
    )
}

export default EmployeesList;