import { Box, Typography, Button, Chip, Paper, Grid2, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { useActivities } from "../../../lib/hooks/useActivities";
import StyledButton from "../../../app/shared/components/StyledButton";
import { useState } from "react";
import { useAccount } from "../../../lib/hooks/useAccount";
import DeleteComponent from "../../../app/shared/components/DeleteComponent";
import { useNavigate } from "react-router";

type Props = {
    activity: Activity
}

export default function ActivityDetailsHeader({ activity }: Props) {
    const { toggleActivity, deleteActivity } = useActivities(activity.id)
    const [open, setOpen] = useState(false);
    const { currentUser } = useAccount()
    const navigate = useNavigate()

    const delAct = () => deleteActivity.mutate()

    return (
        <>
            <Paper sx={{ mb: 2, p: 2 }}>
                <Grid2 container justifyContent='space-between' alignItems='center'>
                    <Grid2 container alignItems='center' spacing={2} direction='row'>
                        <Box>
                            <Typography variant="h4" sx={{ color: 'primary.main', fontWeight: 'bold' }}>
                                {activity.title}
                            </Typography>
                        </Box>
                        {activity.isCancelled && <Grid2>
                            <Chip
                                sx={{ fontWeight: 'bold', borderRadius: 1 }}
                                color="error"
                                label="CANCEL·LADA"
                            />
                        </Grid2>}
                    </Grid2>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        {currentUser?.role === "Admin" && (
                            <>
                                {!activity.isCancelled && !toggleActivity.isPending && <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() =>
                                        navigate(`/manage/${activity.id}`)
                                    }
                                >
                                    Edita el taller
                                </Button>}
                                <StyledButton
                                    variant='contained'
                                    color={activity.isCancelled ? 'success' : 'error'}
                                    onClick={(e) => {
                                        e.currentTarget.blur();
                                        if (activity.room === null || activity.isCancelled) toggleActivity.mutate()
                                        else setOpen(true)
                                    }}
                                    disabled={toggleActivity.isPending}
                                >
                                    {activity.isCancelled ? 'Activa el taller' : 'Cancel·la el taller'}
                                </StyledButton>
                                <DeleteComponent delActivity={delAct} />
                            </>
                        )}
                    </Box>
                </Grid2>
            </Paper>
            <Dialog onClose={() => setOpen(false)} open={open}>
                <DialogTitle>Estàs segura vols cancel·lar-la?</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Tens una sala reservada que s'eliminarà
                    </DialogContentText>
                </DialogContent>
                <DialogActions sx={{ pb: 2, px: 2 }}>
                    <Button variant="contained" onClick={() => setOpen(false)}>Torna enrere</Button>
                    <Button onClick={() => { setOpen(false); toggleActivity.mutate() }} color="error">Cancel·la l'activitat</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

