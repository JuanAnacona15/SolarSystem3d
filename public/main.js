import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';

const content3dEnvioment = document.getElementById("cont3dscene")
//Crea la escena
const scene = new THREE.Scene();
//Instancia la perspectiva
const camera = new THREE.PerspectiveCamera(75, content3dEnvioment.offsetWidth / content3dEnvioment.offsetHeight, 0.1, 1000);


//Crea un render
const renderer = new THREE.WebGLRenderer();
//Lo dimensiona a toda la pantalla
renderer.setSize(content3dEnvioment.offsetWidth, content3dEnvioment.offsetHeight);
//Agrega el render a la escena
content3dEnvioment.appendChild(renderer.domElement)

//Create 3d Object
const Earth = new THREE.Mesh(new THREE.SphereGeometry(), new THREE.MeshBasicMaterial({ color: 0x0000ff }));
scene.add(Earth);

//Create second 3d object
const moon = new THREE.Mesh(new THREE.SphereGeometry(0.3), new THREE.MeshBasicMaterial({ color: 0xffffff }));
scene.add(moon)

//Instancie controls
const controls = new OrbitControls(camera, renderer.domElement);
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

moon.position.x = 3;
camera.position.z = 7;
camera.position.y = 5;
camera.rotation.x = -0.5;


//Calculates for animation
const moonOrbitRadius = 3; //Radius orbit
let moonAngle = 0; //Start angle


animate()

function animate(){
    requestAnimationFrame(animate);
    Earth.rotation.y += 0.01;

    moonAngle += 0.01;
    moon.position.x = moonOrbitRadius * Math.cos(moonAngle);
    moon.position.z = moonOrbitRadius * Math.sin(moonAngle);

    renderer.render(scene, camera);
}

window.addEventListener('click', (event) => {
    // Convertir coordenadas del ratón a coordenadas de Three.js
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    // Actualizar el raycaster con la cámara y el mouse
    raycaster.setFromCamera(mouse, camera);

    // Calcular objetos intersectados
    const intersects = raycaster.intersectObjects(scene.children);

    // Si el cubo es clickeado, mostrar un mensaje en consola
    if (intersects.length > 0) {
        console.log('¡Cubo clickeado!', intersects[0].object);
    }
});