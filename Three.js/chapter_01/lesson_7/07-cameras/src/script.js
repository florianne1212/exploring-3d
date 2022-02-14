import './style.css'
import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'

/**
 * Cursor
 */

const cursor = {
	x: 0,
	y: 0
}

// param: event, function
window.addEventListener('mousemove', (event) => {
	cursor.x = event.clientX / sizes.width - 0.5;
	cursor.y = - (event.clientY / sizes.height - 0.5);
})

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Sizes
const sizes = {
	width: 800,
	height: 600
}

// Scene
const scene = new THREE.Scene()

// Object
const mesh = new THREE.Mesh(
	new THREE.BoxGeometry(1, 1, 1, 5, 5, 5),
	new THREE.MeshBasicMaterial({ color: 0xff0000 })
)
scene.add(mesh)

// Camera

/// Perspective camera
// first param : field of view in degree
// second param : aspect ratio
// third param : near param
// fourth param : far param  any object or part of the object closer than the near or further than the far will not show up
// do not use extreme values or you will have z-fighting
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)

/// orthographic camera
// like a rctangle : parallel
// parameters: (left, right, top and bottom) + near and far
// for a better render
// const aspectRatio = sizes.width / sizes.height
// const camera = new THREE.OrthographicCamera(-1 * aspectRatio, 1 *aspectRatio, 1, -1, 0.1, 100)

// camera.position.x = 2
// camera.position.y = 2
camera.position.z = 2
console.log(camera.position.length())
camera.lookAt(mesh.position)
scene.add(camera)


// Controls
// parama : camera , canvas
const controls = new OrbitControls(camera, canvas)
//damping so it feel more natural
controls.enableDamping = true
// controls.target.y = 1
// controls.update()

// Renderer
const renderer = new THREE.WebGLRenderer({
	canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)

// Animate
const clock = new THREE.Clock()

const tick = () =>
{
	const elapsedTime = clock.getElapsedTime()

	// Update objects
	// mesh.rotation.y = elapsedTime;

	// Update camera with window listener
	// camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 3;
	// camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 3;
	// camera.position.y = cursor.y * 5;
	// camera.lookAt(mesh.position)

	// Update controls (for damping)
	controls.update()

	// Render
	renderer.render(scene, camera)

	// Call tick again on the next frame
	window.requestAnimationFrame(tick)
}

tick()