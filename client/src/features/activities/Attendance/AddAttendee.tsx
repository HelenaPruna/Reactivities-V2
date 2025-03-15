import { useForm } from "react-hook-form";
import { attendeeSchema, AttendeeSchema } from "../../../lib/schemas/attendeeSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Grid2, Typography } from "@mui/material";
import TextInput from "../../../app/shared/components/TextInput";
import { SetStateAction } from "react";
import { useAttendees } from "../../../lib/hooks/useAttendees";

type Props = {
    activity: Activity
    setAddAtt: (value: SetStateAction<boolean>) => void
}

export default function AddAttendee({ activity, setAddAtt }: Props) {
    const { addAttendee } = useAttendees(activity.id, false , activity.date)

    const { control, handleSubmit } = useForm<AttendeeSchema>({
        mode: 'onTouched',
        resolver: zodResolver(attendeeSchema)
    });

    const onSubmit = (data: AttendeeSchema) => {
        if (activity.isFull) activity.numberWaiting += 1
        else activity.numberAttendees += 1
        activity.isFull = activity.maxParticipants <= activity.numberAttendees
        addAttendee.mutate(data)
        setAddAtt(false)
    }

    return (
        <Grid2 container alignItems="center" pl={2} paddingBottom={3} pr={2}>
            <Grid2 size={6.5}>
                <Typography variant="h5" gutterBottom color="primary">
                    Afegeix participant
                </Typography>
            </Grid2>
            <Grid2 component='form' onSubmit={handleSubmit(onSubmit)} display='flex' flexDirection='column' gap={3} size={12}>
                <Grid2 display='flex' size={12} gap={2}>
                    <Grid2 size={4}>
                        <TextInput required label='Nom identificatiu' control={control} name='identifier' />
                    </Grid2>
                    <TextInput label='Comentaris' control={control} name='comments' />
                </Grid2>
                <Box display='flex' justifyContent='end' gap={2}>
                    <Button onClick={() => setAddAtt(false)} variant="outlined" color="error">Cancel·la</Button>
                    <Button type="submit" color="success" variant="contained">Crea</Button>
                </Box>
            </Grid2>

        </Grid2>

    )
}