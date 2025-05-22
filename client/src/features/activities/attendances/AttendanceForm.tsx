import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Skeleton, Button, Grid2, Divider } from "@mui/material"
import { attendanceOptions } from "../form/selectOptions"
import { useFieldArray, useForm, useWatch } from "react-hook-form"
import { useEffect } from "react"
import { useAttendees } from "../../../lib/hooks/useAttendees"
import RadioInput from "../../../app/shared/components/RadioInput"

type Props = {
    activity: Activity,
    recurId: string
    setCheckAtt: () => void
}

type FormValues = {
    bulkValue?: number;
    attendances: Attendance[];
};

export default function AttendanceForm({ activity, recurId, setCheckAtt }: Props) {
    const { activityAttendance, loadingAttendance, updateAttendance } = useAttendees(activity.id, undefined, recurId)
    const { control, handleSubmit, reset, setValue, formState: { isDirty } } = useForm<FormValues>({
        defaultValues: { attendances: [] as Attendance[] }
    });
    const { fields } = useFieldArray({ control, name: 'attendances' });

    useEffect(() => {
        if (activityAttendance) {
            reset({ attendances: activityAttendance });
        }
    }, [activityAttendance, reset]);

    const bulkValue = useWatch({ control, name: 'bulkValue' });

    useEffect(() => {
        if (bulkValue !== undefined) {
            fields.forEach((_, index) => {
                setValue(`attendances.${index}.hasAttended`, bulkValue);
            });
        }
    }, [bulkValue, fields, setValue]);

    const onSubmit = (data: { attendances: Attendance[] }) => {
        const payload = data.attendances.map(({ attendeeId, hasAttended }) => ({
            id: attendeeId,
            hasAttended
        }));
        updateAttendance.mutate(payload, {
            onSuccess: () => setCheckAtt()
        })
    };

    const allAttOpt = [
        { text: 'Tothom pendent', value: 0 },
        { text: 'Tothom present', value: 1 },
        { text: 'Tothom ha faltat', value: 2 }
    ]
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Grid2 container display={"flex"} justifyContent={"end"} spacing={2} sx={{ m: 2 }}>
                <Grid2>
                    <RadioInput
                        control={control}
                        name="bulkValue"
                        items={allAttOpt}
                    />
                </Grid2>
            </Grid2>
            <TableContainer sx={{ maxHeight: 440, minWidth: 120 }} >
                <Table stickyHeader size="small" sx={{ tableLayout: 'fixed', width: '100%' }}>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ width: '60%' }}>NOM</TableCell>
                            <TableCell sx={{ width: '40%' }}>ASSISTÈNCIA</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {loadingAttendance
                            ? (Array.from({ length: activity.numberAttendees }, (_, i) => (
                                <TableRow key={i} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell component="th" scope="row">
                                        <Skeleton variant="text" />
                                    </TableCell>
                                    <TableCell>
                                        <Skeleton variant="rounded" height={35} />
                                    </TableCell>
                                </TableRow>
                            ))
                            ) : (activityAttendance && activityAttendance.length > 0
                                ? activityAttendance.map((att, index) => (
                                    <TableRow key={att.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                        <TableCell component="th" scope="row">
                                            {att.identifier}
                                        </TableCell>
                                        <TableCell>
                                            <RadioInput
                                                control={control}
                                                items={attendanceOptions}
                                                name={`attendances.${index}.hasAttended`}
                                            />
                                        </TableCell>
                                    </TableRow>
                                ))
                                :
                                <TableRow key={0} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell component="th" scope="row">
                                        -
                                    </TableCell>
                                    <TableCell>
                                        -
                                    </TableCell>
                                </TableRow>
                            )
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            <Divider />
            <Grid2 container spacing={2} mt={2}>
                <Button type="submit" variant="contained" color="primary" sx={{ mt: 1, mb: 2 }}
                    disabled={loadingAttendance || activityAttendance?.length === 0 || !isDirty}>
                    Guarda
                </Button>
                <Button variant="outlined" color="primary" sx={{ mt: 1, mb: 2 }}
                    disabled={loadingAttendance}
                    onClick={() => setCheckAtt()}>
                    Cancel·la
                </Button>
            </Grid2>
        </form>
    )
}