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
	/*
	async loadGltf(url) {
		return new Promise((resolve, reject) => {
			const loader = new GLTFLoader(THREE.DefaultLoadingManager)
			const dracoLoader = new DRACOLoader()
			dracoLoader.setDecoderPath('../../../examples/js/libs/draco/')
			//const gltf = new GLTFLoader()
			loader.setDRACOLoader(dracoLoader)
			const self = this
		})
	}*/
	loadResources(resources) {
		return new Promise((resolve, reject) => {
			const loader = new GLTFLoader(THREE.DefaultLoadingManager)

			const dracoLoader = new DRACOLoader()
			dracoLoader.setDecoderPath('../../../examples/js/libs/draco/')
			loader.setDRACOLoader(dracoLoader)
			const self = this
			const count = resources.length

			let n = 0

			const result = new Map()
			resources.forEach(item => {
				if (item.type === 'polygen') {
					loader.load(
						// resource URL
						item.file,
						// called when the resource is loaded
						function (gltf) {
							//	self.editor.addObject(gltf.scene)

							result.set(item.id, gltf.scene)
							++n
							if (n === count) {
								resolve(result)
							}
						},
						// called while loading is progressing
						function (xhr) {
							console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
						},
						// called when loading has errors
						function (error) {
							reject(error)
							console.log('An error happened')
						}
					)
				} else {
					++n
					result.set(item.id, item)
					if (n === count) {
						resolve(result)
					}
				}
			})
		})
	}
	getCamera() {
		/*
		
		*/
		return {
			metadata: {
				version: 4.5,
				type: 'Object',
				generator: 'Object3D.toJSON'
			},
			object: {
				uuid: '5e92b5bf-1c29-4983-a833-c2c8f7135fb7',
				type: 'PerspectiveCamera',
				name: 'Camera111',
				layers: 1,
				matrix: [
					1, 0, 0, 0, 0, 0.8944271909999156, -0.447213595499958, 0, 0,
					0.447213595499958, 0.8944271909999156, 0, 0, 5, 10, 1
				],
				fov: 50,
				zoom: 1,
				near: 0.01,
				far: 1000,
				focus: 10,
				aspect: 0.9175108538350217,
				filmGauge: 35,
				filmOffset: 0
			}
		}
	}
	getHistory() {
		return {
			undos: [],
			redos: []
		}
	}
	getScripts() {
		return {}
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
		return rotate /*	*/
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
	theNode(data) {
		const self = this
		return new Promise((resolve, reject) => {
			const matrix4 = self.getMatrix4(data)

			let json = {
				metadata: {
					version: 4.5,
					type: 'Object',
					generator: 'Object3D.toJSON'
				},
				object: {
					uuid: data.parameters['uuid'],
					visible: data.parameters['active'],
					type: 'Scene',
					name: JSON.stringify(data.parameters['name']),
					layers: 1,
					matrix: matrix4.elements
				}
			}
			var loader = new THREE.ObjectLoader()
			loader
				.parseAsync(json)
				.then(node => {
					resolve(node)
				})
				.catch(error => {
					reject(error)
				})
		})
	}

	getNode(data, resource) {
		const self = this
		//alert(1)
		switch (data.type) {
			case 'Polygen':
				return self.thePolygen(data, resource)
			case 'Picture':
				return self.thePicture(data, resource)
			//	case 'Video':
			//			return self.getVideo(data, resource)
		}

		return self.theNode(data)
	}
	getScene() {
		let scene = {
			metadata: {
				version: 4.5,
				type: 'Object',
				generator: 'Object3D.toJSON'
			},
			geometries: [
				{
					uuid: '83706787-62a0-479b-9004-373402ef4d2e',
					type: 'BoxGeometry',
					width: 1,
					height: 1,
					depth: 1,
					widthSegments: 1,
					heightSegments: 1,
					depthSegments: 1
				}
			],
			materials: [
				{
					uuid: 'aa04ff4f-44dd-48c3-bb0f-2951a59412c1',
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
				uuid: '31517222-A9A7-4EAF-B5F6-60751C0BABA3',
				type: 'Scene',
				name: 'Scene',
				layers: 1,
				matrix: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
				children: [
					{
						uuid: '7b1840c1-9598-435f-a638-02cd52bf333b',
						type: 'AmbientLight',
						name: 'AmbientLight',
						layers: 1,
						matrix: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
						color: 2236962,
						intensity: 1
					},
					{
						uuid: '961289bd-0019-4906-932b-f712fa4fe2e9',
						type: 'DirectionalLight',
						name: 'DirectionalLight',
						layers: 1,
						matrix: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 5, 10, 7.5, 1],
						color: 16777215,
						intensity: 1,
						shadow: {
							camera: {
								uuid: '10f8ec72-2340-4c2d-a882-562be90ea273',
								type: 'OrthographicCamera',
								layers: 1,
								zoom: 1,
								left: -5,
								right: 5,
								top: 5,
								bottom: -5,
								near: 0.5,
								far: 500
							}
						}
					}
				]
			}
		}
		return scene
	}
	/*
	theVideo(data, resources) {
		const self = this
		return new Promise((resolve, reject) => {
			const matrix4 = self.getMatrix4(data)

			let json = {
				metadata: {
					version: 4.5,
					type: 'Object',
					generator: 'Object3D.toJSON'
				},
				object: {
					uuid: data.parameters['uuid'],
					visible: data.parameters['active'],
					type: 'Scene',
					name: JSON.stringify(data.parameters['name']),
					layers: 1,
					matrix: matrix4.elements
				}
			}
			var loader = new THREE.ObjectLoader()
			loader
				.parseAsync(json)
				.then(node => {
					resolve(node)
				})
				.catch(error => {
					reject(error)
				})
		})
	}
	// 修改区
	thePicture(data, resources) {
		// alert(JSON.stringify(data))
		const self = this
		return new Promise((resolve, reject) => {
			const id = data.parameters['picture']
			let picture = resources.get(id)
			//  console.log(picture, 'picture')

			const size = JSON.parse(picture.info).size
			const url = picture.file

			const geometry = new THREE.PlaneGeometry(
				data.parameters['width'],
				data.parameters['width'] * (size.y / size.x)
			)
			const loader = new THREE.TextureLoader()
			const material = new THREE.MeshBasicMaterial({
				map: loader.load(url),
				side: THREE.DoubleSide
			})
			const plane = new THREE.Mesh(geometry, material)

			const matrix4 = self.getMatrix4(data)
			plane.applyMatrix4(matrix4)
			plane.name = JSON.stringify(data.parameters['name'])
			plane.uuid = data.parameters['uuid']
			plane.visible = data.parameters['active']
			resolve(plane)
		})
	}
	// 修改区结束
	*/
	thePolygen(data, resources) {
		//alert(123)
		const self = this
		return new Promise((resolve, reject) => {
			const id = data.parameters['polygen']
			let polygen = resources.get(id).clone()

			const matrix4 = self.getMatrix4(data)
			polygen.applyMatrix4(matrix4)
			polygen.name = JSON.stringify(data.parameters['name'])
			polygen.uuid = data.parameters['uuid']
			polygen.visible = data.parameters['active']
			resolve(polygen)
		})
	}
	addNode(node) {
		self.editor.addObject(node)
	}
	/*
	addNode(data, parent, resources) {
		const self = this

		return new Promise((resolve, reject) => {
			let n = self
				.getNode(data, resources)
				.then(node => {
					if (parent === null) {
						self.editor.addObject(node)
					} else {
						self.editor.addObject(node, parent)
					}
					if (data.children && data.children.entities) {
						const count = data.children.length
						let n = 0

						data.children.entities.forEach(item => {
							self
								.addNode(item, node, resources)
								.then(data => {
									++n
									if (n == count) {
										resolve(null)
									}
								})
								.catch(error => {
									reject(error)
								})
						})
					} else {
						resolve(null)
					}
				})
				.catch(error => {
					reject(error)
				})
		})
	}*/
	/*
	draw(data, resources) {
		const self = this
		var loader = new THREE.ObjectLoader()

		loader.parseAsync(self.getCamera()).then(camera => {
			self.editor.camera.copy(camera)
			self.editor.signals.cameraResetted.dispatch()
			self.editor.history.fromJSON(self.getHistory())
			self.editor.scripts = self.getScripts()
			loader.parseAsync(self.getScene()).then(scene => {
				self.editor.setScene(scene)
				self.addNode(data, null, resources).then(item => {
					alert(1)
				})
			})
		})
	}*/
}

export { SceneBuilder }
