import { Box, Typography, Button, Chip, Paper, Grid2, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { Link } from "react-router";
import { useActivities } from "../../../lib/hooks/useActivities";
import StyledButton from "../../../app/shared/components/StyledButton";
import { useState } from "react";

type Props = {
    activity: Activity
}

export default function ActivityDetailsHeader({ activity }: Props) {
    const { toggleActivity } = useActivities(activity.id)
    const [open, setOpen] = useState(false);

    const cancelToggle = () => {
        if (activity.room === null || activity.isCancelled) toggleActivity.mutate()
        else setOpen(true)
    }

    return (
        <>
            <Paper sx={{ mb: 2, p: 2 }}>
                <Grid2 container justifyContent='space-between' alignItems='center'>
                    <Grid2 container alignItems='center' spacing={2} direction='row'>
                        <Box>
                            <Typography variant="h4" sx={{ color: 'primary.main', fontWeight: 'bold' }}>{activity.title}</Typography>
                            <Typography variant="subtitle2">
                                Creada per <Link to={`/profiles/${activity.creator.id}`} style={{ color: '#1976d2', fontWeight: 'bold' }}>
                                    {activity.creator.displayName}
                                </Link>
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
                        {activity.isCreator && (
                            <>
                                {!activity.isCancelled && !toggleActivity.isPending && <Button
                                    variant="contained"
                                    color="primary"
                                    component={Link}
                                    to={`/manage/${activity.id}`}
                                >
                                    Edita l'activitat
                                </Button>}
                                <StyledButton
                                    variant='contained'
                                    color={activity.isCancelled ? 'success' : 'error'}
                                    onClick={cancelToggle}
                                    disabled={toggleActivity.isPending}
                                >
                                    {activity.isCancelled ? 'Activa l\'ctivitat' : 'Cancel·la l\'activitat'}
                                </StyledButton>

                            </>
                        )}
                    </Box>
                </Grid2>
            </Paper>
            <Dialog onClose={() => setOpen(false)} open={open}>
                <DialogTitle>Estàs segura vols cancel·lar?</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Tens una sala reservada que s'eliminarà
                    </DialogContentText>
                </DialogContent>
                <DialogActions sx={{pb: 2, px: 2}}>
                    <Button variant="contained" onClick={() => setOpen(false)}>Torna enrere</Button>
                    <Button onClick={() => { setOpen(false); toggleActivity.mutate() }} color="error">Cancel·la l'activitat</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

