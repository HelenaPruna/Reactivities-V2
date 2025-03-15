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
    maxParticipants: number
    allowedMissedDays: number
    numberAttendees: number
    numberWaiting: number
    isFull: boolean
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
    maxParticipants: number
    allowedMissedDays: number
}

type User = {
    id: string
    email: string
    displayName: string
}

type Attendee = {
    id: string
    identifier: string
    comments: string
    isWaiting: boolean
    skippedDays: number
    isSkipped: boolean
}

type AttendeeVal = {
    identifier: string
    comments?: string
}

type Attendance = {
    id: string
    identifier: string
    hasAttended: number //0=pendent,1=present,2=falta
}

type AttendanceValues = {
    id: string
    hasAttended: number
}