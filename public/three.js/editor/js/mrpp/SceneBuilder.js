import * as THREE from 'three'

import { AddObjectCommand } from '../commands/AddObjectCommand.js'
import { GLTFLoader } from '../../../examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from '../../../examples/jsm/loaders/DRACOLoader.js'

class SceneBuilder {
	constructor(editor) {
		this.editor = editor
	}
	async loadPolygen(url) {
		//	alert(url)
		return new Promise((resolve, reject) => {
			const loader = new GLTFLoader(THREE.DefaultLoadingManager)
			const dracoLoader = new DRACOLoader()
			dracoLoader.setDecoderPath('./draco/')
			loader.setDRACOLoader(dracoLoader)
			const self = this

			loader.load(
				// resource URL
				url,
				// called when the resource is loaded
				function (gltf) {
					resolve(gltf.scene)
				},
				// called while loading is progressing
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
	getMatrix4(transform) {
		const p = transform.position
		const s = transform.scale
		const r = transform.rotate
		const rotate = new THREE.Matrix4().makeRotationFromEuler(
			new THREE.Euler(
				THREE.Math.degToRad(r.x),
				THREE.Math.degToRad(-r.y),
				THREE.Math.degToRad(r.z),
				'XYZ'
			)
		)
		const scale = new THREE.Matrix4().makeScale(s.x, s.y, s.z)

		rotate.multiply(scale).setPosition(-p.x, p.y, p.z)
		return rotate
	}

	async getPolygen(data, resources) {
		if (resources.has(data.parameters.polygen)) {
			const resource = resources.get(data.parameters.polygen)
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
	async getVideo(data, resources) {
		const self = this
		const resource = resources.get(data.parameters.video)
		const info = JSON.parse(resource.info)
		const size = info.size
		const width = data.parameters.width
		const height = width * (size.y / size.x)
		const plane = await self.getPlane(resource.image.url, width, height)

		plane.name = data.parameters.name + '[video]'
		return plane
	}
	lockNode(node) {
		node.locked = true
		node.children.forEach(item => {
			this.lockNode(item)
		})
	}
	async building(data, resources) {
		let node = null
		switch (data.type.toLowerCase()) {
			case 'polygen':
				node = await this.getPolygen(data, resources)
				break
			case 'video':
				node = await this.getVideo(data, resources)
				break
			case 'text':
				node = await this.getText(data, resources)
				break
		}
		if (node !== null) {
			this.lockNode(node)
		}
		return node
	}

	async loadRoom() {
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
