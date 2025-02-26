import { Avatar, Box, Grid2, Paper, Stack, Typography } from "@mui/material";
import { stringAvatar } from "../../lib/util/util";

type Props = {
    profile: Profile
}

export default function ProfileHeader({ profile }: Props) {
    return (
        <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
            <Grid2 container spacing={2}>
                <Grid2 size={8}>
                    <Stack direction='row' spacing={3} alignItems='center'>
                        <Avatar
                            sx={{ width: 75, height: 75, fontSize: 'xx-large', ...stringAvatar(profile.displayName).sx }}
                            children={stringAvatar(profile.displayName).children}
                        />
                        <Box display='flex' flexDirection='column' gap={2}>
                            <Typography variant="h4">{profile.displayName}</Typography>
                        </Box>
                    </Stack>
                </Grid2>
            </Grid2>
        </Paper>
    )
}