import {Task} from "../interfaces/interfaces";

export function getDataFromLS(key: string): Task[] | null {
    const data = window.localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
}

export function setDataFromLS(key: string, data: Task[]): void{
    window.localStorage.setItem(key, JSON.stringify(data));
}

export function removeLS(key: string): void{
    window.localStorage.removeItem(key);
}
