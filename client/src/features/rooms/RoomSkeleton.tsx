import { Box, Card, CardHeader, Skeleton, CardContent } from "@mui/material";

type Props = {
    grid: string
    placeholder: number
}

export default function RoomSkeleton({grid, placeholder}:Props) {
    return (
        <Box sx={{
            display: "grid",
            gap: 3,
            gridTemplateColumns: grid,
            mt: 2
        }}>
            {Array.from({ length: placeholder * 2 }).map((_, idx) => (
                <Card key={idx} sx={{ borderRadius: 3 }}>
                    <CardHeader
                        title={<Skeleton width="20%" />}
                        subheader={<Skeleton width="10%" />}
                    />
                    <CardContent sx={{ pt: 0, height:420, display: 'flex',flexDirection: 'column', justifyContent: 'flex-end' }}>
                        <Skeleton width="30%" sx={{ mt: 1}} />
                    </CardContent>
                </Card>
            ))}
        </Box>
    )
}