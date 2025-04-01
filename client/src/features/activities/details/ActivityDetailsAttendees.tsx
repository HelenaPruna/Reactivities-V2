import { useState } from "react";
import { Button, Chip, FormControl, Grid2, InputLabel, MenuItem, Paper, Select, SelectChangeEvent, Typography } from "@mui/material";
import AttendanceForm from "../Attendance/AttendanceForm";
import AttendeesList from "../Attendance/AttendeesList";
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import ChecklistRtlIcon from '@mui/icons-material/ChecklistRtl';
import dayjs from "dayjs";

type Props = {
    activity: Activity
}

export default function ActivityDetailsAttendees({ activity }: Props) {
    const [checkAtt, setCheckAtt] = useState(false);
    const [addAtt, setAddAtt] = useState(false);
    const [full, setFull] = useState(activity.isFull);
    const [recurId, setRecurId] = useState<string | null>(null);

    const dateOptions: { text: Date, value: string }[] = activity.recurrences.map(r =>
        ({ text: r.composedTime, value: r.id }))

    const handleChange = (event: SelectChangeEvent) => setRecurId(event.target.value);
    const addingAtt = (bool: boolean) => setAddAtt(bool)
    const setIsFull = (int: number) => setFull(activity.maxParticipants <= activity.numberAttendees + int)


    return (
        <Paper sx={{ mb: 2 }}>
            <Grid2 container alignItems="center" pl={3} py={2} pr={3.5} justifyContent='space-between'>
                <Grid2 container spacing={2} alignItems='center' direction='row'>
                    <PeopleAltIcon color="info" fontSize="large" />
                    <Typography variant="h4">ASSISTÈNCIA</Typography>
                    {full && <Chip label='COMPLETA' color='success' sx={{ borderRadius: 2, fontWeight: 'bold' }} />}
                </Grid2>
                {!addAtt && activity.numberAttendees > 0 &&
                    (!checkAtt
                        ?
                        <Grid2>
                            <Button variant="contained" onClick={() => setCheckAtt(true)}
                                endIcon={<ChecklistRtlIcon />}>Passa llista</Button>
                        </Grid2>
                        : (<Grid2 size={2.5}>
                            <FormControl fullWidth>
                                <InputLabel>Data</InputLabel>
                                <Select value={recurId ?? ''} label="Data" onChange={handleChange}>
                                    {dateOptions.map(recur => (
                                        <MenuItem key={recur.value} value={recur.value}>
                                            {dayjs(recur.text).format("HH:mm[,] DD-MM-YYYY")}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid2>
                        ))
                }
            </Grid2>
            <Grid2 container alignItems="center" pl={3} py={0.75} pr={3.5} sx={{ display: "block" }}>
                {checkAtt && recurId
                    ? <AttendanceForm activity={activity} recurId={recurId} setCheckAtt={setCheckAtt} />
                    : !checkAtt && <AttendeesList activity={activity} addingAtt={addingAtt} setIsFull={setIsFull} />
                }
            </Grid2>
        </Paper>
    )
}