import { useState } from "react";
import { useStore } from "../../lib/hooks/useStore"
import { Add } from "@mui/icons-material";
import { Paper, IconButton, FormControlLabel, Checkbox, ButtonGroup, Button, Stack } from "@mui/material";
import RequestForm from "./RequestForm";
import { observer } from "mobx-react-lite";
import { useAccount } from "../../lib/hooks/useAccount";


const RequestFilters = observer(function RequestFilters() {
    const { requestStore: { filter, myRequests, myActReqs, setFilter, setMyRequests, setMyActReqs } } = useStore()
    const [open, setOpen] = useState(false)
    //només es carrega la llista d'activitats la primera vegada
    const [hasLoadedForm, setHasLoadedForm] = useState(false);
    const { currentUser } = useAccount()

    const handleOpen = () => {
        setHasLoadedForm(true);  
        setOpen(true);           
    };

    return (
        <>
            <Paper sx={{ position: "relative", p: 2, borderRadius: 3, display: "flex" }}>
                <Stack direction="row" spacing={1} alignItems="center" >
                    <ButtonGroup>
                        <Button variant={filter === 0 || filter === undefined ? 'contained' : 'outlined'} onClick={() => setFilter(0)}>Pendents</Button>
                        <Button variant={filter === 1 ? 'contained' : 'outlined'} onClick={() => setFilter(1)}>Aprovades</Button>
                        <Button variant={filter === 2 ? 'contained' : 'outlined'} onClick={() => setFilter(2)}>Denegades</Button>
                    </ButtonGroup>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={myRequests ?? false}
                                onChange={e => setMyRequests(e.target.checked)}
                                size="small"
                            />
                        }
                        label="LES MEVES SOL·LICITUDS"
                    />
                    {currentUser?.role !== "Observer" && <FormControlLabel
                        control={
                            <Checkbox
                                checked={myActReqs ?? false}
                                onChange={e => setMyActReqs(e.target.checked)}
                                size="small"
                            />
                        }
                        label="ELS TALLERS QUE ORGANITZO"
                    />}
                </Stack>
                <IconButton onClick={(e) => { e.currentTarget.blur(); handleOpen() }} color="primary"
                    sx={{ fontSize: 18, position: "absolute", right: 20 }}>
                    <Add />
                    Crea una sol·licitud nova
                </IconButton>
            </Paper>
            {hasLoadedForm && <RequestForm open={open} onClose={() => setOpen(false)} />}
        </>
    )
})

export default RequestFilters;