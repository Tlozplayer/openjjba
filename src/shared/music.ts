// SPDX-FileCopyrightText: 2022 Christian Fletcher <mistrustfully@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

export type Song = {
	id: number;
	artist: string;
	name: string;
};

export const Music: { Casual: Song[]; Combat: Song[] } = {
	Casual: [
		{ id: 10946356252, name: "Pretty Little Lies", artist: "Holizna" },
		{ id: 12406141007, name: "Bus Stop", artist: "Holizna" },
		{ id: 12406147759, name: "Snow Drift", artist: "Holizna" },
	],

	Combat: [
		{ id: 10946120990, name: "PRIME TURBO", artist: "Jameskii" },
		{ id: 12406153874, name: "Tame Inner Demons", artist: "Komiku" },
	],
};
