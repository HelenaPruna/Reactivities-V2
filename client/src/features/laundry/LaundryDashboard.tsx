import { useEffect } from "react";
import { useStore } from "../../lib/hooks/useStore";
import { Grid2 } from "@mui/material";
import LaundryFilters from "./LaundryFilters";
import LaundryCalendar from "./LaundryCalendar";

export default function LaundryDashboard() {
    const { laundryStore : { resetDate } } = useStore()
    useEffect(() => {
        return () => resetDate();
    }, [resetDate]);

    return (
        <Grid2 pb={4}>
            <LaundryFilters />
            <LaundryCalendar />
        </Grid2>
    )
}