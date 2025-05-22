type PagedList<T> = {
    items: T[],
    nextCursor?: string;
}

type Activity = {
    id: string
    title: string
    description: string
    isCancelled: boolean
    room: Room
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
    recurrences: Recurrence[]
    oneTimeEvents: Recurrence[]
    isOneDay: boolean
    interval: number
    requests: RequestSol[]
}

type Profile = {
    id: string
    displayName: string
}


type FieldActivity = {
    title: string
    description: string
    maxParticipants: number
    allowedMissedDays: number
    dateStart: string
    dateEnd: string
    timeStart: string
    timeEnd: string
    interval: number
    isOneDay: boolean
}

type User = {
    id: string
    email: string
    displayName: string
    role: string
}

type Attendee = {
    id: string
    identifier: string
    comments?: string
    isWaiting: boolean
    skippedDays: number
}

type AttendeeVal = {
    id?: string
    identifier: string
    comments?: string
    isWaiting: boolean
}

type Attendance = {
    id: string
    identifier: string
    attendeeId: string
    recurId: string
    hasAttended: number //0=pendent,1=present,2=falta
}

type AttendanceValues = {
    id: string
    hasAttended: number
}

type Recurrence = {
    id: string
    date: string
    timeStart: string
    timeEnd: string
    isRecurrent: boolean
    composedTime: Date
    activityId: string
    activityTitle: string
    numberAttendees: number
    room: Room
}

type CreateRecur = {
    date: string
    timeStart: string
    timeEnd: string
}

type Room = {
    id: string
    name: string
    numberFloor: number
    capacity: number
    recurrences: Recurrence[]
}

type LaundryBooking = {
    id: string
    name: string
    start: Date
    end: Date
} 

type BookingFields = {
    name: string
    start: Date
    isRecurrent: boolean
} 

type RequestSol = {
    id: string
    state: number
    type: number
    message: string
    requestedBy: Profile
    dateCreated: Date
    approvedBy?: Profile
    dateApproved?: Date
    activityId?: string
    activityTitle?: string
}

type RequestVal = {
    type: number
    message: string
    activityId?: string
}

type ActivityOptions = {
    id: string
    title: string
}