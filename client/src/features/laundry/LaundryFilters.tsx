import { observer } from "mobx-react-lite"
import { useStore } from "../../lib/hooks/useStore";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { Paper, Button, Stack, Typography, IconButton } from "@mui/material";
import { formatDateOnly } from "../../lib/util/util";
import { Add } from "@mui/icons-material";
import { useState } from "react";
import { useAccount } from "../../lib/hooks/useAccount";
import RequestForm from "../requests/RequestForm";
import LaundryForm from "./LaundryForm";


const LaundryFilters = observer(function LaundryFilters() {
    const { laundryStore: { startDate, endDate, setDate } } = useStore()
    const [open, setOpen] = useState(false);
    const [openReq, setOpenReq] = useState(false);
    const { currentUser } = useAccount()

    return (
        <>
            <Paper sx={{
                position: "relative",
                p: 2, borderRadius: 3, display: "flex"
            }}>
                <Stack direction="row" spacing={1} alignItems="center"
                    sx={{ width: "100%", justifyContent: "center" }}>
                    <Button variant="outlined" onClick={() => setDate(false)} sx={{ minWidth: 40, px: 1}} >
                        <KeyboardArrowLeftIcon />
                    </Button>
                    <Typography variant="h6" color="primary">
                        {"Setmana: " + formatDateOnly(startDate.toString()) + " - " + formatDateOnly(endDate.toString())}
                    </Typography>
                    <Button variant="outlined" onClick={() => setDate()} sx={{ minWidth: 40, px: 1 }} >
                        <KeyboardArrowRightIcon />
                    </Button>
                </Stack>
                {currentUser?.role === "Admin" &&
                    <IconButton onClick={(e) => { e.currentTarget.blur(); setOpen(true) }}
                        color="primary" sx={{ fontSize: 18, position: "absolute", right: 20,  top: "50%", transform: "translateY(-50%)" }} >
                        <Add />
                        Afegeix reserva
                    </IconButton>}
                {currentUser?.role === "Observer" &&
                    <IconButton onClick={(e) => { e.currentTarget.blur(); setOpenReq(true) }}
                        color="primary" sx={{ fontSize: 18, position: "absolute", right: 20,  top: "50%", transform: "translateY(-50%)" }} >
                        <Add />
                         Fes sol·licitud de rentadora
                    </IconButton>}
            </Paper>
            <LaundryForm open={open} onClose={() => setOpen(false)} />
            <RequestForm open={openReq} onClose={() => setOpenReq(false)} isFromActivity={false} />
        </>

    )
})

export default LaundryFilters;