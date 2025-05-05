import { Add, Event, FilterList, Search } from "@mui/icons-material";
import { Box, Button, Checkbox, Divider, FormControlLabel, InputAdornment, ListItemText, MenuItem, MenuList, Paper, TextField, Typography } from "@mui/material";
import Calendar from "react-calendar";
import { useStore } from "../../../lib/hooks/useStore";
import { observer } from "mobx-react-lite";
import { useAccount } from "../../../lib/hooks/useAccount";
import { NavLink } from "react-router";

const ActivityFilters = observer(function ActivityFilters() {
    const { activityStore: { setFilter, setStartDate, filter, startDate, searchTerm, setSearchTerm, includeCancelled, setIncludeCancelled } } = useStore();
    const { currentUser } = useAccount()

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, borderRadius: 3 }}>
            {currentUser?.role === 'Admin' && (
                <Button
                    component={NavLink}
                    to="/createActivity"
                    variant="contained"
                    startIcon={<Add />}
                    sx={{ p: 1, fontSize: '1.1rem', borderRadius: 3 }}
                    
                >
                    Crea un taller nou
                </Button>
            )}
            <Paper sx={{ p: 3, borderRadius: 3 }}>
                <Box mb={2}>
                    <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', mb: 2, color: 'primary.main' }}>
                        <Search sx={{ mr: 1 }} />
                        Cerca els tallers
                    </Typography>
                    <TextField
                        fullWidth
                        variant="outlined"
                        value={searchTerm}
                        placeholder="Escriu per cercar..."
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
                <Box sx={{ width: '100%' }}>
                    {currentUser?.role !== "Observer" && <Typography variant="h6"
                        sx={{ display: 'flex', alignItems: 'center', mb: 1, color: 'primary.main' }}
                    >
                        <FilterList sx={{ mr: 1 }} />
                        Filtres
                    </Typography>}
                    {currentUser?.role !== "Observer" && <MenuList>
                        <MenuItem
                            selected={filter === 'all'}
                            onClick={() => setFilter('all')}
                        >
                            <ListItemText primary='Tots els tallers' />
                        </MenuItem>
                        <MenuItem
                            selected={filter === 'isOrganizing'}
                            onClick={() => setFilter('isOrganizing')}
                        >
                            <ListItemText primary="Sóc organitzadora" />
                        </MenuItem>
                        {currentUser?.role === "Admin" && <MenuItem
                            selected={filter === 'isCreator'}
                            onClick={() => setFilter('isCreator')}
                        >
                            <ListItemText primary="Sóc la creadora" />
                        </MenuItem>}
                    </MenuList>}
                    <Divider sx={{ mb: 1 }} />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={includeCancelled}
                                onChange={e => setIncludeCancelled(e.target.checked)}
                            />
                        }
                        label="Inclou tallers cancel·lats"
                    />
                </Box>
            </Paper>

            <Box component={Paper} sx={{ width: '100%', p: 3, borderRadius: 3 }}>
                <Typography variant="h6"
                    sx={{ display: 'flex', alignItems: 'center', mb: 1, color: 'primary.main' }}>
                    <Event sx={{ mr: 1 }} />
                    Filtra per data
                </Typography>
                <Calendar value={startDate} onChange={date => setStartDate(date as Date)} locale="ca" />
            </Box>
        </Box>
    )
})

export default ActivityFilters;