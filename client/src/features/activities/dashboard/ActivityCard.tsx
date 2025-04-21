import { AccessTime, CalendarToday, People, Queue } from "@mui/icons-material";
import { Avatar, Box, Button, Card, CardActions, CardContent, CardHeader, Chip, Divider, Stack, Typography } from "@mui/material"
import { Link } from "react-router";
import { dateInformation, stringAvatar, timeInformation } from "../../../lib/util/util";

type Props = {
    activity: Activity;
}

export default function ActivityCard({ activity }: Props) {
    return (
        <Card sx={{ borderRadius: 3 }}>
            <Box display='flex' alignItems='center' justifyContent='space-between' >
                <CardHeader
                    avatar={<Avatar
                        sx={{ height: 50, width: 50, fontSize: 'larger', ...stringAvatar(activity.creator.displayName).sx }}
                        children={stringAvatar(activity.creator.displayName).children}
                    />
                    }
                    title={activity.title}
                    slotProps={{
                        title: {
                            fontWeight: 'bold', fontSize: 20, lineHeight: 1
                        }
                    }}
                    subheader={activity.isCreator && <>Ets la creadora</>}
                />
                <Box display='grid' flexDirection='column' gap={0.5} mr={2}>
                    {activity.isOrganizing &&
                        <Chip label={'Organitzes l\'activitat'}
                            color={'warning'} variant="outlined"
                            sx={{ borderRadius: 2, borderWidth: 2, display: 'grid' }}
                        />
                    }
                    {activity.isCancelled &&
                        <Chip label='CANCEL·LADA' color='error' sx={{ borderRadius: 2, fontWeight: 'bold' }} />
                    }
                    {activity.isFull && !activity.isCancelled &&
                        <Chip label='COMPLETA' color='success' sx={{ borderRadius: 2, fontWeight: 'bold' }} />
                    }
                </Box>
            </Box>
            <Divider />
            <CardContent sx={{ p: 0 }}>
                <Box bgcolor="grey.100" px={3} py={2}>
                    <Box display="flex" alignItems="center">
                        <CalendarToday fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                        <Typography variant="body2">{dateInformation(activity.dateStart, activity.isOneDay, activity.dateEnd)}</Typography>
                    </Box>
                    <Box display="flex" alignItems="center" mt={0.5}>
                        <AccessTime fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                        <Typography variant="body2">{timeInformation(activity.timeStart, activity.timeEnd, activity.dateStart, activity.isOneDay)}</Typography>
                    </Box>
                </Box>
            </CardContent>
            <CardContent sx={{ px: 3, py: 1 }}>
                <Stack direction="row" spacing={4} alignItems="center">
                    <Box display="flex" alignItems="center">
                        <People fontSize="small" sx={{ mr: 0.5, color: 'text.secondary' }} />
                        <Typography variant="body2">
                            {activity.numberAttendees} / {activity.maxParticipants}
                        </Typography>
                    </Box>
                    <Box display="flex" alignItems="center">
                        <Queue fontSize="small" sx={{ mr: 0.5, color: 'text.secondary' }} />
                        <Typography variant="body2">{activity.numberWaiting}</Typography>
                    </Box>
                </Stack>
            </CardContent>
            <CardActions sx={{ px: 3, pb: 2 }}>
                <Button
                    fullWidth
                    component={Link}
                    to={`/activities/${activity.id}`}
                    size="medium"
                    variant="outlined"
                    sx={{ borderRadius: 3 }}
                >
                    Visualitza
                </Button>
            </CardActions>
        </Card>
    )
}