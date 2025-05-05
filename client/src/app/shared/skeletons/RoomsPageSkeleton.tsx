import { Grid2, Paper, Skeleton, Stack } from "@mui/material";
import RoomSkeleton from "../../../features/rooms/RoomSkeleton";

export default function RoomsPageSkeleton() {
    return (
        <Grid2 pb={4}>
            <Paper sx={{
                position: "relative",
                p: 2, borderRadius: 3, display: "flex"
            }}>
                <Stack direction="row" spacing={1} alignItems="center"
                    sx={{ width: "100%", height: 36}}>
                    <Skeleton variant="text" width={275} height={60} />
                </Stack>
                <Skeleton variant="text" width={300} height={35} sx={{ position: "absolute", left: "50%", transform: "translateX(-50%)"}} />
            </Paper>
            <RoomSkeleton grid="repeat(5, 1fr)" placeholder={5} />
        </Grid2>
    )
}