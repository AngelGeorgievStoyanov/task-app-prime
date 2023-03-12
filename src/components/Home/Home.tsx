import { useLoaderData } from "react-router-dom";
import { ITask } from "../../utils/interfaces";
import TaskList from "../TaskList/TaskList";
import './Home.css'

function Home() {

    const tasks = useLoaderData() as ITask[];


     tasks.sort((a, b) => new Date(a.deadline).setHours(0, 0, 0, 0) - new Date(b.deadline).setHours(0, 0, 0, 0))

    return (

        <div className="div-home">

            <TaskList tasks={tasks} />
        </div>

    )
}

export default Home;