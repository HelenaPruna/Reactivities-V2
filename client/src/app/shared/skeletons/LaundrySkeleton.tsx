import { Box, Grid2, Paper, Skeleton, Stack } from "@mui/material";

export default function LaundrySkeleton() {
    return (
        <Grid2 pb={4}>
            <Paper sx={{
                position: "relative",
                p: 2, borderRadius: 3, display: "flex"
            }}>
                <Stack direction="row" spacing={1} alignItems="center"
                    sx={{ width: "100%", height: 36, justifyContent: "center" }}>
                    <Skeleton variant="text" width={570} height={55} />
                </Stack>
                <Skeleton variant="text" width={200} height={30} sx={{position: 'absolute', right: 20, top: "50%", transform: "translateY(-50%)"}} />
            </Paper>
            <Paper elevation={3} sx={{ p: 2, borderRadius: 2, overflow: 'hidden', mt: 2 }}>
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: '60px repeat(5, 1fr)',
                        gridTemplateRows: '40px 600px',
                    }}
                >
                    <Box />
                    {[...Array(5)].map((_, idx) => (
                        <Box
                            key={idx}
                            sx={{
                                borderLeft: 1,
                                borderColor: 'divider',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <Skeleton variant="text" width={120} height={40} />
                        </Box>
                    ))}
                    <Box sx={{ gridColumn: 1, gridRow: 2, position: 'relative' }}>
                        {[...Array(12)].map((_, i) => (
                            <Skeleton
                                key={i}
                                variant="text"
                                width={30}
                                height={20}
                                sx={{
                                    position: 'absolute',
                                    top: 40 + i * 50,
                                    left: 4,
                                }}
                            />
                        ))}
                    </Box>
                    {[...Array(5)].map((_, colIdx) => (
                        <Box
                            key={colIdx}
                            sx={{
                                gridColumn: colIdx + 2,
                                gridRow: 2,
                                borderLeft: 1,
                                borderColor: 'divider',
                            }}
                        >
                            {[...Array(12)].map((__, row) => (
                                <Box
                                    key={row}
                                    sx={{
                                        height: 50,
                                        borderBottom: 1,
                                        borderColor: 'divider',
                                    }}
                                />
                            ))}
                        </Box>
                    ))}
                </Box>
            </Paper>
        </Grid2>
    )
}