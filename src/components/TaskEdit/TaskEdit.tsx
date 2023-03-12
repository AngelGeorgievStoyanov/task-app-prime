import { BaseSyntheticEvent } from "react";
import { useForm } from "react-hook-form";
import { useLoaderData, useNavigate } from "react-router-dom";
import { ITask } from "../../utils/interfaces";
import './TaskEdit.css';
import * as taskService from '../../services/taskService'
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';

type FormData = {
    title: string;
    description: string;
    deadline: Date | string;
};


const schema = yup.object({
    title: yup.string().required().matches(/^(?!\s+$).*(\S{1})/, 'Title cannot be empty string and must contain at least 1 characters.'),
    description: yup.string().required().matches(/^(?!\s+$).*(\S{1})/, 'Description cannot be empty string and must contain at least 1 characters.'),
    deadline: yup.date().min(new Date(Date.now() - (24 * 60 * 60 * 1000)), 'The task cannot be for yesterday.').required("Required"),

}).required();

function TaskEdit() {

    const task = useLoaderData() as ITask
    const navigate = useNavigate();




    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        defaultValues: { title: task.title, description: task.description, deadline: new Date(task.deadline).toISOString().split('T')[0] },

        mode: 'onChange',
        resolver: yupResolver(schema)
    })


    const editSubmitHandler = async (data: FormData, event: BaseSyntheticEvent<object, any, any> | undefined) => {
        event?.preventDefault();

        data.title = data.title.trim();
        data.description = data.description.trim();
        data.deadline = (data.deadline instanceof Date) ? new Date(data.deadline.getTime() + data.deadline.getTimezoneOffset() * -60000) : data.deadline

        if (task._id) {

            await taskService.editTask(task._id?.toString(), data as ITask).then((task) => {


                navigate(`/task/details/${task._id}`)
            }).catch((err) => {
                console.log(err)
            })

        }
    }

    const goBack = () => {
        navigate(-1)
    }

    return (
        <section className="section-edit-task" >
            <form className="form-edit-task" method="POST" onSubmit={handleSubmit(editSubmitHandler)}>
                <h3>Edit Task</h3>

                <span>
                    <label htmlFor='title' >TITLE: </label>
                    <input {...register('title')} type="text" name="title" placeholder="Title" className="edit-task-input" />
                    <p >{errors.title?.message}</p>
                </span>
                <span>
                    <label htmlFor='description' >DESCRIPTION: </label>
                    <textarea {...register('description')} cols={30} rows={6} name="description" placeholder="Description" className="edit-task-input" ></textarea>
                    <p >{errors.description?.message}</p>
                </span>
                <span>
                    <label htmlFor='deadline' >DEADLINE: </label>
                    <input {...register('deadline')} type="date" name="deadline" placeholder="Deadline" className="edit-task-input" />
                    <p >{errors.deadline?.message}</p>
                </span>

                <button className="edit-input btnSubmit">Edit Task</button>
                <button className="btnBack" onClick={goBack} >Back</button>
            </form>

        </section>
    )
}

export default TaskEdit;