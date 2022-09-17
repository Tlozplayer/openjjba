// SPDX-FileCopyrightText: 2022 Christian Fletcher <mistrustfully@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

import { AnyEntity, World } from "@rbxts/matter";
import ProfileService from "@rbxts/profileservice";
import { Profile } from "@rbxts/profileservice/globals";
import { Players } from "@rbxts/services";
import { PlayerComponent, PlayerData, PlayerLike, Renderable } from "shared/components";
import { DefaultPlayerData, IPlayerData } from "shared/types/player-data";

export const PlayerProfiles = new Map<Player, Profile<IPlayerData>>();
export const PlayerEntity = new Map<Player, AnyEntity>();

const ProfileStore = ProfileService.GetProfileStore("v.2-b", DefaultPlayerData);

export function LoadPlayerData(world: World) {
	function PlayerAdded(player: Player) {
		const profile = ProfileStore.LoadProfileAsync(`Player_${player.UserId}`);
		if (profile) {
			print(profile.Data.playtime);
			profile.AddUserId(player.UserId);
			profile.Reconcile();

			if (player.IsDescendantOf(Players)) {
				InitPlayerData(player, profile.Data);

				const entity = world.spawn(PlayerData(profile.Data), PlayerComponent({ player: player }), PlayerLike());
				if (player.Character) {
					world.insert(entity, Renderable({ model: player.Character }));
				}

				PlayerEntity.set(player, entity);
				PlayerProfiles.set(player, profile);
			} else {
				UnloadPlayerData(world, player, true);
			}

			profile.ListenToRelease(() => {
				UnloadPlayerData(world, player, true);
			});
		}
	}

	function PlayerRemoving(player: Player) {
		UnloadPlayerData(world, player);
	}

	Players.GetPlayers().forEach((player) => {
		PlayerAdded(player);
	});

	Players.PlayerAdded.Connect(PlayerAdded);
	Players.PlayerRemoving.Connect(PlayerRemoving);
}

function UnloadPlayerData(world: World, player: Player, force?: boolean) {
	PlayerProfiles.delete(player);

	const entity = PlayerEntity.get(player);
	if (entity !== undefined) {
		world.despawn(entity);
		PlayerEntity.delete(player);
	}

	if (force) {
		player.Kick();
	}
}

function InitPlayerData(player: Player, data: IPlayerData) {
	const current_time = os.time();
	if (data.join_date === 0) {
		data.join_date = current_time;
	}

	if (data.ban_data) {
		const unban_date = data.ban_data.unban_date;

		if (unban_date !== 0) {
			if (unban_date > current_time) {
				const dt = DateTime.fromUnixTimestamp(unban_date);
				const formatted_date = dt.FormatLocalTime("LLLL", player.LocaleId);
				player.Kick(
					`You are currently banned! Reason: ${data.ban_data.reason}. You will be unbanned after ${formatted_date}.`,
				);
			} else {
				data.ban_data.ban_history.push({
					unban_date: data.ban_data.unban_date,
					reason: data.ban_data.reason,
				});

				data.ban_data.reason = "";
				data.ban_data.unban_date = 0;
			}
		}
	}
}
