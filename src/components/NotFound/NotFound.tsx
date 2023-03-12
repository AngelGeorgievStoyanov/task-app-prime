import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import './NotFound.css';


function NotFound() {


    let internalSec: ReturnType<typeof setInterval>;
    let internal: ReturnType<typeof setTimeout>;
    const initalState = 10;
    const [count, setCount] = useState(initalState);
    const counterRef = useRef(initalState);
    const navigate = useNavigate();

    useEffect(() => {
        counterRef.current = count;
    });


    useEffect(() => {


        internalSec = setInterval(() => {
            setCount(counterRef.current - 1)

        }, 1000)



        internal = setTimeout(() => (
            navigate('/')
        ), 10000)

        return () => {
            clearTimeout(internal);
            clearInterval(internalSec)
        };

    }, [])
    const goHome = () => {
        clearInterval(internalSec)
        clearTimeout(internal)
        navigate('/')
    }

    return (
        <div className="not-found">
            <h1>PAGE NOT FOUND 404</h1>
            <h2> WRONG WAY!</h2>
            <section className="sec-not-found" >

                <h2 style={{margin:'3px 15px'}}>{count}  SECONDS OR CLICK
                </h2>
                <button onClick={goHome}>HOME</button>

            </section >
        </div>
    )
}

export default NotFound;