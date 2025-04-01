import { SyntheticEvent, useEffect, useState } from "react";
import { Box, Card, CardContent, Grid2, Tab, Tabs, Typography } from "@mui/material";
import { Link, useParams } from "react-router";
import { useProfiles } from "../../lib/hooks/useProfiles.ts";
import { formatDateOnly } from "../../lib/util/util.ts";

type Props = {
    stringAction: string
}

export default function ProfileActivities({stringAction}: Props) {
    const [activeTab, setActiveTab] = useState(0);
    const { id } = useParams();
    const { userActivities, setFilter, loadingUserActivities } = useProfiles(id);

    useEffect(() => {
        setFilter(stringAction)
    }, [setFilter, stringAction])

    const tabs = [
        { menuItem: 'Activitats actuals', key: stringAction },
        { menuItem: 'Activitats pasades', key:  stringAction + 'Past' },
    ];

    const handleTabChange = (_: SyntheticEvent, newValue: number) => {
        setActiveTab(newValue);
        setFilter(tabs[newValue].key);
    };

    return (
        <Box>
            <Grid2 container spacing={2}>
                <Grid2 size={12}>
                    <Tabs
                        value={activeTab}
                        onChange={handleTabChange}
                    >
                        {tabs.map((tab, index) => (
                            <Tab label={tab.menuItem} key={index} />
                        ))}
                    </Tabs>
                </Grid2>
            </Grid2>
            {(!userActivities || userActivities.length === 0) && !loadingUserActivities ? (
                <Typography mt={2}>
                    No activities to show
                </Typography>
            ) : null}
            <Grid2 container spacing={2} sx={{ marginTop: 2, height: 400, overflow: 'auto' }}>
                {userActivities && userActivities.map((activity: Activity) => (
                    <Grid2 size={2} key={activity.id}>
                        <Link to={`/activities/${activity.id}`} style={{ textDecoration: 'none' }}>
                            <Card elevation={4}>
                                <CardContent> {/* TODO: arreglar el visuals */}
                                    <Typography variant="h6" textAlign="center" mb={1}>
                                        {activity.title}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        textAlign="center"
                                        display='flex'
                                        flexDirection='column'
                                    >
                                        <span>{ formatDateOnly(activity.dateStart)}</span>
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Link>
                    </Grid2>
                ))}
            </Grid2>
        </Box>
    )
}