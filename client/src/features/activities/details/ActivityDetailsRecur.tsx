import { Divider, List, ListItem, ListItemAvatar, ListItemText, Avatar, Paper, Typography, Grid2, IconButton, Dialog, Button, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import EventIcon from "@mui/icons-material/Event";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AddIcon from '@mui/icons-material/Add';
import dayjs from "dayjs";
import { useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';


type Props = {
    oneTimeRecur: Recurrences[]
    addEvent: boolean
    setAddEvent: (bool: boolean) => void
    deleteRecur: (id: string) => void
}

export default function ActivityDetailsRecur({ oneTimeRecur, addEvent, setAddEvent, deleteRecur }: Props) {
    const [open, setOpen] = useState(false);

    return (
        <>
            <Paper
                sx={{
                    textAlign: 'center',
                    border: 'none',
                    backgroundColor: 'primary.main',
                    color: 'white',
                    p: 2,
                }}
            >
                <Typography variant="subtitle1">Activitats puntuals {!addEvent &&
                    <IconButton onClick={() => setAddEvent(!addEvent)}>
                        <AddIcon sx={{ color: "white" }} fontSize="small" />
                    </IconButton>}</Typography>
            </Paper>
            {!addEvent && <Paper>
                <List>
                    {oneTimeRecur.length > 0 && oneTimeRecur.map((recur, index) => (
                        <Grid2 key={recur.id}>
                            <Grid2 container justifyContent='space-between' alignItems='center' pl={1} pr={4}>
                                <Grid2>
                                    <ListItem>
                                        <ListItemAvatar>
                                            <Avatar><EventIcon /></Avatar>
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={
                                                <Typography variant="subtitle1">
                                                    {dayjs(recur.date).locale("ca").format("D [de] MMMM[,] YYYY")}
                                                </Typography>
                                            }
                                            secondary={
                                                <>
                                                    <Typography
                                                        component="span"
                                                        variant="body2"
                                                        sx={{ display: 'flex', alignItems: 'center' }}
                                                    >
                                                        <AccessTimeIcon fontSize="small" sx={{ mr: 0.5 }} />
                                                        {recur.timeStart.slice(0, 5)} - {recur.timeEnd.slice(0, 5)}
                                                    </Typography>
                                                </>
                                            }
                                        />
                                    </ListItem>
                                </Grid2>
                                <Grid2>
                                    <IconButton onClick={() => setOpen(true)}><DeleteIcon color="error" /></IconButton>
                                    <Dialog onClose={() => setOpen(false)} open={open}>
                                        <DialogTitle>Estàs segura d'eliminar l'activitat?</DialogTitle>
                                        <DialogContent>
                                            <DialogContentText>
                                                Aquesta acció no es pot desfer.
                                            </DialogContentText>
                                        </DialogContent>
                                        <DialogActions>
                                            <Button variant="contained" onClick={() => setOpen(false)}>Cancel·la</Button>
                                            <Button onClick={() => { setOpen(false); deleteRecur(recur.id) }} color="error">El·limina</Button>
                                        </DialogActions>
                                    </Dialog>
                                </Grid2>
                            </Grid2>
                            {index < oneTimeRecur.length - 1 && <Divider component='li' />}

                        </Grid2>


                    ))}
                </List>
            </Paper>}

        </>
    )
}
