import { UIPanel, UIBreak, UIText, UIButton, UIRow, UISelect, UIInput, UIHorizontalRule } from './libs/ui.js';


import { AddComponentCommand } from './commands/AddComponentCommand.js';
import { AddScriptCommand } from './commands/AddScriptCommand.js';
import { SetScriptValueCommand } from './commands/SetScriptValueCommand.js';
import { RemoveScriptCommand } from './commands/RemoveScriptCommand.js';
import { ComponentContainer } from './mrpp/ComponentContainer.js';
//import { RemoveComponentCommand } from './commands/RemoveComponentCommand.js';

function SidebarEvents(editor) {

	const strings = editor.strings;

	const signals = editor.signals;
	/*
		editor.signals.messageReceive.add(async function (message) {
	
			if (message.action == 'setup-module') {
				const data = message.data;
				const node = editor.objectByUuid(data.uuid);
	
				if (node != null) {
					node.userData.data = JSON.stringify(data.setup);
					signals.objectChanged.dispatch(node);
				}
				//editor.get
			}
		});
	*/


	const container = new UIPanel();
	container.setDisplay('none');




	const top = new UIRow();
	container.add(top);


	function update() {

		top.clear();
		top.setDisplay('none');

		const object = editor.selected;

		if (object === null) {
			return;
		}
		if (object === editor.scene) {

			top.add(new UIText("Events").setTextTransform('uppercase'));
			top.add(new UIBreak());
			top.add(new UIBreak());

			{
				top.add(new UIText("Inputs").setTextTransform('uppercase'));
				top.add(new UIBreak());
				const label = new UIText('Input:');
				top.add(label);

				// 创建下拉框
				const input = new UIInput().setWidth('100px');
				input.setValue("");

				top.add(input);

				const newInput = new UIButton('new');
				newInput.onClick(function () {
					alert(input.getValue());

				}.bind(this));
				top.add(newInput);
				top.add(new UIBreak());
				top.add(new UIBreak());
			}

			{
				top.add(new UIText("Outputs").setTextTransform('uppercase'));
				top.add(new UIBreak());
				const label = new UIText('Output:');
				top.add(label);

				// 创建下拉框
				const output = new UIInput().setWidth('100px');
				output.setValue("");

				top.add(output);

				const newOutput = new UIButton('new');
				newOutput.onClick(function () {
					alert(input.getValue());

				}.bind(this));
				top.add(newOutput);
			}
		}
		top.setDisplay('block');


	}

	signals.objectSelected.add(function (object) {

		if (object !== null && editor.camera !== object) {

			container.setDisplay('block');

			update();

		} else {

			container.setDisplay('none');

		}

	});

	return container;

}

export { SidebarEvents };
