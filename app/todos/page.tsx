"use client"
import { useState } from "react";
import { Todo } from "../types/todo";
import { useTaskManager } from "../hooks/useTaskManager";

interface TodoListProps {
    title: string;
    initialTasks: Todo[]
}

const TodoList = ({ title = "Todo", initialTasks }: TodoListProps ) => {
    const { tasks, addTask, toggleTaskCompletion, removeTaskById } = useTaskManager(initialTasks)
    const [newTaskTitle, setNewTaskTitle] = useState<string>("");

    const handleAddTask = (e: React.FormEvent) => {
        e.preventDefault();
        
        addTask(newTaskTitle)
        
        setNewTaskTitle("")
    }

    const handleNewTaskTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.target.value)
    }

    const handleToggleCompletion = (taskId: number) => {
        toggleTaskCompletion(taskId)
    }

    const handleRemoveTask = (taskId: number) => {
        removeTaskById(taskId);
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="p-6 rounded-lg shadow-lg">
                <h1 className="text-2xl font-bold mb-4">{title}</h1>
                <form onSubmit={handleAddTask}>
                    <input
                        type="text"
                        value={newTaskTitle}
                        onChange={handleNewTaskTitle}
                        className="p-2 rounded mb-2 bg-white border-2 border-blue-500 text-black"
                        placeholder="New task"
                    />
                    <button
                        type="submit"
                        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700"
                    >
                        Add Task
                    </button>
                </form>
                <ul className='list-disc pl-5 mb-4'>
                    {tasks.map((task) => (
                        <li key={task.id} className="flex items-center mb-2 bg-white p-2 rounded">
                            <span className={task.completed ? "line-through" : ""}>
                                {task.title}
                            </span>
                            <button
                                onClick={() => handleToggleCompletion(task.id)}
                                className="ml-2 bg-green-700 text-white p-1 rounded hover:bg-green-700"
                            >
                                {task.completed ? "Undo" : "Complete"}
                            </button>
                            <button
                                onClick={() => handleRemoveTask(task.id)}
                                className="ml-2 bg-red-700 text-white p-1 rounded hover:bg-red-700"
                            >
                                Remove
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default TodoList