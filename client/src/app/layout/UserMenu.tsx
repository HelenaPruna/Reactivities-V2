import { Avatar, Box, ListItemIcon, ListItemText } from '@mui/material';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
import { useAccount } from '../../lib/hooks/useAccount';
import { Logout } from '@mui/icons-material';
import { stringAvatar } from '../../lib/util/util';

export default function UserMenu() {
    const {currentUser, logoutUser} = useAccount()

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <Button
                onClick={handleClick}
                color='inherit'
                size='large'
                sx={{ fontSize: '1.1rem' }}
            >
                <Box display='flex' alignItems='center' gap={2} >
                    {currentUser !== undefined &&  
                        <Avatar
                            sx={{ fontSize: 'inherit', ...stringAvatar(currentUser.displayName).sx }}
                            children={stringAvatar(currentUser.displayName).children}
                        />
                    }
                    {currentUser?.displayName}
                </Box>
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={() => {
                    logoutUser.mutate();
                    handleClose();
                }}>
                    <ListItemIcon>
                        <Logout />
                    </ListItemIcon>
                    <ListItemText>Tanca sessió</ListItemText>
                </MenuItem>
            </Menu>
        </>
    );
}
