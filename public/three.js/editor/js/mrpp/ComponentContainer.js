import { UIPanel, UINumber, UIBreak, UIText, UIButton, UIRow, UIInput, UIHorizontalRule } from '../libs/ui.js';
import { RemoveComponentCommand } from '../commands/RemoveComponentCommand.js';

import { RotateComponent } from './components/RotateComponent.js'
import { ActionComponent } from './components/ActionComponent.js'
class ComponentContainer {

  static Create(type) {
    switch (type.toLowerCase()) {
      case 'rotate':
        return RotateComponent.Create();
    }
    // return {}
  }
  constructor(editor, object, component) {
    this.editor = editor;
    this.object = object;
    this.component = component;
    switch (component.type.toLowerCase()) {
      case 'rotate':
        this.handler = new RotateComponent(editor, object, component)
        break;
      case 'action':
        // alert("action")
        this.handler = new ActionComponent(editor, object, component)
        break;
      default:
        console.error('ComponentContainer: Unknown component type.');
    }

  }

  renderer(container) {
    const strings = this.editor.strings;
    container.add(new UIText(this.component.type));

    if (this.handler != undefined) {
      this.handler.renderer(container);
    }

    const remove = new UIButton(strings.getKey('sidebar/script/remove'));
    remove.setMarginLeft('4px');
    remove.onClick(function () {
      if (confirm('Are you sure?')) {
        this.editor.execute(new RemoveComponentCommand(this.editor, this.object, this.component));
      }
    }.bind(this));
    container.add(remove);
    container.add(new UIBreak());
  }

}
export { ComponentContainer };
