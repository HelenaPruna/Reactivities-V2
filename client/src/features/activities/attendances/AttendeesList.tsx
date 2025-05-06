import { Button, Grid2, Skeleton, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tabs, Typography } from "@mui/material";
import { SyntheticEvent, useState } from "react";
import WarningTooltip from "../../../app/shared/components/WarningTooltip";
import { useAttendees } from "../../../lib/hooks/useAttendees";
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import { useAccount } from "../../../lib/hooks/useAccount";
import AttendeesTable from "./AttendeesTable";

const tabs = [
    { menuItem: 'Participants', key: false },
    { menuItem: 'Llista d\'espera', key: true },
];

type Props = {
    activity: Activity
    setAddAtt: (bool: boolean) => void
    setIsFull: (integer: number) => void
}

export default function AttendeesList({ activity, setAddAtt, setIsFull }: Props) {
    const [activeTab, setActiveTab] = useState(0);
    const [isWaiting, setIsWaiting] = useState<boolean>(false);
    const { activityAttendees, loadingAttendees, deleteAttendee, activateAttendee } = useAttendees(activity.id, isWaiting)
    const { currentUser } = useAccount()


    const handleChange = (_: SyntheticEvent, newValue: number) => {
        setActiveTab(newValue);
        setIsWaiting(tabs[newValue].key)
    }

    const deleteAtt = (attendeeId: string) => {
        deleteAttendee.mutate(attendeeId)
        setIsFull(-1)

    }

    const activateAtt = (attendeeId: string) => activateAttendee.mutate(attendeeId)

    return (
        <>
            <Grid2 container alignItems={'center'} justifyContent='space-between'>
                <Grid2>
                    <Tabs value={activeTab} onChange={handleChange} >
                        {tabs.map((tab, index) => (
                            <Tab label={tab.menuItem} key={index} />
                        ))}
                    </Tabs>
                </Grid2>
                <Grid2>
                    <Button variant="outlined" onClick={() => { setAddAtt(true); }} startIcon={<PersonAddAlt1Icon />}>Afegeix participant</Button>
                </Grid2>
            </Grid2>
            <TableContainer sx={{ height: 440, mt: 2, mb: 2, border: '1px solid rgba(0,0,0,0.12)' }}>
                <Table stickyHeader size='small'>
                    <TableHead>
                        <TableRow>
                            <TableCell>NOM</TableCell>
                            {!isWaiting && <TableCell>FALTES</TableCell>}
                            <TableCell>COMENTARIS</TableCell>
                            {currentUser?.role !== 'Observer' && <TableCell></TableCell>}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {loadingAttendees 
                            ? (
                                <TableRow key={0}>
                                    <TableCell component="th" scope="row"><Skeleton variant="text" /></TableCell>
                                    <TableCell><Skeleton variant="text" /></TableCell>
                                    <TableCell><Skeleton variant="text" /></TableCell>
                                    {!isWaiting && <TableCell><Skeleton variant="text" /></TableCell>}
                                </TableRow>
                            ) : activityAttendees && <AttendeesTable activityAttendees={activityAttendees} isWaiting={isWaiting} allowedMissedDays={activity.allowedMissedDays} activateAtt={activateAtt} deleteAtt={deleteAtt} />
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            <Grid2 ml={1} mb={2}>
                {!isWaiting
                    ? <Typography component='div' variant="body2">Participants: {activityAttendees?.length} / {activity.maxParticipants} {activityAttendees !== undefined && activityAttendees.length > activity.maxParticipants &&
                        <WarningTooltip title={'Hi ha més participants que places ofertes'} />}</Typography>

                    : <Typography variant="body2">Total: {activityAttendees?.length}</Typography>}
            </Grid2>
        </>
    )
}