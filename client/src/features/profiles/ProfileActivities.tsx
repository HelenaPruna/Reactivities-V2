import { SyntheticEvent, useEffect, useState } from "react";
import { Box, Grid2, Skeleton, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tabs, Typography } from "@mui/material";
import { Link, useParams } from "react-router";
import { useProfiles } from "../../lib/hooks/useProfiles.ts";
import { formatDateOnly } from "../../lib/util/util.ts";

type Props = {
    stringAction: string
}

export default function ProfileActivities({ stringAction }: Props) {
    const [activeTab, setActiveTab] = useState(0);
    const { id } = useParams();
    const { userActivities, setFilter, loadingUserActivities } = useProfiles(id);

    useEffect(() => {
        setFilter(stringAction)
        setActiveTab(0);
    }, [setFilter, stringAction])

    const tabs = [
        { menuItem: 'Activitats actuals', key: stringAction },
        { menuItem: 'Activitats pasades', key: stringAction + 'Past' },
    ];

    const handleTabChange = (_: SyntheticEvent, newValue: number) => {
        setActiveTab(newValue);
        setFilter(tabs[newValue].key);
    };

    return (
        <Box>
            <Grid2 container spacing={2}>
                <Grid2 size={12}>
                    <Tabs value={activeTab} onChange={handleTabChange}>
                        {tabs.map((tab, index) => (
                            <Tab label={tab.menuItem} key={index} />
                        ))}
                    </Tabs>
                </Grid2>
            </Grid2>
            <TableContainer sx={{ maxHeight: 500, overflowY: "auto", scrollbarGutter: "stable" }}>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">
                                <Typography variant="subtitle1" fontWeight="bold">ACTIVITATS</Typography>
                            </TableCell>
                            <TableCell align="center">
                                <Typography variant="subtitle1" fontWeight="bold">DATA INICIAL</Typography>
                            </TableCell>
                            <TableCell align="center">
                                <Typography variant="subtitle1" fontWeight="bold">DATA FINAL</Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    {(!userActivities || userActivities.length === 0) && !loadingUserActivities ? (
                        <Typography mt={2}>No hi ha cap activitat en aquesta categoria</Typography>
                    ) :
                        loadingUserActivities ?
                            <TableBody>
                                <TableRow key={0}>
                                    <TableCell component="th" scope="row"><Skeleton variant="text" /></TableCell>
                                    <TableCell><Skeleton variant="text" /></TableCell>
                                    <TableCell><Skeleton variant="text" /></TableCell>
                                </TableRow>
                            </TableBody>
                            :
                            <TableBody>
                                {userActivities && userActivities.map((activity: Activity) => (
                                    <TableRow key={activity.id}>
                                        <TableCell align="center">
                                            <Link to={`/activities/${activity.id}`} style={{ width: "100%", textDecoration: 'none', color: 'inherit' }}>
                                                <Typography variant="body2">{activity.title.toLocaleUpperCase()}</Typography>
                                            </Link>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Typography variant="body2">
                                                {formatDateOnly(activity.dateStart)}
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Typography variant="body2">
                                                {activity.dateEnd && formatDateOnly(activity.dateEnd)}
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                    }
                </Table>
            </TableContainer>
        </Box >
    )
}