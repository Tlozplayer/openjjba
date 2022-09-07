import Rodux from "@rbxts/rodux";
import { IUIStore } from ".";

export interface SetTargetAction extends Rodux.Action<"SetTargetAction"> {
	target?: Model;
}

export function SetTarget(target?: Model): SetTargetAction {
	return {
		type: "SetTargetAction",
		target,
	};
}

export const LockOnReducer = Rodux.createReducer<IUIStore["LockOn"], SetTargetAction>(
	{ Target: undefined },
	{
		SetTargetAction: (state, action) => {
			const stateClone = { ...state };
			stateClone.Target = action.target;

			return stateClone;
		},
	},
);
