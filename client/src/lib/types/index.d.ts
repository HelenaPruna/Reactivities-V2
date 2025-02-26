type PagedList<T, TCursor> = {
    items: T[],
    nextCursor: TCursor
}

type Activity = {
    id: string
    title: string
    date: Date
    description: string
    category: string
    isCancelled: boolean
    room: string
    creator: Profile
    organizers: Profile[]
    isOrganizing: boolean
    isCreator: boolean
}

type Profile = {
    id: string
    displayName: string
}


type FieldActivity = {
    title: string
    date: Date
    description: string
    category: string
    room: string
}

type User = {
    id: string
    email: string
    displayName: string
}