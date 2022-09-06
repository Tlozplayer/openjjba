import { Spring } from "@rbxts/flipper";
import Roact, { Element } from "@rbxts/roact";
import { withHooks } from "@rbxts/roact-hooked";
import { useGroupMotor, useSingleMotor } from "@rbxts/roact-hooked-plus";
import { useSelector } from "@rbxts/roact-rodux-hooked";
import { IUIStore } from "shared/rodux/ui-store";

let cachedName = "";
function Pickup(): Element {
	const PickupUI = useSelector((state: IUIStore) => state.Pickup);

	const position = PickupUI.MousePosition;
	const itemName = PickupUI.HoveredName;

	const [positionBinding, setPositionGoal] = useGroupMotor([0, 0]);

	setPositionGoal([
		new Spring(position.X.Offset, {
			frequency: 3,
			dampingRatio: 0.5,
		}),
		new Spring(position.Y.Offset, {
			frequency: 3,
			dampingRatio: 0.5,
		}),
	]);

	const [transparencyBinding, setTransparencyGoal] = useSingleMotor(1);

	setTransparencyGoal(
		new Spring(itemName === "" ? 1 : 0, {
			frequency: 8,
		}),
	);

	if (itemName !== "") {
		cachedName = itemName;
	}

	return (
		<screengui>
			<imagelabel
				ImageTransparency={transparencyBinding.getValue()}
				Image={"http://www.roblox.com/asset/?id=10833055585"}
				Size={UDim2.fromOffset(50, 50)}
				BackgroundTransparency={1}
				AnchorPoint={new Vector2(0, 0)}
				Position={positionBinding.map((v) => {
					return UDim2.fromOffset(v[0], v[1]).add(UDim2.fromOffset(10, 10));
				})}
			>
				<textlabel
					Text={`<i>${cachedName}</i>`}
					TextTransparency={transparencyBinding.getValue()}
					Font={Enum.Font.GothamBold}
					TextColor3={new Color3(0, 0, 0)}
					RichText={true}
					Position={UDim2.fromScale(1, 1)}
					AnchorPoint={new Vector2(0.25, 0)}
					Size={UDim2.fromScale(1, 0.5)}
					TextScaled={true}
					BackgroundTransparency={1}
				/>
			</imagelabel>
		</screengui>
	);
}

export default withHooks(Pickup);
