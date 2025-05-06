import { Box, Divider, Grid2, Paper, Skeleton } from "@mui/material";

export default function LaundrySkeleton() {
    return (
        <Grid2 pb={4}>
            <Paper sx={{
                position: "relative",
                borderRadius: 3, display: "flex",
                height: 68
            }}>
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
                                    top: 40 + i * 100,
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
                                position: "relative"
                            }}
                        >
                            {Array.from({ length: 12 }, (_, i) => (
                                <Divider
                                    key={i}
                                    sx={{
                                        position: "absolute",
                                        top: 40 + i * 60 * 560 / 660,
                                        width: "100%",
                                        opacity: 0.3,
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