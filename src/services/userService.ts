import { API_URL } from "../utils/baseUrl"
import { IToken, IUser } from "../utils/interfaces";

const baseUrl = API_URL;

export async function regisrer(user: IUser): Promise<IToken> {


    const response = await fetch(`${baseUrl}/users/register`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(user)
    });

    if (response.status >= 400) {
        const result = await response.json();
        throw new Error(result);
    }

    return response.json()
}


export async function login(email: string, password: string): Promise<IToken> {


    const response = await fetch(`${baseUrl}/users/login`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    });

    if (response.status >= 400) {
        const result = await response.json();
        throw new Error(result);
    }


    return response.json()
}


export async function getAllEmployees(): Promise<IUser[]> {
    const response = await fetch(`${baseUrl}/users/`)
    if (response.status >= 400) {
        const result = await response.json();
        throw new Error(result);
    }
    return response.json();
}


export async function getAllEmployeesTop(): Promise<IUser[]> {
    const response = await fetch(`${baseUrl}/users/top`)
    if (response.status >= 400) {
        const result = await response.json();
        throw new Error(result);
    }
    return response.json();
}


export async function deleteEmployeeById(id: string): Promise<IUser> {

    const response = await fetch(`${baseUrl}/users/${id}`, {
        method: 'DELETE'
    })

    if (response.status >= 400) {
        const result = await response.json();
        throw new Error(result);
    }

    return response.json()
}


export async function findUserById(id: string): Promise<IUser> {

    const response = await fetch(`${baseUrl}/users/${id}`)
    if (response.status >= 400) {
        const result = await response.json();
        throw new Error(result);
    }
    return response.json();
}


export async function editUser(id: string, user: IUser): Promise  <IUser> {

    const response = await fetch(`${baseUrl}/users/${id}`, {
        method: 'PUT',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(user)
    })
    if (response.status >= 400) {
        const result = await response.json();
        throw new Error(result);
    }
    return response.json();
}

export async function verifyId(id:string):Promise<boolean>{
    const response = await fetch(`${baseUrl}/users/userId/${id}`)
    if (response.status >= 400) {
        const result = await response.json();
        throw new Error(result.message);
    }
   return await response.json();
}




export async function verifyManagerId(id:string):Promise<boolean>{
    const response = await fetch(`${baseUrl}/users/manager/${id}`)
    if (response.status >= 400) {
        const result = await response.json();
        throw new Error(result.message);
    }
   return await response.json();
}
