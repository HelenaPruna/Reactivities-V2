import { Box, Paper, Typography, Divider, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Card, CardHeader, Tooltip } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useStore } from "../../lib/hooks/useStore";
import { useLaundry } from "../../lib/hooks/useLaundry";
import dayjs from "dayjs";
import { getDate, getMinutes } from "../../lib/util/util";
import { useState } from "react";
import { blue } from "@mui/material/colors";
import { useAccount } from "../../lib/hooks/useAccount";
import LaundryForm from "./LaundryForm";
import { Delete, Edit } from "@mui/icons-material";

const TIME_COL_WIDTH = 60;
const DAY_COUNT = 5;
const HEADER_HEIGHT = 40;
const START_HOUR = 8;
const END_HOUR = 19;
const SLOT_MINUTES = (END_HOUR - START_HOUR) * 60;
const CAL_HEIGHT = 600;
const PIXEL_PER_MIN = (CAL_HEIGHT - HEADER_HEIGHT) / SLOT_MINUTES;

const LaundryCalendar = observer(function LaundryCalendar() {
    const { laundryStore: { startDate } } = useStore();
    const { bookings, loadingBookings, deleteBooking } = useLaundry();
    const [toDeleteId, setToDeleteId] = useState<string | null>(null);
    const [toEditBooking, setOpenEdit] = useState<LaundryBooking | null>(null);
    const open = Boolean(toDeleteId);
    const openEdit = Boolean(toEditBooking);
    const { currentUser } = useAccount()

    const days = Array.from({ length: DAY_COUNT }, (_, i) =>
        dayjs(startDate).add(i, "day")
    );

    return (
        <>
            <Paper elevation={3} sx={{ p: 2, borderRadius: 2, overflow: "hidden", mt: 2 }} >
                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: `${TIME_COL_WIDTH}px repeat(${DAY_COUNT}, 1fr)`,
                        gridTemplateRows: `${HEADER_HEIGHT}px ${CAL_HEIGHT}px`,
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
                            <Typography variant="h6">
                                {day.locale("ca").format("dddd D")}
                            </Typography>
                        </Box>
                    ))}
                    <Box sx={{ gridColumn: 1, gridRow: 2, position: "relative" }} >
                        {Array.from({ length: END_HOUR - START_HOUR + 1 }, (_, i) => {
                            const hour = START_HOUR + i;
                            return (
                                <Typography
                                    key={hour}
                                    variant="subtitle1"
                                    sx={{
                                        position: "absolute",
                                        top: HEADER_HEIGHT + i * 60 * PIXEL_PER_MIN,
                                        left: 4,
                                        color: "text.secondary",
                                    }}
                                >
                                    {hour % 2 === 0 ? `${hour}:00` : ""}
                                </Typography>
                            );
                        })}
                    </Box>
                    {days.map((day, colIdx) => {
                        const dayStr = day.format("YYYY-MM-DD");
                        const dayBookings = !loadingBookings && bookings
                            ? bookings.filter(b => getDate(b.start) === dayStr)
                            : [];

                        return (
                            <Box
                                key={dayStr}
                                sx={{
                                    gridColumn: colIdx + 2,
                                    gridRow: 2,
                                    borderLeft: 1,
                                    borderColor: "divider",
                                    position: "relative",
                                }}
                            >
                                {Array.from({ length: END_HOUR - START_HOUR + 1 }, (_, i) => (
                                    <Divider
                                        key={i}
                                        sx={{
                                            position: "absolute",
                                            top: HEADER_HEIGHT + i * 60 * PIXEL_PER_MIN,
                                            width: "100%",
                                            opacity: 0.3,
                                        }}
                                    />
                                ))}

                                {dayBookings.map(booking => {
                                    const startStr = getDate(booking.start, "HH:mm");
                                    const endStr = getDate(booking.end, "HH:mm");
                                    const startMin = getMinutes(startStr);
                                    const endMin = getMinutes(endStr);

                                    if (startMin < START_HOUR * 60 || endMin > END_HOUR * 60) return null;

                                    const topPos = HEADER_HEIGHT + (startMin - START_HOUR * 60) * PIXEL_PER_MIN;
                                    const height = (endMin - startMin) * PIXEL_PER_MIN;

                                    return (
                                        <Card key={booking.id}
                                            style={{
                                                position: "absolute",
                                                top: topPos,
                                                left: "3px",
                                                right: "3px",
                                                height,
                                                backgroundColor: blue[100],
                                                borderRadius: "4px",
                                                overflow: "hidden",
                                                paddingLeft: 5,
                                                paddingTop: 2
                                            }}
                                        >
                                            <CardHeader
                                                title={`${startStr} - ${endStr}`}
                                                slotProps={{ title: { fontSize: 16 } }}
                                                sx={{ padding: 1.5 }}
                                                subheader={booking.name}
                                                action={currentUser?.role === 'Admin' &&
                                                    <>
                                                        <Tooltip title="Edita la reserva">
                                                            <IconButton onClick={(e) => { e.currentTarget.blur(); setOpenEdit(booking) }}>
                                                                <Edit />
                                                            </IconButton>
                                                        </Tooltip>
                                                        <Tooltip title="Elimina la reserva">
                                                            <IconButton onClick={(e) => { e.currentTarget.blur(); setToDeleteId(booking.id) }}>
                                                                <Delete color="error" />
                                                            </IconButton>
                                                        </Tooltip>
                                                    </>
                                                }
                                            />
                                        </Card>
                                    );
                                })}
                            </Box>
                        );
                    })}
                </Box>
            </Paper>
            <Dialog open={open} onClose={() => setToDeleteId(null)}>
                <DialogTitle>Eliminar reserva?</DialogTitle>
                <DialogContent>
                    <DialogContentText>Aquesta acció no es pot desfer. Segur que vols continuar?</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setToDeleteId(null)}>Cancel·la</Button>
                    <Button
                        color="error"
                        variant="contained"
                        onClick={() => {
                            if (toDeleteId) deleteBooking.mutate(toDeleteId);
                            setToDeleteId(null);
                        }}
                    >
                        El·limina
                    </Button>
                </DialogActions>
            </Dialog>
            {toEditBooking && <LaundryForm open={openEdit} onClose={() => setOpenEdit(null)} laundryBooking={toEditBooking} />}
        </>
    );
});

export default LaundryCalendar;
