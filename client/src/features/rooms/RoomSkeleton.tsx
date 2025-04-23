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
                        title={<Skeleton width="60%" />}
                        subheader={<Skeleton width="40%" />}
                    />
                    <CardContent sx={{ pt: 0 }}>
                        {/* Calendar placeholder */}
                        <Skeleton
                            variant="rectangular"
                            width="100%"
                            height={365}
                        />
                        {/* Capacity placeholder */}
                        <Skeleton width="30%" sx={{ mt: 1 }} />
                    </CardContent>
                </Card>
            ))}
        </Box>
    )
}