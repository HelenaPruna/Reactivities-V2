import { AccessTime } from "@mui/icons-material";
import { Avatar, Box, Button, Card, CardContent, CardHeader, Chip, Divider, Typography } from "@mui/material"
import { Link } from "react-router";
import { formatDateOnly, stringAvatar } from "../../../lib/util/util";

type Props = {
    activity: Activity;
}

export default function ActivityCard({ activity }: Props) {
    return (
        <Card sx={{ borderRadius: 3 }}>
            <Box display='flex' alignItems='center' justifyContent='space-between'>
                <CardHeader
                    avatar={<Avatar
                        sx={{ height: 60, width: 60, ...stringAvatar(activity.creator.displayName).sx }}
                        children={stringAvatar(activity.creator.displayName).children}
                    />
                    }
                    title={activity.title}
                    slotProps={{ title: { fontWeight: 'bold', fontSize: 20 } }}
                    subheader={activity.isCreator &&<>Ets la creadora</>}
                />
                <Box display='flex' flexDirection='column' gap={0.5} mr={2}>
                    {activity.isOrganizing &&
                        <Chip label={'Organitzes l\'activitat'}
                            color={'warning'} variant="outlined"
                            sx={{ borderRadius: 2, borderWidth: 2, fontWeight: 'bold' }}
                        />
                    }
                    {activity.isCancelled &&
                        <Chip label='CANCEL·LADA' color='error' sx={{ borderRadius: 2, fontWeight: 'bold' }} />
                    }
                    {activity.isFull &&
                        <Chip label='COMPLETA' color='success' sx={{ borderRadius: 2, fontWeight: 'bold' }} />
                    }
                </Box>
            </Box>
            <Divider sx={{ mb: 3 }} />

            <CardContent sx={{ p: 0 }}>
                <Box display='flex' alignItems='center' mb={2} px={2} sx={{ backgroundColor: 'grey.200', py: 3, pl: 3 }}>
                    <AccessTime sx={{ mr: 1 }} />
                    <Typography variant="body2" noWrap>{formatDateOnly(activity.dateStart)}</Typography>
                </Box>

            </CardContent>
            <CardContent sx={{ pb: 2 }}>
                <Typography variant="body1" sx={{ml: 1}}>Participants: {activity.numberAttendees} / {activity.maxParticipants} </Typography>
                <Typography variant="body1"sx={{ml: 1, mt: 0.5}}>Llista d'espera: {activity.numberWaiting}</Typography>
                
                <Button
                    component={Link}
                    to={`/activities/${activity.id}`}
                    size="medium" variant="contained"
                    sx={{ display: 'flex', borderRadius: 3, mt: 1 }}
                >
                    Visualitza
                </Button>
            </CardContent>
        </Card>
    )
}