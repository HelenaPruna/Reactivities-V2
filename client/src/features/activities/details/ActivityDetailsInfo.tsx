import { AccessTime, CalendarToday, Info, PeopleAlt, Event, Person, WarningAmber } from "@mui/icons-material";
import { Box, Divider, IconButton, Paper, Stack, Tooltip, Typography } from "@mui/material";
import { dateInformation, timeInformation } from "../../../lib/util/util";
import RoomIcon from '@mui/icons-material/Room';
import RoomBooking from "./RoomBooking";
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import { useState } from "react";
import { useAccount } from "../../../lib/hooks/useAccount";
import EventCalendar from "./ActivityDetailsCalendar";
import WarningTooltip from "../../../app/shared/components/WarningTooltip";


type Props = { activity: Activity };

export default function ActivityDetailsInfo({ activity }: Props) {
    const [open, setOpen] = useState(false);
    const { currentUser } = useAccount();

    return (
        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
            <Paper sx={{ flex: 1, p: 4 }}>
                <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <Stack direction="row" spacing={1} alignItems="flex-start">
                        <Info color="info" fontSize="large" />
                        <Typography>{activity.description}</Typography>
                    </Stack>
                    <Divider />
                    <Stack direction="row" spacing={1} alignItems="center">
                        <Person color="info" fontSize="large" />
                        <Typography variant="body2">
                            Creat per: {activity.creator.displayName}
                        </Typography>
                    </Stack>
                    <Divider />
                    <Stack direction="row" spacing={1} alignItems="center">
                        <CalendarToday color="info" fontSize="large" />
                        <Box>
                            <Typography variant="body2">
                                {dateInformation(activity.dateStart, activity.isOneDay, activity.dateEnd)}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                <AccessTime fontSize="inherit" sx={{ verticalAlign: 'middle', mr: 0.5 }} />
                                {timeInformation(
                                    activity.timeStart,
                                    activity.timeEnd,
                                    activity.dateStart,
                                    activity.isOneDay
                                )}
                            </Typography>
                        </Box>
                    </Stack>
                    <Divider />
                    <Stack direction="row" spacing={1} alignItems="center">
                        <PeopleAlt color="info" fontSize="large" />
                        <Typography variant="body2"  component="span">
                            {activity.numberAttendees} / {activity.maxParticipants} {activity.maxParticipants < activity.numberAttendees &&                                                                                         
                                <WarningTooltip title={'Hi ha més participants que places ofertes'} />}
                        </Typography>
                    </Stack>
                    <Divider />
                    <Stack direction="row" spacing={1} alignItems="center">
                        <WarningAmber color="warning" fontSize="large" />
                        <Typography variant="body2">
                            Màxim faltes permeses: {activity.allowedMissedDays}
                        </Typography>
                    </Stack>
                    <Divider />
                    <Stack direction="row" spacing={1} alignItems="center">
                        <RoomIcon color="info" fontSize="large" />
                        <Box display="flex" alignItems="center">
                            <Typography variant="body2" component="span">
                                {activity.room
                                    ? `Sala: ${activity.room.name}, planta ${activity.room.numberFloor}`
                                    : "No hi ha cap sala assignada"}
                            </Typography>
                            {currentUser?.role === "Admin" && (
                                <Tooltip title={activity.room ? "Canvia la sala per a totes les activitats del taller (recurrents)" : "Assigna"}>
                                    <IconButton size="small" onClick={() => setOpen(true)}>
                                        {activity.room ? <EditIcon fontSize="small" /> : <AddIcon fontSize="small" />}
                                    </IconButton>
                                </Tooltip>

                            )}
                        </Box>
                    </Stack>
                </Box>
            </Paper>
            <Paper sx={{ width: 400, p: 3 }}>
                <Typography variant="h6"
                    sx={{ display: 'flex', alignItems: 'center', mb: 1, color: 'primary.main' }}>
                    <Event sx={{ mr: 1 }} />
                    Calendari d'activitats
                </Typography>
                <EventCalendar activity={activity} />
            </Paper>
            {open && (
                <RoomBooking activityId={activity.id} setOpen={setOpen} recurId={undefined} />
            )}
        </Box>
    );
}
