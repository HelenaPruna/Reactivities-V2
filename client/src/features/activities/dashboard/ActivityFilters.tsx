import { Event, FilterList } from "@mui/icons-material";
import { Box, ListItemText, MenuItem, MenuList, Paper, Typography } from "@mui/material";
import Calendar from "react-calendar";
import { useStore } from "../../../lib/hooks/useStore";
import { observer } from "mobx-react-lite";

const ActivityFilters = observer(function ActivityFilters() {
    const { activityStore: { setFilter, setStartDate, filter, startDate } } = useStore();
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, borderRadius: 3 }}>
            <Paper sx={{ p: 3, borderRadius: 3 }}>
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