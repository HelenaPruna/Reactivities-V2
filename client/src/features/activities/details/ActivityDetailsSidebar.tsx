import { Paper, Typography, List, ListItem, Chip, ListItemAvatar, Avatar, ListItemText, Grid2, IconButton, Button, Box, Tooltip } from "@mui/material";
import { useActivities } from "../../../lib/hooks/useActivities";
import { useState } from "react";
import EditIcon from '@mui/icons-material/Edit';
import MultiSelectInput from "../../../app/shared/components/MultiSelectInput";
import { SubmitHandler, useForm } from "react-hook-form";
import CloseIcon from '@mui/icons-material/Close';
import { stringAvatar } from "../../../lib/util/util";
import ActivityDetailsRecur from "./ActivityDetailsRecur";
import DateInput from "../../../app/shared/components/DateInput";
import TimeInput from "../../../app/shared/components/TimeInput";
import { recurrenceSchema, RecurrenceSchema } from "../../../lib/schemas/recurrenceSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAccount } from "../../../lib/hooks/useAccount";
import AddIcon from '@mui/icons-material/Add';
import RequestForm from "../../requests/RequestForm";
import ActivityDetailsListReq from "./ActivityDetailsListReq";


type Props = {
    activity: Activity
}

interface OrganizersFormInputs {
    organizers: string[];
}

