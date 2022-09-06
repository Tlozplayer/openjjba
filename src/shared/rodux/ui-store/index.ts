import Rodux from "@rbxts/rodux";
import { PickupReducer, UpdatePickupUIAction } from "./pickup-reducer";

export interface IUIStore {
	Pickup: {
		HoveredName: string;
		MousePosition: UDim2;
		Visible: boolean;
	};
}

type StoreActions = UpdatePickupUIAction;

const reducer = Rodux.combineReducers<IUIStore, StoreActions>({
	Pickup: PickupReducer,
});

export function CreateUIStore() {
	return new Rodux.Store<IUIStore, StoreActions, {}>(reducer, undefined /*[Rodux.loggerMiddleware]*/);
}

export type UIStore = Rodux.Store<IUIStore, StoreActions>;
