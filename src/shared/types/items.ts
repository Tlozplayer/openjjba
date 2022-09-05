import { ReplicatedStorage } from "@rbxts/services";
import { IStand } from "./stands";

export const enum Item {
	ArrowFragment,
	Arrow,
	StandDisc,
}

export interface IItem {
	item: Item;
	extra_data?: Partial<IExtraItemData>;
}

export interface IExtraItemData {
	/// StandDisc
	stored_stand: IStand;
}

export type ItemModel = Model & {
	Handle: BasePart;
};

export const ItemToModel: { [index in Item]: ItemModel } = {
	[Item.ArrowFragment]: ReplicatedStorage.assets.items.Roka,
	[Item.Arrow]: ReplicatedStorage.assets.items.PocketWatch,
	[Item.StandDisc]: ReplicatedStorage.assets.items.Disc,
};
