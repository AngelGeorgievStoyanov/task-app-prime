import { Link } from 'react-router-dom';
import { ITask } from '../../../utils/interfaces';
import './TaskCard.css';

interface TaskCardProps {
    task: ITask;

}

function TaskCard({ task }: TaskCardProps) {

    return (
        <>
            <section className='task-card'>
                <h3>Title: {task.title.length > 20 ? task.title.substring(0, 20) + '...' : task.title}</h3>
                <h5>Description: {task.description.length > 50 ? task.description.substring(0, 50) + '...' : task.description}</h5>
                <h6>Deadline: {task.deadline.toString().split('T')[0].split('-').reverse().join('.')}</h6>
                <button > <Link to={`/task/details/${task._id}`}>Details</Link> </button>
                {task.contractor && task.contractor.length > 0 ?
                    <h5>Task accepted</h5>
                    : ''}
            </section>
        </>
    )
}

export default TaskCard;