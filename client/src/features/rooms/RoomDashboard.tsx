import { Grid2 } from "@mui/material";
import RoomFilters from "./RoomFilters";
import RoomList from "./RoomList";
import { useEffect } from "react";
import { useStore } from "../../lib/hooks/useStore";

export default function RoomDashboard() {
    const { roomStore: { resetDates } } = useStore()
    useEffect(() => {
        return () => resetDates();
    }, [resetDates]);

    return (
        <Grid2 pb={4}>
            <RoomFilters />
            <RoomList />
        </Grid2>
    )
}