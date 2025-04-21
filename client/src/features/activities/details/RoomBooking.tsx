import { useState } from "react";
import { useRooms } from "../../../lib/hooks/useRooms"
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, List, ListItem, ListItemButton, ListItemText } from "@mui/material";

type Props = {
    activityId: string
    setOpen: (bool: boolean) => void
    recurId: string | undefined
}

export default function RoomBooking({ activityId, setOpen, recurId }: Props) {
    const { availableRooms, bookRoom } = useRooms(activityId, recurId);
    const [selectedRoom, setSelectedRoom] = useState<string | null>(null);


    const handleCloseDialog = () => {
        setOpen(false);
        setSelectedRoom(null);
    };

    const handleRoomSelect = (roomId: string) => {
        setSelectedRoom(roomId);
    };

    const handleConfirm = () => {
        if (selectedRoom) {
            bookRoom.mutate(selectedRoom);
        }
        handleCloseDialog();
    };

    return (
        <Dialog onClose={handleCloseDialog} open={true}>
            <DialogTitle>Sel·lecciona una sala:</DialogTitle>
            <DialogContent >
                <List sx={{ py: 0 }}>
                    {availableRooms &&
                        availableRooms.map((room) => (
                            <ListItem key={room.id} disablePadding>
                                <ListItemButton
                                    selected={selectedRoom === room.id}
                                    onClick={() => handleRoomSelect(room.id)}
                                >
                                    <ListItemText
                                        primary={room.name}
                                        secondary={`Planta: ${room.numberFloor}, Capacitat: ${room.capacity}`}
                                    />
                                </ListItemButton>
                            </ListItem>
                        ))}
                </List>
            </DialogContent>
            <DialogActions>
                <Button variant="outlined" onClick={handleCloseDialog}>
                    Cancel·la
                </Button>
                <Button variant="contained" onClick={handleConfirm}
                    disabled={!selectedRoom} color="primary">
                    Confirma
                </Button>
            </DialogActions>
        </Dialog>
    );
}