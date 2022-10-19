import * as THREE from 'three'
//import { ThrowStatement } from '../libs/esprima.js'

import { SceneBuilder } from './SceneBuilder.js'
function SpaceLoader(editor) {
	//editor.spaceLoader = this
	const self = this

	editor.signals.upload.add(function () {
		self.save()
	})
	const builder = new SceneBuilder(editor)
	this.createMeta = async function (meta, context, resources) {
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
				matrix: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]
			}
		}

		let node = await builder.parseNode(data)

		builder.addNode(node)
		const children = await this.getNodes(context.children.entities, resources)

		children.forEach(child => {
			this.lockNode(child)
			node.add(child)
		})
		return node
	}
	this.addMeta = async function (meta, context, resources) {
		let node = editor.objectByUuid(meta.parameters.uuid)
		if (typeof node === 'undefined') {
			node = await this.createMeta(meta, context, resources)
		}
		node.matrix = builder.getMatrix4(meta.parameters.transform)
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

	this.loadRoom = async function () {
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
						intensity: 1,
						distance: 0,
						decay: 1
					},
					{
						uuid: '9d42f72e-d9f3-4f4b-beff-069ab0922a89',
						type: 'DirectionalLight',
						name: 'DirectionalLight',
						layers: 1,
						matrix: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 5, 10, 7.5, 1],
						color: 16777215,
						intensity: 1
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

	this.loadSpace = async function (data) {
		const node = await builder.loadPolygen(data.mesh.url)
		node.name = 'Space'
		node.uuid = data.mesh.md5
		return node
	}

	this.save = async function () {
		const metas = this.verse.children.metas
		metas.forEach(meta => {
			const node = editor.objectByUuid(meta.parameters.uuid)

			if (node) {
				meta.parameters.name = node.name
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
			from: 'mrpp-editor',
			action: 'save-verse',
			verse: JSON.stringify(self.verse)
		}

		window.parent.postMessage(data, '*')
		console.error(self.verse)
	}

	this.loadIt = async function () {
		let space = editor.objectByUuid(this.data.space.mesh.md5)
		if (typeof space === 'undefined') {
			space = await self.loadSpace(this.data.space)
			this.lockNode(space)
			this.room.add(space)
		}

		editor.signals.sceneGraphChanged.dispatch()
	}
	this.loadMetas = async function () {
		const self = this

		let metas = new Map()
		this.data.links.forEach(m => {
			metas.set(m.id, JSON.parse(m.data))
		})
		let resources = new Map()
		this.data.resources.forEach(r => {
			resources.set(r.id, r)
		})

		this.verse.children.metas.forEach(async meta => {
			if (metas.has(meta.parameters.id)) {
				const data = metas.get(meta.parameters.id)
				await self.addMeta(meta, data, resources)
			}
		})
	}
	this.removeNode = async function (oldValue, newValue) {
		const oldMetas = oldValue.children.metas
		const newMetas = newValue.children.metas

		let metas = new Set()
		newMetas.forEach(meta => {
			metas.add(meta.parameters.uuid)
		})
		oldMetas.forEach(meta => {
			if (!metas.has(meta.parameters.uuid)) {
				const obj = editor.objectByUuid(meta.parameters.uuid)
				if (typeof obj !== 'undefined') {
					editor.removeObject(obj)
				}
			}
		})
	}
	this.load = async function (data) {
		this.data = data
		if (typeof this.verse === 'undefined') {
			this.verse = JSON.parse(data.data)
		} else {
			const verse = JSON.parse(data.data)
			await this.removeNode(this.verse, verse)
			this.verse = verse
		}

		if (typeof this.room === 'undefined') {
			this.room = await this.loadRoom()
			this.lockNode(this.room)
			builder.addNode(this.room)
		}
		//	self.verse = JSON.parse(data.data)
		self.loadMetas()
		self.loadIt()
	}
}
export { SpaceLoader }
