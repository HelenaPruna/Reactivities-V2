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

type Props = {
    activity: Activity
}

interface OrganizersFormInputs {
    organizers: string[]; // array of selected profile ids
}

export default function ActivityDetailsSidebar({ activity }: Props) {
    const { updateOrganizers } = useActivities(activity.id)
    const [updateOrg, setUpdateOrg] = useState(false);

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



    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, borderRadius: 3 }}>
            <Grid2>
                <Paper
                    sx={{
                        textAlign: 'center',
                        border: 'none',
                        backgroundColor: 'primary.main',
                        color: 'white',
                        p: 2,
                    }}
                >
                    {!updateOrganizers.isPending ? (<Typography variant="h6">
                        {!updateOrg && activity.organizers.length} {activity.organizers.length === 1 ? ' Organitzadora' : ' Organitzadores'}
                        {activity.isCreator && !activity.isCancelled && <IconButton aria-label="edit" onClick={() => setUpdateOrg(!updateOrg)}>
                            {!updateOrg ? (<EditIcon sx={{ color: "white" }} />) : (<CloseIcon sx={{ color: "white" }} />)}
                        </IconButton>}
                    </Typography>
                    ) : (<Typography variant="h6">Organitzadores</Typography>)}

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
                    {!updateOrganizers.isPending && !updateOrg && activity.organizers.map(organizer => (
                        <Grid2 key={organizer.id} container alignItems="center">
                            <Grid2 size={8}>
                                <List sx={{ display: 'flex', flexDirection: 'column' }}>
                                    <ListItem>
                                        <ListItemAvatar>
                                            <Avatar
                                                variant="rounded"
                                                alt={organizer.displayName + ' initials'}
                                                sx={{ width: 50, height: 50, mr: 3, ...stringAvatar(organizer.displayName).sx }}
                                                children={stringAvatar(organizer.displayName).children}
                                            />
                                        </ListItemAvatar>
                                        <ListItemText>
                                            <Typography variant="h6">{organizer.displayName}</Typography>
                                        </ListItemText>
                                    </ListItem>
                                </List>
                            </Grid2>
                            <Grid2 size={4} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 1 }}>
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
        </Box>
    );
}

