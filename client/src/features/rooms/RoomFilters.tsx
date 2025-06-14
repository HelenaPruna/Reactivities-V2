import { Button, ButtonGroup, Paper, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useStore } from "../../lib/hooks/useStore";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { formatDateOnly } from "../../lib/util/util";

const RoomFilters = observer(function RoomFilters() {
  const {
    roomStore: { setView, viewType, setDates, startDate, endDate },
  } = useStore();

  return (
    <Paper sx={{ p: 2, borderRadius: 3, position: "relative", display: "flex", alignItems: "center" }}>
      <ButtonGroup>
        <Button variant="outlined" onClick={() => setDates(viewType[1], false)}><KeyboardArrowLeftIcon/></Button>
        <Button variant={viewType[0] === "Dia" ? "contained" : "outlined"} onClick={() => setView(["Dia", 1])}>Dia</Button>
        <Button variant={viewType[0] === "Setmana" ? "contained" : "outlined"} onClick={() => setView(["Setmana", 6])}>Setmana</Button>
        <Button onClick={() => setDates(viewType[1], true)}><KeyboardArrowRightIcon/></Button>
      </ButtonGroup>
      <Typography variant="h6" color="primary" sx={{ position: "absolute", left: "50%", transform: "translateX(-50%)", pointerEvents: "none" }}>
        {viewType[0] === "Dia"
          ? formatDateOnly(startDate, "withWeekday")
          : `${formatDateOnly(startDate)} - ${formatDateOnly(endDate)}`}
      </Typography>
    </Paper>
  );
});

export default RoomFilters;
