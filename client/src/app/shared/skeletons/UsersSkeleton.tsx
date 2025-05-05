import { Grid2, Paper, Stack, Skeleton, IconButton, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";

export default function UsersSkeleton() {
    return (
        <Grid2 pb={4}>
            <Paper sx={{ height:64,  mx: 'auto', maxWidth: 'md', position: 'relative', p: 2, borderRadius: 3, display: 'flex' }}>
                <Stack width='100%' alignItems='center' justifyContent='center'>
                    <Skeleton variant='rectangular' width={140} height={120} sx={{borderRadius: 2}} />
                </Stack>
                <IconButton sx={{ position: 'absolute', right: 20, top: '50%', transform: 'translateY(-50%)' }}>
                    <Skeleton variant='rectangular' width={150} height={35} sx={{borderRadius: 40}} />
                </IconButton>
            </Paper>

            <TableContainer component={Paper} sx={{ mx: 'auto', maxWidth: 'md', mt: 2 }}>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                        <TableCell><Skeleton variant="text" width={80} /></TableCell>
                        <TableCell><Skeleton variant="text" width={80} /></TableCell>
                        <TableCell><Skeleton variant="text" width={80} /></TableCell>
                        <TableCell><Skeleton variant="circular" width={24} height={24}/></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Array.from({ length: 10 }).map((_, row) => (
                            <TableRow key={row}>
                                <TableCell>
                                    <Skeleton variant="text" width={100} />
                                </TableCell>
                                <TableCell>
                                    <Skeleton variant="text" width={150} />
                                </TableCell>
                                <TableCell>
                                    <Skeleton variant="text" width={120} />
                                </TableCell>
                                <TableCell align="right">
                                    <Skeleton variant="text" width={24} height={24} />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Grid2>
    )
}