import { useHookState } from "@rbxts/matter";
import Roact from "@rbxts/roact";

type handleState = {
	handle: Roact.Tree | undefined;
};

export = (element: Roact.Element, parent?: Instance | undefined, key?: string | undefined) => {
	const state = useHookState(parent, (s: handleState) => {
		if (s.handle !== undefined) {
			Roact.unmount(s.handle);
		}
	});

	if (state.handle === undefined) {
		state.handle = Roact.mount(element, parent, key);
	} else {
		Roact.update(state.handle, element);
	}

	return state.handle;
};