export default function ActivityDetailsSidebar({ activity }: Props) {
    const { updateOrganizers, addRecur, deleteRecur } = useActivities(activity.id)
    const [updateOrg, setUpdateOrg] = useState(false);
    const [addEvent, setAddEvent] = useState(false);
    const [addReq, setAddReq] = useState(false);
    const { currentUser } = useAccount()


    const { control, handleSubmit } = useForm<OrganizersFormInputs>({
        defaultValues: { organizers: activity.organizers.map(o => o.id) }
    });

    const onSubmit: SubmitHandler<OrganizersFormInputs> = (data) => {
        const originalIds = activity.organizers.map(o => o.id).sort();
        const newIds = [...data.organizers].sort();

        const isEqual =
            originalIds.length === newIds.length &&
            originalIds.every((id, index) => id === newIds[index]);

        if (!isEqual) {
            updateOrganizers.mutate(data.organizers);
        }

        setUpdateOrg(false);
    };

    const { control: controlRecur, handleSubmit: handleRecur, reset, formState: { isValid } } = useForm<RecurrenceSchema>({
        mode: 'onTouched',
        resolver: zodResolver(recurrenceSchema)
    })

    const onSubmitRecur: SubmitHandler<CreateRecur> = (data) => {
        resetingAddEvent()
        addRecur.mutate(data)
    }

    const resetingAddEvent = () => {
        setAddEvent(false)
        reset()
    }

    const deleteRecurrence = (recurId: string) => {
        deleteRecur.mutate(recurId)
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, borderRadius: 3 }}>
            <Grid2>
                <Paper sx={{ textAlign: 'center', border: 'none', backgroundColor: 'primary.main', color: 'white', p: 1 }} >
                    {!updateOrganizers.isPending ?
                        <Typography variant="subtitle1">
                            {!updateOrg && activity.organizers.length} {activity.organizers.length === 1 ? ' Organitzadora' : ' Organitzadores'}
                            {currentUser?.role === "Admin" && !activity.isCancelled &&
                                <IconButton aria-label="edit" onClick={() => setUpdateOrg(!updateOrg)}>
                                    {!updateOrg
                                        ? <Tooltip title="Edita la llista d'organitzadores">
                                            <EditIcon sx={{ color: "white" }} fontSize="small" />
                                        </Tooltip>
                                        : <Tooltip title="Cancel·la">
                                            <CloseIcon sx={{ color: "white" }} fontSize="small" />
                                        </Tooltip>
                                    }
                                </IconButton>
                            }
                        </Typography>
                        : <Typography variant="subtitle1">Organitzadores</Typography>
                    }
                </Paper>
                {updateOrg && <Paper sx={{ padding: 2 }}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <MultiSelectInput control={control} label="Organitzadores" name="organizers" />
                        <Button type="submit" variant="contained" sx={{ mt: 2 }}>
                            Confirma
                        </Button>
                    </form>
                </Paper>}
                {!updateOrg && activity.organizers.length > 0 && <Paper sx={{ padding: 2 }}><List>
                    {activity.organizers.map((organizer) => (
                        <ListItem disablePadding key={organizer.id} sx={{ alignContent: 'center', justifyContent: 'space-between' }} >
                            <ListItemAvatar>
                                <Avatar
                                    variant="rounded"
                                    alt={organizer.displayName + ' initials'}
                                    sx={{ fontSize: 'small', width: 25, height: 25, mr: 3, ...stringAvatar(organizer.displayName).sx }}
                                    children={stringAvatar(organizer.displayName).children}
                                />
                            </ListItemAvatar>
                            <ListItemText>
                                <Typography>{organizer.displayName}</Typography>
                            </ListItemText>
                            <Grid2>
                                {activity.creator.id === organizer.id && (
                                    <Chip
                                        label="Creadora"
                                        color="warning"
                                        variant="outlined"
                                        sx={{ borderRadius: 2 }}
                                    />
                                )}
                            </Grid2>
                        </ListItem>
                    ))}
                </List></Paper>}
            </Grid2>
            <Grid2 alignItems='center'>
                <Paper sx={{ textAlign: 'center', border: 'none', backgroundColor: 'primary.main', color: 'white', p: 1 }} >
                    <Typography variant="subtitle1">Activitats extra {currentUser?.role === "Admin" && !addEvent && !activity.isCancelled &&
                        <Tooltip title="Afegeix una activitiat puntual">
                            <IconButton onClick={() => setAddEvent(!addEvent)}>
                                <AddIcon sx={{ color: "white" }} fontSize="small" />
                            </IconButton>
                        </Tooltip>
                    }</Typography>
                </Paper>
                {!addEvent && activity.oneTimeEvents.length > 0 &&
                    <ActivityDetailsRecur
                        activityId={activity.id}
                        oneTimeRecur={activity.oneTimeEvents}
                        deleteRecur={deleteRecurrence}
                    />}
                {currentUser?.role === "Admin" && addEvent &&
                    <Paper sx={{ padding: 2 }}>
                        <Box component='form' display='flex' flexDirection='column' onSubmit={handleRecur(onSubmitRecur)} gap={1}>
                            <DateInput label='Data' control={controlRecur} name='date' />
                            <TimeInput label='Hora inici' control={controlRecur} name="timeStart" />
                            <TimeInput label='Hora final' control={controlRecur} name="timeEnd" />
                            <Box display='flex' justifyContent='end' gap={3}>
                                <Button type="submit" variant="contained" disabled={!isValid}>
                                    Confirma
                                </Button>
                                <Button color="inherit" onClick={() => resetingAddEvent()}>
                                    Cancel·la
                                </Button>
                            </Box>
                        </Box>
                    </Paper>
                }
            </Grid2>
            <Grid2 alignItems='center'>
                <Paper sx={{ textAlign: 'center', border: 'none', backgroundColor: 'primary.main', color: 'white', p: 1 }} >
                    <Typography variant="subtitle1"> Sol·licituds
                        {!addReq && !activity.isCancelled && <IconButton onClick={() => setAddReq(true)}>
                            <Tooltip title="Afegeix una activitiat puntual">
                                <AddIcon sx={{ color: "white" }} fontSize="small" />
                            </Tooltip>

                        </IconButton>}
                    </Typography>
                </Paper>
                {activity.requests.length > 0 && <ActivityDetailsListReq requests={activity.requests} />}
                {addReq && <RequestForm open={addReq} onClose={() => setAddReq(false)} isFromActivity={true} activityId={activity.id} />}
            </Grid2>
        </Box >
    );
}

