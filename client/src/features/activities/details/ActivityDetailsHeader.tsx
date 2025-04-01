import { Box, Typography, Button, Chip, Paper, Grid2 } from "@mui/material";
import { Link } from "react-router";
import { useActivities } from "../../../lib/hooks/useActivities";
import StyledButton from "../../../app/shared/components/StyledButton";

type Props = {
    activity: Activity
}

export default function ActivityDetailsHeader({ activity }: Props) {
    const { updateActivity } = useActivities(activity.id)
    const handleToggleCancel = () => {
        const updatedActivity = { ...activity, isCancelled: !activity.isCancelled }
        updateActivity.mutate(updatedActivity)
    };

    return (
        <Paper sx={{ mb: 2, p: 2 }}>
            <Grid2 container justifyContent='space-between' alignItems='center'>
                <Grid2 container alignItems='center' spacing={2} direction='row'>
                    <Box>
                        <Typography variant="h4" sx={{ color: 'primary.main', fontWeight: 'bold' }}>{activity.title}</Typography>
                        <Typography variant="subtitle2">
                            Creada per <Link to={`/profiles/${activity.creator.id}`} style={{ color: '#1976d2', fontWeight: 'bold'}}>
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
                            {!activity.isCancelled && !updateActivity.isPending && <Button
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
                                onClick={handleToggleCancel}
                                disabled={updateActivity.isPending}
                            >
                                {activity.isCancelled ? 'Activa l\'ctivitat' : 'Cancel·la l\'activitat'}
                            </StyledButton>

                        </>
                    )}
                </Box>
            </Grid2>
        </Paper>
    )
}

