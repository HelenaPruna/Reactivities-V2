import { makeAutoObservable } from "mobx";

export class UserStore {
    searchTerm: string | undefined = undefined;
    constructor() {
        makeAutoObservable(this)
    }

    setSearchTerm = (term: string) => {
        this.searchTerm = term
        if (term === "") this.searchTerm = undefined
    }

    resetFilters = () => {
        this.searchTerm = undefined;
    }
}