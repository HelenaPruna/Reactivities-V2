import { TableRow, TableCell, Grid2 } from "@mui/material"
import WarningTooltip from "../../../app/shared/components/WarningTooltip"
import ActionsAttendee from "./ActionsAttendee"
import { useAccount } from "../../../lib/hooks/useAccount"

type Props = {
    activityAttendees: Attendee[]
    isWaiting: boolean | undefined
    allowedMissedDays: number
    activateAtt: (id: string) => void
    deleteAtt: (id: string) => void
}

export default function AttendeesTable({ activityAttendees, isWaiting, allowedMissedDays, activateAtt, deleteAtt }: Props) {
    const { currentUser } = useAccount()

    return (
        (activityAttendees.length > 0
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
                   {currentUser?.role !== 'Observer' && <TableCell align="right">
                        {isWaiting !== undefined && <ActionsAttendee activateAtt={() => activateAtt(att.id)}
                            deleteAtt={() => deleteAtt(att.id)} isWaiting={isWaiting} />}
                    </TableCell>}
                </TableRow>
            ))
            : (<TableRow key={0} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">-</TableCell>
                <TableCell>-</TableCell>
                {currentUser?.role !== 'Observer' && <TableCell>-</TableCell>}
                {!isWaiting && <TableCell>-</TableCell>}
            </TableRow>
            ))
    )
}