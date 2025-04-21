import Calendar from 'react-calendar';
import dayjs from 'dayjs';

type Props = {
    activity: Activity
}

export default function EventCalendar({ activity }: Props) {
    const events = activity.recurrences.map(r => new Date(r.composedTime)).concat(activity.oneTimeEvents.map(r => new Date(r.composedTime)))
    const hasEvent = (date: Date) => {
        return events.some(eventDate => dayjs(eventDate).isSame(date, 'day'));
    };

    const colorEvent = (date: Date) => {
        const recucurrence = activity.recurrences.find(r => dayjs(r.composedTime).isSame(date, 'day'));
        return recucurrence === undefined ? 'blue' : 'green'
    }
    
    return (
        <Calendar
            locale="ca"
            tileContent={({ date, view }) => {
                if (view === 'month' && hasEvent(date)) {
                    return (
                        <div
                            style={{
                                marginTop: '1px',
                                width: '6px',
                                height: '6px',
                                backgroundColor: colorEvent(date),
                                borderRadius: '50%',
                                margin: '0 auto',
                            }}
                        />
                    );
                }
                return null;
            }}
            defaultActiveStartDate={new Date(activity.dateStart)}

        />
    );
};

