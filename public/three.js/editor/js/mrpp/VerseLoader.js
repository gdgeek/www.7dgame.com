import * as THREE from 'three'
import { SceneBuilder } from './SceneBuilder.js'
import { GLTFLoader } from '../../../examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from '../../../examples/jsm/loaders/DRACOLoader.js'
import { VerseFactory } from './VerseFactory.js'
function VerseLoader(editor) {

	const types = ['Meta', 'Anchor', 'MetaKnight']

	editor.selector = function (object) {

		return types.includes(object.type);
	}

	const self = this

	editor.signals.upload.add(function () {
		self.save()
	})
	const factory = new VerseFactory();
	const builder = new SceneBuilder(editor)

	this.addMetaKnight = async function (root, data, meta, resources) {
		return new Promise(async resolve => {
			console.error(meta)
			const node = new THREE.Group()
			node.name = data.parameters.title

			node.type = data.type;
			node.uuid = data.parameters.uuid

			const transform = data.parameters.transform
			factory.setTransform(node, transform)

			const userData = {}

			const exclude = ['name', 'title', 'uuid', 'transform', 'active']

			Object.keys(data.parameters).forEach(key => {
				if (!exclude.includes(key)) {
					userData[key] = data.parameters[key]
				}
			})

			userData.draggable = false
			node.userData = userData
			const loader = new GLTFLoader(THREE.DefaultLoadingManager)
			loader.load('/three.js/mesh/unreal-gizmo.glb', gltf => {
				const mesh = gltf.scene;//.children[0]
				mesh.scale.set(0.1, 0.1, 0.1)
				mesh.rotation.set(Math.PI / 2, Math.PI / 2, 0)
				node.add(gltf.scene)
				factory.lockNode(gltf.scene)
				resolve(node)
			})
			root.add(node)
		})
		//await builder.readMeta(node, JSON.parse(meta.data), resources)
	}
	this.addMeta = async function (root, data, meta, resources) {
		return new Promise(async resolve => {
			console.error(meta)
			const node = new THREE.Group()
			node.name = data.parameters.title

			node.type = data.type;
			node.uuid = data.parameters.uuid

			const transform = data.parameters.transform
			factory.setTransform(node, transform)

			const userData = {}
			const exclude = ['name', 'title', 'uuid', 'transform', 'active']

			Object.keys(data.parameters).forEach(key => {
				if (!exclude.includes(key)) {
					userData[key] = data.parameters[key]
				}
			})
			userData.draggable = false
			node.userData = userData

			root.add(node)
			await builder.readMeta(node, JSON.parse(meta.data), resources)
			resolve(node)
		})
	}
	this.addAnchor = async function (root, data) {
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
			factory.setTransform(node, transform)
			root.add(node)
			const loader = new GLTFLoader(THREE.DefaultLoadingManager)
			loader.load('/three.js/mesh/unreal-gizmo.glb', gltf => {
				const mesh = gltf.scene;//.children[0]
				mesh.scale.set(0.1, 0.1, 0.1)
				mesh.rotation.set(Math.PI / 2, Math.PI / 2, 0)
				factory.lockNode(gltf.scene)
				node.add(gltf.scene)
				console.error(node)
				resolve(node)
			})
		})
	}

	/*
		this.loadSpace = async function (data) {
			const node = await builder.loadPolygen(data.mesh.url)
			node.name = 'Space'
			node.uuid = data.mesh.md5
			return node
		}*/

	this.save = async function () {

		const root = editor.scene;
		const verse = await this.write(root)

		const data = {
			action: 'save-verse',
			data: JSON.stringify(verse)
		}

		editor.signals.messageSend.dispatch(data)
	}

	this.compareObjectsAndPrintDifferences = function (obj1, obj2, path = '', tolerance = 0.0001) {
		if (obj1 == null || obj2 == null) {
			console.log('One of the objects is null');
			return;
		}
		const keys1 = Object.keys(obj1);
		const keys2 = Object.keys(obj2);

		for (let key of keys1) {
			const val1 = obj1[key];
			const val2 = obj2[key];
			const currentPath = path ? `${path}.${key}` : key;

			if (typeof val1 === 'object' && typeof val2 === 'object') {

				self.compareObjectsAndPrintDifferences(val1, val2, currentPath);
			} else if (typeof val1 === 'number' && typeof val2 === 'number') {
				if (Math.abs(val1 - val2) > tolerance) {
					console.log(`Difference found at: "${currentPath}":`);
					console.log(`Object 1: ${val1}`);
					console.log(`Object 2: ${val2}`);
				}
			} else if (val1 !== val2) {
				console.log(`Difference found at, ${currentPath}:`);
				console.log(`Object 1: ${val1}`);
				console.log(`Object 2: ${val2}`);
			}
		}

		// Check for keys present in obj2 but not in obj1
		for (let key of keys2) {
			if (!keys1.includes(key)) {
				const currentPath = path ? `${path}.${key}` : key;
				console.log(`Key ${currentPath} present in Object 2 but not in Object 1`);
			}
		}
	}
	/*
	this.loadIt = async function () {
		if (this.data.space) {
			space = await self.loadSpace(this.data.space)
			builder.lockNode(space)
			editor.scene.add(space)
		}


	}*/
	this.writeData = function (node) {

		if (!types.includes(node.type)) {
			return null;
		}
		const data = {}

		data.type = node.type


		data.parameters = {}
		data.parameters.uuid = node.uuid
		data.parameters.title = node.name
		data.parameters.transform = {}
		data.parameters.transform.position = {
			x: node.position.x,
			y: node.position.y,
			z: node.position.z
		}
		data.parameters.transform.rotate = {
			x: (node.rotation.x / Math.PI) * 180,
			y: (node.rotation.y / Math.PI) * 180,
			z: (node.rotation.z / Math.PI) * 180
		};
		data.parameters.transform.scale = {
			x: node.scale.x,
			y: node.scale.y,
			z: node.scale.z
		};
		const exclude = ['type']

		Object.keys(node.userData).forEach(key => {
			if (!exclude.includes(key)) {
				data.parameters[key] = node.userData[key]
			}
		})
		//entity.parameters.transform.active = true
		//data.parameters.active = node.visible;
		return data;
	}

	this.write = async function (root) {

		const data = {}
		data.type = "Verse"
		data.parameters = { "uuid": root.uuid }
		data.parameters.space = { "id": -1, "occlusion": false }
		data.parameters.story = "{\"sorted\":[110],\"contactor\":false}"
		const anchors = []
		const metas = []
		const metaKnights = []
		//	data.children = { "anchors": [], "metas": [], "metaKnights": [] }
		root.children.forEach(node => {

			const nd = this.writeData(node)
			if (nd != null) {
				if (node.type == 'Anchor') {
					anchors.push(nd)
				} else if (node.type == 'Meta') {
					metas.push(nd)
				} else if (node.type == 'MetaKnight') {
					metaKnights.push(nd)
				}
			}


			//alert(JSON.stringify(userData))
			//const entity = self.writeEntity(node);
			//if (entity != null) {
			//		entities.push(entity)
			//	}
		})
		data.children = { metas, anchors, metaKnights }
		console.error(data)
		return data;
	}

	this.read = async function (root, data, resources, modules) {
		root.uuid = data.parameters.uuid

		if (data.children.anchors) {
			data.children.anchors.forEach(async item => {
				await self.addAnchor(root, item)
			})
		}

		if (data.children.metaKnights) {
			data.children.metaKnights.forEach(async item => {

				const meta = modules.get(item.parameters.id)
				await self.addMetaKnight(root, item, meta, resources)
			})
		}

		if (data.children.metas) {
			data.children.metas.forEach(async item => {
				const meta = modules.get(item.parameters.id)
				await self.addMeta(root, item, meta, resources)
				editor.signals.sceneGraphChanged.dispatch()

				//entity.name = data.parameters.name
				//return entity;
				//await builder.readMeta(null, JSON.parse(meta.data), resources)
				//builder
				//	await self.addPoint(meta, 'Meta')
			})
		}
		/*if (data.children) {
			for (let i = 0; i < data.children.entities.length; ++i) {
				if (data.children.entities[i] != null) {
					const node = await builder.addEntity(
						data.children.entities[i],
						resources
					)
					if (node != null) {
						root.add(node)
						editor.signals.sceneGraphChanged.dispatch()
					}
				}
			}
		}*/
	}
	this.clear = async function () {
		this.scene.clear()
	}
	this.load = async function (verse) {

		let scene = editor.scene;
		if (scene == null) {
			scene = new THREE.Scene();
			scene.name = "Scene"
			editor.setScene(scene)
		}

		editor.signals.sceneGraphChanged.dispatch()
		let lights = editor.scene.getObjectByName("$lights")
		if (lights == null) {
			lights = new THREE.Group();
			lights.name = "$lights";
			const light1 = new THREE.DirectionalLight(0xffffff, 0.5)
			light1.position.set(-0.5, 0, 0.7)
			light1.name = "light1"
			lights.add(light1);
			const light2 = new THREE.AmbientLight(0xffffff, 0.5)

			light2.name = "light2"
			lights.add(light2);
			const light3 = new THREE.PointLight(0xffffff, 1)
			light3.position.set(0, 0, 0)
			light3.name = "light3"
			lights.add(light3);
			scene.add(lights)
			builder.lockNode(lights)
			editor.signals.sceneGraphChanged.dispatch()
		}

		let root = editor.scene;


		if (verse.data !== null) {
			const data = JSON.parse(verse.data)
			if (typeof self.data !== 'undefined') {
				await this.removeNode(self.data, data)
			}

			const resources = new Map()
			verse.resources.forEach(item => {
				resources.set(item.id, item)
			})
			const modules = new Map()
			verse.modules.forEach(item => {
				modules.set(item.id, item)
			})
			await this.read(root, data, resources, modules)
			const copy = await this.write(root);
			//console.error(copy)
			self.compareObjectsAndPrintDifferences(data, copy)
			editor.signals.sceneGraphChanged.dispatch()
		}



		editor.signals.sceneGraphChanged.dispatch()
	}
}
export { VerseLoader }
