import { UIPanel, UIBreak, UIText, UIButton, UIRow, UIInput } from './libs/ui.js';

import { AddScriptCommand } from './commands/AddScriptCommand.js';
import { SetScriptValueCommand } from './commands/SetScriptValueCommand.js';
import { RemoveScriptCommand } from './commands/RemoveScriptCommand.js';

function SidebarComponent(editor) {

	const strings = editor.strings;

	const signals = editor.signals;

	const container = new UIPanel();
	container.setDisplay('none');

	container.add(new UIText("component").setTextTransform('uppercase'));
	container.add(new UIBreak());
	container.add(new UIBreak());
	const object = editor.selected;
	alert(object)
	//

	const componentsContainer = new UIRow();
	container.add(componentsContainer);
	/*
		const newScript = new UIButton('test');
		newScript.onClick(function () {
	
			const script = { name: '', source: 'function update( event ) {}' };
			editor.execute(new AddScriptCommand(editor, editor.selected, script));
	
		});
		container.add(newScript);
	*/
	/*
	let loadScript = new UI.Button( 'Load' );
	loadScript.setMarginLeft( '4px' );
	container.add( loadScript );
	*/

	//

	function update() {

		componentsContainer.clear();
		componentsContainer.setDisplay('none');

		const object = editor.selected;

		if (object === null) {

			return;

		}

		console.error(object.components)



		const components = object.components;
		//	const scripts = editor.scripts[object.uuid];

		if (components !== undefined && components.length > 0) {

			componentsContainer.setDisplay('block');
			for (let i = 0; i < components.length; i++) {
				(function (object, component) {
					console.error(component)
					const name = new UIInput(component.type).setWidth('130px').setFontSize('12px');
					name.onChange(function () {

						//editor.execute(new SetScriptValueCommand(editor, editor.selected, script, 'name', this.getValue()));

					});
					componentsContainer.add(name);


					const remove = new UIButton(strings.getKey('sidebar/script/remove'));
					remove.setMarginLeft('4px');
					remove.onClick(function () {

						if (confirm('Are you sure?')) {

							//	editor.execute(new RemoveScriptCommand(editor, editor.selected, script));

						}

					});
					componentsContainer.add(remove);

					componentsContainer.add(new UIBreak());

				})(object, components[i]);
			}

		}

	}

	// signals

	signals.objectSelected.add(function (object) {

		if (object !== null && editor.camera !== object) {

			container.setDisplay('block');

			update();

		} else {

			container.setDisplay('none');

		}

	});

	signals.componentAdded.add(update);
	signals.componentRemoved.add(update);
	signals.componentChanged.add(update);

	return container;

}

export { SidebarComponent };
