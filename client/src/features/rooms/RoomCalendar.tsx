import dayjs from "dayjs";
import isToday from "dayjs/plugin/isToday";
import { useStore } from "../../lib/hooks/useStore";
import { observer } from "mobx-react-lite";
import { Box, Card, CardContent, Divider, Typography } from "@mui/material";
import { Link } from "react-router";
import { getMinutes, trimSeconds } from "../../lib/util/util";
import { blue } from "@mui/material/colors";
dayjs.extend(isToday);

const TIME_COL_WIDTH = 40;
const START_HOUR = 8;
const END_HOUR = 21;
const TOTAL_MINUTES = (END_HOUR - START_HOUR) * 60;
const CAL_HEIGHT = 365;
const PIXEL_PER_MIN = CAL_HEIGHT / TOTAL_MINUTES;

type Props = {
    room: Room;
}

const RoomCalendar = observer(function RoomCalendar({ room }: Props) {
    const { roomStore: { startDate } } = useStore();
    const events = room.recurrences.filter(r => r.date === startDate);

    return (
        <Box
            sx={{
                display: "grid",
                gridTemplateColumns: `${TIME_COL_WIDTH}px 1fr`,
                width: "100%",
                height: CAL_HEIGHT,
            }}
        >
            <Box
                sx={{
                    gridColumn: 1,
                    position: "relative",
                    borderRight: 1,
                    borderColor: "divider",
                }}
            >
                {Array.from({ length: END_HOUR - START_HOUR + 1 }, (_, i) => {
                    const hour = START_HOUR + i;
                    return (
                        <Typography
                            key={hour}
                            variant="caption"
                            sx={{
                                position: "absolute",
                                top: i * 60 * PIXEL_PER_MIN,
                                color: "text.secondary",
                            }}
                        >
                            {hour % 2 === 0 ? `${hour}:00` : ""}
                        </Typography>
                    );
                })}
            </Box>

            {/* Events column */}
            <Box
                sx={{
                    gridColumn: 2,
                    position: "relative",
                }}
            >
                {/* Horizontal grid lines */}
                {Array.from({ length: END_HOUR - START_HOUR + 1 }, (_, i) => (
                    <Divider
                        key={i}
                        sx={{
                            position: "absolute",
                            top: i * 60 * PIXEL_PER_MIN,
                            width: "100%",
                            opacity: 0.4,
                        }}
                    />
                ))}

                {/* Event cards */}
                {events.map((evt, idx) => {
                    const startMin = getMinutes(evt.timeStart);
                    const endMin = getMinutes(evt.timeEnd);
                    if (startMin < START_HOUR * 60 || endMin > END_HOUR * 60) return null;

                    const top = (startMin - START_HOUR * 60) * PIXEL_PER_MIN;
                    const height = (endMin - startMin) * PIXEL_PER_MIN;

                    return (
                        <Link
                            key={`${evt.date}-${idx}`}
                            to={`/activities/${evt.activityId}`}
                            style={{ textDecoration: "none" }}
                        >
                            <Card
                                sx={{
                                    position: "absolute",
                                    top, height,
                                    left: 4, right: 4,
                                    bgcolor: blue[50],
                                    borderRadius: 1,
                                    overflow: "hidden",
                                }}
                            >
                                <CardContent sx={{ py: 0.5, px: 1 }}>
                                    <Typography variant="caption" >
                                        {trimSeconds(evt.timeStart)} – {trimSeconds(evt.timeEnd)}
                                    </Typography>
                                    <Typography variant="body2">
                                        {evt.activityTitle}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Link>
                    );
                })}
            </Box>
        </Box>
    );
});

export default RoomCalendar;