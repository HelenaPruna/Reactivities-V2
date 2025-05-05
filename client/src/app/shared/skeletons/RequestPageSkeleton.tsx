import { Grid2, Paper, Skeleton, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

export default function RequestPageSkeleton() {
    return (
        <Grid2 pb={4}>
            <Paper sx={{ height: 70, position: "relative", p: 2, borderRadius: 3, display: "flex" }}>
                <Stack direction="row" alignItems="center" >
                    <Skeleton variant="text" width={120} height={55} />
                    <Skeleton variant="text" width={120} height={55} />
                    <Skeleton variant="text" width={120} height={55} sx={{ mr: 2 }} />
                    <Skeleton variant='rectangular' width={20} height={20} sx={{ mr: 1 }} />
                    <Skeleton variant="text" width={200} height={40} sx={{ mr: 2 }} />
                    <Skeleton variant='rectangular' width={20} height={20} sx={{ mr: 1 }} />
                    <Skeleton variant="text" width={200} height={40} />
                </Stack>
                <Stack direction="row" alignItems="center" >
                    <Skeleton variant="text" width={200} height={55} sx={{ position: 'absolute', right: 20 }} />
                </Stack>
            </Paper>
            <TableContainer component={Paper} sx={{ mt: 2 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell><Skeleton variant="text" width={40} /></TableCell>
                            <TableCell><Skeleton variant="text" width={40} /></TableCell>
                            <TableCell><Skeleton variant="text" width={250} /></TableCell>
                            <TableCell><Skeleton variant="text" width={100} /></TableCell>
                            <TableCell><Skeleton variant="text" width={100} /></TableCell>
                            <TableCell><Skeleton variant="text" width={100} /></TableCell>
                            <TableCell><Skeleton variant="text" width={100} /></TableCell>
                            <TableCell><Skeleton variant="text" width={80} /></TableCell>
                            <TableCell align="right"><Skeleton variant="circular" width={24} height={24} /></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {[...Array(10)].map((_, rowIdx) => (
                            <TableRow key={rowIdx}>
                                {[...Array(9)].map((__, colIdx) => (
                                    <TableCell key={colIdx}>
                                        <Skeleton variant="text" />
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Grid2>
    )
}