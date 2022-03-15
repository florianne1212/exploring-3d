import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'

/**
 * Base
 */
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()

const particlesTexture = textureLoader.load('/textures/particles/10.png')

/**
 * Particles
 */

// Geometry
// const patriclesGeometry = new THREE.SphereBufferGeometry(1, 32, 32)
const patriclesGeometry = new THREE.BufferGeometry()
const count = 2000

const positions = new Float32Array(count * 3);
const colors = new Float32Array(count * 3);

for(let i = 0; i < count * 3; i++)
{
    positions[i] = (Math.random() - 0.5) *10 ;
    colors[i] = Math.random()
}

patriclesGeometry.setAttribute( 'position', new THREE.BufferAttribute( positions, 3 ) );
patriclesGeometry.setAttribute( 'color', new THREE.BufferAttribute( colors, 3 ) );

// Material
const patriclesMaterial = new THREE.PointsMaterial()
patriclesMaterial.size = 0.1
patriclesMaterial.sizeAttenuation = true
patriclesMaterial.color = new THREE.Color('#ff88cc')
patriclesMaterial.transparent = true
patriclesMaterial.alphaMap = particlesTexture
// 3 solutions !
// patriclesMaterial.alphaTest = 0.001 // values between 0 and 1 that enable webgl to render a pixel according to transparency
// patriclesMaterial.depthTest = false // webgl test it what's being drawn is closer than what's already drawn
// const cube = new THREE.Mesh(
//     new THREE.BoxBufferGeometry(),
//     new THREE.MeshBasicMaterial()
// )
// scene.add(cube) problem with other objects
patriclesMaterial.depthWrite = false // depth of what's being drawn stored inside depth buffer we say to webgl to not write particles that are in depth buffer

patriclesMaterial.blending = THREE.AdditiveBlending //add color of pixel to what has been drawn
patriclesMaterial.vertexColors = true

// Points

const particles = new THREE.Points(patriclesGeometry, patriclesMaterial)
scene.add(particles)



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
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 3
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()
    // Update particles
    particles.rotation.y = elapsedTime*0.2
    //bad Idea ->
    // for(let i = 0; i < count; i++)
    // {
    //     const i3 = i*3
    //     const x = patriclesGeometry.attributes.position.array[i3 + 0]
    //     patriclesGeometry.attributes.position.array[i3 + 1] = Math.sin(elapsedTime + x)
        
    // }
    // patriclesGeometry.attributes.position.needsUpdate = true
    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()