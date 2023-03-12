import { BaseSyntheticEvent } from "react";
import { useForm } from "react-hook-form";
import { useLoaderData, useNavigate } from "react-router-dom";
import * as userService from '../../services/userService';
import { IUser } from "../../utils/interfaces";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';

type FormData = {
    fullName: string;
    email: string;
    dateBirth: Date | string;
    salary: number | undefined;
    phone: number | undefined;
    countOfTasks: number;
    tasksId: string[];
    password: ''
    confirmpass: ''

}

const schema1 = yup.object({
    fullName: yup.string().required().matches(/^(?!\s+$).*(\S{1})/, 'Full Name cannot be empty string and must contain at least 1 characters .'),
    email: yup.string().required().email(),
    phone: yup.string().required('Phone number is required.').matches(/^(\+?\d+)$/, 'Phone number must be only digits'),
    dateBirth: yup.date().max(new Date(Date.now() - 567648000000), 'You must be at least 18 years.There may be a difference of a few days due to leap years, sorry, please contact the manager.').required("Required"),

}).required();


const schema2 = yup.object({
    fullName: yup.string().required().matches(/^(?!\s+$).*(\S{1})/, 'Full Name cannot be empty string and must contain at least 1 characters .'),
    email: yup.string().required().email(),
    phone: yup.string().required('Phone number is required.').matches(/^(\+?\d+)$/, 'Phone number must be only digits'),
     salary: yup.number().transform((value) => (isNaN(value) || value === null || value === undefined) ? 0 : value).required().min(780, '780lv. is minimal monthly salary for 2023 years.'),
    dateBirth: yup.date().max(new Date(Date.now() - 567648000000), 'You must be at least 18 years.There may be a difference of a few days due to leap years, sorry, please contact the manager.').required("Required"),

}).required();

function EmployeeEdit() {

    const user = useLoaderData() as IUser;
    const userId = user._id;
    const currentUserId = sessionStorage.getItem('userId')

    const navigate = useNavigate();




    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        defaultValues: {
            fullName: user.fullName, email: user.email,
            dateBirth: new Date(user.dateBirth).toISOString().split('T')[0],
            salary: user.salary, phone: user.phone, countOfTasks: user.countOfTasks
        },

        mode: 'onChange',
        resolver: yupResolver(currentUserId === userId ? schema1:schema2)

    })

    const editSubmitHandler = async (data: FormData, event: BaseSyntheticEvent<object, any, any> | undefined) => {
        event?.preventDefault()

        if (!userId) return;
        data.email = user.email;
        if (user.fullName === 'manager') {
            data.fullName = 'manager';
        }
        data.fullName = data.fullName.trim();
        data.dateBirth = (data.dateBirth instanceof Date) ? new Date(data.dateBirth.getTime() + data.dateBirth.getTimezoneOffset() * -60000) : new Date(data.dateBirth)


        await userService.editUser(userId, data as IUser).then((user) => {
            if (user.fullName === 'manager') {
                navigate('/users')

            } else {
                navigate(`/profile/${user._id}`)
            }
        }).catch((err) => {
            console.log(err)
        })




    }



    const goBack = () => {
        navigate(-1)
    }


    return (
        <>
            <div className="div-register">
                <form className="form-register" onSubmit={handleSubmit(editSubmitHandler)}>
                    <h2>EDIT {currentUserId === userId ? 'PROFILE' : 'EMPLOYEE'} PAGE</h2>

                    <span>
                        <label htmlFor='fullName' >FULL NAME: </label>
                        <input {...register('fullName')} type="text" name="fullName" placeholder="Full name" className="register-input" />
                        <p >{errors.fullName?.message}</p>

                    </span>
                    <span>
                        <label htmlFor='email' >EMAIL: </label>
                        <input {...register('email')} type="email" disabled={true} name="email" placeholder="Email" className="register-input" />
                        <p >{errors.email?.message}</p>
                    </span>
                    <span>
                        <label htmlFor='dateBirth' >DATE OF BIRTH: </label>
                        <input {...register('dateBirth')} type="date" name="dateBirth" placeholder="Date of birth" className="register-input" />
                        <p >{errors.dateBirth?.message}</p>
                    </span>
                    <span>
                        <label htmlFor='phone' >Phone: </label>
                        <input {...register('phone')} type="tel" name="phone" placeholder="phone" className="register-input" />
                        <p >{errors.phone?.message}</p>
                    </span>


                    {currentUserId === userId ?
                        <button className="register-input btnSubmit">Edit Profile</button>
                        :
                        <>
                            <span>
                                <label htmlFor='salary' >Salary: </label>
                                <input {...register('salary')} type="number" name="salary" placeholder="salary" className="register-input" />
                                <p >{errors.salary?.message}</p>
                            </span>
                            <button className="register-input btnSubmit">Edit Employee</button>
                        </>
                    }
                    <button className="btnBack" onClick={goBack}>Back</button>
                </form>
            </div>

        </>
    )
}

export default EmployeeEdit;