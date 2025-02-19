import { useForm } from "react-hook-form";
import { useAccount } from "../../lib/hooks/useAccount";
import { registerSchema, RegisterSchema } from "../../lib/schemas/registerSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Paper, Typography } from "@mui/material";
import { LockOpen } from "@mui/icons-material";
import TextInput from "../../app/shared/components/TextInput";
import { Link  } from "react-router";

export default function RegisterForm() {
    const { registerUser } = useAccount();
    const { control, handleSubmit, setError, formState: {isValid, isSubmitting} } = useForm<RegisterSchema>({
        mode: 'onTouched',
        resolver: zodResolver(registerSchema)
    });

    const paramLanguage = "La contrasenya ha de tenir: Mínim 6 caràcters, un número (0 - 9), una minúscula (a - z), una majúscula (A-Z) i un caràcter especial"

    const onSubmit = async (data: RegisterSchema) => {
        await registerUser.mutateAsync(data, {
            onError: (error) => {
                if (Array.isArray(error)) {
                    error.forEach((err) => { 
                        if (err.includes('Email')) setError('email', {message: 'Aquest correu ja està registrat'});
                        else if (err.includes('Password')) setError('password', { message: paramLanguage });
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
            <Box display='flex' alignItems='center' justifyContent='center' 
                gap={3} color='secondary.main'>
                <LockOpen fontSize="large" />
                <Typography variant="h4">Registra't</Typography>
            </Box>
            <TextInput label='Email' control={control} name='email' />
            <TextInput label='Nom a mostrar' control={control} name='displayName' />
            <TextInput label='Contrasenya' type='password' control={control} name='password' />
            <Button 
                type='submit' 
                disabled={!isValid || isSubmitting}
                variant="contained"
                size="large"
            >
                Acceptar
            </Button>
            <Typography sx={{ textAlign: 'center' }} >
                Ja tens un compte? 
                <Typography sx={{ml: 1}} component={Link} to={'/login'} color="primary">
                    Inicia sessió!
                </Typography>
            </Typography>
        </Paper>
    )
}