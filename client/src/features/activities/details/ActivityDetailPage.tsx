import { Grid2 } from "@mui/material"
import { Navigate, useParams } from "react-router";
import { useActivities } from "../../../lib/hooks/useActivities";
import ActivityDetailsHeader from "./ActivityDetailsHeader";
import ActivityDetailsInfo from "./ActivityDetailsInfo";
import ActivityDetailsSidebar from "./ActivityDetailsSidebar";
import ActivityDetailsAttendees from "./ActivityDetailsAttendees";
import ActivityDetailSkeleton from "../../../app/shared/skeletons/ActivityDetailSkeleton";

export default function ActivityDetailPage() {
    const { id } = useParams();

    const { activity, isLoadingActivity } = useActivities(id);
    if (isLoadingActivity) return <ActivityDetailSkeleton />
    if (!activity) return <Navigate to='/not-found' />
    else return (
        <Grid2 container spacing={3}>
            <Grid2 size={8.5}>
                <ActivityDetailsHeader activity={activity} />
                <ActivityDetailsInfo activity={activity} />
                <ActivityDetailsAttendees activity={activity} />
            </Grid2>
            <Grid2 size={3.5}>
                <ActivityDetailsSidebar activity={activity} />
            </Grid2>
        </Grid2>
    )
}