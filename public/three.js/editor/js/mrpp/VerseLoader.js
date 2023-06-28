import * as THREE from 'three'
import { SceneBuilder } from './SceneBuilder.js'

function VerseLoader(editor) {
	//editor.spaceLoader = this
	const self = this

	editor.signals.upload.add(function () {
		self.save()
	})
	const builder = new SceneBuilder(editor)

	this.createKnight = async function (meta, context) {
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
		builder.lockNode(child)
		return node
	}
	this.addKnight = async function (meta, context) {
		let node = editor.objectByUuid(meta.parameters.uuid)

		if (typeof node === 'undefined') {
			node = await this.createKnight(meta, context)
		}
		const matrix = builder.getMatrix4(meta.parameters.transform)
		node.matrix = matrix
	}
	this.addAnchor = async function (anchor) {
		console.error('anchor')
		console.error(anchor)

		let root = editor.objectByUuid(anchor.parameters.uuid)
		const transform = anchor.parameters.transform
		if (typeof root === 'undefined') {
			root = new THREE.Object3D()
			root.name = anchor.parameters.title + '(Anchor)'
			root.uuid = anchor.parameters.uuid
			root.type = 'Group'
			root.locked = false
			builder.setTransform(root, transform)

			const geometry = new THREE.LatheGeometry()
			const mesh = new THREE.Mesh(
				geometry,
				new THREE.MeshStandardMaterial({ side: THREE.DoubleSide })
			)
			mesh.name = 'Anchor'

			//	var m = new THREE.Matrix4().makeScale(0.1, 0.1, 0.1)
			mesh.scale.set(0.1, 0.1, 0.1)
			mesh.locked = true
			root.add(mesh)

			editor.addObject(root)
		} else {
			builder.setTransform(root, transform)
		}
		//root.applyMatrix4(matrix)
	}
	this.addMeta = async function (meta, context, resources) {
		let root = editor.objectByUuid(meta.parameters.uuid)
		//const matrix = builder.getMatrix4(meta.parameters.transform)
		const transform = meta.parameters.transform
		if (typeof root === 'undefined') {
			root = new THREE.Object3D()
			root.name = meta.parameters.title
			root.uuid = meta.parameters.uuid
			root.type = 'Group'
			root.locked = false
			builder.setTransform(root, transform)
		}

		if (context.children) {
			for (let i = 0; i < context.children.entities.length; ++i) {
				const node = await builder.addEntity(
					context.children.entities[i],
					resources
				)

				builder.lockNode(node)
				root.add(node)
			}
		}
		editor.addObject(root)
	}

	this.loadSpace = async function (data) {
		const node = await builder.loadPolygen(data.mesh.url)
		node.name = 'Space'
		node.uuid = data.mesh.md5
		return node
	}

	this.save = async function () {
		const anchors = this.verse.children.anchors
		anchors.forEach(anchor => {
			const node = editor.objectByUuid(anchor.parameters.uuid)
			if (node) {
				anchor.parameters.name = node.name
				anchor.parameters.transform.position = {
					x: node.position.x,
					y: node.position.y,
					z: node.position.z
				}
				anchor.parameters.transform.rotate = {
					x: (node.rotation.x / Math.PI) * 180,
					y: (node.rotation.y / Math.PI) * 180,
					z: (node.rotation.z / Math.PI) * 180
				}
				anchor.parameters.transform.scale = {
					x: node.scale.x,
					y: node.scale.y,
					z: node.scale.z
				}
			}
		})
		const metas = this.verse.children.metas
		metas.forEach(meta => {
			const node = editor.objectByUuid(meta.parameters.uuid)

			if (node) {
				meta.parameters.name = node.name
				meta.parameters.transform.position = {
					x: node.position.x,
					y: node.position.y,
					z: node.position.z
				}
				meta.parameters.transform.rotate = {
					x: (node.rotation.x / Math.PI) * 180,
					y: (node.rotation.y / Math.PI) * 180,
					z: (node.rotation.z / Math.PI) * 180
				}
				meta.parameters.transform.scale = {
					x: node.scale.x,
					y: node.scale.y,
					z: node.scale.z
				}
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
			builder.lockNode(space)
			this.room.add(space)
		}
	}

	this.loadDatas = async function () {
		let knights = new Map()

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
		if (this.verse.children.anchors) {
			this.verse.children.anchors.forEach(async anchor => {
				await self.addAnchor(anchor)
			})
		}
		//this.verse.children.anchors
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
		if (typeof this.room === 'undefined') {
			this.room = await builder.loadRoom()
			builder.lockNode(this.room)
			editor.addObject(this.room)
		}
		if (data.data !== null) {
			this.data = data
			if (typeof this.verse === 'undefined') {
				this.verse = JSON.parse(data.data)
			} else {
				const verse = JSON.parse(data.data)
				await this.removeNode(this.verse, verse)
				this.verse = verse
			}
			self.loadDatas()
			self.loadIt()
		}
		editor.signals.sceneGraphChanged.dispatch()
	}
}
export { VerseLoader }
