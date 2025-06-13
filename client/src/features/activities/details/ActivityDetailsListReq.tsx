import { HourglassEmpty, CheckCircle, Cancel } from "@mui/icons-material";
import { Box, Divider, List, ListItem, ListItemText, Paper, Typography } from "@mui/material"
import dayjs from 'dayjs';
import { Fragment } from "react/jsx-runtime";
import { useAccount } from "../../../lib/hooks/useAccount";
import ActionsRequest from "../../requests/ActionsRequest";

type Props = {
    requests: RequestSol[]
    activityId: string
}

export default function ActivityDetailsListReq({ requests, activityId }: Props) {
    const { currentUser } = useAccount()

    const icons = [
        <HourglassEmpty color="warning" fontSize="small" />,
        <CheckCircle color="success" fontSize="small" />,
        <Cancel color="error" fontSize="small" />
    ]
    const typeLabels = ['Abonar diners', 'Comprar', 'Reserva sala', 'Rentadora', 'Participants', 'Altres']

    return (
        <Paper><List disablePadding>
            {requests.map((r, index) => (
                <Fragment key={r.id}>
                    <ListItem alignItems="flex-start">
                        <ListItemText
                            primary={
                                <Box display="flex" justifyContent="space-between" alignItems="center">
                                    <Box display="flex" alignItems="center" gap={1} >
                                        {icons[r.state]}
                                        <Typography variant="subtitle1" alignItems='center'>
                                            {typeLabels[r.type] ?? r.type}
                                        </Typography>
                                    </Box>
                                    <Typography variant="caption" color="textSecondary">
                                        {r.requestedBy.displayName}, {dayjs(r.dateCreated).locale('ca').format('DD-MM')}
                                    </Typography>
                                </Box>
                            }
                            secondary={
                                <Typography
                                    variant="body2"
                                    color="textPrimary"
                                    sx={{ mb: 0.5 }}
                                >
                                    {r.message}
                                </Typography>

                            }
                        />

                        {currentUser?.role === "Admin" &&
                            <ActionsRequest reqId={r.id} activityId={activityId} state={r.state} />
                        }
                    </ListItem>
                    {index < requests.length - 1 && <Divider component="li" />}
                </Fragment>

            ))}
        </List></Paper>
    )
}