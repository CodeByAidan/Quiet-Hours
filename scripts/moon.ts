import * as THREE from 'three';
// @ts-ignore
import { OrbitControls } from 'https://unpkg.com/three@0.158.0/examples/jsm/controls/OrbitControls.js'

const textureURL: string =
    "https://s3-us-west-2.amazonaws.com/s.cdpn.io/17271/lroc_color_poles_1k.jpg";
const displacementURL: string =
    "https://s3-us-west-2.amazonaws.com/s.cdpn.io/17271/ldem_3_8bit.jpg";
const worldURL: string = "https://s3-us-west-2.amazonaws.com/s.cdpn.io/17271/hipp8_s.jpg";

const scene: THREE.Scene = new THREE.Scene();

const camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer();

const controls: OrbitControls = new OrbitControls(camera, renderer.domElement);
controls.enablePan = false;

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry: THREE.SphereGeometry = new THREE.SphereGeometry(2, 60, 60);

const textureLoader: THREE.TextureLoader = new THREE.TextureLoader();
const texture: THREE.Texture = textureLoader.load(textureURL);
const displacementMap: THREE.Texture = textureLoader.load(displacementURL);
const worldTexture: THREE.Texture = textureLoader.load(worldURL);

const material: THREE.MeshPhongMaterial = new THREE.MeshPhongMaterial({
    color: 0xffffff,
    map: texture,
    displacementMap: displacementMap,
    displacementScale: 0.06,
    bumpMap: displacementMap,
    bumpScale: 0.04,
    reflectivity: 0,
    shininess: 0,
});

const moon: THREE.Mesh = new THREE.Mesh(geometry, material);

const light: THREE.DirectionalLight = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(-100, 10, 50);
scene.add(light);

const hemiLight: THREE.HemisphereLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.1);
hemiLight.color.setHSL(0.6, 1, 0.6);
hemiLight.groundColor.setHSL(0.095, 1, 0.75);
hemiLight.position.set(0, 0, 0);
scene.add(hemiLight);

const worldGeometry: THREE.SphereGeometry = new THREE.SphereGeometry(1000, 60, 60);
const worldMaterial: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    map: worldTexture,
    side: THREE.BackSide,
});
const world: THREE.Mesh = new THREE.Mesh(worldGeometry, worldMaterial);
scene.add(world);

scene.add(moon);
camera.position.z = 5;

moon.rotation.x = 3.1415 * 0.02;
moon.rotation.y = 3.1415 * 1.54;

function animate(): void {
    requestAnimationFrame(animate);
    moon.rotation.y += 0.002;
    moon.rotation.x += 0.0001;
    world.rotation.y += 0.0001;
    world.rotation.x += 0.0005;

    renderer.render(scene, camera);
}
animate();

function onResize(): void {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener("resize", onResize, false);
