import { TableRow, TableCell, Grid2, Tooltip, IconButton } from "@mui/material"
import WarningTooltip from "../../../app/shared/components/WarningTooltip"
import { useAccount } from "../../../lib/hooks/useAccount"
import ActionsAttendee from "./ActionsAttendee"
import { Edit } from "@mui/icons-material"
import AttendeeForm from "./AttendeeForm"
import { useState } from "react"

type Props = {
    activityAttendees: Attendee[]
    isWaiting: boolean
    activateAtt: (id: string) => void
    deleteAtt: (id: string) => void
    activity: Activity
}

export default function AttendeesTable({ activityAttendees, isWaiting, activateAtt, deleteAtt, activity }: Props) {
    const { currentUser } = useAccount()
    const [toEdit, setToEdit] = useState<Attendee | null>(null);
    const open = Boolean(toEdit);
    const allowedMissedDays = activity.allowedMissedDays
    const isOrganizing = activity.isOrganizing

    return (
        <>
            {activityAttendees.length > 0
                ? activityAttendees.map((att) => (
                    <TableRow key={att.id}>
                        <TableCell component="th" scope="row">{att.identifier}</TableCell>
                        {!isWaiting && <TableCell >
                            <Grid2 container alignItems="center" gap={1}>
                                {att.skippedDays}{att.skippedDays >= allowedMissedDays &&
                                    <WarningTooltip title={'Aquest participant ha faltat més de ' + allowedMissedDays + ' vegades'} />}
                            </Grid2>

                        </TableCell>}
                        <TableCell >{att.comments || "-"}</TableCell>
                        {currentUser?.role === 'Admin' && <TableCell align="right">
                            <ActionsAttendee
                                activateAtt={() => activateAtt(att.id)}
                                deleteAtt={() => deleteAtt(att.id)}
                                isWaiting={isWaiting}
                                setEdit={() => setToEdit(att)}
                            />
                        </TableCell>}
                        {currentUser?.role !== 'Admin' && isOrganizing && <TableCell align="right">
                            <Tooltip title="Edita el participant" >
                                <IconButton onClick={(e) => { e.currentTarget.blur(); }}>
                                    <Edit />
                                </IconButton>
                            </Tooltip>
                        </TableCell>}

                    </TableRow>
                ))
                : (<TableRow key={0} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell component="th" scope="row">-</TableCell>
                    <TableCell>-</TableCell>
                    {currentUser?.role !== 'Observer' && <TableCell>-</TableCell>}
                    {!isWaiting && <TableCell>-</TableCell>}
                </TableRow>
                )}
            {toEdit && <AttendeeForm onClose={() => setToEdit(null) } open={open} activity={activity} attendee={toEdit} />}
        </>
    )
}