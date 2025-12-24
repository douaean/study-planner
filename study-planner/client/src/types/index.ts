export interface Task {
    id: string;
    title: string;
    description: string;
    dueDate: Date;
    completed: boolean;
}

export interface User {
    id: string;
    username: string;
    email: string;
    password: string;
    tasks: Task[];
}