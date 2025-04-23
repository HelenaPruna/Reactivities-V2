import { Box, Card, CardHeader, Skeleton, Divider, CardContent, Stack, CardActions } from "@mui/material";

export default function ActivitySkeleton() {
    return (
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 3, mt: 2 }}>
            {Array.from({ length: 12 }).map((_, idx) => (
                <Card key={idx} sx={{ borderRadius: 3 }}>
                    <CardHeader
                        avatar={<Skeleton variant="circular" width={50} height={50} />}
                        title={<Skeleton variant="text" width="60%" height={32} />}
                        subheader={<Skeleton variant="text" width="40%" height={20} />}
                    />
                    <Divider />
                    <CardContent sx={{ p: 0 }}>
                        <Skeleton variant="rectangular" width="100%" height={64} />
                    </CardContent>
                    <CardContent sx={{ px: 3, py: 1 }}>
                        <Stack direction="row" spacing={4}>
                            <Skeleton variant="text" width="30%" />
                            <Skeleton variant="text" width="20%" />
                        </Stack>
                    </CardContent>
                    <CardActions sx={{ px: 3, pb: 2 }}>
                        <Skeleton variant="rectangular" width="100%" height={36} sx={{ borderRadius: 3 }} />
                    </CardActions>
                </Card>
            ))}
        </Box>
    )
}