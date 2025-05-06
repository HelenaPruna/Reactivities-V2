import { useEffect } from "react";
import { useStore } from "../../lib/hooks/useStore"
import { Grid2, Paper } from "@mui/material";
import RequestFilters from "./RequestFilters";
import RequestList from "./RequestList";

export default function RequestDashboard() {
    const { requestStore: { resetFilters } } = useStore()

    useEffect(() => {
        return () => resetFilters();
    }, [resetFilters]);
    return (
        <Grid2 pb={4}>
            <RequestFilters />
            <Paper sx={{p:1, mt: 2}}>
                <RequestList />
            </Paper>
        </Grid2>
    )
}