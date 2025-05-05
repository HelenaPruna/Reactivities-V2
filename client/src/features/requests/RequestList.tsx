import { Box, Typography, Link as MuiLink, Skeleton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useRequests } from "../../lib/hooks/useRequests"
import { observer } from 'mobx-react-lite';
import ActionsRequest from './ActionsRequest';
import { useAccount } from '../../lib/hooks/useAccount';

const RequestList = observer(function RequestList() {
    const { requests, loadingRequests } = useRequests()
    const { currentUser } = useAccount();

    const stateLabels = ['Pendents', 'Aprovades', 'Denegades']
    const typeLabels = ['Abonar diners', 'Comprar', 'Reserva sala', 'Altres']

    return (
        <TableContainer component={Paper} sx={{ mt: 2 }}><Table>
            <TableHead>
                <TableRow>
                    <TableCell>ESTAT</TableCell>
                    <TableCell>TIPUS</TableCell>
                    <TableCell>MISSATGE</TableCell>
                    <TableCell>SOL·LICITAT PER</TableCell>
                    <TableCell>DATA CREACIÓ</TableCell>
                    <TableCell>APROVADA PER</TableCell>
                    <TableCell>DATA APROVACIÓ</TableCell>
                    <TableCell>TALLER</TableCell>
                    <TableCell></TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {loadingRequests ? (
                    // Render skeleton rows while loading
                    [1, 2, 3].map((idx) => (
                        <TableRow key={idx}>
                            {Array(9)
                                .fill(0)
                                .map((_, i) => (
                                    <TableCell key={i}>
                                        <Skeleton variant="text" />
                                    </TableCell>
                                ))}
                        </TableRow>
                    ))
                ) : requests && requests.length > 0 ? (
                    requests.map((r: RequestSol) => (
                        <TableRow key={r.id} hover>
                            <TableCell>{stateLabels[r.state] ?? r.state}</TableCell>
                            <TableCell>{typeLabels[r.type] ?? r.type}</TableCell>
                            <TableCell>{r.message}</TableCell>
                            <TableCell>{r.requestedBy.displayName}</TableCell>
                            <TableCell>
                                {new Date(r.dateCreated).toLocaleDateString('ca-ES')}
                            </TableCell>
                            <TableCell>
                                {r.approvedBy ? r.approvedBy.displayName : '—'}
                            </TableCell>
                            <TableCell>
                                {r.dateApproved
                                    ? new Date(r.dateApproved).toLocaleDateString('ca-ES')
                                    : '—'}
                            </TableCell>
                            <TableCell>
                                {r.activityId && r.activityTitle ? (
                                    <MuiLink
                                        href={`/activities/${r.activityId}`}
                                        underline="hover"
                                    >
                                        {r.activityTitle}
                                    </MuiLink>
                                ) : (
                                    '—'
                                )}
                            </TableCell>
                            <TableCell align='right'>
                                {(currentUser?.role === 'Admin' || currentUser?.id === r.requestedBy.id) && <ActionsRequest reqId={r.id} />}
                            </TableCell>
                        </TableRow>
                    ))
                ) : (
                    // Render empty state row
                    <TableRow>
                        <TableCell colSpan={9} align="center">
                            <Box p={2}>
                                <Typography variant="body1" color="textSecondary">
                                    No hi ha sol·licituds per mostrar.
                                </Typography>
                            </Box>
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table></TableContainer>
    );
})

export default RequestList;