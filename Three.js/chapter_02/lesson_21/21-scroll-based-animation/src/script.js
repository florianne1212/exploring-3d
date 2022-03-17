import './style.css'
import * as THREE from 'three'
import * as dat from 'lil-gui'

/**
 * Debug
 */
const gui = new dat.GUI()

const parameters = {
    materialColor: '#ffeded'
}

gui
    .addColor(parameters, 'materialColor')
    .onChange(() => 
    {
        material.color.set(parameters.materialColor)
    })

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Objects
 */

const textureloader = new THREE.TextureLoader()
const gradientTexture = textureloader.load('textures/gradients/3.jpg')
gradientTexture.magFilter = THREE.NearestFilter // needed for no gradient

const material = new THREE.MeshToonMaterial({color: parameters.materialColor, gradientMap:gradientTexture})

const objectsDistance = 4
const mesh1 = new THREE.Mesh(
    new THREE.TorusGeometry(1, 0.4, 16, 60),
    material
)
const mesh2 = new THREE.Mesh(
    new THREE.ConeGeometry(1, 2, 32),
    material
)
const mesh3 = new THREE.Mesh(
    new THREE.TorusKnotGeometry(0.8, 0.35, 100, 16),
    material
)

mesh1.position.y = -objectsDistance * 0
mesh2.position.y = -objectsDistance * 1
mesh3.position.y = -objectsDistance * 2

mesh1.position.x = 2
mesh2.position.x = -2
mesh3.position.x = 2

scene.add(mesh1, mesh2, mesh3)

const sectionMeshes = [mesh1, mesh2, mesh3]

const directionalLight = new THREE.DirectionalLight('#ffffff',1)
directionalLight.position.set(1,1,0)
scene.add(directionalLight)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */

const cameraGroup = new THREE.Group()
scene.add(cameraGroup)
// Base camera
const camera = new THREE.PerspectiveCamera(35, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 6
cameraGroup.add(camera)

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true // to see through canvas default alpha = 0
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Scroll
 */

let ScrollY = window.scrollY

window.addEventListener('scroll', () =>
{
    console.log('user is scrolling')
})

/**
 * Cursor
 */

const cursor = {}

cursor.x = 0 
cursor.y = 0

window.addEventListener('mousemove', (_event) => 
{
    cursor.x = _event.clientX / sizes.width -0.5;
    cursor.y = _event.clientY / sizes.height -0.5 ;
    //console.log(cursor)
})

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    //animate camera
    camera.position.y = -scrollY /sizes.height *objectsDistance

    const parallaxX = cursor.x ;
    const parallaxY = - cursor.y ;
    cameraGroup.position.x = parallaxX
    cameraGroup.position.y = parallaxY

    //animate meshes
    for(const mesh of sectionMeshes)
    {
        mesh.rotation.x = elapsedTime * 0.1
        mesh.rotation.y = elapsedTime * 0.12
    }

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()