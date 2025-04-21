import { Box, Card, CardContent, CardHeader, Typography } from "@mui/material";
import { useRooms } from "../../lib/hooks/useRooms";
import { useStore } from "../../lib/hooks/useStore";
import { observer } from "mobx-react-lite";
import RoomCalendar from "./RoomCalendar";
import WeekCalendar from "./WeekCalendar";

const RoomList = observer(function RoomList() {
    const { roomsList, loadingRooms } = useRooms()
    const { roomStore: { viewType } } = useStore()

    const gridTemplateColumns = viewType[0] === "Dia" ? "repeat(5, 1fr)" : "repeat(3, 1fr)"

    if (loadingRooms) return <Typography>Loading...</Typography>
    if (!roomsList) return <Typography>...</Typography>

    return (
        <Box sx={{ display: "grid", flexDirection: 'column', gap: 3, gridTemplateColumns: gridTemplateColumns, mt: 2 }}>
            {roomsList.map((room) => (
                <Card key={room.id} sx={{ borderRadius: 3 }}>
                    <CardHeader title={room.name} subheader={`Planta: ${room.numberFloor}`} />
                    <CardContent sx={{ paddingTop: 0 }}>
                        {viewType[0] === "Dia" ? <RoomCalendar room={room} /> : <WeekCalendar room={room} />}
                        <Typography mt={1} sx={{ fontSize: 14 }}>
                            Capacitat màxima: {room.capacity}
                        </Typography>
                    </CardContent>
                </Card>
            ))}
        </Box>
    )
})
export default RoomList;