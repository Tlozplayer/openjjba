import Rodux from "@rbxts/rodux";
import { PickupReducer, UpdatePickupUIAction } from "./pickup-reducer";
import { LockOnReducer, SetTargetAction } from "./lock-on-reducer";

export interface IUIStore {
	Pickup: {
		HoveredName: string;
		MousePosition: UDim2;
		Visible: boolean;
	};

	LockOn: {
		Target?: Model;
	};
}

type StoreActions = UpdatePickupUIAction | SetTargetAction;

const reducer = Rodux.combineReducers<IUIStore, StoreActions>({
	Pickup: PickupReducer,
	LockOn: LockOnReducer,
});

export function CreateUIStore() {
	return new Rodux.Store<IUIStore, StoreActions, {}>(reducer, undefined /*[Rodux.loggerMiddleware]*/);
}

export type UIStore = Rodux.Store<IUIStore, StoreActions>;
