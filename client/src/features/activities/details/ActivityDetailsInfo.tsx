import { CalendarToday, Info } from "@mui/icons-material";
import { Divider, Grid2, Paper, Typography } from "@mui/material";
import { formatDate } from "../../../lib/util/util";
import RoomIcon from '@mui/icons-material/Room';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';

type Props = {
    activity: Activity
}

export default function ActivityDetailsInfo({ activity }: Props) {
    return (
        <Paper sx={{ mb: 2 }}>

            <Grid2 container alignItems="center" pl={2} py={1}>
                <Grid2 size={0.75}>
                    <Info color="info" fontSize="large" />
                </Grid2>
                <Grid2 size={11}>
                    <Typography>{activity.description}</Typography>
                </Grid2>
            </Grid2>
            <Divider />
            <Grid2 container alignItems="center" pl={2} py={1}>
                <Grid2 size={0.75}>
                    <CalendarToday color="info" fontSize="large" />
                </Grid2>
                <Grid2 size={11}>
                    <Typography>{formatDate(activity.date)}</Typography>
                </Grid2>
            </Grid2>
            <Divider />
            <Grid2 container alignItems="center" pl={2} py={1}>
                <Grid2 size={0.75}>
                    <PeopleAltIcon color="info" fontSize="large" />
                </Grid2>
                <Grid2 size={5}>
                    <Typography>Capacitat màxima: {activity.maxParticipants}</Typography>
                </Grid2>
                <Divider orientation="vertical" flexItem />
                <Grid2 size={0.75} sx={{ ml: 2 }}>
                    <RoomIcon color="info" fontSize="large" />
                </Grid2>
                <Grid2 size={3}>
                    <Typography>Sala: {activity.room}</Typography>
                </Grid2>
            </Grid2>
        </Paper>
    )
}