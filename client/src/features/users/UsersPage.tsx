import { Add, Search } from "@mui/icons-material";
import { Box, Grid2, IconButton, InputAdornment, Paper, Skeleton, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router";
import { useAccount } from "../../lib/hooks/useAccount";
import ActionsUsers from "./ActionsUsers";
import { useStore } from "../../lib/hooks/useStore";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";

const UserPage = observer(function UsersPage() {
    const navigate = useNavigate()
    const { usersList, loadingUsers, currentUser } = useAccount(true);
    const { userStore: { searchTerm, setSearchTerm, resetFilters } } = useStore()

    const roleLabel = (role: string) => role === 'Admin' ? "Administrador" : role === 'Regular' ? 'Organitzador' : 'Observador'

    useEffect(() => {
        return () => resetFilters();
    }, [resetFilters]);

    return (
        <Grid2 pb={4}>
            <Paper sx={{ mx: 'auto', maxWidth: 'md', p: 2, borderRadius: 3, display: "flex" }}>
                <Box>
                    <TextField
                        value={searchTerm}
                        placeholder="Cercar..."
                        onChange={e => setSearchTerm(e.target.value)}
                        slotProps={{
                            input: {
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Search color="action" />
                                    </InputAdornment>
                                )
                            }
                        }}
                    />
                </Box>
                <Stack width='100%' alignItems='center' justifyContent='center'>
                    <Typography variant="h5" color="secondary">USUARIS</Typography>
                </Stack>
                <IconButton onClick={() => navigate('/register')}
                    color="primary" sx={{ fontSize: 18 }} >
                    <Add />
                    Crea un nou usuari
                </IconButton>
            </Paper>
            <Paper sx={{ mx: 'auto', maxWidth: 'md', mt: 2, height: 720, p: 1 }}>
                <TableContainer sx={{ maxHeight: 700 }} ><Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell>ESTAT</TableCell>
                            <TableCell>EMAIL</TableCell>
                            <TableCell>ROL</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {loadingUsers ? (
                            Array.from({ length: 20 }, (_, i) => (
                                <TableRow key={i} >
                                    <TableCell component="th" scope="row">
                                        <Skeleton variant="text" width={'50%'} />
                                    </TableCell>
                                    <TableCell>
                                        <Skeleton variant='text' width={'50%'} />
                                    </TableCell>
                                    <TableCell>
                                        <Skeleton variant='text' width={'50%'} />
                                    </TableCell>
                                    <TableCell align="right">
                                    </TableCell>
                                </TableRow>
                            ))
                        ) :
                            usersList && usersList.length > 0 && (
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
                            )
                        }
                    </TableBody>
                    {usersList && usersList.length === 0 &&
                        <Typography>
                            {searchTerm !== undefined
                                ? "No hi ha cap usuari amb aquest nom"
                                : "Hi hagut algun problema carregant els usuaris prova a recarregar la pàgina o en un altre moment"
                            }
                        </Typography>
                    }
                </Table></TableContainer>
            </Paper>

        </Grid2>
    )
})

export default UserPage;