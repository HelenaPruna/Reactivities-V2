import { Box, Button, Paper, Typography } from "@mui/material";
import { useActivities } from "../../../lib/hooks/useActivities";
import { useNavigate, useParams } from "react-router";
import { useForm, useWatch } from 'react-hook-form'
import { activitySchema, ActivitySchema } from "../../../lib/schemas/activitySchema";
import { zodResolver } from '@hookform/resolvers/zod'
import TextInput from "../../../app/shared/components/TextInput";
import DateInput from "../../../app/shared/components/DateInput";
import TimeInput from "../../../app/shared/components/TimeInput";
import CheckBoxInput from "../../../app/shared/components/CheckBoxInput";

export default function ActivityForm() {
    const navigate = useNavigate();
    const { id } = useParams();
    const { updateActivity, createActivity, activity, isLoadingActivity } = useActivities(id);
    
    const { control, handleSubmit, formState: {isDirty}} = useForm<ActivitySchema>({
        mode: 'onTouched',
        resolver: zodResolver(activitySchema),
        defaultValues: activity || {}
    });

    const oneDayValue = useWatch({
        control,
        name: "isOneDay",
        defaultValue: activity?.isOneDay || false
    });

    const onSubmit = (data: ActivitySchema) => {
        if (data.isOneDay) data.dateEnd = data.dateStart
        try {
            if (activity) {
                updateActivity.mutate({ ...activity, ...data }, {
                    onSuccess: () => navigate(`/activities/${activity.id}`)
                })
            } else {
                createActivity.mutate(data, {
                    onSuccess: (id) => navigate(`/activities/${id}`),
                })
            }
        } catch (error) {
            console.log(error)
        }
    }

    if (isLoadingActivity) return <Typography>Loading...</Typography>

    return (
        <Paper sx={{ borderRadius: 3, padding: 3 }}>
            <Typography variant="h5" gutterBottom color="primary">
                {activity ? 'Edit activity' : 'Create activity'}
            </Typography>
            <Box component='form' onSubmit={handleSubmit(onSubmit)} display='flex' flexDirection='column' gap={3}>
                <TextInput label='Title' control={control} name='title' />
                <TextInput label='Description' control={control} name='description' multiline rows={3} />
                <Box display='flex' gap={3}>
                    <DateInput label='StartDate' control={control} name="dateStart" />
                    {!oneDayValue && (<DateInput label='EndDate' control={control} name="dateEnd" />)}
                    <TimeInput label='TimeStart' control={control} name="timeStart" />
                    <TimeInput label='TimeEnd' control={control} name="timeEnd" />
                </Box>
                <CheckBoxInput label="Aquesta activitat no es repeteix" control={control} name="isOneDay" />

                <TextInput label='Room' control={control} name='room' />
                <Box display='flex' gap={3}>
                    <TextInput label='Nombre màxim de participants' control={control} name='maxParticipants' type="number" />
                    <TextInput label='Màxim de faltes permeses' control={control} name='allowedMissedDays' type="number" />
                    {!oneDayValue && <TextInput label='Cada quants dies...' control={control} name='interval' type="number" />}
                </Box>

                <Box display='flex' justifyContent='end' gap={3}>
                    <Button onClick={() => navigate(-1)} color="inherit">Cancel</Button>
                    <Button type="submit" color="success" variant="contained"
                        disabled={updateActivity.isPending || createActivity.isPending || !isDirty}>
                        Submit
                    </Button>
                </Box>
            </Box>
        </Paper>
    )
}