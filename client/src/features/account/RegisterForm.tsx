import { useForm } from "react-hook-form";
import { useAccount } from "../../lib/hooks/useAccount";
import { registerSchema, RegisterSchema } from "../../lib/schemas/registerSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Paper, Typography } from "@mui/material";
import { LockOpen } from "@mui/icons-material";
import TextInput from "../../app/shared/components/TextInput";
import SelectInput from "../../app/shared/components/SelectInput";
import { roleOptions } from "../activities/form/selectOptions";

export default function RegisterForm() {
    const { registerUser } = useAccount();
    const { control, handleSubmit, setError, formState: { isValid, isSubmitting } } = useForm<RegisterSchema>({
        mode: 'onTouched',
        resolver: zodResolver(registerSchema)
    });

    const paramLanguage = "La contrasenya ha de tenir: Mínim 6 caràcters, un número (0 - 9), una minúscula (a - z), una majúscula (A-Z) i un caràcter especial"

    const onSubmit = async (data: RegisterSchema) => {
        await registerUser.mutateAsync(data, {
            onError: (error) => {
                if (Array.isArray(error)) {
                    error.forEach((err) => {
                        if (err.includes('Email')) setError('email', { message: 'Aquest correu ja està registrat' });
                        else if (err.includes('Password')) setError('password', { message: paramLanguage });
                        else if (err.includes('Role')) setError('role', { message: 'Hi hagut un problema assignant el rol' });
                    })
                }
            }
        });
    }

    return (
        <Paper
            component='form'
            onSubmit={handleSubmit(onSubmit)}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                p: 3,
                gap: 3,
                maxWidth: 'md',
                mx: 'auto',
                borderRadius: 3
            }}
        >
            <Box display='flex' alignItems='center' justifyContent='center' gap={3} color='secondary.main'>
                <LockOpen fontSize="large" />
                <Typography variant="h4">Registra a un nou usuari</Typography>
            </Box>
            <TextInput label='Email*' control={control} name='email' />
            <TextInput label='Nom a mostrar*' control={control} name='displayName' />
            <TextInput label='Contrasenya*' type='password' control={control} name='password' />
            <Box>
                <Typography variant="h6" gutterBottom>
                    Quins privilegis té cada rol?
                </Typography>
                <Box component="ul" sx={{ pl: 2, my:0 }}>
                    <li>
                        <Typography variant="body1" sx={{mb: 1}}>
                            <strong>Observador:</strong> pot veure tota la informació i només fer sol·licituds.
                        </Typography>
                    </li>
                    <li>
                        <Typography variant="body1" sx={{mb: 1}}>
                            <strong>Organitzador:</strong> totes les accions d'Observador, més gestionar, editar i eliminar participants de les activitats on és organitzador, i crear reserves per a la rentadora.
                        </Typography>
                    </li>
                    <li>
                        <Typography variant="body1">
                            <strong>Administratiu:</strong> totes les accions d'Organitzador, més crear i gestionar activitats, gestionar reserves de sales, i crear nous usuaris.
                        </Typography>
                    </li>
                </Box>
            </Box>
            <SelectInput label='Assigna un rol*' control={control} items={roleOptions} name="role" />
            <Button
                type='submit'
                disabled={!isValid || isSubmitting}
                variant="contained"
                size="large"
            >
                Acceptar
            </Button>
        </Paper>
    )
}