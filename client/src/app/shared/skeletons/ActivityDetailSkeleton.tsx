import { Box, Paper, Skeleton, Tabs, Tab, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Grid2 } from '@mui/material';

export default function ActivityDetailSkeleton() {
    return (
        <Grid2 container spacing={3}>
            <Grid2 size={8.5}>
                <Paper sx={{ mb: 2, p: 2 }}>
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Box display="flex" alignItems="center" gap={2}>
                            <Skeleton variant="text" width={200} height={40} />
                            <Skeleton variant="rectangular" width={80} height={32} />
                        </Box>
                        <Box sx={{ display: 'flex', gap: 2 }}>
                            <Skeleton variant="rectangular" width={100} height={36} />
                            <Skeleton variant="rectangular" width={120} height={36} />
                            <Skeleton variant="circular" width={36} height={36} />
                        </Box>
                    </Box>
                </Paper>

                {/* Info Skeleton */}
                <Paper sx={{ flex: 1, p: 4, mb: 2 }}>
                    <Box display="flex" flexDirection="column" gap={2}>
                        {[...Array(6)].map((_, idx) => (
                            <Box key={idx}>
                                <Skeleton variant="text" width={`60%`} />
                                <Skeleton variant="text" width={`40%`} />
                                <Skeleton variant="rectangular" height={1} />
                            </Box>
                        ))}
                    </Box>
                </Paper>

                {/* Attendees Skeleton */}
                <Paper sx={{ mb: 8, height: 650, p: 2 }}>
                    <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
                        <Skeleton variant="circular" width={40} height={40} />
                        <Skeleton variant="text" width={120} />
                        <Skeleton variant="rectangular" width={140} height={32} />
                    </Box>

                    <Box>
                        <Tabs value={0} sx={{ mb: 2 }}>
                            <Tab label={<Skeleton width={80} />} />
                            <Tab label={<Skeleton width={80} />} />
                        </Tabs>
                        <Box display="flex" justifyContent="flex-end" mb={1}>
                            <Skeleton variant="rectangular" width={160} height={36} />
                        </Box>
                        <TableContainer sx={{ height: 440, border: '1px solid rgba(0,0,0,0.12)' }}>
                            <Table size="small">
                                <TableHead>
                                    <TableRow>
                                        <TableCell><Skeleton width={60} /></TableCell>
                                        <TableCell><Skeleton width={60} /></TableCell>
                                        <TableCell><Skeleton width={60} /></TableCell>
                                        <TableCell><Skeleton width={40} /></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {[...Array(5)].map((_, row) => (
                                        <TableRow key={row}>
                                            {[...Array(4)].map((__, col) => (
                                                <TableCell key={col}><Skeleton /></TableCell>
                                            ))}
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <Box mt={2}>
                            <Skeleton variant="text" width={200} />
                        </Box>
                    </Box>
                </Paper>
            </Grid2>

            {/* Sidebar Skeleton */}
            <Grid2 size={3.5}>
                <Box display="flex" flexDirection="column" gap={2}>
                    {[...Array(4)].map((_, idx) => (
                        <Paper key={idx} sx={{ p: 2 }}>
                            <Skeleton variant="text" width={`80%`} />
                            {idx === 0 && <Skeleton variant="rectangular" width={24} height={24} />}
                        </Paper>
                    ))}
                </Box>
            </Grid2>
        </Grid2>
    );
}
