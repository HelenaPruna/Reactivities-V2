import dayjs from "dayjs";
import { makeAutoObservable } from "mobx";

export class ActivityStore {
    filter = 'all';
    startDate = dayjs().format("YYYY-MM-DD")
    searchTerm: string | undefined = undefined;
    includeCancelled  = false;
    
    constructor() {   
        makeAutoObservable(this)
    }

    setFilter = (filter: string) => {
        this.filter = filter
    }
    setStartDate = (date: Date) => {
        this.startDate = dayjs(date).format("YYYY-MM-DD")
    }
    setSearchTerm = (term: string) => {
        this.searchTerm = term
        if (term === "") this.searchTerm = undefined
    }
    setIncludeCancelled = (include: boolean) => {
        this.includeCancelled = include
    }

    resetFilters = () => {
        this.filter     = 'all';
        this.startDate  = dayjs().format("YYYY-MM-DD");
        this.searchTerm = undefined;
        this.includeCancelled = false;
      };
}