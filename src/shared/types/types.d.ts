import type { ItemModel } from "./items";
import type { StandModel } from "./stands";

declare global {
	interface ReplicatedStorage extends Instance {
		shared: Folder & {
			systems: Folder;
		};

		assets: {
			stands: {
				ZaShadow: StandModel;
			};

			items: {
				Disc: ItemModel;
				Roka: ItemModel;
				PocketWatch: ItemModel;
			};
		};
	}
}
