import * as THREE from 'three'

import { SceneBuilder } from './SceneBuilder.js'
function SpaceLoader(editor) {
	const self = this
	const builder = new SceneBuilder(editor)
	this.addCube = async function (name, matrix) {
		const cube = {
			metadata: {
				version: 4.5,
				type: 'Object',
				generator: 'Object3D.toJSON'
			},
			geometries: [
				{
					uuid: '8eaf1f06-553d-45d5-bb9a-04ed816351f9',
					type: 'BoxGeometry',
					width: 0.2,
					height: 0.2,
					depth: 0.2,
					widthSegments: 1,
					heightSegments: 1,
					depthSegments: 1
				}
			],
			materials: [
				{
					uuid: '991c8558-5842-428d-943a-209f26e7fb81',
					type: 'MeshStandardMaterial',
					color: 16777215,
					roughness: 1,
					metalness: 0,
					emissive: 0,
					envMapIntensity: 1,
					depthFunc: 3,
					depthTest: true,
					depthWrite: true,
					colorWrite: true,
					stencilWrite: false,
					stencilWriteMask: 255,
					stencilFunc: 519,
					stencilRef: 0,
					stencilFuncMask: 255,
					stencilFail: 7680,
					stencilZFail: 7680,
					stencilZPass: 7680
				}
			],
			object: {
				uuid: 'a8093fca-44f0-4f69-b17d-7a7be3819fe0',
				type: 'Mesh',
				name: 'Box',
				layers: 1,
				matrix,
				geometry: '8eaf1f06-553d-45d5-bb9a-04ed816351f9',
				material: '991c8558-5842-428d-943a-209f26e7fb81'
			}
		}
		let node = await builder.parseNode(cube)
		node.name = name
		//node.locked = true
		builder.addNode(node)
	}
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
	this.loadMetas = async function (verse) {
		const self = this
		verse.children.metas.forEach(async meta => {
			console.error(meta)
			const ret = builder.getMatrix4(meta.parameters.transform)

			await self.addCube(meta.parameters.meta.name, ret.elements)
			//console.error(ret.elements)
		})
		//	THREE.Matrix4 matrix4 =
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

		//this.addCube()
	}
	this.load = async function (data) {
		const verse = JSON.parse(data.data)

		await self.loadMetas(verse)
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
