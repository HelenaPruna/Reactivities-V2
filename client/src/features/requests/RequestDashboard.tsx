import { useEffect } from "react";
import { useStore } from "../../lib/hooks/useStore"
import { Grid2 } from "@mui/material";
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
            <RequestList />
        </Grid2>
    )
}