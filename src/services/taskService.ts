import { API_URL } from "../utils/baseUrl";
import { ITask } from "../utils/interfaces";


const baseUrl = API_URL;


export async function create(task: ITask): Promise<ITask> {


    const response = await fetch(`${baseUrl}/tasks/create`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(task)
    });

    if (response.status >= 400) {
        const result = await response.json();
        throw new Error(result);
    }

    return response.json()
}



export async function getAllTask(): Promise<ITask[]> {

    const response = await fetch(`${baseUrl}/tasks/`)

    return response.json()

}

export async function findTaskById(id: string): Promise<ITask> {

    const response = await fetch(`${baseUrl}/tasks/${id}`)


    if (response.status >= 400) {
        const res = await response.json();
        throw new Error(res);
    }
    return await response.json();
}


export async function editTask(id: string, entity: ITask): Promise<ITask> {

    const response = await fetch(`${baseUrl}/tasks/${id}`, {
        method: 'PUT',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(entity)
    })
    if (response.status >= 400) {
        const result = await response.json();

        throw new Error(result.message);
    }
    return await response.json();

}


export async function deleteById(id:string): Promise<ITask> {


    const response = await fetch(`${baseUrl}/tasks/${id}`,{
        method:'DELETE'
    })

    if (response.status >= 400) {
        const result = await response.json();
        throw new Error(result);
    }


    return response.json()
    
}

