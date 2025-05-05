import { Box, Divider, Grid2, Paper, Skeleton } from "@mui/material";
import ActivityCardSkeleton from "../../../features/activities/dashboard/ActivityCardSkeleton";

export default function ActivitiesDashboardSkeleton() {
    return (
        <Grid2 container spacing={3}>
            <Grid2 size={9} pb={4}>
                <ActivityCardSkeleton />
            </Grid2>
            <Grid2 size={3} sx={{ position: 'sticky', top: 112, alignSelf: 'flex-start' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, borderRadius: 3 }}>
                    <Skeleton variant="rectangular" height={50} sx={{ borderRadius: 3 }} />
                    <Paper sx={{ p: 3, borderRadius: 3 }}>
                        <Box mb={2}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                                <Skeleton variant="circular" width={22} height={22} />
                                <Skeleton variant="text" width={120} height={35}/>
                            </Box>
                            <Skeleton variant="rectangular" width="100%" height={50} sx={{ borderRadius: 2 }} />
                        </Box>
                        <Box sx={{ width: '100%' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                                <Skeleton variant="circular" width={24} height={24} />
                                <Skeleton variant="text" width={100} height={40}/>
                            </Box>
                            {[...Array(3)].map((_, idx) => (
                                <Skeleton key={idx} variant="rectangular" width="100%" height={32} sx={{ mb: 1, borderRadius: 1 }} />
                            ))}
                            <Divider sx={{ mb: 1 }} />
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                                <Skeleton variant='rectangular' width={24} height={24} />
                                <Skeleton variant="text" width={120} height={30}/>
                            </Box>
                        </Box>
                    </Paper>

                    <Box component={Paper} sx={{ width: '100%', p: 3, borderRadius: 3, mb: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                            <Skeleton variant="circular" width={24} height={24} />
                            <Skeleton variant="text" width={120} height={35} />
                        </Box>
                        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 1 }}>
                            {[...Array(35)].map((_, idx) => (
                                <Skeleton key={idx} variant="rectangular" width="100%" height={40} sx={{ borderRadius: 1 }} />
                            ))}
                        </Box>
                    </Box>
                </Box>
            </Grid2>
        </Grid2>
    )
}