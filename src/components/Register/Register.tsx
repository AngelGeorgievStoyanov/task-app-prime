import { BaseSyntheticEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import './Register.css';
import * as  userService from '../../services/userService'
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';

type FormData = {
    fullName: string;
    email: string;
    dateBirth: Date;
    salary: number;
    phone: number | undefined;
    password: string;
    confirmpass: string;
    countOfTasks: number;
    tasksId: string[];

};


const schema = yup.object({
    fullName: yup.string().required().matches(/^(?!\s+$).*(\S{1})/, 'Full Name cannot be empty string and must contain at least 1 characters .'),
    email: yup.string().required().email(),
    phone: yup.string().required('Phone number is required.').matches(/^(\+?\d+)$/, 'Phone number must be only digits'),
    dateBirth: yup.date().max(new Date(Date.now() - 567648000000), 'You must be at least 18 years.There may be a difference of a few days due to leap years, sorry, please contact the manager.').required("Required"),
    password: yup.string().required().min(3, 'Password must contain 3 characters.'),
    confirmpass: yup.string().test('passwords-match', 'Passwords must match', function (value) { return this.parent.password === value }),

}).required();


function Register() {

    const navigate = useNavigate();
    const [errorApi, setErrorApi] = useState();


    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        defaultValues: { fullName: '', email: '', dateBirth: new Date(), salary: 0, phone: undefined, password: '', confirmpass: '', countOfTasks: 0 },

        mode: 'onChange',
        resolver: yupResolver(schema)
    })

    const registerSubmitHandler = async (data: FormData, event: BaseSyntheticEvent<object, any, any> | undefined) => {
        data.fullName = data.fullName.trim();
        data.email = data.email.trim();
        data.password = data.password.trim();
        data.confirmpass = data.confirmpass.trim();


        await userService.regisrer(data).then((token) => {
           
            sessionStorage.setItem('userId', token._id)
            sessionStorage.setItem('email', token.email)
            sessionStorage.setItem('fullName', token.fullName)
            sessionStorage.setItem('accessToken', token.accessToken)
            setErrorApi(undefined);
            navigate('/')

        }).catch((err: any) => {
            setErrorApi(err.message);
            console.log(err.message)
        })
    }

    if (errorApi) {

        setTimeout(() => {
            setErrorApi(undefined);
        }, 5000)


    }


    return (
        <>
            <div className="div-register">
                <form className="form-register" onSubmit={handleSubmit(registerSubmitHandler)}>
                    {errorApi ? <p style={{ color: 'red' }}>{errorApi}</p> : ''}
                    <h2>REGISTER PAGE</h2>
                    <span>
                        <label htmlFor='fullName' >FULL NAME: </label>
                        <input {...register('fullName')} type="text" name="fullName" placeholder="Full name" className="register-input" />
                        <p >{errors.fullName?.message}</p>
                    </span>
                    <span>
                        <label htmlFor='email' >EMAIL: </label>
                        <input {...register('email')} type="email" name="email" placeholder="Email" className="register-input" />
                        <p>{errors.email?.message}</p>
                    </span>
                    <span>
                        <label htmlFor='dateBirth' >DATE OF BIRTH: </label>
                        <input {...register('dateBirth')} type="date" name="dateBirth" placeholder="Date of birth" className="register-input" />
                        <p>{errors.dateBirth?.message}</p>

                    </span>
                    <span>
                        <label htmlFor='phone' >Phone: </label>
                        <input {...register('phone')} type="tel" name="phone" placeholder="phone" className="register-input" />
                        <p>{errors.phone?.message}</p>
                    </span>
                    <span>
                        <label htmlFor="password">PASSWORD: </label>
                        <input {...register('password')} type="password" name="password" placeholder="Password" className="register-input" />
                        <p>{errors.password?.message}</p>

                    </span>


                    <span>
                        <label htmlFor="confirmpass">CONFIRM PASSWORD: </label>
                        <input  {...register('confirmpass')} type="password" name="confirmpass" placeholder="Confirm Password" className="register-input" />
                        <p>{errors.confirmpass?.message}</p>

                    </span>


                    <button className="register-input btnSubmit">Sign Up</button>
                    <h4><Link to={'/login'}>Already Have An Account?</Link></h4>
                </form>
            </div>

        </>
    )
}

export default Register;

