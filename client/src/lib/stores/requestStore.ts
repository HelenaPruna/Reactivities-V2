import { makeAutoObservable } from "mobx";

export class RequestStore {
    filter?: number;
    myRequests?: boolean;
    myActReqs?: boolean;
    
    constructor() {
        makeAutoObservable(this)
    }

    setFilter = (filter: number) =>  {
        this.filter = filter
    }

    setMyRequests = (myRequests: boolean) => {
        this.myRequests = myRequests
    }

    setMyActReqs = (myActReqs: boolean) => {
        this.myActReqs = myActReqs
    }
    
    resetFilters = () => {
        this.filter = undefined
        this.myRequests = undefined
        this.myActReqs = undefined
    }
}