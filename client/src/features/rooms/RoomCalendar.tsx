import dayjs from "dayjs";
import isToday from "dayjs/plugin/isToday";
import { useStore } from "../../lib/hooks/useStore";
import { observer } from "mobx-react-lite";
import { Card, Divider, Grid2, Typography } from "@mui/material";
import { Link } from "react-router";
import { getMinutes, trimSeconds } from "../../lib/util/util";
dayjs.extend(isToday);

interface Props {
    room: Room;
}
const RoomCalendar = observer(function RoomCalendar({ room }: Props) {
    const { roomStore: { startDate } } = useStore();
    const events = room.recurrences.filter(r => r.date === startDate);

    const startHour = 8;
    const endHour = 21;

    const totalVisibleMinutes = (endHour - startHour) * 60;
    const calendarHeightPx = 350;
    const scale = calendarHeightPx / totalVisibleMinutes;

    return (
        <Grid2 container display='flex'>
            <Grid2 style={{ width: '40px', borderRight: '1px solid rgba(0, 0, 0, 0.12)', position: 'relative' }}>
                {Array.from({ length: endHour - startHour + 1 }, (_, i) => {
                    const hour = startHour + i;
                    const top = (i * 60 * scale);
                    return (
                        <div
                            key={hour}
                            style={{
                                position: 'absolute',
                                top: `${top}px`,
                                fontSize: '10px'
                            }}
                        >
                            {(hour % 2 === 0) && `${hour}:00`}
                        </div>
                    );
                })}
            </Grid2>
            <Grid2 style={{ flex: 1, position: 'relative', height: `${calendarHeightPx}px`, borderRight: '1px solid rgba(0, 0, 0, 0.12)' }}>
                {Array.from({ length: endHour - startHour + 1 }, (_, i) => {
                    const top = i * 60 * scale;
                    return (
                        <Divider
                            key={i}
                            style={{ position: 'absolute', top, left: 0, right: 0 }}
                        />
                    );
                })}
                {events.map((event, idx) => {
                    const startMinutes = getMinutes(event.timeStart);
                    const endMinutes = getMinutes(event.timeEnd);
                    if (startMinutes < startHour * 60 || startMinutes > endHour * 60) return null;
                    const eventTop = (startMinutes - startHour * 60) * scale;
                    const eventHeight = (endMinutes - startMinutes) * scale;

                    return (
                        <Link key={idx} to={`/activities/${event.activityId}`} style={{ textDecoration: 'none' }}>
                            <Card
                                style={{
                                    position: 'absolute',
                                    top: eventTop,
                                    left: '5px',
                                    right: '5px',
                                    height: eventHeight,
                                    backgroundColor: 'rgb(228, 241, 255)',
                                    borderRadius: '4px',
                                    overflow: 'hidden',
                                    paddingLeft: 5,
                                    paddingTop: 2
                                }}
                            >

                                <Typography sx={{ fontSize: '12px' }}>
                                    {trimSeconds(event.timeStart)} - {trimSeconds(event.timeEnd)}
                                </Typography>
                                <Typography sx={{ fontSize: '14px', color: "rgba(0, 0, 0, 0.6)" }}>
                                    {event.activityTitle}
                                </Typography>
                            </Card>
                        </Link>

                    );
                })}
            </Grid2>
        </Grid2>
    );
})

export default RoomCalendar;