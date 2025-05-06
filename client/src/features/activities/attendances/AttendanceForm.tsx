import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Skeleton, Button, Grid2 } from "@mui/material"
import { attendanceOptions } from "../form/selectOptions"
import SelectInput from "../../../app/shared/components/SelectInput"
import { useForm } from "react-hook-form"
import { useEffect } from "react"
import { useAttendees } from "../../../lib/hooks/useAttendees"

type Props = {
    activity: Activity,
    recurId: string
    setCheckAtt: (bool: boolean) => void
}

export default function AttendanceForm({ activity,  recurId, setCheckAtt }: Props) {
    const { activityAttendance, loadingAttendance, updateAttendance } = useAttendees(activity.id, undefined, recurId)
    const { control, handleSubmit, reset } = useForm({
        defaultValues: { attendances: [] as Attendance[] }
    });

    useEffect(() => {
        if (activityAttendance) {
            reset({ attendances: activityAttendance });
        }
    }, [activityAttendance, reset]);

    const onSubmit = (data: { attendances: Attendance[] }) => {
        const payload = data.attendances.map(({ attendeeId, hasAttended }) => ({
            id: attendeeId,
            hasAttended
        }));
        updateAttendance.mutate(payload, {
            onSuccess: () => setCheckAtt(false)
        })
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <TableContainer sx={{ maxHeight: 440, m: 1, minWidth: 120 }} >
                <Table stickyHeader size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>NOM</TableCell>
                            <TableCell>ASSISTÈNCIA</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {loadingAttendance
                            ? (Array.from({length: activity.numberAttendees}, (_, i) => (
                                <TableRow key={i} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell component="th" scope="row">
                                        <Skeleton variant="text" />
                                    </TableCell>
                                    <TableCell>
                                        <Skeleton variant="rounded" height={59} />
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
                                            <SelectInput
                                                control={control}
                                                items={attendanceOptions}
                                                name={`attendances.${index}.hasAttended`}
                                                value={att.hasAttended}
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

            <Grid2 container spacing={2} mt={2}>
                <Button type="submit" variant="contained" color="primary" sx={{ mt: 1, mb: 2 }}
                    disabled={loadingAttendance || activityAttendance?.length === 0}>
                    Guarda
                </Button>
                <Button variant="outlined" color="primary" sx={{ mt: 1, mb: 2 }}
                    disabled={loadingAttendance}
                    onClick={() => setCheckAtt(false)}>
                    Cancel·la
                </Button>
            </Grid2>
        </form>
    )
}