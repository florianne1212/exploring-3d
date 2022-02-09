import './style.css'
import * as THREE from 'three'

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Objects
 */
// const geometry = new THREE.BoxGeometry(1, 1, 1)
// const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
// const mesh = new THREE.Mesh(geometry, material)
// // mesh.position.x = 0.7
// // mesh.position.y = -0.6
// // mesh.position.z = 1
// scene.add(mesh)

// // distance between position and center of the scene
// // console.log(mesh.position.length())

// // take vector lentgh to reduce it to 1
// // mesh.position.normalize()

// // set all position with one funvtion
// mesh.position.set(0.7, -0.6, 1)

// // y axis upward
// // z axis backward
// // x axis upward

// /// Scale
// // mesh.scale.x = 2
// // mesh.scale.y = 0.5
// // mesh.scale.z = 0.5
// mesh.scale.set(2, 0.5, 0.5)

// /// Rotation
// // pi for half roatation
// // be careful the order of the rotation because one axes change the lock gimballock -> one axes is stuck reorder
// mesh.rotation.reorder('YXZ')
// mesh.rotation.y = Math.PI * 0.25
// mesh.rotation.x = Math.PI * 0.25

// /// Quaternion
// // when you update quaternion, rotation is updated and vice versa

const group = new THREE.Group()
group.position.y = 1
group.scale.y = 2
group.rotation.y = 1
scene.add(group)

const cube1 = new THREE.Mesh(
    new THREE.BoxGeometry(1,1,1),
    new THREE.MeshBasicMaterial({color: 0xff0000})
)
group.add(cube1)

const cube2 = new THREE.Mesh(
    new THREE.BoxGeometry(1,1,1),
    new THREE.MeshBasicMaterial({color: 0x00ff00})
)
cube2.position.x =-2;
group.add(cube2)

const cube3 = new THREE.Mesh(
    new THREE.BoxGeometry(1,1,1),
    new THREE.MeshBasicMaterial({color: 0x0000ff})
)
cube3.position.x =2;
group.add(cube3)

/// Axex helper
// argument = scale
const axesHelper = new THREE.AxesHelper()
scene.add(axesHelper)

/**
 * Sizes
 */
const sizes = {
    width: 800,
    height: 600
}

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
// camera.position.x = 1
// camera.position.y = 1
scene.add(camera)

// camera.lookAt(mesh.position)

// distance between camera and object
//console.log(mesh.position.distanceTo(camera.position))

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)