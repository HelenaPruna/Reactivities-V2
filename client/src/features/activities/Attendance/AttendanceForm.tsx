import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Skeleton, Button } from "@mui/material"
import { attendanceOptions } from "../form/categoryOptions"
import SelectInput from "../../../app/shared/components/SelectInput"
import { useForm } from "react-hook-form"
import { useEffect } from "react"
import { useAttendees } from "../../../lib/hooks/useAttendees"

type Props = {
    activity: Activity,
    setCheckAtt: (bool: boolean) => void
}

export default function AttendanceForm({ activity: { id, date }, setCheckAtt }: Props) {
    const { activityAttendance, loadingAttendance, updateAttendance , refetchingAttendance} = useAttendees(id, undefined, date)
    const { control, handleSubmit, reset } = useForm({
        defaultValues: { attendances: [] as Attendance[] }
    });

    useEffect(() => {
        if (activityAttendance) {
            reset({ attendances: activityAttendance });
        }
    }, [activityAttendance, reset]);

    const onSubmit = (data: { attendances: Attendance[] }) => {
        const payload = data.attendances.map(({ id, hasAttended }) => ({
            id,
            hasAttended
        }));
        updateAttendance.mutate(payload, {
            onSuccess: () => setCheckAtt(false)
        })
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <TableContainer >
                <Table aria-label="attendance table">
                    <TableHead>
                        <TableRow>
                            <TableCell>NOM</TableCell>
                            <TableCell>ASSISTÈNCIA</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {loadingAttendance || refetchingAttendance
                            ? (
                                <TableRow key={0} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell component="th" scope="row"><Skeleton variant="text" /></TableCell>
                                    <TableCell><Skeleton variant="text" /></TableCell>
                                </TableRow>
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
                                : (<TableRow key={0} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell component="th" scope="row">-</TableCell>
                                    <TableCell>-</TableCell>
                                </TableRow>
                                ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            <Button type="submit" variant="contained" color="primary" sx={{ mt: 1, mb: 2 }}
                        disabled={loadingAttendance || activityAttendance?.length === 0}>
                Guarda
            </Button>
        </form>

    )
}