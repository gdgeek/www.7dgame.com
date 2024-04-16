import * as THREE from 'three'

import { AddObjectCommand } from '../commands/AddObjectCommand.js'
import { GLTFLoader } from '../../../examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from '../../../examples/jsm/loaders/DRACOLoader.js'
import { VOXLoader, VOXMesh } from '../../../examples/jsm/loaders/VOXLoader.js'

class SceneBuilder {
	constructor(editor) {
		this.editor = editor
	}
	async loadVoxel(url) {
		return new Promise((resolve, reject) => {
			const loader = new VOXLoader()
			loader.load(
				url,

				function (chunks) {
					const chunk = chunks[0]
					const mesh = new VOXMesh(chunk, 0.005)

					//mesh.scale.set(0.005, 0.005, 0.005)
					resolve(mesh)
				}
			)
		})
	}
	async loadPolygen(url) {
		const self = this
		return new Promise((resolve, reject) => {
			const loader = new GLTFLoader(THREE.DefaultLoadingManager)
			const dracoLoader = new DRACOLoader()

			dracoLoader.setDecoderPath('./draco/')
			loader.setDRACOLoader(dracoLoader)

			loader.load(
				// resource URL
				url,
				function (gltf) {
					resolve(gltf.scene)
					gltf.scene.children.forEach(item => {
						self.lockNode(item)
					})
				},
				function (xhr) {
					//console.log((xhr.loaded / xhr.total) * 100 + '% loaded!')
				},
				// called when loading has errors
				function (error) {
					reject(error)
					console.error('An error happened')
				}
			)
		})
	}
	setTransform(node, transform) {
		const p = transform.position
		const s = transform.scale
		const r = transform.rotate
		node.position.set(p.x, p.y, p.z)
		node.scale.set(s.x, s.y, s.z)
		node.rotation.set(
			THREE.Math.degToRad(r.x),
			THREE.Math.degToRad(r.y),
			THREE.Math.degToRad(r.z)
		)
	}
	getMatrix4(transform) {
		const p = transform.position
		const s = transform.scale
		const r = transform.rotate
		const rotate = new THREE.Matrix4().makeRotationFromEuler(
			new THREE.Euler(
				THREE.Math.degToRad(r.x),
				THREE.Math.degToRad(r.y),
				THREE.Math.degToRad(r.z),
				'XYZ'
			)
		)
		const scale = new THREE.Matrix4().makeScale(s.x, s.y, s.z)

		rotate.multiply(scale).setPosition(p.x, p.y, p.z)
		return rotate
	}

	async getPolygen(data, resources) {
		if (resources.has(data.parameters.resource)) {
			const resource = resources.get(data.parameters.resource)
			const node = await this.loadPolygen(resource.file.url)
			node.name = data.parameters.name + '[polygen]'
			node.uuid = resource.file.md5
			return node
		}
		return null
	}

	async getPlane(url, width, height) {
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

	async getPicture(data, resources) {
		const self = this
		const resource = resources.get(data.parameters.resource)
		const info = JSON.parse(resource.info)
		const size = info.size
		const width = data.parameters.width
		const height = width * (size.y / size.x)
		const plane = await self.getPlane(resource.image.url, width, height)

		return plane
	}
	async getEntity(data, resources) {
		const entity = new THREE.Group()
		entity.name = data.parameters.name
		return entity;
	}
	async getText(data, resources) {
		const text = data.parameters.text

		const geometry = new THREE.PlaneGeometry(
			0.1 * text.length + 0.05,
			0.1 + 0.05
		)
		const material = new THREE.MeshBasicMaterial({
			color: 0x8888ff,
			side: THREE.DoubleSide
		})
		const plane = new THREE.Mesh(geometry, material)

		plane.name = data.parameters.name + '[text]'
		return plane
	}
	async getVoxel(data, resources) {
		if (resources.has(data.parameters.resource)) {
			const resource = resources.get(data.parameters.resource)
			const node = await this.loadVoxel(resource.file.url)
			node.name = '[voxel]'
			node.uuid = resource.file.md5
			return node
		}
		return null
	}
	async getSound(data, resources) {
		const entity = new THREE.Group()
		entity.name = data.parameters.name
		return entity;
	}
	async getVideo(data, resources) {
		const self = this
		const resource = resources.get(data.parameters.resource)
		const info = JSON.parse(resource.info)
		const size = info.size
		const width = data.parameters.width
		const height = width * (size.y / size.x)
		const plane = await self.getPlane(resource.image.url, width, height)

		plane.name = data.parameters.name + '[video]'
		return plane
	}
	lockNode(node) {
		//node.locked = true
		node.userData['locked'] = true
		node.children.forEach(item => {
			this.lockNode(item)
		})
	}
	async addEntity(entity, resources) {
		let node = editor.objectByUuid(entity.parameters.uuid)

		if (typeof node === 'undefined') {
			node = await this.building(entity, resources)

			node.name = entity.parameters.name
			node.uuid = entity.parameters.uuid
			node.applyMatrix4(this.getMatrix4(entity.parameters.transform))
		}
		for (let i = 0; i < entity.children.entities.length; ++i) {
			const child = await this.addEntity(entity.children.entities[i], resources)
			node.add(child)
		}

		node.visible = entity.parameters.active
		console.error(entity.parameters)
		const userData = { "type": entity.type }
		const exclude = ['name', 'uuid', 'transform', 'active']

		Object.keys(entity.parameters).forEach(key => {
			if (!exclude.includes(key)) {
				userData[key] = entity.parameters[key]
			}
		})
		console.error(entity.children.components)
		node.components = entity.children.components
		node.userData = userData
		return node
	}
	async building(data, resources) {
		let node = null
		switch (data.type.toLowerCase()) {
			case 'polygen':
				node = await this.getPolygen(data, resources)
				break
			case 'picture':
				node = await this.getPicture(data, resources)
				break
			case 'video':
				node = await this.getVideo(data, resources)
				break
			case 'sound':
				node = await this.getSound(data, resources)
				break
			case 'voxel':
				node = await this.getVoxel(data, resources)
				break
			case 'text':
				node = await this.getText(data, resources)
				break
			case 'entity':
				node = await this.getEntity(data, resources)
				break
		}
		/*if (node !== null) {
			this.lockNode(node)
		}*/
		return node
	}

	async lights() {
		const light = {
			metadata: {
				version: 4.5,
				type: 'Object',
				generator: 'Object3D.toJSON'
			},
			object: {
				uuid: '10331223-0128-441b-b358-c3016a6ecc2f',
				type: 'Group',
				name: 'Lights',
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

		let node = await this.parseNode(light)
		return node
	}
	async parseNode(json) {
		return new Promise(async (resolve, reject) => {
			try {
				var loader = new THREE.ObjectLoader()
				const data = await loader.parseAsync(json)
				resolve(data)
			} catch (e) {
				alert(e)
				reject(e)
			}
		})
	}

	addNode(node) {
		self.editor.addObject(node)
	}
}

export { SceneBuilder }
