import { useEffect, useState } from "react";


type LocalStoreKey = "@LS_TODO_LIST"

export const useLocalStorage = <T>(key: LocalStoreKey, initialValue: T) => {

    const getStoredValue = (): T => {
        const storedValue = localStorage.getItem(key);
        if(storedValue && storedValue !== "undefined") {
            return JSON.parse(storedValue)
        }
        else {
            return initialValue
        }
    }

    const [value, setValue] = useState<T>(getStoredValue);

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value])

    const setStoredValue = (newValue: T) => {
        setValue(newValue);

        localStorage.setItem(key, JSON.stringify(newValue))
    }

    return { getStoredValue, setStoredValue }
}