import dayjs from "dayjs";
import { makeAutoObservable } from "mobx"
import { getMonday } from "../util/util";

export class LaundryStore {
    startDate = getMonday(dayjs()).toDate()
    endDate = dayjs(dayjs(this.startDate).add(6, 'day')).toDate()

    constructor() {
        makeAutoObservable(this)
    }

    setDate = (isAdding: boolean = true) => {
        const day = dayjs(this.startDate);
        if (isAdding) this.startDate = day.add(1, 'week').toDate();
        else this.startDate = day.subtract(1, 'week').toDate();

        this.endDate = dayjs(dayjs(this.startDate).add(6, 'day')).toDate();
    }

    resetDate = () => {
        this.startDate = dayjs(getMonday(dayjs())).toDate()
        this.endDate = dayjs(dayjs(this.startDate).add(6, 'day')).toDate()
    }
} 