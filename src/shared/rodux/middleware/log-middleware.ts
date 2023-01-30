// SPDX-FileCopyrightText: 2023 Christian Fletcher <mistrustfully@gmail.com>
//
// SPDX-License-Identifier: GPl-3.0-or-later

import Rodux, { AnyAction } from "@rbxts/rodux";
import Log from "@rbxts/log";
import { HashMap } from "@rbxts/rust-classes";

export function LogMiddleware<A extends Rodux.Action>(): Rodux.Middleware {
	return (nextDispatch) => {
		return function (action: A) {
			const values = [];
			let template = "Action Dispatched: {{ ";

			for (const [key, value] of pairs(action)) {
				template += `${key}: {@${key}}, `;
				values.push(value);
			}

			Log.Debug(template + " }}", ...values);

			nextDispatch(action as unknown as AnyAction);
		};
	};
}
