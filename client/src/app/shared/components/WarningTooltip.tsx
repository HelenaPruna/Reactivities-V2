import WarningIcon from '@mui/icons-material/Warning';
import { Chip, Tooltip } from '@mui/material';

type Props = {
    title: string
}
export default function WarningTooltip({ title }: Props) {
    return (
        <Tooltip color='primary' title={title} placement='right'>
            <Chip icon={<WarningIcon color='warning' />} sx={{
                backgroundColor: 'white', padding: 0,
                "& .MuiChip-label": {
                    padding: 0,
                },
                "& .MuiChip-icon": {
                    marginLeft: 0,
                    marginRight: 0,
                }
            }} />
        </Tooltip>
    )
}