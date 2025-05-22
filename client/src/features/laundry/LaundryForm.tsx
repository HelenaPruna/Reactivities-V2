import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogTitle, Box, Button } from "@mui/material";
import { useForm } from "react-hook-form";
import CheckBoxInput from "../../app/shared/components/CheckBoxInput";
import DateTimeInput from "../../app/shared/components/DateTimeInput";
import TextInput from "../../app/shared/components/TextInput";
import { useLaundry } from "../../lib/hooks/useLaundry";
import { LaundrySchema, laundrySchema } from "../../lib/schemas/laundrySchema";

type Props = {
    open: boolean
    onClose: () => void
    laundryBooking?: LaundryBooking
}
export default function LaundryForm({open, onClose, laundryBooking}: Props) {
    const { bookLaundry, editBooking } = useLaundry(true)
    const { control, handleSubmit, reset, formState: { isDirty, isValid } } = useForm<LaundrySchema>({
        mode: 'onTouched',
        resolver: zodResolver(laundrySchema),
        defaultValues: laundryBooking || {}
    });

    const onSubmit = (data: LaundrySchema) => {
        if (laundryBooking) editBooking.mutate({...laundryBooking, ...data})
        else bookLaundry.mutate(data)
        onClose()
        reset()
    }
    return (
        <Dialog onClose={() => { reset(); onClose() }} open={open} sx={{ p: 3}}>
            <DialogTitle>{laundryBooking ? "Edita la reserva" : "Crea una reserva"}</DialogTitle>
            <Box component="form" display='flex' flexDirection='column' onSubmit={handleSubmit(onSubmit)} width={586} gap={1} pt={1} px={4} pb={4}>
                <TextInput label="Nom" control={control} name="name" />
                <DateTimeInput label="Data" control={control} name="start" />
                {!laundryBooking && <CheckBoxInput label="Reserva recurrent? Si marques es farà la reserva per 10 setmanes" control={control} name="isRecurrent" />}
                <Box display='flex' justifyContent='end' gap={3}>
                    <Button type="submit" variant="contained" disabled={!isDirty || !isValid}>
                        Confirma
                    </Button>
                    <Button color="inherit" onClick={() => { reset(); onClose() }}>
                        Cancel·la
                    </Button>
                </Box>
            </Box>
        </Dialog>
    )
}