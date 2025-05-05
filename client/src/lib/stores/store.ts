import { createContext } from "react";
import { UiStore } from "./uiStore";
import { ActivityStore } from "./activityStore";
import { RoomStore } from "./roomStore";
import { LaundryStore } from "./laundryStore";
import { RequestStore } from "./requestStore";

interface Store {
    uiStore: UiStore
    activityStore: ActivityStore
    roomStore: RoomStore
    laundryStore: LaundryStore
    requestStore: RequestStore
}

export const store: Store = {
    uiStore: new UiStore(),
    activityStore: new ActivityStore(),
    roomStore: new RoomStore(),
    laundryStore: new LaundryStore(),
    requestStore: new RequestStore()
}

export const StoreContext = createContext(store);