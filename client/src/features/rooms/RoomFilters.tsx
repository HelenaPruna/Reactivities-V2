import { Button, ButtonGroup, Grid2, Paper, Typography } from "@mui/material";
import { useStore } from "../../lib/hooks/useStore";
import { observer } from "mobx-react-lite";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { FilterList } from "@mui/icons-material";
import { formatDateOnly } from "../../lib/util/util";

const RoomFilters = observer(function RoomFilters() {
    const { roomStore: { setView, viewType, setDates, startDate, endDate } } = useStore();
    return (

        <Paper sx={{ p: 3, borderRadius: 3, direction: 'row' }}>
            <Grid2 container gap={3}>
                <Grid2>
                    <Typography variant="h6"
                        sx={{ display: 'flex', alignItems: 'center', color: 'primary.main' }}
                    >
                        <FilterList sx={{ mr: 1 }} />
                        Vista
                    </Typography>
                </Grid2>
                <Grid2>
                    <ButtonGroup>
                        <Button variant="outlined" onClick={() => setDates(viewType[1], false)}><KeyboardArrowLeftIcon /></Button>
                        <Button variant={viewType[0] === 'Dia' ? "contained" : "outlined"} onClick={() => setView(["Dia", 1])}>Dia</Button>
                        <Button variant={viewType[0] === 'Setmana' ? "contained" : "outlined"} onClick={() => setView(["Setmana", 7])}>Setmana</Button>
                        <Button onClick={() => setDates(viewType[1], true)}><KeyboardArrowRightIcon /></Button>
                    </ButtonGroup>
                </Grid2>
                <Grid2>
                    <Typography variant="h6">
                        {viewType[0] === 'Dia'
                            ? "Dia: " + formatDateOnly(startDate, "withWeekday")
                            : "Setmana: " + formatDateOnly(startDate) + " - " + formatDateOnly(endDate)}
                    </Typography>
                </Grid2>
            </Grid2>

        </Paper>

    )
})

export default RoomFilters;