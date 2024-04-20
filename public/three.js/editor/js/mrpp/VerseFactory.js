import * as THREE from 'three'

import { GLTFLoader } from '../../../examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from '../../../examples/jsm/loaders/DRACOLoader.js'
import { VOXLoader, VOXMesh } from '../../../examples/jsm/loaders/VOXLoader.js'
import { Factory } from './Factory.js'
class VerseFactory extends Factory {
	constructor() {
		super()
	}
	async addAnchor(data, root = null) {
		return new Promise(resolve => {
			const node = new THREE.Object3D()
			node.name = data.parameters.title
			node.uuid = data.parameters.uuid
			node.type = data.type;
			const userData = {}
			const exclude = ['name', 'title', 'uuid', 'transform', 'active']

			Object.keys(data.parameters).forEach(key => {
				if (!exclude.includes(key)) {
					userData[key] = data.parameters[key]
				}
			})
			userData.draggable = false
			node.userData = userData;

			const transform = data.parameters.transform
			this.setTransform(node, transform)
			if (root != null) {
				root.add(node)
			}
			const loader = new GLTFLoader(THREE.DefaultLoadingManager)
			loader.load('/three.js/mesh/unreal-gizmo.glb', gltf => {
				const mesh = gltf.scene;//.children[0]
				mesh.scale.set(0.1, 0.1, 0.1)
				mesh.rotation.set(Math.PI / 2, Math.PI / 2, 0)
				this.lockNode(gltf.scene)
				node.add(gltf.scene)
				console.error(node)
				resolve(node)
			})
		})
	}
}

export { VerseFactory }
