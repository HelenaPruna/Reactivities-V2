import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, ListItemIcon, ListItemText, Menu, MenuItem } from "@mui/material";
import { MouseEvent, useState } from "react";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';

type Props = {
    delActivity: () => void
}

export default function DeleteComponent({ delActivity }: Props) {
    const [open, setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const openMenu = Boolean(anchorEl);

    const handleClick = (event: MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);
    return (
        <>
            <IconButton
                aria-label="more"
                aria-controls={openMenu ? 'long-menu' : undefined}
                aria-expanded={openMenu ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleClick}
            >
                <MoreVertIcon />
            </IconButton>
            <Menu
                MenuListProps={{
                    'aria-labelledby': 'long-button',
                }}
                anchorEl={anchorEl}
                open={openMenu}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}

                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}

            >
                <MenuItem component="dialog" onClick={(e) => {
                    e.currentTarget.blur();
                    setOpen(true);
                    handleClose();
                }}>
                    <ListItemIcon>
                        <DeleteIcon color="error" />
                    </ListItemIcon>
                    <ListItemText>ELIMINAR</ListItemText>
                </MenuItem>
            </Menu>
            <Dialog onClose={() => setOpen(false)} open={open}>
                <DialogTitle>Estàs segura d'eliminar el taller?</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Aquesta acció no es pot desfer.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" onClick={() => setOpen(false)}>Cancel·la</Button>
                    <Button onClick={() => { delActivity(); setOpen(false) }} color="error">El·limina</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}