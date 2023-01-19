import * as THREE from 'three'

import { SceneBuilder } from './SceneBuilder.js'

function MetaLoader(editor) {
	const self = this

	editor.signals.upload.add(function () {
		self.save()
	})

	const builder = new SceneBuilder(editor)
	/*
	this.loadSpace = async function (data) {
		const node = await builder.loadPolygen(data.mesh.url)
		node.name = 'Space'
		node.uuid = data.mesh.md5
		return node
	}
*/
	this.saveEntity = async function (data) {
		alert(data.parameters.uuid)

		const node = editor.objectByUuid(data.parameters.uuid)
		if (node) {
			data.parameters.name = node.name
			data.parameters.transform.position = {
				x: -node.position.x,
				y: node.position.y,
				z: node.position.z
			}
			data.parameters.transform.rotate = {
				x: (node.rotation.x / Math.PI) * 180,
				y: -(node.rotation.y / Math.PI) * 180,
				z: (node.rotation.z / Math.PI) * 180
			}
			data.parameters.transform.scale = {
				x: node.scale.x,
				y: node.scale.y,
				z: node.scale.z
			}
			data.parameters.transform.active = node.visible
		}
		for (let i = 0; i < data.children.entities.length; ++i) {
			self.saveEntity(data.children.entities[i])
		}
	}

	this.save = async function () {
		if (typeof self.meta !== 'undefined') {
			for (let i = 0; i < self.meta.children.entities.length; ++i) {
				self.saveEntity(self.meta.children.entities[i])
			}
		}
		//alert(JSON.stringify(self.meta))

		window.URL = window.URL || window.webkitURL
		window.BlobBuilder =
			window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder
		const data = {
			from: 'mrpp-editor',
			action: 'save-meta',
			meta: JSON.stringify(self.meta)
		}
		console.error(data)
		window.parent.postMessage(data, '*')
		console.error(self.meta)
	}

	this.addEntity = async function (entity, resources) {
		let node = editor.objectByUuid(entity.parameters.uuid)

		if (typeof node === 'undefined') {
			node = new THREE.Object3D()
			node.name = entity.parameters.name
			node.uuid = entity.parameters.uuid
			node.applyMatrix4(builder.getMatrix4(entity.parameters.transform))
			const point = await builder.building(entity, resources)
			if (point !== null) {
				node.add(point)
			}
		}

		for (let i = 0; i < entity.children.entities.length; ++i) {
			const child = await self.addEntity(entity.children.entities[i], resources)
			node.add(child)
		}
		return node
	}

	this.loadDatas = async function () {
		let root = editor.objectByUuid(self.meta.parameters.uuid)

		if (typeof root === 'undefined') {
			root = new THREE.Object3D()
			root.name = 'Root'
			root.uuid = self.meta.parameters.uuid
			root.type = 'Group'
			root.locked = true
		}

		let resources = new Map()
		self.data.resources.forEach(r => {
			resources.set(r.id, r)
		})
		if (self.meta.children) {
			for (let i = 0; i < self.meta.children.entities.length; ++i) {
				const node = await self.addEntity(
					self.meta.children.entities[i],
					resources
				)
				root.add(node)
			}
		}
		editor.addObject(root)
		//alert(resources.size)
		/*
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
		})*/
	}
	this.removeNode = async function (oldValue, newValue) {
		const oldEntities = oldValue.children.entities
		const newEntities = newValue.children.entities

		let entities = new Set()
		newEntities.forEach(entity => {
			entities.add(entity.parameters.uuid)
		})
		oldEntities.forEach(entity => {
			if (!entities.has(entity.parameters.uuid)) {
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
		editor.addObject(await builder.loadRoom())
		if (data.data !== null) {
			self.data = data

			//	alert(JSON.stringify(data))
			if (typeof self.meta === 'undefined') {
				self.meta = JSON.parse(data.data)
			} else {
				const meta = JSON.parse(data.data)
				await this.removeNode(self.meta, meta)
				self.meta = meta
			}
			self.loadDatas()
		}
		editor.signals.sceneGraphChanged.dispatch()
		//alert(JSON.stringify(self.meta))
	}
}
export { MetaLoader }
