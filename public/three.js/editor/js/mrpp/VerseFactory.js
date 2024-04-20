import * as THREE from 'three'

import { GLTFLoader } from '../../../examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from '../../../examples/jsm/loaders/DRACOLoader.js'
import { VOXLoader, VOXMesh } from '../../../examples/jsm/loaders/VOXLoader.js'
import { Factory } from './Factory.js'
class VerseFactory extends Factory {
	constructor() {
		super()
	}


	addMetaKnight(data) {

		const node = new THREE.Group()
		node.name = data.parameters.title

		node.type = data.type;
		node.uuid = data.parameters.uuid

		const transform = data.parameters.transform
		this.setTransform(node, transform)

		const userData = {}

		const exclude = ['name', 'title', 'uuid', 'transform', 'active']

		Object.keys(data.parameters).forEach(key => {
			if (!exclude.includes(key)) {
				userData[key] = data.parameters[key]
			}
		})

		userData.draggable = false
		node.userData = userData
		return node;
	}

}

export { VerseFactory }
