import * as THREE from 'three'
import { SceneBuilder } from './SceneBuilder.js'
import { GLTFLoader } from '../../../examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from '../../../examples/jsm/loaders/DRACOLoader.js'
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
	this.addPoint = async function (point, type) {
		console.error('point')
		console.error(point)

		let root = editor.objectByUuid(point.parameters.uuid)
		const transform = point.parameters.transform
		if (typeof root === 'undefined') {
			root = new THREE.Object3D()
			root.userData['locked'] = false
			root.name = point.parameters.title
			root.uuid = point.parameters.uuid
			root.type = 'Group'

			builder.setTransform(root, transform)
			//!!
			const loader = new GLTFLoader(THREE.DefaultLoadingManager)
			//const dracoLoader = new DRACOLoader()
			//dracoLoader.setDecoderPath( '/three.js/editor/draco/' );
			//dracoLoader.setDecoderPath('./draco/')
			//loader.setDRACOLoader(dracoLoader)
			loader.load('/three.js/mesh/unreal-gizmo.glb', gltf => {
				const mesh = gltf.scene.children[0]

				mesh.name = type

				mesh.scale.set(0.1, 0.1, 0.1)
				//mesh.locked = true
				mesh.userData['locked'] = true
				root.add(mesh)
				editor.addObject(root)
			})
			//loader.load('../../../mesh/unreal-gizmo.glb', gltf => {
			//	alert(123)
			//})

			const geometry = new THREE.LatheGeometry()
		} else {
			builder.setTransform(root, transform)
		}
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
			//root.locked = false
			root.userData['locked'] = false
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
	this.readPoint = async function (point) {
		const node = editor.objectByUuid(point.parameters.uuid)
		if (typeof node !== 'undefined') {
			point.parameters.title = node.name
			point.parameters.transform.position = {
				x: node.position.x,
				y: node.position.y,
				z: node.position.z
			}
			point.parameters.transform.rotate = {
				x: (node.rotation.x / Math.PI) * 180,
				y: (node.rotation.y / Math.PI) * 180,
				z: (node.rotation.z / Math.PI) * 180
			}
			point.parameters.transform.scale = {
				x: node.scale.x,
				y: node.scale.y,
				z: node.scale.z
			}
		}
	}
	this.save = async function () {
		const anchors = this.verse.children.anchors
		anchors.forEach(anchor => {
			this.readPoint(anchor)
		})

		const mks = this.verse.children.metaKnights
		mks.forEach(mk => {
			this.readPoint(mk)
		})

		const metas = this.verse.children.metas
		metas.forEach(meta => {
			this.readPoint(meta)
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
		if (this.verse.children.anchors) {
			this.verse.children.anchors.forEach(async anchor => {
				await self.addPoint(anchor, 'Anchor')
			})
		}

		if (this.verse.children.metaKnights) {
			this.verse.children.metaKnights.forEach(async mk => {
				await self.addPoint(mk, 'MetaKnight')
			})
		}

		if (this.verse.children.metas) {
			this.verse.children.metas.forEach(async meta => {
				await self.addPoint(meta, 'Meta')
			})
		}

		/*let knights = new Map()

		this.data.datas.knights.forEach(m => {
			knights.set(m.id, m)
		})

		let metas = new Map()
		this.data.datas.metas.forEach(m => {
			metas.set(m.id, JSON.parse(m.data))
		})
*
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
		*/
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
			this.room = await builder.lights()
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
