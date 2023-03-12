import { ITask } from "../../utils/interfaces";
import TaskCard from "./TaskCard/TaskCard";

interface TaskListProps {
    tasks: ITask[];
}



function TaskList({ tasks }: TaskListProps) {
    return (
        <>
            {tasks.length > 0 ?
                tasks.map(x => <TaskCard key={x._id} task={x} />)
                :
                <>
                    <div>
                        <h1>WELCOME!</h1>
                        <h4>No tasks found!</h4>
                    </div>

                </>
            }
        </>
    )
}


export default TaskList;


