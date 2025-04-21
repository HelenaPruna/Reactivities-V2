import dayjs from "dayjs";
import { Link } from "react-router";
import { Card, Divider, Grid2, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useStore } from "../../lib/hooks/useStore";
import { getMinutes, getMonday, trimSeconds } from "../../lib/util/util";

interface Props {
    room: Room;
}

const WeekCalendar = observer(function WeekCalendar({ room }: Props) {
    const { roomStore: { startDate } } = useStore();

    const refDate = dayjs(startDate);
    const monday = getMonday(refDate);
    const days = Array.from({ length: 5 }, (_, i) => monday.add(i, "day"));

    const startHour = 8;
    const endHour = 21;
    const totalVisibleMinutes = (endHour - startHour) * 60;

    const headerHeight = 25; 
    const calendarHeightPx = 375;
    const contentHeight = calendarHeightPx - headerHeight;
    const scale = contentHeight / totalVisibleMinutes;

    return (
        <Grid2 container display='flex'>
            <Grid2 style={{ width: '40px', borderRight: '1px solid rgba(0, 0, 0, 0.12)', position: 'relative' }}>
                {Array.from({ length: endHour - startHour + 1 }, (_, i) => {
                    const hour = startHour + i;
                    const top = (i * 60 * scale) + headerHeight;
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
            <Grid2 style={{ flex: 1, display: "flex" }}>
                {days.map((day) => {
                    const dayStr = day.format("YYYY-MM-DD");
                    const dayEvents = room.recurrences.filter((r) => r.date === dayStr);
                    return (
                        <Grid2 key={dayStr}
                            style={{
                                flex: 1,
                                position: "relative",
                                height: calendarHeightPx,
                                borderRight: "1px solid rgba(0, 0, 0, 0.12)"
                            }}
                        >
                            <div style={{ textAlign: "center", fontSize: 12, margin: "2px 0" }}>
                                <strong>{day.locale("ca").format("ddd DD")}</strong>
                            </div>
                            {Array.from({ length: endHour - startHour + 1 }, (_, i) => {
                                const top = i * 60 * scale + headerHeight;
                                return (
                                    <Divider key={i} style={{ position: 'absolute', top, left: 0, right: 0 }} />
                                );
                            })}

                            {dayEvents.map((evt, idx) => {
                                const startMinutes = getMinutes(evt.timeStart);
                                const endMinutes = getMinutes(evt.timeEnd);
                                if (startMinutes < startHour * 60 || startMinutes >= endHour * 60) return null;

                                const eventTop = headerHeight + (startMinutes - startHour * 60) * scale;
                                const eventHeight = (endMinutes - startMinutes) * scale;

                                return (
                                    <Link
                                        key={`${dayStr}-${idx}`}
                                        to={`/activities/${evt.activityId}`}
                                        style={{ textDecoration: "none" }}
                                    >
                                        <Card
                                            style={{
                                                position: "absolute",
                                                top: eventTop,
                                                left: "3px",
                                                right: "3px",
                                                height: eventHeight,
                                                backgroundColor: "rgb(228, 241, 255)",
                                                borderRadius: "4px",
                                                overflow: "hidden",
                                                paddingLeft: 5,
                                                paddingTop: 2
                                            }}
                                        >
                                            <Typography sx={{ fontSize: "12px" }}>
                                                {trimSeconds(evt.timeStart)} - {trimSeconds(evt.timeEnd)}
                                            </Typography>
                                            <Typography sx={{ fontSize: "14px", color: "rgba(0,0,0,0.6)" }}>
                                                {evt.activityTitle}
                                            </Typography>
                                        </Card>
                                    </Link>
                                );
                            })}
                        </Grid2>
                    );
                })}
            </Grid2>
        </Grid2>
    );
});

export default WeekCalendar;
