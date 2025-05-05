import { Paper, Grid2, Stack, Skeleton, Box, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";

export default function ProfilePageSkeleton() {
    return (
        <><Paper elevation={3} sx={{ p: 4, borderRadius: 3, mb: 2 }}>
            <Grid2 container spacing={2}>
                <Grid2 size={8}>
                    <Stack direction="row" spacing={3} alignItems="center">
                        <Skeleton variant="circular" width={75} height={75} />
                        <Box display="flex" flexDirection="column" gap={2}>
                            <Skeleton variant="text" width={200} height={40} />
                        </Box>
                    </Stack>
                </Grid2>
            </Grid2>
        </Paper>
            <Box
                component={Paper}
                mt={2}
                p={3}
                elevation={3}
                height={600}
                sx={{ display: 'flex', alignItems: 'flex-start', borderRadius: 3 }}
            >
                <Box width={275} p={3} height={550} display={"flex"} flexDirection={"column"} gap={3} sx={{borderRight: 1, borderColor: 'divider'}} >
                    <Skeleton variant="rectangular" />
                    <Skeleton variant="rectangular" />
                </Box>

                <Box sx={{ flexGrow: 1, p: 2, pt: 0 }}>
                    <Box display='flex' flexDirection='row' pt={2} pl={1} gap={2}>
                        <Skeleton variant="text" width={150} />
                        <Skeleton variant="text" width={120} />
                    </Box>
                    <TableContainer sx={{ maxHeight: 500, overflowY: 'auto', mt: 2 }}>
                        <Table stickyHeader>
                            <TableHead>
                                <TableRow>
                                    {[...Array(3)].map((_, idx) => (
                                        <TableCell key={idx} align="center">
                                            <Skeleton variant="text" width={100} />
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {[...Array(5)].map((_, row) => (
                                    <TableRow key={row}>
                                        {[...Array(3)].map((__, col) => (
                                            <TableCell key={col} align="center">
                                                <Skeleton variant="text" width={120} />
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </Box>
        </>
    )
}