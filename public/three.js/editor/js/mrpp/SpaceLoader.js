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
		const matrix = builder.getMatrix4(meta.parameters.transform)
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

		builder.addNode(node)

		const children = await this.getNodes(context.children.entities, resources)

		children.forEach(child => {
			this.lockNode(child)
			node.add(child)
		})
		return node
	}

	this.createKinght = async function (meta, context) {
		const matrix = builder.getMatrix4(meta.parameters.transform)
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

		builder.addNode(node)

		let e = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]
		if (context.info) {
			const info = JSON.parse(context.info)
			if (info.transform) {
				const matrix = builder.getMatrix4(info.transform)
				e = matrix.elements
			}
		}
		const cdata = {
			metadata: {
				version: 4.5,
				type: 'Object',
				generator: 'Object3D.toJSON'
			},
			object: {
				uuid: '8b6bfb36-c51d-4c21-9453-a8dd04ca53fe',
				type: 'Group',
				name: 'child',
				layers: 1,
				matrix: e
			}
		}
		let child = await builder.parseNode(cdata)
		const polygen = await builder.loadPolygen(context.mesh.file.url)

		polygen.name = 'meta.parameters.title'
		polygen.uuid = context.mesh.file.md5

		child.add(polygen)
		node.add(child)
		this.lockNode(child)
		return node
	}
	this.addKnight = async function (meta, context) {
		let node = editor.objectByUuid(meta.parameters.uuid)

		if (typeof node === 'undefined') {
			node = await this.createKinght(meta, context)
		}
		const matrix = builder.getMatrix4(meta.parameters.transform)
		node.matrix = matrix
	}
	this.addMeta = async function (meta, context, resources) {
		let node = editor.objectByUuid(meta.parameters.uuid)
		if (typeof node === 'undefined') {
			node = await this.createMeta(meta, context, resources)
		}
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
	}
	this.getPlane = async function (url, width, height) {
		//
		const textureLoader = new THREE.TextureLoader()
		return new Promise(resolve => {
			textureLoader.load(url, texture => {
				const geometry = new THREE.PlaneGeometry(width, height)
				const material = new THREE.MeshBasicMaterial({
					color: 0xffffff,
					side: THREE.DoubleSide,
					map: texture
				})
				const plane = new THREE.Mesh(geometry, material)
				resolve(plane)
			})
		})
	}
	this.getVideo = async function (entity, resources) {
		const parent = await self.getPoint(entity, resources)

		const resource = resources.get(entity.parameters.video)
		const info = JSON.parse(resource.info)
		const size = info.size
		const width = entity.parameters.width
		const height = width * (size.y / size.x)
		const plane = await self.getPlane(resource.image.url, width, height)
		parent.add(plane)
		return parent
	}
	this.getPolygen = async function (entity, resources) {
		const parent = await self.getPoint(entity, resources)
		if (resources.has(entity.parameters.polygen)) {
			const resource = resources.get(entity.parameters.polygen)
			const node = await builder.loadPolygen(resource.file.url)
			node.name = entity.parameters.name + '[polygen]'
			node.uuid = resource.file.md5
			const matrix = builder.getMatrix4(entity.parameters.transform)
			//node.matrix = matrix
			parent.add(node)
		}

		return parent
	}
	this.lockNode = function (node) {
		//node.locked = true

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
			case 'video':
				node = await this.getVideo(entity, resources)
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
			console.error(Math.PI)
			if (node) {
				meta.parameters.name = node.name
				meta.parameters.transform.position = {
					x: -node.position.x,
					y: node.position.y,
					z: node.position.z
				}
				meta.parameters.transform.rotate = {
					x: (node.rotation.x / Math.PI) * 180,
					y: -(node.rotation.y / Math.PI) * 180,
					z: (node.rotation.z / Math.PI) * 180
				}
				meta.parameters.transform.scale = {
					x: node.scale.x,
					y: node.scale.y,
					z: node.scale.z
				}

				meta.parameters.transform.active = node.visible
				//(JSON.stringify(meta.parameters.transform.rotate))
			}
		})

		window.URL = window.URL || window.webkitURL
		window.BlobBuilder =
			window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder
		const data = {
			from: 'mrpp-editor',
			action: 'save-verse',
			verse: JSON.stringify(self.verse)
		}
		console.error(data)
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

	this.loadDatas = async function () {
		let knights = new Map()
		console.error(this.data)
		this.data.datas.knights.forEach(m => {
			knights.set(m.id, m)
		})

		let metas = new Map()
		this.data.datas.metas.forEach(m => {
			metas.set(m.id, JSON.parse(m.data))
		})

		let resources = new Map()
		this.data.resources.forEach(r => {
			resources.set(r.id, r)
		})

		this.verse.children.metas.forEach(async meta => {
			if (meta.type == 'Meta' && metas.has(meta.parameters.id)) {
				const data = metas.get(meta.parameters.id)

				if (data !== null) {
					await self.addMeta(meta, data, resources)
				}
			} else if (meta.type == 'Knight' && knights.has(meta.parameters.id)) {
				const data = knights.get(meta.parameters.id)
				if (data !== null && data.data !== null) {
					await self.addKnight(meta, data)
				}
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
	this.clear = async function () {
		this.scene.clear()
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
		self.loadDatas()
		self.loadIt()
	}
}
export { SpaceLoader }
