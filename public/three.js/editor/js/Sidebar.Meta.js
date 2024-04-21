import { UIPanel, UIBreak, UIText, UIButton, UIRow, UISelect, UIInput, UIHorizontalRule } from './libs/ui.js';


import { AddComponentCommand } from './commands/AddComponentCommand.js';
import { AddScriptCommand } from './commands/AddScriptCommand.js';
import { SetScriptValueCommand } from './commands/SetScriptValueCommand.js';
import { RemoveScriptCommand } from './commands/RemoveScriptCommand.js';
import { ComponentContainer } from './mrpp/ComponentContainer.js';
//import { RemoveComponentCommand } from './commands/RemoveComponentCommand.js';

function SidebarMeta(editor) {





	const strings = editor.strings;

	const signals = editor.signals;

	const container = new UIPanel();
	container.setDisplay('none');




	const top = new UIRow();
	container.add(top);

	const componentsContainer = new UIRow();
	container.add(componentsContainer);

	function update() {
		top.clear();
		top.setDisplay('none');
		componentsContainer.clear();
		componentsContainer.setDisplay('none');
		const object = editor.selected;

		if (object === null) {

			return;

		}
		top.setDisplay('block');

		top.add(new UIText("Meta").setTextTransform('uppercase'));
		top.add(new UIBreak());

		top.add(new UIBreak());

		const newComponent = new UIButton('edit');
		newComponent.onClick(function () {
			editor.signals.messageSend.dispatch({ action: 'edit-meta', data: { id: object.userData.meta_id } });
			//alert(object.userData.meta_id)
		}.bind(this));
		top.add(newComponent);

		/*
		
				const components = object.components;
		
		
		
				if (components !== undefined) {
		
					topContainer.setDisplay('block');
		
					topContainer.add(new UIText("components").setTextTransform('uppercase'));
					topContainer.add(new UIBreak());
					topContainer.add(new UIBreak());
		
					const label = new UIText('选择项:');
					topContainer.add(label);
		
					// 创建下拉框
					const select = new UISelect().setWidth('100px');
					select.setOptions({ // 设置下拉框的选项
						'Rotate': '自旋转'
					});
					select.setValue('Rotate');
					select.onChange(function () { // 下拉框选项改变时触发的事件
						console.log('Selected option:', select.getValue());
					});
					topContainer.add(select);
		
		
					const newComponent = new UIButton('new');
					newComponent.onClick(function () {
						const component = ComponentContainer.Create(select.getValue());
		
						if (component != undefined) {
							const command = new AddComponentCommand(editor, editor.selected, component);
							editor.execute(command);
						}
					}.bind(this));
					topContainer.add(newComponent);
				}
		
		
		
				if (components !== undefined && components.length > 0) {
		
					componentsContainer.setDisplay('block');
					for (let i = 0; i < components.length; i++) {
						(function (object, component) {
		
							componentsContainer.add(new UIHorizontalRule());
		
							const cc = new ComponentContainer(editor, object, component);
							cc.renderer(componentsContainer);
		
		
		
							// 将水平分隔线添加到容器中
							componentsContainer.add(new UIBreak());
		
						})(object, components[i]);
					}
		
				}
				*/

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

export { SidebarMeta };