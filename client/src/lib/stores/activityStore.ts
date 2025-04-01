import dayjs from "dayjs";
import { makeAutoObservable } from "mobx";

export class ActivityStore {
    filter = 'all';
    startDate = dayjs().format("YYYY-MM-DD")
    
    constructor() {   
        makeAutoObservable(this)
    }

    setFilter = (filter: string) => {
        this.filter = filter
    }
    setStartDate = (date: Date) => {
        this.startDate = dayjs(date).format("YYYY-MM-DD")
    }
}