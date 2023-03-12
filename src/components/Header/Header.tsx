import { Link, useNavigate } from "react-router-dom";

import './Header.css'


function Header() {

    const navigate = useNavigate();

    const manager = sessionStorage.getItem('fullName');
    const userId = sessionStorage.getItem('userId');
    const accessToken = sessionStorage.getItem('accessToken');

    const logout = async () => {
        if (!accessToken) return;

        sessionStorage.clear()
        navigate('/login')
    }

    return (
        <header>
            <nav className="nav-header">
                <ul className="nav-ul">
                    {manager === 'manager' ?
                        <>
                            <li className="nav-li"> <Link to={`/profile/${userId}`}> Welcome {manager}</Link></li>
                            <li className="nav-li"> <Link to={'/'}>Home</Link></li>
                            <li className="nav-li"> <Link to={'/task/create'}>Create Task</Link></li>
                            <li className="nav-li"> <Link to={'/user/create'}>Create Employee</Link></li>
                            <li className="nav-li"> <Link to={'/users'}>All Employees</Link></li>
                            <li className="nav-li"> <Link to={'/top'}>Top 5 Employees</Link></li>
                            <li className="nav-li" onClick={logout}>Logout</li>
                        </>
                        : userId ?
                            <>
                                <li className="nav-li"> <Link to={`/profile/${userId}`}> Welcome {manager}</Link></li>
                                <li className="nav-li"> <Link to={'/'}>Home</Link></li>
                                <li className="nav-li" onClick={logout}>Logout</li>
                            </>
                            :
                            <>
                                <li className="nav-li"> <Link to={'/login'}>Login</Link></li>
                                <li className="nav-li"> <Link to={'/register'}>Register</Link></li>
                            </>

                    }
                </ul>
            </nav>
        </header>
    )
}

export default Header;