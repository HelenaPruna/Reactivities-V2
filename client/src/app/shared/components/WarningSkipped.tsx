import WarningIcon from '@mui/icons-material/Warning';
import { Tooltip } from '@mui/material';

type Props = {
    maxFaltes: number
}
export default function WarningSkipped({maxFaltes} : Props) {
    return (
        <Tooltip color='primary' title={'Aquest participant ha faltat més de '+ maxFaltes + ' vegades'} placement='right'>
            <WarningIcon sx={{ verticalAlign: 'center'}} color='warning' />
        </Tooltip>
    )
}