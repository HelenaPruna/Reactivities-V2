import { Card, CardMedia, Box, Typography, Button, Chip } from "@mui/material";
import { Link } from "react-router";
import { formatDate } from "../../../lib/util/util";
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
        <Card sx={{ position: 'relative', mb: 2, backgroundColor: 'transparent', overflow: 'hidden' }}>
            {activity.isCancelled && (
                <Chip
                    sx={{ position: 'absolute', left: 30, top: 20, zIndex: 1000, fontWeight: 'bold', borderRadius: 1 }}
                    color="error"
                    label="CANCEL·LADA"
                />
            )}
            {activity.isFull && !activity.isCancelled && (
                <Chip
                    sx={{ position: 'absolute', left: 30, top: 20, zIndex: 1000, fontWeight: 'bold', borderRadius: 1 }}
                    color="success"
                    label="COMPLETA"
                />
            )}
            <CardMedia
                component="img"
                height="300"
                image={`/images/categoryImages/drinks.jpg`}
                alt={`drinks image`}
            />
            <Box sx={{
                position: 'absolute',
                bottom: 0,
                width: '100%',
                color: 'white',
                padding: 2,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
                background: 'linear-gradient(to top, rgba(0, 0, 0, 1.0), transparent)',
                boxSizing: 'border-box',
            }}>
                {/* Text Section */}
                <Box>
                    <Typography variant="h4" sx={{ fontWeight: 'bold' }}>{activity.title}</Typography>
                    <Typography variant="subtitle1">{formatDate(activity.date)}</Typography>
                    <Typography variant="subtitle2">
                        Creada per <Link to={`/profiles/${activity.creator.id}`} style={{ color: 'white', fontWeight: 'bold' }}>
                            {activity.creator.displayName}
                        </Link>
                    </Typography>
                </Box>

                {/* Buttons aligned to the right */}
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
            </Box>
        </Card>
    )
}

