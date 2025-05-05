import { observer } from "mobx-react-lite"
import { useStore } from "../../lib/hooks/useStore";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { Paper, Button, Stack, Typography, IconButton, Dialog, DialogTitle, Box } from "@mui/material";
import { formatDateOnly } from "../../lib/util/util";
import { Add } from "@mui/icons-material";
import { useLaundry } from "../../lib/hooks/useLaundry";
import { useState } from "react";
import { useForm } from "react-hook-form";
import TextInput from "../../app/shared/components/TextInput";
import DateTimeInput from "../../app/shared/components/DateTimeInput";
import CheckBoxInput from "../../app/shared/components/CheckBoxInput";
import { laundrySchema, LaundrySchema } from "../../lib/schemas/laundrySchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAccount } from "../../lib/hooks/useAccount";


const LaundryFilters = observer(function LaundryFilters() {
    const { laundryStore: { startDate, endDate, setDate } } = useStore()
    const [open, setOpen] = useState(false);
    const { bookLaundry } = useLaundry(true)
    const { currentUser } = useAccount()


    const { control, handleSubmit, reset, formState: { isDirty, isValid } } = useForm<LaundrySchema>({
        mode: 'onTouched',
        resolver: zodResolver(laundrySchema)
    });

    const onSubmit = (data: LaundrySchema) => {
        bookLaundry.mutate(data)
        setOpen(false)
        reset()
    }

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
                {currentUser?.role !== "Observer" &&
                    <IconButton onClick={(e) => { e.currentTarget.blur(); setOpen(true) }}
                        color="primary" sx={{ fontSize: 18, position: "absolute", right: 20,  top: "50%", transform: "translateY(-50%)" }} >
                        <Add />
                        Afegeix reserva
                    </IconButton>}
            </Paper>
            <Dialog onClose={() => { reset(); setOpen(false) }} open={open} sx={{ p: 3 }}>
                <DialogTitle>Ageixeix reserva</DialogTitle>
                <Box component="form" display='flex' flexDirection='column' onSubmit={handleSubmit(onSubmit)} gap={1} pt={1} px={4} pb={4}>
                    <TextInput label="Nom" control={control} name="name" />
                    <DateTimeInput label="Data" control={control} name="start" />
                    <CheckBoxInput label="Reserva recurrent? Si marques es farà la reserva per 10 setmanes" control={control} name="isRecurrent" />
                    <Box display='flex' justifyContent='end' gap={3}>
                        <Button type="submit" variant="contained" disabled={!isDirty || !isValid}>
                            Confirma
                        </Button>
                        <Button color="inherit" onClick={() => { reset(); setOpen(false) }}>
                            Cancel·la
                        </Button>
                    </Box>

                </Box>
            </Dialog>
        </>

    )
})

export default LaundryFilters;