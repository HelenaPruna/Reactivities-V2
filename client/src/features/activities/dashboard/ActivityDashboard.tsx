import { Grid2 } from "@mui/material";
import ActivityList from "./ActivityList";
import ActivityFilters from "./ActivityFilters";
import { useStore } from "../../../lib/hooks/useStore";
import { useEffect } from "react";

export default function ActivityDashboard() {
    const { activityStore: { resetFilters } } = useStore();
    
    useEffect(() => {
        return () => resetFilters();
    }, [resetFilters]);
    
    return (
        <Grid2 container spacing={3}>
            <Grid2 size={9} pb={4}>
                <ActivityList />
            </Grid2>
            <Grid2 size={3} sx={{ position: 'sticky', top: 112, alignSelf: 'flex-start' }}>
                <ActivityFilters />
            </Grid2>
        </Grid2>
    )
}