import { MoreVert, Delete } from "@mui/icons-material";
import { IconButton, Menu, MenuItem, ListItemIcon, ListItemText, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from "@mui/material";
import { MouseEvent, useState } from "react";
import { useAccount } from "../../lib/hooks/useAccount";

type Props = {
    userId: string
}
export default function ActionsUsers({ userId }: Props) {
    const { deleteUser } = useAccount(false, userId);
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
                <MoreVert />
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
                    handleClose();
                    setOpen(true);
                }}>
                    <ListItemIcon>
                        <Delete color="error" />
                    </ListItemIcon>
                    <ListItemText>ELIMINAR USUARI</ListItemText>
                </MenuItem>
            </Menu>
            <Dialog onClose={() => setOpen(false)} autoFocus open={open}>
                <DialogTitle>Estàs segura d'eliminar l'usuari?</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Aquesta acció no es pot desfer.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" autoFocus onClick={() => setOpen(false)}>Cancel·la</Button>
                    <Button onClick={() => { deleteUser.mutate(); setOpen(false) }} color="error">El·limina</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}