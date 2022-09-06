import Rodux from "@rbxts/rodux";
import { IUIStore } from ".";

export interface UpdatePickupUIAction extends Rodux.Action<"UpdatePickupUI"> {
	new: Partial<IUIStore["Pickup"]>;
}

export function UpdatePickupUI(newUI: UpdatePickupUIAction["new"]): UpdatePickupUIAction {
	return {
		type: "UpdatePickupUI",
		new: newUI,
	};
}

export const PickupReducer = Rodux.createReducer<IUIStore["Pickup"], UpdatePickupUIAction>(
	{ HoveredName: "None", MousePosition: UDim2.fromOffset(0, 0), Visible: false },
	{
		UpdatePickupUI: (state, action) => {
			return { ...state, ...action.new };
		},
	},
);
