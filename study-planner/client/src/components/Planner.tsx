import React, { useState } from 'react';

const Planner: React.FC = () => {
    const [tasks, setTasks] = useState<string[]>([]);
    const [taskInput, setTaskInput] = useState<string>('');

    const handleAddTask = () => {
        if (taskInput.trim()) {
            setTasks([...tasks, taskInput]);
            setTaskInput('');
        }
    };

    const handleDeleteTask = (index: number) => {
        const newTasks = tasks.filter((_, i) => i !== index);
        setTasks(newTasks);
    };

    return (
        <div>
            <h1>Study Planner</h1>
            <input
                type="text"
                value={taskInput}
                onChange={(e) => setTaskInput(e.target.value)}
                placeholder="Add a new task"
            />
            <button onClick={handleAddTask}>Add Task</button>
            <ul>
                {tasks.map((task, index) => (
                    <li key={index}>
                        {task}
                        <button onClick={() => handleDeleteTask(index)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Planner;