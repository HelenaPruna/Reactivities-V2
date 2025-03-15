import { Grid2, Skeleton, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tabs } from "@mui/material";
import { SyntheticEvent, useEffect, useState } from "react";
import WarningSkipped from "../../../app/shared/components/WarningSkipped";
import DeleteAttendee from "./DeleteAttendee";
import { useAttendees } from "../../../lib/hooks/useAttendees";


type Props = {
    activity: Activity
}

export default function AttendeesList({ activity }: Props) {
    const [activeTab, setActiveTab] = useState(0);
    const [isWaiting, setIsWaiting] = useState(false);
    const { activityAttendees, loadingAttendees, refetchingAttendees } = useAttendees(activity.id, isWaiting)

    useEffect(() => {
        setIsWaiting(false)
    }, [setIsWaiting])

    const handleChange = (_: SyntheticEvent, newValue: number) => {
        setActiveTab(newValue);
        setIsWaiting(tabs[newValue].key)
    }

    const tabs = [
        { menuItem: 'Participants', key: false },
        { menuItem: 'Llista d\'espera', key: true },
    ];

    return (
        <>
            <Grid2 container spacing={2} py={1}>
                <Tabs value={activeTab} onChange={handleChange} >
                    {tabs.map((tab, index) => (
                        <Tab label={tab.menuItem} key={index} />
                    ))}
                </Tabs>
            </Grid2>
            <TableContainer>
                <Table stickyHeader aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>NOM</TableCell>
                            {!isWaiting && <TableCell>FALTES</TableCell>}
                            <TableCell>COMENTARIS</TableCell>
                            <TableCell>Accions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {loadingAttendees || refetchingAttendees
                            ? (
                                <TableRow key={0} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell component="th" scope="row"><Skeleton variant="text" /></TableCell>
                                    <TableCell><Skeleton variant="text" /></TableCell>
                                    <TableCell><Skeleton variant="text" /></TableCell>
                                    {!isWaiting && <TableCell><Skeleton variant="text" /></TableCell>}
                                </TableRow>
                            ) : (activityAttendees && activityAttendees.length > 0
                                ? activityAttendees.map((att) => (
                                    <TableRow key={att.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                        <TableCell component="th" scope="row">{att.identifier}</TableCell>
                                        {!isWaiting && <TableCell >
                                            <Grid2 container alignItems="center" gap={1}>
                                                {att.skippedDays}{att.skippedDays >= activity.allowedMissedDays &&
                                                    <WarningSkipped maxFaltes={activity.allowedMissedDays} />}
                                            </Grid2>
                                        
                                        </TableCell>}
                                        <TableCell >{att.comments || "-"}</TableCell>
                                        <TableCell><DeleteAttendee activity={activity} attendee={att} isWaiting={isWaiting!} /></TableCell>
                                    </TableRow>
                                ))
                                : (<TableRow key={0} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell component="th" scope="row">-</TableCell>
                                    <TableCell>-</TableCell>
                                    <TableCell>-</TableCell>
                                    {!isWaiting && <TableCell>-</TableCell>}
                                </TableRow>
                                ))
                        }
                    </TableBody>
                    {!isWaiting
                        ? <caption>Participants: {activityAttendees?.length} / {activity.maxParticipants}</caption>
                        : <caption>Total: {activityAttendees?.length}</caption>}
                </Table>
            </TableContainer>
        </>
    )
}