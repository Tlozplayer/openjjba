import Roact, { Element } from "@rbxts/roact";

export function Pickup(position: UDim2, itemName?: string): Element {
	const visible = itemName === undefined ? false : true;

	return (
		<screengui>
			<imagelabel
				Visible={visible}
				Image={"http://www.roblox.com/asset/?id=10833055585"}
				Size={UDim2.fromOffset(50, 50)}
				BackgroundTransparency={1}
				AnchorPoint={new Vector2(0, 0)}
				Position={position.add(UDim2.fromOffset(10, 10))}
			>
				<textlabel
					Text={`<i>${itemName}</i>`}
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
