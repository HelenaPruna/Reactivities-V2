import { Event, FilterList, Search } from "@mui/icons-material";
import { Box, Checkbox, Divider, FormControlLabel, InputAdornment, ListItemText, MenuItem, MenuList, Paper, TextField, Typography } from "@mui/material";
import Calendar from "react-calendar";
import { useStore } from "../../../lib/hooks/useStore";
import { observer } from "mobx-react-lite";

const ActivityFilters = observer(function ActivityFilters() {
    const { activityStore: { setFilter, setStartDate, filter, startDate, searchTerm, setSearchTerm, includeCancelled, setIncludeCancelled } } = useStore();
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, borderRadius: 3 }}>
            <Paper sx={{ p: 3, borderRadius: 3 }}>
                <Box mb={2}>
                    <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', mb: 2, color: 'primary.main' }}>
                        <Search sx={{ mr: 1 }} />
                        Cerca activitats
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
                    <Typography variant="h6"
                        sx={{ display: 'flex', alignItems: 'center', mb: 1, color: 'primary.main' }}
                    >
                        <FilterList sx={{ mr: 1 }} />
                        Filtres
                    </Typography>
                    <MenuList>
                        <MenuItem
                            selected={filter === 'all'}
                            onClick={() => setFilter('all')}
                        >
                            <ListItemText primary='Totes les activitats' />
                        </MenuItem>
                        <MenuItem
                            selected={filter === 'isOrganizing'}
                            onClick={() => setFilter('isOrganizing')}
                        >
                            <ListItemText primary="Activitats que organitzo" />
                        </MenuItem>
                        <MenuItem
                            selected={filter === 'isCreator'}
                            onClick={() => setFilter('isCreator')}
                        >
                            <ListItemText primary="Activitats que he creat" />
                        </MenuItem>
                    </MenuList>
                    <Divider sx={{mb: 2}} />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={includeCancelled}
                                onChange={e => setIncludeCancelled(e.target.checked)}
                            />
                        }
                        label="Inclou activitats cancel·lades"
                    />
                </Box>
            </Paper>

            <Box component={Paper} sx={{ width: '100%', p: 3, borderRadius: 3 }}>
                <Typography variant="h6"
                    sx={{ display: 'flex', alignItems: 'center', mb: 1, color: 'primary.main' }}>
                    <Event sx={{ mr: 1 }} />
                    Sel·lecciona una data
                </Typography>
                <Calendar value={startDate} onChange={date => setStartDate(date as Date)} locale="ca" />
            </Box>
        </Box>
    )
})

export default ActivityFilters;