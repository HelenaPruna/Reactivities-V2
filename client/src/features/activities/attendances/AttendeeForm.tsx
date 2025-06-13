import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogTitle, DialogContent, Box, DialogActions, Button } from "@mui/material";
import { useForm } from "react-hook-form";
import CheckBoxInput from "../../../app/shared/components/CheckBoxInput";
import TextInput from "../../../app/shared/components/TextInput";
import { useAccount } from "../../../lib/hooks/useAccount";
import { useAttendees } from "../../../lib/hooks/useAttendees";
import { AttendeeSchema, attendeeSchema } from "../../../lib/schemas/attendeeSchema";

type Props = {
    open: boolean
    onClose: () => void
    activity: Activity
    attendee?: Attendee
    setIsFull?: (integer: number) => void
}

export default function AttendeeForm({ open, onClose, activity, attendee, setIsFull }: Props) {
    const { addAttendee, editAttendee } = useAttendees(activity.id)
    const { currentUser } = useAccount()

    const { control, handleSubmit, reset } = useForm<AttendeeSchema>({
        mode: 'onTouched',
        resolver: zodResolver(attendeeSchema),
        defaultValues: attendee ||  { isWaiting: currentUser?.role === "Admin" ? activity.maxParticipants <= activity.numberAttendees : true }
    });

    const onSubmit = (data: AttendeeSchema) => {
        if (attendee) {
            const editData = { ...data, id: attendee.id }
            editAttendee.mutate(editData)
        }
        else {
            addAttendee.mutate(data)
            if (setIsFull && currentUser?.role === "Admin") setIsFull(1)
        }
        reset()
        onClose()
    }
    return (
        <Dialog open={open} onClose={() => { onClose();  reset()}} fullWidth maxWidth="sm">
            <DialogTitle>Afegeix participant</DialogTitle>
            <DialogContent dividers>
                <Box component="form" onSubmit={handleSubmit(onSubmit)} display='flex' flexDirection='column' gap={2} sx={{ mt: 1 }}>
                    <TextInput required label='Nom identificatiu' control={control} name='identifier' />
                    <TextInput label='Comentaris' control={control} name='comments' multiline rows={3} />
                    {currentUser?.role === "Admin" && !attendee && <CheckBoxInput label="Llista d'espera" control={control} name='isWaiting' />}
                </Box>
            </DialogContent>
            <DialogActions sx={{pb: 2, px: 2, gap: 1 }}>
                <Button onClick={() => { onClose(); reset(); }} color="inherit" >Cancel·la</Button>
                <Button onClick={handleSubmit(onSubmit)} variant="contained" >{attendee ? "Edita": "Crea"}</Button>
            </DialogActions>
        </Dialog>
    )
}