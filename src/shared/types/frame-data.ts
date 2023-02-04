// SPDX-FileCopyrightText: 2023 Christian Fletcher <mistrustfully@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

import { Option } from "@rbxts/rust-classes";

export function Frame(seconds: number) {
	return seconds / 60;
}

export type FrameData<Data extends defined> = [number, Option<Data>][];
export class FrameDataBuilder<Data extends defined> {
	private data: FrameData<Data> = [];
	private push(frame: number, data: Option<Data>) {
		const element: [number, Option<Data>] = [Frame(frame), data];
		const last = this.data[this.data.size() - 1];

		if (last && last[0] === Frame(frame) && last[1].isNone()) {
			this.data[this.data.size() - 1] = element;
		} else {
			this.data.push(element);
		}
	}

	from(start_frame: number, end_frame: number, data: Data) {
		this.push(start_frame, Option.some(data));
		this.push(end_frame, Option.none());
		return this;
	}

	last(data: Data) {
		this.push(0, Option.some(data));
		return this;
	}

	build() {
		return this.data;
	}
}
