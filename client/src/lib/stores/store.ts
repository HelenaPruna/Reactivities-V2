import { createContext } from "react";
import { UiStore } from "./uiStore";
import { ActivityStore } from "./activityStore";
import { RoomStore } from "./roomStore";

interface Store {
    uiStore: UiStore
    activityStore: ActivityStore
    roomStore: RoomStore
}

export const store: Store = {
    uiStore: new UiStore(),
    activityStore: new ActivityStore(),
    roomStore: new RoomStore()
}

export const StoreContext = createContext(store);