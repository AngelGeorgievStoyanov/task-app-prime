import { BaseSyntheticEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as userService from '../../services/userService';
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';


type FormData = {
    fullName: string;
    email: string;
    dateBirth: Date;
    salary: number | undefined;
    phone: number | undefined;
    password: string;
    confirmpass: string;
    countOfTasks: number;
    tasksId: string[];

};

const schema = yup.object({
    fullName: yup.string().required().matches(/^(?!\s+$).*(\S{1})/, 'Mr. Manager, full name cannot be empty string and must contain at least 1 characters, sory.'),
    email: yup.string().required().email(),
    phone: yup.string().required('Phone number is required.').matches(/^(\+?\d+)$/, 'Mr. Manager, phone number must be only digits, sory.'),
    salary: yup.number().transform((value) => (isNaN(value) || value === null || value === undefined) ? 0 : value).required().min(780, '780lv. is minimal monthly salary for 2023 years.'),
    dateBirth: yup.date().max(new Date(Date.now() - 567648000000), 'Mr. Manager, the employee may have to be 18 years old. There may be a difference of a few days due to leap years, sorry.').required("Required"),
    password: yup.string().required().min(3, 'Password must contain 3 characters.'),
    confirmpass: yup.string().test('passwords-match', 'Passwords must match', function (value) { return this.parent.password === value }),

}).required();

function EmployeeCreate() {

    const navigate = useNavigate();
    const [errorApi, setErrorApi] = useState();

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        defaultValues: { fullName: '', email: '', dateBirth: new Date(), salary: undefined, phone: undefined, password: '', confirmpass: '', countOfTasks: 0 },

        mode: 'onChange',
        resolver: yupResolver(schema)

    })

    const registerSubmitHandler = async (data: FormData, event: BaseSyntheticEvent<object, any, any> | undefined) => {

        data.fullName = data.fullName.trim();
        data.email = data.email.trim();
        data.password = data.password.trim();
        data.confirmpass = data.confirmpass.trim();


        await userService.regisrer(data).then((token) => {
            setErrorApi(undefined)
            navigate('/users')

        }).catch((err: any) => {
            console.log(err.message)
            setErrorApi(err.message)
        })
    }

    if (errorApi) {

        setTimeout(() => {
            setErrorApi(undefined);
        }, 5000)


    }

    const goBack = () => {
        navigate(-1)
    }

    return (
        <>
            <div className="div-register">
                <form className="form-register" onSubmit={handleSubmit(registerSubmitHandler)}>
                    {errorApi ? <p style={{ color: 'red' }}>{errorApi}</p> : ''}
                    <h2>CREATE EMPLOYEE PAGE</h2>
                    <span>
                        <label htmlFor='fullName' >FULL NAME: </label>
                        <input {...register('fullName')} type="text" name="fullName" placeholder="Full name" className="register-input" />
                        <p >{errors.fullName?.message}</p>
                    </span>
                    <span>
                        <label htmlFor='email' >EMAIL: </label>
                        <input {...register('email')} type="email" name="email" placeholder="Email" className="register-input" />
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
                    <span>
                        <label htmlFor='salary' >Salary: </label>
                        <input {...register('salary')} type="number" name="salary" placeholder="salary" className="register-input" />
                        <p >{errors.salary?.message}</p>
                    </span>
                    <span>
                        <label htmlFor="password">PASSWORD: </label>
                        <input {...register('password')} type="password" name="password" placeholder="Password" className="register-input" />
                        <p >{errors.password?.message}</p>
                    </span>
                    <span>
                        <label htmlFor="confirmpass">CONFIRM PASSWORD: </label>
                        <input  {...register('confirmpass')} type="password" name="confirmpass" placeholder="Confirm Password" className="register-input" />
                        <p >{errors.confirmpass?.message}</p>
                    </span>
                    <button className="register-input btnSubmit">Create Employee</button>
                    <button className="btnBack" onClick={goBack} >Back</button>

                </form>
            </div>

        </>
    )
}

export default EmployeeCreate;