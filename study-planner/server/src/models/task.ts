export interface Task {
    id: string;
    title: string;
    description: string;
    dueDate: Date;
    completed: boolean;
}

export class TaskModel {
    private tasks: Task[] = [];

    public createTask(task: Task): Task {
        this.tasks.push(task);
        return task;
    }

    public getTasks(): Task[] {
        return this.tasks;
    }

    public updateTask(id: string, updatedTask: Partial<Task>): Task | null {
        const taskIndex = this.tasks.findIndex(task => task.id === id);
        if (taskIndex === -1) return null;

        this.tasks[taskIndex] = { ...this.tasks[taskIndex], ...updatedTask };
        return this.tasks[taskIndex];
    }

    public deleteTask(id: string): boolean {
        const taskIndex = this.tasks.findIndex(task => task.id === id);
        if (taskIndex === -1) return false;

        this.tasks.splice(taskIndex, 1);
        return true;
    }
}