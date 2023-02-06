// SPDX-FileCopyrightText: 2023 Christian Fletcher <mistrustfully@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

import { useHookState } from "@rbxts/matter";
import { Option } from "@rbxts/rust-classes";
import { FrameData } from "shared/types/frame-data";

export function useFrameData<T extends defined>(frame_data: FrameData<T>, discrim?: number): Option<T> {
	const storage = useHookState<{ time: number; next: number }>(discrim);
	if (storage.time === undefined) {
		storage.time = os.clock();
	}

	if (storage.next === undefined) {
		storage.next = -1;
	}

	if (frame_data[storage.next + 1] && frame_data[storage.next + 1][0] + storage.time <= os.clock()) {
		storage.next++;
		storage.time = os.clock();
	}

	const data = frame_data[storage.next];
	if (!data) {
		return Option.none();
	} else {
		return data[1];
	}
}
