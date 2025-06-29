import dayjs from "dayjs";
import { makeAutoObservable } from "mobx";
import { getMonday } from "../util/util";

export class RoomStore {
    viewType: [string, number] = ["Setmana", 6]
    startDate = getMonday(dayjs()).format("YYYY-MM-DD")
    endDate = dayjs(this.startDate).add(6, 'day').format("YYYY-MM-DD")

    constructor() {
        makeAutoObservable(this)
    }

    setView = (view: [string, number]) => {
        this.viewType = view
        if (view[0] === 'Setmana') {
            this.startDate = dayjs(getMonday(dayjs(this.startDate))).format("YYYY-MM-DD")
        }
        else {
            if (dayjs(this.startDate) < dayjs() && dayjs() <= dayjs(this.endDate)) //reset el dia si es en la setmana actual al dia actual
                this.startDate = dayjs().format("YYYY-MM-DD")
        }
        this.endDate = dayjs(this.startDate).add(view[1], 'day').format("YYYY-MM-DD")
    }

    setDates = (amount: number, positive: boolean) => {
        if (positive === true) {
            if (amount === 1 && dayjs(this.startDate).day() === 5) amount = 3 // si es div que em passi a dilluns
            if (this.viewType[0] === "Setmana") amount = 7 
            this.startDate = dayjs(this.startDate).add(amount, "day").format("YYYY-MM-DD")
        }
        else {
            if (amount === 1 && dayjs(this.startDate).day() === 1) amount = 3 // si es dill que em passi a div
            if (this.viewType[0] === "Setmana") amount = 7 
            this.startDate = dayjs(this.startDate).subtract(amount, "day").format("YYYY-MM-DD")
        }
        this.endDate = dayjs(this.startDate).add(this.viewType[1], 'day').format("YYYY-MM-DD")
    }

    resetDates = () => {
        this.viewType= ["Setmana", 6]
        this.startDate = getMonday(dayjs()).format("YYYY-MM-DD")
        this.endDate = dayjs(this.startDate).add(6, 'day').format("YYYY-MM-DD")
    }
}