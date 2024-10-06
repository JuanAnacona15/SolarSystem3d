import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import { OrbitalEllipse } from './CelestialTrayectories';

const content = document.getElementById("cont3dscene")
// Crear la escena
const scene = new THREE.Scene();
// Crear la cámara
const camera = new THREE.PerspectiveCamera(75, content.offsetWidth / content.offsetHeight, 0.1, 1000);
camera.position.set(0, 10, 30);

// Crear el renderizador
const renderer = new THREE.WebGLRenderer();
renderer.setSize(content.offsetWidth, content.offsetHeight);
content.appendChild(renderer.domElement);

const sun = new THREE.Mesh(new THREE.SphereGeometry(0.2), new THREE.MeshBasicMaterial({ color: 0xffff00 }));
scene.add(sun)

// Cantidad de estrellas que quieres en la escena
const numStars = 5000;

// Crear la geometría de las estrellas
const starsGeometry = new THREE.BufferGeometry();
const starPositions = new Float32Array(numStars * 3); // 3 valores por estrella (x, y, z)

// Asignar posiciones aleatorias a las estrellas
for (let i = 0; i < numStars * 3; i += 3) {
    const x = (Math.random() - 0.5) * 2000; // Aleatorio entre -1000 y 1000
    const y = (Math.random() - 0.5) * 2000;
    const z = (Math.random() - 0.5) * 2000;

    starPositions[i] = x;
    starPositions[i + 1] = y;
    starPositions[i + 2] = z;
}

// Agregar las posiciones a la geometría de las estrellas
starsGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));

// Crear el material para las estrellas
const starsMaterial = new THREE.PointsMaterial({
    color: 0xffffff, // Color blanco para las estrellas
    size: 1,         // Tamaño de los puntos
    sizeAttenuation: true, // Los puntos se reducen con la distancia
    transparent: true
});

// Crear el objeto de partículas (las estrellas)
const starField = new THREE.Points(starsGeometry, starsMaterial);

// Añadir las estrellas a la escena
scene.add(starField);


const MercuryOrbit = new OrbitalEllipse(
    "Mercury",
    0.387098,
    0.20563,
    7.004979,
    48.331,
    29.124,
    48.92,
    0xffffff,
    0.05
);
scene.add(MercuryOrbit.getEllipse());

const VenusOrbit = new OrbitalEllipse(
    "Venus",
    0.723332,
    0.006772,
    3.394676,
    76.68,
    54.884,
    35.02,
    0xff8700,
    0.1
);
scene.add(VenusOrbit.getEllipse());

const EarthOrbit = new OrbitalEllipse(
    "Earth",
    1.0,
    0.016708,
    5.65,
    -11.26064,
    114.20783,
    29.78,
    0x0000ff,
    0.1
);
scene.add(EarthOrbit.getEllipse());

const MarsOrbit = new OrbitalEllipse(
    "Mars",
    1.523679,
    0.016708,
    0.093394,
    49.558,
    286.502,
    24.07,
    0xff0000,
    0.1
);
scene.add(MarsOrbit.getEllipse());

const JupiterOrbit = new OrbitalEllipse(
    "Jupiter",
    5.2044,
    0.0489,
    0.048386,
    100.464,
    273.867,
    13.05,
    0xff6100
);
scene.add(JupiterOrbit.getEllipse());


const SaturnOrbit = new OrbitalEllipse(
    "Saturn",
    9.5826,
    0.0565,
    0.053861,
    113.665,
    339.392,
    9.64,
    0xfff000
);
scene.add(SaturnOrbit.getEllipse());

const UranusOrbit = new OrbitalEllipse(
    "Uranus",
    19.2184,
    0.046381,
    0.047257,
    74.006,
    96.998856,
    6.81,
    0x7800ff
);
scene.add(UranusOrbit.getEllipse());

const NeptuneOrbit = new OrbitalEllipse(
    "Neptune",
    30.110388,
    0.009456,
    0.00859,
    131.784,
    276.336,
    5.43,
    0xff00aa
);
scene.add(NeptuneOrbit.getEllipse());

//Create second 3d object
const Neptune = await NeptuneOrbit.getSphere()
const NeptuneTag = document.getElementById(`tag-${NeptuneOrbit.name}`)
scene.add(Neptune)

//Create second 3d object
const Uranus = await UranusOrbit.getSphere()
const UranusTag = document.getElementById(`tag-${NeptuneOrbit.name}`)
scene.add(Uranus)

//Create second 3d object
const Saturn = await SaturnOrbit.getSphere()
const SaturnTag = document.getElementById(`tag-${NeptuneOrbit.name}`)
scene.add(Saturn)

//Create second 3d object
const Jupiter = await JupiterOrbit.getSphere()
const JupiterTag = document.getElementById(`tag-${NeptuneOrbit.name}`)
scene.add(Jupiter)

//Create second 3d object
const Mars = await MarsOrbit.getSphere()
const MarsTag = document.getElementById(`tag-${NeptuneOrbit.name}`)
scene.add(Mars)

//Create second 3d object
const Earth = await EarthOrbit.getSphere()
const EarthTag = document.getElementById(`tag-${NeptuneOrbit.name}`)
scene.add(Earth)

