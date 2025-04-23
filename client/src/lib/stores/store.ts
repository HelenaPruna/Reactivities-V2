import { createContext } from "react";
import { UiStore } from "./uiStore";
import { ActivityStore } from "./activityStore";
import { RoomStore } from "./roomStore";
import { LaundryStore } from "./laundryStore";

interface Store {
    uiStore: UiStore
    activityStore: ActivityStore
    roomStore: RoomStore
    laundryStore: LaundryStore
}

export const store: Store = {
    uiStore: new UiStore(),
    activityStore: new ActivityStore(),
    roomStore: new RoomStore(),
    laundryStore: new LaundryStore()
}

export const StoreContext = createContext(store);