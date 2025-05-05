import { Divider, List, ListItem, ListItemAvatar, ListItemText, Avatar, Paper, Typography, Grid2 } from "@mui/material";
import EventIcon from "@mui/icons-material/Event";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ActionsOneTime from "./ActionsOneTime";
import { formatDateOnly } from "../../../lib/util/util";
import { useAccount } from "../../../lib/hooks/useAccount";

type Props = {
    activityId: string
    oneTimeRecur: Recurrence[]
    deleteRecur: (id: string) => void
}

export default function ActivityDetailsRecur({ activityId, oneTimeRecur, deleteRecur }: Props) {
    const { currentUser } = useAccount()

    return (
        <Paper><List>
            {oneTimeRecur.map((recur, index) => (
                <Grid2 key={recur.id}>
                    <Grid2 container justifyContent='space-between' alignItems='center' pl={1} pr={3}>
                        <ListItem secondaryAction={ currentUser?.role === 'Admin' &&
                            <ActionsOneTime
                                deleteEvent={() => deleteRecur(recur.id)}
                                activityId={activityId}
                                recurId={recur.id}
                            />
                        }>
                            <ListItemAvatar><Avatar><EventIcon /></Avatar></ListItemAvatar>
                            <ListItemText
                                primary={
                                    <Typography variant="subtitle1">
                                        {formatDateOnly(recur.date, "withWeekday")}
                                    </Typography>
                                }
                                secondary={
                                    <>
                                        <Typography component="span" variant="body2" sx={{ display: 'flex', alignItems: 'center' }}>
                                            <AccessTimeIcon fontSize="small" sx={{ mr: 0.5 }} />
                                            {recur.timeStart.slice(0, 5)} - {recur.timeEnd.slice(0, 5)}
                                        </Typography>
                                        {recur.room && (
                                            <Typography
                                                component="span"
                                                variant="body2"
                                                sx={{ display: 'block', mt: 0.5 }}
                                            >
                                                Sala: {recur.room.name}, Planta: {recur.room.numberFloor}
                                            </Typography>
                                        )}
                                    </>
                                }
                            />
                        </ListItem>
                    </Grid2>
                    {index < oneTimeRecur.length - 1 && <Divider component='li' />}
                </Grid2>
            ))}
        </List></Paper>

    )
}
