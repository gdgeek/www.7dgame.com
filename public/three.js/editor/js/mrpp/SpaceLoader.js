import * as THREE from 'three'

import { SceneBuilder } from './SceneBuilder.js'
function SpaceLoader(editor) {
	const self = this
	editor.spaceLoader = this
	const builder = new SceneBuilder(editor)
	let verse = null
	this.addMeta = async function (meta, context, resources) {
		const matrix = builder.getMatrix4(meta.parameters.transform)
		//alert(JSON.stringify(context.children.entities))
		const data = {
			metadata: {
				version: 4.5,
				type: 'Object',
				generator: 'Object3D.toJSON'
			},
			object: {
				uuid: meta.parameters.uuid,
				type: 'Group',
				name: meta.parameters.title,
				layers: 1,
				matrix: matrix.elements
			}
		}

		let node = await builder.parseNode(data)
		const children = await this.getNodes(context.children.entities, resources)

		children.forEach(child => {
			this.lockNode(child)
			node.add(child)
		})

		builder.addNode(node)
	}
	this.getNodes = async function (entities, resources) {
		if (typeof entities === 'undefined' || entities === null) {
			return []
		}
		const list = []

		for (let i = 0; i < entities.length; ++i) {
			const node = await this.getNode(entities[i], resources)
			list.push(node)
		}
		return list
	}
	this.getPoint = async function (entity, resources) {
		const matrix = builder.getMatrix4(entity.parameters.transform)
		return await this.createNode(
			entity.parameters.name,
			entity.parameters.uuid,
			matrix
		)
		/*
		const data = {
			metadata: {
				version: 4.5,
				type: 'Object',
				generator: 'Object3D.toJSON'
			},
			object: {
				uuid: entity.parameters.uuid,
				type: 'Group',
				name: entity.parameters.name,
				layers: 1,
				matrix: matrix.elements
			}
		}
		let node = await builder.parseNode(data)
		return node*/
	}
	this.getPolygen = async function (entity, resources) {
		const matrix = builder.getMatrix4(entity.parameters.transform)

		if (resources.has(entity.parameters.polygen)) {
			const resource = resources.get(entity.parameters.polygen)
			const node = await builder.loadPolygen(resource.fileData.url)
			node.name = entity.parameters.name
			node.uuid = resource.fileData.md5
			node.matrix = matrix
			return node
		}

		return await this.getPoint(entity, resources)
	}
	this.lockNode = function (node) {
		node.locked = true

		node.children.forEach(item => {
			this.lockNode(item)
		})
	}
	this.getNode = async function (entity, resources) {
		let node = null
		switch (entity.type.toLowerCase()) {
			case 'polygen':
				node = await this.getPolygen(entity, resources)
				break
		}
		if (node === null) {
			node = await this.getPoint(entity, resources)
		}

		const children = await this.getNodes(entity.children.entities, resources)
		children.forEach(child => {
			node.add(child)
		})
		return node
	}
	this.createNode = async function (name, uuid, matrix) {
		const data = {
			metadata: {
				version: 4.5,
				type: 'Object',
				generator: 'Object3D.toJSON'
			},
			object: {
				uuid,
				type: 'Group',
				name,
				layers: 1,
				matrix: matrix.elements
			}
		}

		let node = await builder.parseNode(data)
		return node
	}

	this.loadLight = async function () {
		const light = {
			metadata: {
				version: 4.5,
				type: 'Object',
				generator: 'Object3D.toJSON'
			},
			object: {
				uuid: '10331223-0128-441b-b358-c3016a6ecc2f',
				type: 'Group',
				name: 'Room',
				layers: 1,
				matrix: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
				children: [
					{
						uuid: 'f4c131be-dac2-4a72-8e72-fbabc4e430bb',
						type: 'PointLight',
						name: 'PointLight',
						layers: 1,
						matrix: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
						color: 16777215,
						intensity: 3,
						distance: 0,
						decay: 1,
						shadow: {
							camera: {
								uuid: '7abda5ad-ed09-41e1-b92e-725193795879',
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
					},
					{
						uuid: '8b6b5b36-c5ed-4c21-9453-a8dd04ca53fe',
						type: 'AmbientLight',
						name: 'AmbientLight',
						layers: 1,
						matrix: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
						color: 2236962,
						intensity: 2
					}
				]
			}
		}

		let node = await builder.parseNode(light)

		return node
		//this.lockNode(node)
		//builder.addNode(node)
	}

	this.loadRoom = async function (room) {
		const node = await builder.loadPolygen(room.mesh.url)
		node.name = 'Space'
		node.uuid = room.mesh.md5
		return node
	}

	this.save = async function () {
		const metas = self.verse.children.metas
		metas.forEach(meta => {
			const node = editor.objectByUuid(meta.parameters.uuid)

			//alert(JSON.stringify(node))
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
	this.loadSpace = async function (data) {
		const light = await self.loadLight()
		builder.addNode(light)
		const room = await self.loadRoom(data.space)
		light.add(room)
		this.lockNode(light)
	}
	this.loadMetas = async function (data) {
		const self = this

		let metas = new Map()
		data.links.forEach(m => {
			metas.set(m.id, JSON.parse(m.data))
		})
		let resources = new Map()
		data.resources.forEach(r => {
			resources.set(r.id, r)
		})
		//const verse = JSON.parse(data.data)
		this.verse.children.metas.forEach(async meta => {
			if (metas.has(meta.parameters.id)) {
				const data = metas.get(meta.parameters.id)
				await self.addMeta(meta, data, resources)
			}
		})
	}
	this.load = async function (data) {
		self.verse = JSON.parse(data.data)

		self.loadMetas(data)
		self.loadSpace(data)
	}
}
export { SpaceLoader }
