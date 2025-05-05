import { Add } from "@mui/icons-material";
import { Grid2, IconButton, Paper, Skeleton, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useNavigate } from "react-router";
import { useAccount } from "../../lib/hooks/useAccount";
import ActionsUsers from "./ActionsUsers";

export default function UsersPage() {
    const navigate = useNavigate()
    const { usersList, loadingUsers, currentUser } = useAccount(true);

    const roleLabel = (role: string) => role === 'Admin' ? "Administrador" : role === 'Regular' ? 'Organitzador' : 'Observador'


    return (
        <Grid2 pb={4}>
            <Paper sx={{ mx: 'auto', maxWidth: 'md', position: "relative", p: 2, borderRadius: 3, display: "flex" }}>
                <Stack width='100%' alignItems='center' justifyContent='center'>
                    <Typography variant="h5" color="secondary">USUARIS</Typography>
                </Stack>
                <IconButton onClick={() => navigate('/register')}
                    color="primary" sx={{ fontSize: 18, position: "absolute", right: 20, top: "50%", transform: "translateY(-50%)" }} >
                    <Add />
                    Crea un nou usuari
                </IconButton>
            </Paper>
            <Paper sx={{ mx: 'auto', maxWidth: 'md', mt: 2, maxHeight: 720,  p:1 }}>
                <TableContainer sx={{maxHeight: 700}} ><Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell>ESTAT</TableCell>
                            <TableCell>TIPUS</TableCell>
                            <TableCell>ROL</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {loadingUsers ? (
                            Array.from({ length: 10 }, (_, i) => (
                                <TableRow key={i} >
                                    <TableCell component="th" scope="row">
                                        <Skeleton variant="text" />
                                    </TableCell>
                                    <TableCell>
                                        <Skeleton variant='text' />
                                    </TableCell>
                                    <TableCell>
                                        <Skeleton variant='text' />
                                    </TableCell>
                                    <TableCell align="right">
                                        <Skeleton variant='circular' />
                                    </TableCell>
                                </TableRow>
                            ))
                        ) :
                            usersList && usersList.length > 0 ? (
                                usersList.map(u => (
                                    <TableRow key={u.id} hover>
                                        <TableCell>{u.displayName}</TableCell>
                                        <TableCell>{u.email}</TableCell>
                                        <TableCell>{roleLabel(u.role)}</TableCell>
                                        <TableCell align='right'>
                                            {currentUser?.id !== u.id && <ActionsUsers userId={u.id} />}
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) :
                                <Typography>
                                    Hi hagut algun problema carregant els usuaris prova a recarregar la pàgina o en un altre moment
                                </Typography>
                        }
                    </TableBody>
                </Table></TableContainer>
            </Paper>

        </Grid2>
    )
}