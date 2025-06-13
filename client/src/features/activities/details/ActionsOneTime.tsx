import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, ListItemIcon, ListItemText, Menu, MenuItem } from "@mui/material";
import { MouseEvent, useState } from "react"
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DriveFileMoveIcon from '@mui/icons-material/DriveFileMove';
import DeleteIcon from '@mui/icons-material/Delete';
import RoomBooking from "./RoomBooking";

type Props = {
    activityId : string
    recurId : string
    deleteEvent: () => void
}

export default function ActionsOneTime({ deleteEvent, activityId, recurId }: Props) {
    const [open, setOpen] = useState(false);
    const [bookRoom, setBookRoom] = useState(false);
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
                <MenuItem onClick={() => {
                    setBookRoom(true);
                    handleClose();
                }}>
                    <ListItemIcon>
                        <DriveFileMoveIcon />
                    </ListItemIcon>
                    <ListItemText>Assigna a una sala</ListItemText>
                </MenuItem>
                <MenuItem onClick={(e) => {
                    e.currentTarget.blur();
                    setOpen(true);
                    handleClose();
                }}>
                    <ListItemIcon>
                        <DeleteIcon color="error" />
                    </ListItemIcon>
                    <ListItemText>Elimina esdeveniment</ListItemText>
                </MenuItem>
                
            </Menu>
            <Dialog onClose={() => setOpen(false)} open={open}>
                <DialogTitle>Estàs segura d'eliminar l'esdeveniment?</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Aquesta acció no es pot desfer.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" onClick={() => setOpen(false)}>Cancel·la</Button>
                    <Button onClick={() => { setOpen(false); deleteEvent() }} color="error">Elimina</Button>
                </DialogActions>
            </Dialog>
            {bookRoom && <RoomBooking activityId={activityId} setOpen={setBookRoom} recurId={recurId} /> }
        </>
    )
}