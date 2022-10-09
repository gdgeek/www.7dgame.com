import * as THREE from 'three'

import { SceneCreater } from './SceneCreater.js'
function EditorLoader(editor) {
	const scope = this
	const creater = new SceneCreater(editor)

	this.load = function (input) {
		console.error(input)
		/*
		const data = JSON.parse(input.data)

		console.error(data)
		console.error(input.resources)

		editor.clear()
		creater
			.loadResources(input.resources)
			.then(resources => {
				creater.draw(data, resources)
			})
			.catch(error => {
				alert(error)
			})
			*/
		// const output = creater.translation(data)
		//editor.fromJSON(output)
		//	console.error(JSON.stringify(editor.toJSON()))
		/*
 $base->scripts = [];
        $script = new \stdClass();
        $script->name = "test";
        $script->source = "function update( event ) {}";
        $base->history = new \stdClass();
        $base->history->undos = [];
        $base->history->redos = [];
        $base->scripts["d0bb29f8-83ca-4321-acbc-72af4ca24fa8"] = [$script];
        $base->metadate = new \stdClass();

        $base->project = Meta2Editor::HandleProject();
        $base->camera = Meta2Editor::HandleCamera();
        $base->scene = Meta2Editor::CreateScene($meta);
        $ret = new \stdClass();
        $ret->base = $base;
        $ret->objects = [];
        return $ret;

        */
		//	editor.fromJSON(input.editor.base)
	}
}
export { EditorLoader }
