import { useForm } from "react-hook-form";
import { requestSchema, RequestSchema } from "../../lib/schemas/requestSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import TextInput from "../../app/shared/components/TextInput";
import SelectInput from "../../app/shared/components/SelectInput";
import { requestTypeOptions } from "../activities/form/selectOptions";
import { useRequests } from "../../lib/hooks/useRequests";
import { Dialog, DialogTitle, Box, Button, Skeleton } from "@mui/material";
import SearchableSelect from "../../app/shared/components/SearchableSelect";

type Props = {
    open: boolean;
    onClose: () => void;
    isFromActivity?: boolean
    activityId?: string
}

export default function RequestForm({ open, onClose, isFromActivity = false, activityId }: Props) {
    const { addRequest, actOptions, loadingActOpt } = useRequests(true, isFromActivity)

    const { control, handleSubmit, reset, formState: { isDirty, isValid } } = useForm<RequestSchema>({
        mode: 'onTouched',
        resolver: zodResolver(requestSchema)
    })

    if (loadingActOpt) return (
        <Dialog onClose={() => { reset(); onClose() }} open={open}
            slotProps={{ paper: { style: { width: '800px' } }, container: { style: { height: '70%' } } }}
        >
            <DialogTitle sx={{ pt: 3, textAlign: 'center' }} color="secondary.main">CREA UNA SOL·LICITUD</DialogTitle>
            <Box display="flex" flexDirection="column" gap={2} pt={1} px={4} pb={4} >
                <Skeleton variant="rectangular" height={56} />
                <Skeleton variant="rectangular" height={148} />
                <Skeleton variant="rectangular" height={56} />
                <Box display="flex" justifyContent='end' gap={3}>
                    <Skeleton variant="rectangular" width={106.03} height={36.5} />
                    <Skeleton variant="rectangular" width={93.61} height={36.5} />
                </Box>
            </Box>
        </Dialog>
    )

    const options: { text: string, value: string }[] = (actOptions ?? []).map(x => ({ text: x.title, value: x.id }))

    const onSubmit = (data: RequestSchema) => {
        if (isFromActivity) data.activityId = activityId;
        addRequest.mutate(data)
        reset()
        onClose()
    }

    return (
        <Dialog open={open}
            slotProps={{ paper: { style: { width: '800px' } }, container: { style: { height: '70%' } } }}
        >
            <DialogTitle sx={{ pt: 3, textAlign: 'center' }} color="secondary.main">CREA UNA SOL·LICITUD</DialogTitle>
            <Box component="form" display='flex' flexDirection='column' onSubmit={handleSubmit(onSubmit)} gap={2} pt={1} px={4} pb={4}>
                <SelectInput label="Sel·lecciona el tipus de sol·licitud *" control={control} items={requestTypeOptions} name='type' value={0} />
                <TextInput label='Descripció *' control={control} name='message' multiline rows={5} />
                {!isFromActivity && <SearchableSelect label="Taller (opcional)" control={control} items={options} name='activityId' />}
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