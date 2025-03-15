import { useState } from "react";
import { Button, Grid2, Paper, Typography } from "@mui/material";
import AttendanceForm from "../Attendance/AttendanceForm";
import AttendeesList from "../Attendance/AttendeesList";
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import AddAttendee from "../Attendance/AddAttendee";


type Props = {
    activity: Activity
}
export default function ActivityDetailsAttendees({ activity }: Props) {
    const [checkAtt, setCheckAtt] = useState(false);
    const [addAtt, setAddAtt] = useState(false);

    return ( //TODO: ARREGLAR VISUALS
        <Paper sx={{ mb: 2 }}>
            <Grid2 container alignItems="center" pl={3} py={2}>
                <Grid2 size={0.60}>
                    <PeopleAltIcon color="info" fontSize="large" />
                </Grid2>
                <Grid2 size={6.5}>
                    <Typography variant="h4">ASSISTÈNCIA</Typography>
                </Grid2>
                {!addAtt &&
                    <>
                        <Grid2 size={2.5}>
                            {!checkAtt && <Button variant="outlined" onClick={() => setAddAtt(true)} sx={{ display: "block" }}>
                                Afegeix participant</Button>}
                        </Grid2>
                        <Grid2 size={2}>
                            <Button variant="contained" onClick={() => setCheckAtt(!checkAtt)} sx={{ display: "block" }}>
                                {checkAtt ? "Cancel·la" : "Passa llista"}</Button>
                        </Grid2>
                    </>
                }
            </Grid2>
            <Grid2 container alignItems="center" pl={3} py={0.75} pr={3} sx={{ display: "block" }}>
                {checkAtt
                    ? <AttendanceForm activity={activity} setCheckAtt={setCheckAtt} />
                    : !addAtt
                        ? <AttendeesList activity={activity} />
                        : <AddAttendee activity={activity} setAddAtt={setAddAtt} />

                }
            </Grid2>
        </Paper>
    )
}