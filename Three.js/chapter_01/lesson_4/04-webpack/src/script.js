import './style.css'
import * as THREE from 'three'

//// Scene

const scene = new THREE.Scene()

//// Red cube
// mesh is composed from GEOMETRY + MATERIAL

const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({color: 'purple'})

const mesh = new THREE.Mesh(geometry, material)

// add mesh to the scene
scene.add(mesh)

//// Sizes

const sizes = {
    width:800,
    height: 600
}

//// Camera

// first parameter  = field of view (fov) in degrees 
// second parameter = aspect ration (width/height)
const camera = new THREE.PerspectiveCamera(75, sizes.width/sizes.height)

// move backward to not be in the object anymore
camera.position.z = 3
// move on the right
camera.position.x = 2

// add camera to the scene
scene.add(camera)

//// Renderer

//dom = html to get dom element to JS -> document.querySelector() 

const canvas = document.querySelector('canvas.webgl')
console.log(canvas)

const renderer = new THREE.WebGLRenderer({
    canvas: canvas // you can do just canvas
})
renderer.setSize(sizes.width, sizes.height)

renderer.render(scene, camera)