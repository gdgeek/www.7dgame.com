import * as THREE from 'three'

import { SceneBuilder } from './SceneBuilder.js'
function SpaceLoader(editor) {
	const self = this
	editor.spaceLoader = this
	const builder = new SceneBuilder(editor)
	let verse = null
	this.addMeta = async function (name, uuid, matrix, context) {
		//alert(JSON.stringify(context.children.entities))
		const data = {
			metadata: {
				version: 4.5,
				type: 'Object',
				generator: 'Object3D.toJSON'
			},
			object: {
				uuid: uuid,
				type: 'Group',
				name: name,
				layers: 1,
				matrix: matrix.elements,
				children: this.getNodes(context.children.entities)
			}
		}

		let node = await builder.parseNode(data)
		//node.name = name
		//node.locked = true
		builder.addNode(node)
	}
	this.getNodes = function (entities) {
		if (typeof entities === 'undefined' || entities === null) {
			return []
		}
		const list = []

		entities.forEach(entity => {
			const node = this.getNode(entity)
			list.push(node)
		})
		return list
	}
	this.getNode = function (entity) {
		switch (entity.type.toLowerCase()) {
			case 'polygen':
				return this.getPolygen(entity)
			default:
				return this.getPoint(entity)
		}
	}
	this.getPolygen = function (entity) {
		const matrix = builder.getMatrix4(entity.parameters.transform)

		alert(entity.parameters.uuid)
		return {
			//locked: true,
			uuid: entity.parameters.uuid,
			type: 'Group',
			name: entity.parameters.name,
			layers: 1,
			matrix: matrix.elements,
			children: this.getNodes(entity.children.entities)
		}
	}
	this.getPoint = function (entity) {
		const matrix = builder.getMatrix4(entity.parameters.transform)

		return {
			//locked: true,
			uuid: entity.parameters.uuid,
			type: 'Group',
			name: entity.parameters.name,
			layers: 1,
			matrix: matrix.elements,
			children: this.getNodes(entity.children.entities)
		}
	}
	this.addCube = async function (name, uuid, matrix) {
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
				uuid: uuid,
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
	this.loadMetas = async function (verse, links) {
		const self = this

		let map = new Map()
		links.forEach(m => {
			map.set(m.id, JSON.parse(m.data))
		})

		verse.children.metas.forEach(async meta => {
			const matrix = builder.getMatrix4(meta.parameters.transform)
			//alert(JSON.stringify(meta.parameters.id))
			if (map.has(meta.parameters.id)) {
				const data = map.get(meta.parameters.id)

				await self.addMeta(
					meta.parameters.title,
					meta.parameters.uuid,
					matrix,
					data
				)
			} else {
				await self.addCube(
					meta.parameters.title,
					meta.parameters.uuid,
					matrix.elements
				)
			}

			//console.error(meta)
			//	const ret = builder.getMatrix4(meta.parameters.transform)
			//	alert(meta.parameters.uuid)

			//await self.addMeta()
			//console.error(ret.elements)
		})
		//	THREE.Matrix4 matrix4 =
	}
	this.loadSpace = async function (space) {
		const mesh = await builder.loadPolygen(space.mesh.url)
		console.error('=========')
		console.error(mesh)
		mesh.name = 'Space'
		mesh.uuid = space.mesh.md5
		mesh.locked = true
		mesh.children.forEach(item => {
			item.locked = true
		})

		builder.addNode(mesh)

		//this.addCube()
	}
	this.save = async function () {
		const metas = self.verse.children.metas
		metas.forEach(meta => {
			const node = editor.objectByUuid(meta.parameters.uuid)
			if (node) {
				meta.parameters.meta.name = node.name
				meta.parameters.transform.position = node.position
				meta.parameters.transform.rotate = {
					x: node.rotation.x,
					y: node.rotation.y,
					z: node.rotation.z
				}
				meta.parameters.transform.scale = {
					x: node.scale.x,
					y: node.scale.y,
					z: node.scale.z
				}

				meta.parameters.transform.active = node.visible
			}
		})
		//alert(window)

		window.URL = window.URL || window.webkitURL
		window.BlobBuilder =
			window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder
		const data = {
			from: 'space-loader',
			action: 'save-verse',
			verse: JSON.stringify(self.verse)
		}

		window.parent.postMessage(data, '*')
		console.error(self.verse)
	}
	this.load = async function (data) {
		self.loadSpace(data.space)

		self.addPointLight()
		self.verse = JSON.parse(data.data)
		self.loadMetas(self.verse, data.links)

		console.error(data)
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
