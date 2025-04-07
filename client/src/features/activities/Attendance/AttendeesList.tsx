import { Box, Button, Grid2, Skeleton, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tabs, Typography } from "@mui/material";
import { SyntheticEvent, useState } from "react";
import WarningTooltip from "../../../app/shared/components/WarningTooltip";
import { useAttendees } from "../../../lib/hooks/useAttendees";
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import { attendeeSchema, AttendeeSchema } from "../../../lib/schemas/attendeeSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import TextInput from "../../../app/shared/components/TextInput";
import CheckBoxInput from "../../../app/shared/components/CheckBoxInput";
import AttendeesTable from "./AttendeesTable";

const tabs = [
    { menuItem: 'Participants', key: false },
    { menuItem: 'Llista d\'espera', key: true },
];

type Props = {
    activity: Activity
    addingAtt: (bool: boolean) => void
    setIsFull: (integer: number) => void
}

export default function AttendeesList({ activity, addingAtt, setIsFull }: Props) {
    const [activeTab, setActiveTab] = useState(0);
    const [isWaiting, setIsWaiting] = useState<boolean>(false);
    const [addAtt, setAddAtt] = useState(false);
    const { activityAttendees, loadingAttendees, refetchingAttendees, deleteAttendee, activateAttendee, addAttendee } = useAttendees(activity.id, isWaiting)


    const handleChange = (_: SyntheticEvent, newValue: number) => {
        setActiveTab(newValue);
        setIsWaiting(tabs[newValue].key)
    }

    const { control, handleSubmit, reset } = useForm<AttendeeSchema>({
        mode: 'onTouched',
        resolver: zodResolver(attendeeSchema),
        defaultValues: { isWaiting: activity.maxParticipants <= activity.numberAttendees }
    });

    const deleteAtt = (attendeeId: string) => {
        deleteAttendee.mutate(attendeeId)
        reset({ isWaiting: activity.maxParticipants <= activityAttendees!.length - 1 })
        setIsFull(-1)

    }

    const activateAtt = (attendeeId: string) => activateAttendee.mutate(attendeeId)
    const onSubmit = (data: AttendeeSchema) => {
        addAttendee.mutate(data, {
            onSettled: () => {
                setAddAtt(false)
                reset({ isWaiting: activity.maxParticipants <= activityAttendees!.length + 1 })
                setIsFull(1)
                addingAtt(false)
            }
        })

    }

    return (
        <>{!addAtt ?
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
                        <Button variant="outlined" onClick={() => { setAddAtt(true); addingAtt(true) }} startIcon={<PersonAddAlt1Icon />}>Afegeix participant</Button>
                    </Grid2>
                </Grid2>
                <TableContainer sx={{ maxHeight: 440, mt: 2, mb: 2, border: '1px solid rgba(0,0,0,0.12)' }}>
                    <Table stickyHeader size='small'>
                        <TableHead>
                            <TableRow>
                                <TableCell>NOM</TableCell>
                                {!isWaiting && <TableCell>FALTES</TableCell>}
                                <TableCell>COMENTARIS</TableCell>
                                <TableCell></TableCell>
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
            </> :
            <Grid2 container alignItems="center" paddingBottom={3}>
                <Grid2 size={6.5}>
                    <Typography variant="h5" gutterBottom color="primary">
                        Afegeix participant
                    </Typography>
                </Grid2>
                <Grid2 component='form' onSubmit={handleSubmit(onSubmit)} display='flex' flexDirection='column' gap={3} size={14}>
                    <Grid2 display='flex' justifyContent='space-between' gap={2}>
                        <Grid2 size={4}>
                            <TextInput required label='Nom identificatiu' control={control} name='identifier' />
                        </Grid2>
                        <TextInput label='Comentaris' control={control} name='comments' />
                        <CheckBoxInput label="Llista d'espera" control={control} name="isWaiting" />
                    </Grid2>
                    <Box display='flex' justifyContent='end' gap={2}>
                        <Button onClick={() => { setAddAtt(false); reset(); addingAtt(false) }} variant="outlined" color="error">Cancel·la</Button>
                        <Button type="submit" color="success" variant="contained">Crea</Button>
                    </Box>
                </Grid2>
            </Grid2>
        }
        </>
    )
}