export interface IUser {
    _id?: string;
    fullName: string;
    email: string;
    dateBirth: Date;
    salary?: number;
    phone?: number;
    password: string;
    confirmpass: string;
    countOfTasks: number;
    tasksId?: string[];
}


export interface IToken {
    _id: string,
    email: string,
    fullName: string,
    accessToken: string
}

export interface ITask {
    _id?: string
    title: string,
    description: string,
    deadline: Date,
    contractor?: string[]
}