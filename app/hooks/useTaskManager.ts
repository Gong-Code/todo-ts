import { useState } from "react";
import { Todo } from "../types/todo";
import { useLocalStorage } from "./useLocalStorage";


export const useTaskManager = (initialTasks: Todo[]) => {
    const { getStoredValue, setStoredValue } = useLocalStorage("@LS_TODO_LIST", initialTasks || [])

    const [tasks, setTasks] = useState(getStoredValue);

    const addTask = (title: string) => {
        if(title.trim() === "") return

        const newId = Math.floor(Math.random() * 1000);

        const newTask: Todo = {id: newId, title: title, completed: false}

        const updatedTaskList = [...tasks, newTask];

        setTasks(updatedTaskList);

        setStoredValue(updatedTaskList)
    }

    const toggleTaskCompletion = (taskId: number) => {
        const updateCompleted = tasks.map((task) => {
            if(task.id === taskId) {
                return {...task, completed: !task.completed}
            }

            return task
        })

        setTasks(updateCompleted)

        setStoredValue(updateCompleted)
    }

    const removeTaskById = (taskId: number) => {
        const updatedTasks = tasks.filter(task => task.id !== taskId);

        setTasks(updatedTasks)

        setStoredValue(updatedTasks)
    }

    return {tasks, addTask, toggleTaskCompletion, removeTaskById}
}