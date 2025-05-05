import { useState } from "react";
import { Box, Button, Chip, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, Grid2, InputLabel, MenuItem, Paper, Select, SelectChangeEvent, Typography } from "@mui/material";
import AttendanceForm from "../attendance/AttendanceForm";
import AttendeesList from "../attendance/AttendeesList";
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import ChecklistRtlIcon from '@mui/icons-material/ChecklistRtl';
import dayjs from "dayjs";
import { useAccount } from "../../../lib/hooks/useAccount";
import { useAttendees } from "../../../lib/hooks/useAttendees";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import CheckBoxInput from "../../../app/shared/components/CheckBoxInput";
import TextInput from "../../../app/shared/components/TextInput";
import { AttendeeSchema, attendeeSchema } from "../../../lib/schemas/attendeeSchema";

type Props = {
    activity: Activity
}

export default function ActivityDetailsAttendees({ activity }: Props) {
    const [checkAtt, setCheckAtt] = useState(false);
    const [addAtt, setAddAtt] = useState(false);
    const [numAtt, setNumAtt] = useState(activity.numberAttendees)
    const [recurId, setRecurId] = useState<string | null>(null);
    const { currentUser } = useAccount()
    const { addAttendee } = useAttendees(activity.id)

    const dateOptions: { text: Date, value: string }[] = activity.recurrences
        .map(r => ({ text: new Date(r.composedTime), value: r.id }))
        .sort((a, b) => a.text.getTime() - b.text.getTime());

    const handleChange = (event: SelectChangeEvent) => setRecurId(event.target.value);
    const setIsFull = (int: number) => {
        activity.isFull = activity.maxParticipants <= numAtt + int
        reset({ isWaiting: activity.maxParticipants <= activity.numberAttendees + int })
        setNumAtt(numAtt => numAtt + int)
    }

    const { control, handleSubmit, reset } = useForm<AttendeeSchema>({
        mode: 'onTouched',
        resolver: zodResolver(attendeeSchema),
        defaultValues: { isWaiting: activity.maxParticipants <= activity.numberAttendees }
    });

    const onSubmit = (data: AttendeeSchema) => {
        addAttendee.mutate(data, {
            onSettled: () => {
                setAddAtt(false)
                setIsFull(1)
            }
        })
    }

    return (
        <Paper sx={{ mb: 8, height: '650px' }}>
            <Grid2 container alignItems="center" pl={3} py={2} pr={3.5} justifyContent='space-between'>
                <Grid2 container spacing={2} alignItems='center' pl={1}>
                    <PeopleAltIcon color="info" fontSize="large" />
                    <Typography variant="h5">ASSISTÈNCIA</Typography>
                    {activity.isFull && <Chip label='COMPLETA' color='success' sx={{ borderRadius: 2, fontWeight: 'bold' }} />}
                </Grid2>
                {(currentUser?.role === "Admin" || activity.isOrganizing) && numAtt > 0 && (
                    <Button variant="contained" onClick={(e) => { e.currentTarget.blur(); setCheckAtt(true) }} disabled={addAttendee.isPending} endIcon={<ChecklistRtlIcon />}>
                        Passa llista
                    </Button>
                )}
            </Grid2>

            <Grid2 container pl={3} py={0.75} pr={3.5} sx={{ display: "block" }}>
                <AttendeesList activity={activity} setAddAtt={setAddAtt} setIsFull={setIsFull} />
            </Grid2>
            <Dialog open={checkAtt} onClose={() => setCheckAtt(false)} fullWidth maxWidth="md">
                <DialogTitle display='flex' color="secondary" alignItems='center' justifyContent='center' >PASSA LLISTA</DialogTitle>
                <DialogContent dividers>
                    <Typography variant="h6">Sel·lecciona la data de l'activitat:</Typography>
                    <FormControl fullWidth size="small" sx={{ mb: 2, mt: 1 }}>
                        <InputLabel>Data</InputLabel>
                        <Select value={recurId ?? ''} label="Data" onChange={handleChange}>
                            {dateOptions.map(o => (
                                <MenuItem key={o.value} value={o.value}>
                                    {dayjs(o.text).format("DD-MM-YYYY[ (]HH:mm[)]")}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    {recurId && <AttendanceForm activity={activity} recurId={recurId} setCheckAtt={setCheckAtt} />}
                </DialogContent>
            </Dialog>

            <Dialog open={addAtt} onClose={() => setAddAtt(false)} fullWidth maxWidth="sm">
                <DialogTitle>Afegeix participant</DialogTitle>
                <DialogContent dividers>
                    <Box component="form" onSubmit={handleSubmit(onSubmit)} display='flex' flexDirection='column' gap={3} sx={{ mt: 1 }}>
                        <TextInput required label='Nom identificatiu' control={control} name='identifier' />
                        <TextInput label='Comentaris' control={control} name='comments' multiline rows={3} />
                        <CheckBoxInput label="Llista d'espera" control={control} name='isWaiting' />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => { setAddAtt(false); reset(); }} color="error">Cancel·la</Button>
                    <Button onClick={handleSubmit(onSubmit)} variant="contained" color="success">Crea</Button>
                </DialogActions>
            </Dialog>
        </Paper>
    )
}