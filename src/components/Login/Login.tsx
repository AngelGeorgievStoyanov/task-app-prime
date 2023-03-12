import { BaseSyntheticEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import * as userService from '../../services/userService';
import './Login.css';
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';

type FormData = {
    email: string;
    password: string;
};

const schema = yup.object({
    email: yup.string().required().email(),
    password: yup.string().required().min(3, 'Password must contain 3 characters.'),

}).required();



function Login() {

    const navigate = useNavigate();

    const [errorApi, setErrorApi] = useState();


    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        defaultValues: { email: '', password: '' },

        mode: 'onChange',
        resolver: yupResolver(schema)

    })

    const registerSubmitHandler = async (data: FormData, event: BaseSyntheticEvent<object, any, any> | undefined) => {
        data.email = data.email.trim();
        data.password = data.password.trim();

        await userService.login(data.email, data.password).then((token) => {

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
            setErrorApi(undefined)
        }, 5000)


    }

    return (
        <>
            <div className="div-login">
                {errorApi ? <p style={{ color: 'red' }}>{errorApi}</p> : ''}
                <form className="form-login" onSubmit={handleSubmit(registerSubmitHandler)}>
                    <h2>LOGIN PAGE</h2>
                    <span>
                        <label htmlFor='email' >EMAIL: </label>
                        <input {...register('email')} type="email" name="email" placeholder="Email" className="register-input" />
                        <p>{errors.email?.message}</p>
                    </span>
                    <span>
                        <label htmlFor="password">PASSWORD: </label>
                        <input {...register('password')} type="password" name="password" placeholder="Password" className="register-input" />
                        <p>{errors.password?.message}</p>
                    </span>

                    <button className="register-input btnSubmit">Sign Up</button>
                    <h4><Link to={'/register'}>Don't Have An Account? Sign up!</Link></h4>
                </form>
            </div>
        </>
    )
}

export default Login;