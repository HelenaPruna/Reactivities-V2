import dayjs from "dayjs";
import { Link } from "react-router";
import { Box, Card, Divider, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useStore } from "../../lib/hooks/useStore";
import { getMinutes, getMonday, trimSeconds } from "../../lib/util/util";
import { blue } from "@mui/material/colors";

const TIME_COL_WIDTH = 40;
const DAY_COUNT = 5;
const START_HOUR = 8;
const END_HOUR = 21;
const SLOT_MINUTES = (END_HOUR - START_HOUR) * 60;
const HEADER_H = 15;
const CAL_HEIGHT = 350;
const PX_PER_MIN = (CAL_HEIGHT - HEADER_H) / SLOT_MINUTES;

type Props = {
    room: Room;
}

const WeekCalendar = observer(({ room }: Props) => {
    const { roomStore: { startDate } } = useStore();
    const monday = getMonday(dayjs(startDate));
    const days = Array.from({ length: DAY_COUNT }, (_, i) => monday.add(i, "day"));

    return (
        <Box
            sx={{
                display: "grid",
                gridTemplateColumns: `${TIME_COL_WIDTH}px repeat(${DAY_COUNT}, 1fr)`,
                gridTemplateRows: `${HEADER_H}px ${CAL_HEIGHT}px`,
                width: "100%",
            }}
        >
            <Box />
            {days.map(day => (
                <Box
                    key={day.toString()}
                    sx={{
                        borderLeft: 1,
                        borderColor: "divider",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <Typography variant="subtitle2">
                        {day.locale("ca").format("ddd D")}
                    </Typography>
                </Box>
            ))}
            <Box
                sx={{
                    gridColumn: 1,
                    gridRow: 2,
                    position: "relative",
                    borderColor: "divider",
                }}
            >
                {Array.from({ length: SLOT_MINUTES / 60 + 1 }, (_, i) => {
                    const hour = START_HOUR + i;
                    return (
                        <Typography
                            key={hour}
                            variant="caption"
                            sx={{
                                position: "absolute",
                                top: HEADER_H + i * 60 * PX_PER_MIN,
                                color: "text.secondary"
                            }}
                        >
                            {hour % 2 === 0 ? `${hour}:00` : ""}
                        </Typography>
                    );
                })}
            </Box>
            {days.map((day) => {
                const dayStr = day.format("YYYY-MM-DD");
                const evts = room.recurrences.filter(r => r.date === dayStr);
                return (
                    <Box
                        key={dayStr}
                        sx={{
                            position: "relative",
                            borderLeft: 1,
                            borderColor: "divider",
                        }}
                    >
                        {Array.from({ length: SLOT_MINUTES / 60 + 1 }, (_, i) => (
                            <Divider
                                key={i}
                                sx={{
                                    position: "absolute",
                                    top: HEADER_H + i * 60 * PX_PER_MIN,
                                    width: "100%",
                                    opacity: 0.4,
                                }}
                            />
                        ))}
                        {evts.map((evt, i) => {
                            const sMin = getMinutes(evt.timeStart);
                            const eMin = getMinutes(evt.timeEnd);
                            if (sMin < START_HOUR * 60 || eMin > END_HOUR * 60) return null;

                            const top = HEADER_H + (sMin - START_HOUR * 60) * PX_PER_MIN;
                            const height = (eMin - sMin) * PX_PER_MIN;

                            return (
                                <Link
                                    key={`${dayStr}-${i}`}
                                    to={`/activities/${evt.activityId}`}
                                    style={{ textDecoration: "none" }}
                                >
                                    <Card
                                        sx={{
                                            position: "absolute",
                                            top: top, height,
                                            left: "1px", right: "1px",
                                            backgroundColor: blue[50],
                                            overflow: "hidden",
                                            px: 1, py: 1
                                        }}
                                    >
                                        <Typography sx={{ fontSize: "11px" }}>
                                            {trimSeconds(evt.timeStart)} - {trimSeconds(evt.timeEnd)}
                                        </Typography>
                                        <Typography sx={{ fontSize: "12px" }}>
                                            {evt.activityTitle}
                                        </Typography>
                                    </Card>
                                </Link>
                            );
                        })}
                    </Box>
                );
            })}
        </Box>
    );
});

export default WeekCalendar;
