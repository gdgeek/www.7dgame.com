import * as THREE from 'three'

import { SceneBuilder } from './SceneBuilder.js'

function MetaLoader(editor) {
	const self = this

	editor.signals.upload.add(function () {
		self.save()
	})

	const builder = new SceneBuilder(editor)

	this.saveEntity = async function (data) {
		const node = editor.objectByUuid(data.parameters.uuid)
		if (node) {
			data.parameters.name = node.name
			data.parameters.transform.position = {
				x: node.position.x,
				y: node.position.y,
				z: node.position.z
			}
			data.parameters.transform.rotate = {
				x: (node.rotation.x / Math.PI) * 180,
				y: (node.rotation.y / Math.PI) * 180,
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
				const node = await builder.addEntity(
					self.meta.children.entities[i],
					resources
				)
				root.add(node)
			}
		}
		editor.addObject(root)
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
		if (typeof this.room === 'undefined') {
			this.room = await builder.loadRoom()
			builder.lockNode(this.room)
			editor.addObject(this.room)
		}

		if (data.data !== null) {
			self.data = data

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
	}
}
export { MetaLoader }
