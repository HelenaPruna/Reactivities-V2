import { Box, Paper, Tab, Tabs } from "@mui/material";
import { SyntheticEvent, useState } from "react"

import ProfileActivities from "./ProfileActivities";


export default function ProfileContent() {
  const [value, setValue] = useState(0);

  const handleChange = (_: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  }

  const tabContent = [
    {label: 'Activitats organitzades', content: <ProfileActivities stringAction="organizing" />},
    {label: 'Activitats creades', content: <ProfileActivities stringAction="creator" />},
  ]

  return (
    <Box
      component={Paper}
      mt={2}
      p={3}
      elevation={3}
      height={600}
      sx={{display: 'flex', alignItems: 'flex-start', borderRadius: 3}}
    >
      <Tabs
        orientation="vertical"
        value={value}
        onChange={handleChange}
        sx={{borderRight: 1, height: 550, minWidth: 200}}
      >
        {tabContent.map((tab, index) => (
          <Tab key={index} label={tab.label} sx={{mr: 3}} />
        ))}
      </Tabs>
      <Box sx={{flexGrow: 1, p: 3, pt: 0}}>
        {tabContent[value].content}
      </Box>
    </Box>
  )
}