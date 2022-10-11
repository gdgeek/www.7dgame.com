import * as THREE from 'three'

import { SceneBuilder } from './SceneBuilder.js'
function SpaceLoader(editor) {
	const self = this
	const builder = new SceneBuilder(editor)
	this.addPointLight = async function () {
		const light = {
			metadata: {
				version: 4.5,
				type: 'Object',
				generator: 'Object3D.toJSON'
			},
			object: {
				uuid: '8af2edba-43bd-4bb3-be26-ad5695b9ef2f',
				type: 'PointLight',
				name: 'PointLight',
				layers: 1,
				matrix: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
				color: 16777215,
				intensity: 3,
				distance: 0,
				decay: 0,
				shadow: {
					camera: {
						uuid: '9d0910b6-4fb1-443e-9df8-24a7a7792c4d',
						type: 'PerspectiveCamera',
						layers: 1,
						fov: 90,
						zoom: 1,
						near: 0.5,
						far: 500,
						focus: 10,
						aspect: 1,
						filmGauge: 35,
						filmOffset: 0
					}
				}
			}
		}

		let node = await builder.parseNode(light)
		node.locked = true
		builder.addNode(node)
	}
	this.loadSpace = async function (space) {
		const mesh = await builder.loadPolygen(space.mesh.url)
		mesh.name = 'Space'
		mesh.locked = true
		mesh.children.forEach(item => {
			item.locked = true
		})

		builder.addNode(mesh)
		this.addPointLight()
	}
	this.load = async function (data) {
		console.error(data.space)

		await self.loadSpace(data.space)

		/*console.error(input)

		const data = JSON.parse(input.data)

		console.error(data)
		console.error(input.resources)

		editor.clear()*/
		/*
		creater
			.loadResources(input.resources)
			.then(resources => {
				creater.draw(data, resources)
			})
			.catch(error => {
				alert(error)
			})*/
		/*	*/
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
export { SpaceLoader }
