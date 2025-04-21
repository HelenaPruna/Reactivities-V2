import { Paper, Typography, List, ListItem, Chip, ListItemAvatar, Avatar, ListItemText, Grid2, IconButton, Button, Box } from "@mui/material";
import { useActivities } from "../../../lib/hooks/useActivities";
import { useState } from "react";
import EditIcon from '@mui/icons-material/Edit';
import MultiSelectInput from "../../../app/shared/components/MultiSelectInput";
import { SubmitHandler, useForm } from "react-hook-form";
import CloseIcon from '@mui/icons-material/Close';
import { stringAvatar } from "../../../lib/util/util";
import EventCalendar from "./ActivityDetailsCalendar";
import { Event } from '@mui/icons-material';
import ActivityDetailsRecur from "./ActivityDetailsRecur";
import DateInput from "../../../app/shared/components/DateInput";
import TimeInput from "../../../app/shared/components/TimeInput";
import { recurrenceSchema, RecurrenceSchema } from "../../../lib/schemas/recurrenceSchema";
import { zodResolver } from "@hookform/resolvers/zod";

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

    const { control: controlRecur, handleSubmit: handleRecur, reset } = useForm<RecurrenceSchema>({
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
                <Paper
                    sx={{
                        textAlign: 'center',
                        border: 'none',
                        backgroundColor: 'primary.main',
                        color: 'white',
                        p: 1,
                    }}
                >
                    {!updateOrganizers.isPending ? (<Typography variant="subtitle1">
                        {!updateOrg && activity.organizers.length} {activity.organizers.length === 1 ? ' Organitzadora' : ' Organitzadores'}
                        {activity.isCreator && !activity.isCancelled && <IconButton aria-label="edit" onClick={() => setUpdateOrg(!updateOrg)}>
                            {!updateOrg ? (<EditIcon sx={{ color: "white" }} fontSize="small" />) : (<CloseIcon sx={{ color: "white" }} fontSize="small" />)}
                        </IconButton>}
                    </Typography>
                    ) : (<Typography variant="subtitle1">Organitzadores</Typography>)}

                </Paper>
                <Paper sx={{ padding: 2 }}>
                    {updateOrg &&
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <MultiSelectInput
                                control={control}
                                label="Organitzadores"
                                name="organizers"
                            />
                            <Button type="submit" variant="contained" sx={{ mt: 2 }}>
                                Confirma
                            </Button>
                        </form>
                    }
                    {!updateOrganizers.isPending && !updateOrg && activity.organizers.map((organizer) => (
                        <Grid2 key={organizer.id} container alignItems="center" justifyContent='space-between'>
                            <List>
                                <ListItem disablePadding>
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
                                </ListItem>
                            </List>
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
                        </Grid2>
                    ))}

                </Paper>
            </Grid2>
            <Box component={Paper} sx={{ width: '100%', p: 3, borderRadius: 3 }}>
                <Typography variant="h6"
                    sx={{ display: 'flex', alignItems: 'center', mb: 1, color: 'primary.main' }}>
                    <Event sx={{ mr: 1 }} />
                    Calendari d'activitats
                </Typography>
                <EventCalendar activity={activity} />
            </Box>
            <Grid2 alignItems='center' pb={4}>
                <ActivityDetailsRecur
                    activityId={activity.id}
                    isCancelled={activity.isCancelled}
                    oneTimeRecur={activity.oneTimeEvents}
                    addEvent={addEvent}
                    setAddEvent={setAddEvent}
                    deleteRecur={deleteRecurrence}
                />
                {addEvent &&
                    <Paper sx={{ padding: 2 }}>
                        <Box component='form' display='flex' flexDirection='column' onSubmit={handleRecur(onSubmitRecur)} gap={1}>

                            <DateInput label='Data' control={controlRecur} name='date' />
                            <TimeInput label='TimeStart' control={controlRecur} name="timeStart" />
                            <TimeInput label='TimeEnd' control={controlRecur} name="timeEnd" />
                            <Box display='flex' justifyContent='end' gap={3}>
                                <Button type="submit" variant="contained">
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
        </Box>
    );
}

