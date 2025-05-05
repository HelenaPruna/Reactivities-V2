import { MouseEvent, useState } from "react";
import { useRequests } from "../../lib/hooks/useRequests"
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, IconButton, ListItemIcon, ListItemText, Menu, MenuItem } from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAccount } from "../../lib/hooks/useAccount";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useStore } from "../../lib/hooks/useStore";
import CancelIcon from '@mui/icons-material/Cancel';
import PendingIcon from '@mui/icons-material/Pending';
import { observer } from "mobx-react-lite";

type Props = {
    reqId: string
}
const ActionsRequest = observer(function ActionsRequest({ reqId }: Props) {
    const { updateRequest, deleteRequest } = useRequests(false, true, reqId)
    const { requestStore: { filter } } = useStore()

    const [open, setOpen] = useState(false);
    const { currentUser } = useAccount();

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
                {currentUser?.role === 'Admin' && <Divider />}


                {currentUser?.role === 'Admin' &&
                    (filter !== undefined && filter !== 0) &&
                    <MenuItem onClick={() => {
                        updateRequest.mutate(0);
                        handleClose();
                    }}>
                        <ListItemIcon>
                            <PendingIcon />
                        </ListItemIcon>
                        <ListItemText>REACTIVAR</ListItemText>
                    </MenuItem>
                }
                {currentUser?.role === 'Admin' &&
                    (filter === undefined || filter !== 1) &&
                    <MenuItem onClick={() => {
                        updateRequest.mutate(1);
                        handleClose();
                    }}>
                        <ListItemIcon>
                            <CheckCircleIcon color="success" />
                        </ListItemIcon>
                        <ListItemText>APROVAR</ListItemText>
                    </MenuItem>
                }
                {currentUser?.role === 'Admin' &&
                    (filter === undefined || filter !== 2) &&
                    <MenuItem onClick={() => {
                        updateRequest.mutate(2);
                        handleClose();
                    }}>
                        <ListItemIcon>
                            <CancelIcon color="error" />
                        </ListItemIcon>
                        <ListItemText>DENEGAR</ListItemText>
                    </MenuItem>
                }
            </Menu>
            <Dialog onClose={() => setOpen(false)} open={open}>
                <DialogTitle>Estàs segura d'eliminar la sol·licitud?</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Aquesta acció no es pot desfer.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" onClick={() => setOpen(false)}>Cancel·la</Button>
                    <Button onClick={() => { deleteRequest.mutate(); setOpen(false) }} color="error">El·limina</Button>
                </DialogActions>
            </Dialog>
        </>
    )
});

export default ActionsRequest;