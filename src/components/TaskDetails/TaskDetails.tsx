import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { ITask, IUser } from "../../utils/interfaces";
import './TaskDetails.css';
import * as taskService from '../../services/taskService'
import * as userService from '../../services/userService'
import { useEffect, useState } from "react";


function TaskDetails() {

    const userId = sessionStorage.getItem('userId')
    const fullName = sessionStorage.getItem('fullName')
    const [user, setUser] = useState<IUser>()

    const task = useLoaderData() as ITask;


    const navigate = useNavigate();

    useEffect(() => {
        if (!userId) return;

        userService.findUserById(userId).then((data) => {

            setUser(prev => data)
        }).catch((err) => {
            console.log(err)
        })
    }, [])


    const deleteClickHandler = async () => {

        if (!task._id) return;

        await taskService.deleteById(task._id).then((data) => {
            navigate('/')
        }).catch((err) => {
            console.log(err)
        })

    }

    const acceptClickHandler = async () => {

        if (!task._id) return;
        if (!userId) return;
        if (!user) return;

        user.tasksId?.push(task._id)
        user.countOfTasks++;

        task.contractor?.push(userId)
        await taskService.editTask(task._id, task).then(async (task) => {
            await userService.editUser(userId, user).then((data) => {
                navigate('/')
            }).catch((err) => {
                console.log(err)
            })
        }).catch((err) => {
            console.log(err)
        })


    }

    const goBack = () => {
        navigate(-1)
    }

    return (

        <div className="div-details">
            <section className="section-details">
                <h3>Title: {task.title}</h3>
                <h5>Description: {task.description}</h5>
                <h6>Deadline: {task.deadline.toString().split('T')[0].split('-').reverse().join('.')}</h6>
                {fullName === 'manager' && userId !== undefined ?
                    <>
                        <button > <Link to={`/task/edit/${task._id}`}>Edit</Link> </button>
                        <button onClick={deleteClickHandler} >Delete</button>
                    </>

                    : userId !== undefined ?

                        <button disabled={(task.contractor && task.contractor?.length > 0) ? true : (new Date(task.deadline).toISOString().split('T')[0] >= new Date(Date.now()).toISOString().split('T')[0]) ? false : true} onClick={acceptClickHandler} >Accept</button>
                        : ''
                }
                {task.contractor && task.contractor.length > 0 ?
                    <h5>Task accepted</h5>
                    : ''}
                <button className="btnBack" onClick={goBack}>Back</button>

            </section>
        </div>
    )
}

export default TaskDetails;