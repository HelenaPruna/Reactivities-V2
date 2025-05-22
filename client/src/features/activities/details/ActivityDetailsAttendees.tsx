import { useState } from "react";
import { Button, Chip, Dialog, DialogContent, DialogTitle, FormControl, Grid2, InputLabel, MenuItem, Paper, Select, SelectChangeEvent, Typography } from "@mui/material";
import AttendanceForm from "../attendances/AttendanceForm";
import AttendeesList from "../attendances/AttendeesList";
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import ChecklistRtlIcon from '@mui/icons-material/ChecklistRtl';
import dayjs from "dayjs";
import { useAccount } from "../../../lib/hooks/useAccount";
import AttendeeForm from "../attendances/AttendeeForm";

type Props = {
    activity: Activity
}

export default function ActivityDetailsAttendees({ activity }: Props) {
    const [checkAtt, setCheckAtt] = useState(false);
    const [addAtt, setAddAtt] = useState(false);
    const [numAtt, setNumAtt] = useState(activity.numberAttendees)
    const [recur, setRecur] = useState<{ value: string, name: string } | null>(null);
    const { currentUser } = useAccount()

    const today = new Date()
    const dateOptions: { text: Date, value: string }[] = activity.recurrences
        .filter(r => new Date(r.date) <= today)
        .map(r => ({ text: new Date(r.composedTime), value: r.id }))
        .sort((a, b) => a.text.getTime() - b.text.getTime());

    const hasOldRecur = dateOptions.length > 0
    const handleChange = (event: SelectChangeEvent) => {
        const tmpRecur = dateOptions.find(x => x.value === event.target.value)?.text
        const dateStr = dayjs(tmpRecur).format("DD-MM-YYYY[ (]HH:mm[)]")
        setRecur({ value: event.target.value, name: dateStr });
    }
    const setIsFull = (int: number) => {
        activity.isFull = activity.maxParticipants <= numAtt + int
        setNumAtt(numAtt => numAtt + int)
    }

    return (
        <Paper sx={{ mb: 8, height: '650px' }}>
            <Grid2 container alignItems="center" pl={3} py={2} pr={3.5} justifyContent='space-between'>
                <Grid2 container spacing={2} alignItems='center' pl={1}>
                    <PeopleAltIcon color="info" fontSize="large" />
                    <Typography variant="h5">ASSISTÈNCIA</Typography>
                    {activity.isFull && <Chip label='COMPLETA' color='success' sx={{ borderRadius: 2, fontWeight: 'bold' }} />}
                </Grid2>
                {(currentUser?.role === "Admin" || activity.isOrganizing) && activity.numberAttendees > 0 && hasOldRecur && (
                    <Button variant="contained" onClick={(e) => { e.currentTarget.blur(); setCheckAtt(true) }} endIcon={<ChecklistRtlIcon />}>
                        Passa llista
                    </Button>
                )}
            </Grid2>

            <Grid2 container pl={3} py={0.75} pr={3.5} sx={{ display: "block" }}>
                <AttendeesList activity={activity} setAddAtt={setAddAtt} setIsFull={setIsFull} />
            </Grid2>
            {checkAtt && <Dialog open={checkAtt} onClose={() => { setCheckAtt(false); setRecur(null); }} fullWidth maxWidth="md">
                <DialogTitle display='flex' color="secondary" alignItems='center' justifyContent='center' >PASSA LLISTA</DialogTitle>
                <DialogContent dividers>
                    {recur === null ?
                        <>
                            <Typography variant="h6">Sel·lecciona la data de l'activitat:</Typography>
                            <FormControl fullWidth size="small" sx={{ mb: 2, mt: 1 }}>
                                <InputLabel>Data</InputLabel>
                                <Select label="Data" onChange={handleChange}>
                                    {dateOptions.map(o => (
                                        <MenuItem key={o.value} value={o.value}>
                                            {dayjs(o.text).format("DD-MM-YYYY[ (]HH:mm[)]")}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </>
                        :
                        <>
                            <Typography variant="h6">ASSISTÈNCIA DEL DIA: {recur.name}</Typography>
                            <AttendanceForm activity={activity} recurId={recur.value} setCheckAtt={() => { setCheckAtt(false); setRecur(null); }} />
                        </>
                    }
                </DialogContent>
            </Dialog>}
            <AttendeeForm open={addAtt} onClose={() => setAddAtt(false)} activity={activity} setIsFull={setIsFull} />
        </Paper>
    )
}