import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton } from "@mui/material"
import { useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import { useAttendees } from "../../../lib/hooks/useAttendees";

type Props = {
    activity: Activity
    attendee: Attendee
    isWaiting: boolean
}

export default function DeleteAttendee({ activity, attendee }: Props) {
    const [open, setOpen] = useState(false);
    const { deleteAttendee } = useAttendees(activity.id, attendee.isWaiting, activity.date) //date evita que carregui info 

    const deleteAtt = () => {
        deleteAttendee.mutate(attendee);
        setOpen(false)
    }

    return (
        <>
            <IconButton onClick={() => setOpen(true)}>
                <DeleteIcon color="error" />
            </IconButton>
            <Dialog onClose={() => setOpen(false)} open={open}>
                <DialogTitle>Estàs segura d'eliminar el participant?</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Aquesta acció no es pot desfer.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" onClick={() => setOpen(false)}>Cancel·la</Button>
                    <Button onClick={deleteAtt}>El·limina</Button>
                </DialogActions>
            </Dialog>
        </>

    )
}