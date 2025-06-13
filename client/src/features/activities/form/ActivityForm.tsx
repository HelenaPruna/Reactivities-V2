import { Box, Button, Paper, Typography } from "@mui/material";
import { useActivities } from "../../../lib/hooks/useActivities";
import { useNavigate, useParams, unstable_usePrompt } from "react-router";
import { useForm, useWatch } from 'react-hook-form'
import { activitySchema, ActivitySchema } from "../../../lib/schemas/activitySchema";
import { zodResolver } from '@hookform/resolvers/zod'
import TextInput from "../../../app/shared/components/TextInput";
import DateInput from "../../../app/shared/components/DateInput";
import TimeInput from "../../../app/shared/components/TimeInput";
import CheckBoxInput from "../../../app/shared/components/CheckBoxInput";
import { useEffect, useState } from "react";
import SelectInput from "../../../app/shared/components/SelectInput";
import { intervalOptions } from "./selectOptions";

export default function ActivityForm() {
    const navigate = useNavigate();
    const { id } = useParams();
    const { updateActivity, createActivity, activity, isLoadingActivity } = useActivities(id);
    const [shouldPrompt, setShouldPrompt] = useState(false);


    const { control, handleSubmit, formState: { isDirty, isValid } } = useForm<ActivitySchema>({
        mode: 'onTouched',
        resolver: zodResolver(activitySchema),
        defaultValues: activity || {}
    });

    const oneDayValue = useWatch({
        control,
        name: "isOneDay",
        defaultValue: activity?.isOneDay || false
    });

    unstable_usePrompt({
        when: shouldPrompt,
        message:
            "Tens canvis no desats. Si surts perdràs les modificacions. Segur que vols continuar?",
    });

    useEffect(() => {
        if (isDirty) setShouldPrompt(true);
        window.onbeforeunload = isDirty ? () => { return "" } : null;
        return () => { window.onbeforeunload = null; }
    }, [isDirty]);


    const onSubmit = (data: ActivitySchema) => {
        setShouldPrompt(false);
        try {
            if (activity) {
                const activityData = {
                    ...data,
                    dateEnd: activity.isOneDay ? data.dateStart : data.dateEnd ?? activity.dateEnd,
                    allowedMissedDays: activity.isOneDay ? 1 : data.allowedMissedDays ?? activity.allowedMissedDays,
                    interval: activity.isOneDay ? 1 : data.interval ?? activity.interval,
                    description: data.description || "-"
                };
                updateActivity.mutate({ ...activity, ...activityData }, {
                    onSuccess: () => navigate(`/activities/${activity.id}`, { replace: true })
                })
            } else {
                const activityData = {
                    ...data,
                    dateEnd: data.isOneDay ? data.dateStart : data.dateEnd ?? data.dateStart,
                    allowedMissedDays: data.isOneDay ? 1 : data.allowedMissedDays ?? 1,
                    interval: data.isOneDay ? 1 : data.interval ?? 1,
                    description: data.description ?? "-"
                };
                createActivity.mutate(activityData, {
                    onSuccess: (id) => navigate(`/activities/${id}`, { replace: true }),
                })
            }
        } catch (error) {
            console.log(error)
        }
    }

    if (isLoadingActivity) return <Typography>Loading...</Typography>

    return (
        <Paper sx={{ borderRadius: 3, padding: 3 }}>
            <Typography variant="h5" gutterBottom color="secondary">
                {activity ? "Edita el taller" : 'Crea un taller nou'}
            </Typography>
            <Box component='form' onSubmit={handleSubmit(onSubmit)} display='flex' flexDirection='column' mt={2} gap={3}>
                <TextInput label='Títol *' control={control} name='title' />
                <TextInput label='Descripció' control={control} name='description' multiline rows={3} />
                {!activity && <CheckBoxInput label="Aquest taller no es repeteix" control={control} name="isOneDay" />}
                <Box display='flex' gap={3}>
                    <DateInput label='Data inicial *' control={control} name="dateStart" />
                    {!oneDayValue && (<DateInput label='Data final *' control={control} name="dateEnd" />)}
                    <TimeInput label='Hora inicial *' control={control} name="timeStart" />
                    <TimeInput label='Hora final *' control={control} name="timeEnd" />
                    {oneDayValue && <TextInput label='Nombre de places disponibles *' placeholder="Entre 1 - 40 places" control={control} name='maxParticipants' type="number" />}
                </Box>
                {!oneDayValue && <Box display='flex' gap={3}>
                    <TextInput label='Nombre de places disponibles *' placeholder="Entre 1 - 40 places" control={control} name='maxParticipants' type="number" />
                    <TextInput label='Màxim de faltes permeses *' control={control} name='allowedMissedDays' type="number" />
                    <SelectInput label='Interval *' control={control} items={intervalOptions} name="interval" size={true} />
                </Box>}
                <Box display='flex' justifyContent='end' gap={3}>
                    <Button color="inherit" onClick={() => {
                        setShouldPrompt(false);
                        navigate(activity ? `/activities/${id}` : '/activities', { replace: true })                        
                    }} >
                        Cancel·la
                    </Button>
                    <Button type="submit" color="success" variant="contained"
                        disabled={updateActivity.isPending || createActivity.isPending || !isDirty || !isValid}>
                        {activity ? "Confirma canvis" : "Crea"}
                    </Button>
                </Box>
            </Box>
        </Paper>
    )
}