import { AccessTime, CalendarToday, Info, PeopleAlt } from "@mui/icons-material";
import { Box, Divider, IconButton, Paper, Stack, Typography } from "@mui/material";
import { dateInformation, timeInformation } from "../../../lib/util/util";
import RoomIcon from '@mui/icons-material/Room';
import RoomBooking from "./RoomBooking";
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import { useState } from "react";

type Props = {
    activity: Activity
}

export default function ActivityDetailsInfo({ activity }: Props) {
    const [open, setOpen] = useState(false);
    return (
        <Paper sx={{ p: 2, mb: 2 }}>
            <Stack spacing={2}>
                <Stack direction="row" spacing={1} alignItems="flex-start">
                    <Info color="info" fontSize="large" />
                    <Typography>{activity.description}</Typography>
                </Stack>
                <Divider />
                <Stack direction="row" spacing={1} alignItems="center">
                    <CalendarToday color="info" fontSize="large" />
                    <Box>
                        <Typography variant="body2">{dateInformation(activity.dateStart, activity.isOneDay, activity.dateEnd)}</Typography>
                        <Typography variant="body2" color="text.secondary">
                            <AccessTime fontSize="inherit" sx={{ verticalAlign: 'middle', mr: 0.5 }} />
                            {timeInformation(activity.timeStart, activity.timeEnd, activity.dateStart, activity.isOneDay)}
                        </Typography>
                    </Box>
                </Stack>
                <Divider />
                <Stack direction="row" spacing={4} alignItems="center">
                    <Stack direction="row" spacing={1} alignItems="center">
                        <PeopleAlt color="info" fontSize="large" />
                        <Typography variant="body2">
                            {activity.numberAttendees} / {activity.maxParticipants}
                        </Typography>
                    </Stack>
                    <Divider orientation="vertical" flexItem />
                    <Stack direction="row" spacing={1} alignItems="center">
                        <RoomIcon color="info" fontSize="large" />
                        <Box display="flex" alignItems="center">
                            <Typography variant="body2" component="span">
                                {activity.room
                                    ? `Sala: ${activity.room.name}, planta ${activity.room.numberFloor}`
                                    : "No hi ha cap sala assignada"}
                            </Typography>
                            {activity.isCreator && (
                                <IconButton size="small" onClick={() => setOpen(true)}>
                                    {activity.room ? <EditIcon fontSize="small" /> : <AddIcon fontSize="small" />}
                                </IconButton>
                            )}
                        </Box>
                    </Stack>
                </Stack>
                {open && <RoomBooking activityId={activity.id} setOpen={setOpen} recurId={undefined} />}
            </Stack>
        </Paper>
    )
}