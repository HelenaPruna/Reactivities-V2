type PagedList<T, TCursor> = {
    items: T[],
    nextCursor: TCursor
}

type Activity = {
    id: string
    title: string
    description: string
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
    dateStart: string
    dateEnd: string
    timeStart: string
    timeEnd: string
    recurrences: Recurrences[]
    dates: Date[]
    isOneDay: boolean
    interval: number
}

type Profile = {
    id: string
    displayName: string
}


type FieldActivity = {
    title: string
    description: string
    room: string
    maxParticipants: number
    allowedMissedDays: number
    dateStart: string
    dateEnd?: string
    timeStart: string
    timeEnd: string
    interval: number
    isOneDay: boolean
}

type User = {
    id: string
    email: string
    displayName: string
}

type Attendee = {
    id: string
    identifier: string
    comments?: string
    isWaiting: boolean
    skippedDays: number
}

type AttendeeVal = {
    identifier: string
    comments?: string
    isWaiting: boolean
}

type Attendance = {
    id: string
    identifier: string
    attendeeId: string
    hasAttended: number //0=pendent,1=present,2=falta
}

type AttendanceValues = {
    id: string
    hasAttended: number
}

type Recurrences = {
    id: string
    date: string
    timeStart: string
    timeEnd: string
    isRecurrent: boolean
    composedTime: Date
}
