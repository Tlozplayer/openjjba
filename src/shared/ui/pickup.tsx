import { GroupMotor, SingleMotor, Spring } from "@rbxts/flipper";
import Roact, { Element } from "@rbxts/roact";

let old = false;
let oldText = "";
const motor = new SingleMotor(1);
const [binding, setBinding] = Roact.createBinding(motor.getValue());
motor.onStep(setBinding);

const positionMotor = new GroupMotor([0, 0]);
const [posBinding, setPosBinding] = Roact.createBinding(positionMotor.getValue());
positionMotor.onStep(setPosBinding);

export function Pickup(position: UDim2, itemName?: string): Element {
	const visible = itemName === undefined ? false : true;
	if (visible !== old) {
		motor.setGoal(
			new Spring(visible ? 0 : 1, {
				frequency: 8,
			}),
		);
		old = visible;
	}

	if (itemName !== undefined && itemName !== oldText) {
		oldText = itemName;
	}

	positionMotor.setGoal([
		new Spring(position.X.Offset, { frequency: 3, dampingRatio: 1.2 }),
		new Spring(position.Y.Offset, { frequency: 3, dampingRatio: 1.2 }),
	]);

	return (
		<screengui>
			<imagelabel
				ImageTransparency={binding.getValue()}
				Image={"http://www.roblox.com/asset/?id=10833055585"}
				Size={UDim2.fromOffset(50, 50)}
				BackgroundTransparency={1}
				AnchorPoint={new Vector2(0, 0)}
				Position={posBinding.map((v) => {
					return UDim2.fromOffset(v[0], v[1]).add(UDim2.fromOffset(10, 10));
				})}
			>
				<textlabel
					Text={`<i>${oldText}</i>`}
					TextTransparency={binding.getValue()}
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