//Create second 3d object
const Venus = await VenusOrbit.getSphere()
const VenusTag = document.getElementById(`tag-${NeptuneOrbit.name}`)
scene.add(Venus)

//Create second 3d object
const Mercury = await MercuryOrbit.getSphere()
const MercuryTag = document.getElementById(`tag-${NeptuneOrbit.name}`)
scene.add(Mercury)

camera.position.z = 60;
const controls = new OrbitControls(camera, renderer.domElement);
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
// Animación
var cont = 0;
var contNeptune = 0;
var contUranus = 0;
var contSaturn = 0;
var contJupiter = 0;
var contMars = 0;
var contEarth = 0;
var contVenus = 0;
var contMercury = 0;

function updateLabels() {
    const planets = [
        { name: 'Neptune', object: Neptune },
        { name: 'Uranus', object: Uranus },
        { name: 'Saturn', object: Saturn },
        { name: 'Jupiter', object: Jupiter },
        { name: 'Mars', object: Mars },
        { name: 'Earth', object: Earth },
        { name: 'Venus', object: Venus },
        { name: 'Mercury', object: Mercury }
    ];

    planets.forEach(planet => {
        // Proyecta la posición 3D del planeta
        const vector = planet.object.position.clone();
        vector.project(camera);

        // Convierte las coordenadas normalizadas (-1 a 1) a coordenadas de pantalla
        const x = (vector.x * 0.5 + 0.5) * window.innerWidth;
        const y = -(vector.y * 0.5 - 0.5) * window.innerHeight;

        // Posiciona la etiqueta HTML
        const label = document.getElementById(`tag-${planet.name}`);
        label.style.transform = `translate(-50%, -50%) translate(${x}px, ${y}px)`;
    });
}


function animate() {
    if (contNeptune <= NeptuneOrbit.getElipsePoints().length - 2) {
        Neptune.position.x = NeptuneOrbit.getElipsePoints()[contNeptune].x
        Neptune.position.y = NeptuneOrbit.getElipsePoints()[contNeptune].y
        Neptune.position.z = NeptuneOrbit.getElipsePoints()[contNeptune].z
        contNeptune += 1;
    } else {
        contNeptune = 0;
    }
    if (contUranus <= UranusOrbit.getElipsePoints().length - 2) {
        Uranus.position.x = UranusOrbit.getElipsePoints()[contUranus].x
        Uranus.position.y = UranusOrbit.getElipsePoints()[contUranus].y
        Uranus.position.z = UranusOrbit.getElipsePoints()[contUranus].z
        contUranus += 1;
    } else {
        contUranus = 0;
    }
    if (contSaturn <= SaturnOrbit.getElipsePoints().length - 2) {
        Saturn.position.x = SaturnOrbit.getElipsePoints()[contSaturn].x
        Saturn.position.y = SaturnOrbit.getElipsePoints()[contSaturn].y
        Saturn.position.z = SaturnOrbit.getElipsePoints()[contSaturn].z
        contSaturn += 1;
    } else {
        contSaturn = 0;
    }
    if (contJupiter <= JupiterOrbit.getElipsePoints().length - 2) {
        Jupiter.position.x = JupiterOrbit.getElipsePoints()[contJupiter].x
        Jupiter.position.y = JupiterOrbit.getElipsePoints()[contJupiter].y
        Jupiter.position.z = JupiterOrbit.getElipsePoints()[contJupiter].z
        contJupiter += 1;
    } else {
        contJupiter = 0;
    }
    if (contMars <= MarsOrbit.getElipsePoints().length - 2) {
        Mars.position.x = MarsOrbit.getElipsePoints()[contMars].x
        Mars.position.y = MarsOrbit.getElipsePoints()[contMars].y
        Mars.position.z = MarsOrbit.getElipsePoints()[contMars].z
        contMars += 1;
    } else {
        contMars = 0;
    }
    if (contEarth <= EarthOrbit.getElipsePoints().length - 2) {
        Earth.position.x = EarthOrbit.getElipsePoints()[contEarth].x
        Earth.position.y = EarthOrbit.getElipsePoints()[contEarth].y
        Earth.position.z = EarthOrbit.getElipsePoints()[contEarth].z
        contEarth += 1;
    } else {
        contEarth = 0;
    }
    if (contVenus <= VenusOrbit.getElipsePoints().length - 2) {
        Venus.position.x = VenusOrbit.getElipsePoints()[contVenus].x
        Venus.position.y = VenusOrbit.getElipsePoints()[contVenus].y
        Venus.position.z = VenusOrbit.getElipsePoints()[contVenus].z
        contVenus +=  1;
    } else {
        contVenus = 0;
    }
    if (contMercury <= MercuryOrbit.getElipsePoints().length - 2) {
        Mercury.position.x = MercuryOrbit.getElipsePoints()[contMercury].x
        Mercury.position.y = MercuryOrbit.getElipsePoints()[contMercury].y
        Mercury.position.z = MercuryOrbit.getElipsePoints()[contMercury].z

        contMercury += 1;
    }else{
        contMercury = 0;
    }

    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    //updateLabels()
}
animate();

// Ajuste del tamaño al cambiar la ventana
window.addEventListener('resize', () => {
    renderer.setSize(content.offsetWidth, content.offsetHeight);
    camera.aspect = content.offsetWidth / content.offsetHeight;
    camera.updateProjectionMatrix();
});