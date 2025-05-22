import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, ListItemIcon, ListItemText, Menu, MenuItem } from "@mui/material";
import { MouseEvent, useState } from "react"
import { Delete, DriveFileMove, Edit, MoreVert } from "@mui/icons-material";

type Props = {
    deleteAtt: () => void
    activateAtt: () => void
    isWaiting: boolean
    setEdit: () => void
}

export default function ActionsAttendee({ deleteAtt, activateAtt, isWaiting, setEdit }: Props) {
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
                <MenuItem onClick={() => {
                    activateAtt();
                    handleClose();
                }}>
                    <ListItemIcon>
                        <DriveFileMove />
                    </ListItemIcon>
                    <ListItemText>{isWaiting ? "Mou a participants" : "Mou a la llista d'espera"}</ListItemText>
                </MenuItem>
                <MenuItem onClick={(e) => {
                    handleClose();
                    e.currentTarget.blur();
                    setEdit()
                }}>
                    <ListItemIcon>
                        <Edit />
                    </ListItemIcon>
                    <ListItemText>Edita</ListItemText>
                </MenuItem>
                <MenuItem onClick={(e) => {
                    handleClose();
                    e.currentTarget.blur();
                    setOpen(true);
                }}>
                    <ListItemIcon>
                        <Delete color="error" />
                    </ListItemIcon>
                    <ListItemText>Elimina</ListItemText>
                </MenuItem>
            </Menu>
            <Dialog onClose={() => setOpen(false)} open={open}>
                <DialogTitle>Estàs segura d'eliminar el participant?</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Aquesta acció no es pot desfer.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" onClick={() => setOpen(false)}>Cancel·la</Button>
                    <Button onClick={() => { setOpen(false); deleteAtt() }} color="error">El·limina</Button>
                </DialogActions>
            </Dialog>
        </>

    )
}