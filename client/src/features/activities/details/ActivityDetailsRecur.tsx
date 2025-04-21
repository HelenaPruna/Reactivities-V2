import { Divider, List, ListItem, ListItemAvatar, ListItemText, Avatar, Paper, Typography, Grid2, IconButton } from "@mui/material";
import EventIcon from "@mui/icons-material/Event";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AddIcon from '@mui/icons-material/Add';
import ActionsOneTime from "./ActionsOneTime";
import { formatDateOnly } from "../../../lib/util/util";


type Props = {
    activityId: string
    isCancelled: boolean
    oneTimeRecur: Recurrence[]
    addEvent: boolean
    setAddEvent: (bool: boolean) => void
    deleteRecur: (id: string) => void
}

export default function ActivityDetailsRecur({ activityId, isCancelled, oneTimeRecur, addEvent, setAddEvent, deleteRecur }: Props) {
    return (
        <>
            <Paper
                sx={{
                    textAlign: 'center',
                    border: 'none',
                    backgroundColor: 'primary.main',
                    color: 'white',
                    p: 1,
                }}
            >
                <Typography variant="subtitle1">Esdeveniments extra {!addEvent && !isCancelled &&
                    <IconButton onClick={() => setAddEvent(!addEvent)}>
                        <AddIcon sx={{ color: "white" }} fontSize="small" />
                    </IconButton>}</Typography>
            </Paper>
            {!addEvent && <Paper>
                <List>
                    {oneTimeRecur.length > 0 &&
                        oneTimeRecur.map((recur, index) => (
                            <Grid2 key={recur.id}>
                                <Grid2 container justifyContent='space-between' alignItems='center' pl={1} pr={3}>
                                    <ListItem secondaryAction={<ActionsOneTime
                                        deleteEvent={() => deleteRecur(recur.id)}
                                        activityId={activityId}
                                        recurId={recur.id}
                                    />}>
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
                </List>
            </Paper>}
        </>
    )
}
