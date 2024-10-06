import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import { GLTFLoader } from 'three/examples/jsm/Addons.js';

class Generate3dPlanet {
    constructor(name) {
        this.name = name;
        this.object3d = null;
        this.scene = new THREE.Scene();
        this.contScene = document.getElementById(`cont3d${name}`)
        this.objectSize = 1;

        this.scene.background = new THREE.Color(0, 0, 0)

        const ambientLight = new THREE.AmbientLight(0xffffff, 1);
        this.scene.add(ambientLight);

        this.camera = new THREE.PerspectiveCamera(75, this.contScene.offsetWidth / this.contScene.offsetHeight, 0.1, 1000);
        this.camera.position.set(0, 0, 2);
        

        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(this.contScene.offsetWidth, this.contScene.offsetHeight);
        this.contScene.appendChild(this.renderer.domElement);
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    }

    async initialize() {
        // Cargar el objeto 3D de forma asíncrona
        try {
            const object = await this.Generate3dObject();
            this.object3d = object;
            this.scene.add(this.object3d);
            this.animate();
        } catch (error) {
            console.error("Error al inicializar el objeto 3D:", error);
        }
    }

    async Generate3dObject() {
        try {
            // Cargar el archivo GLB usando GLTFLoader
            const loader = new GLTFLoader();
            const object = await new Promise((resolve, reject) => {
                loader.load(`./3dObjects/${this.name}.glb`, (gltf) => {
                    const model = gltf.scene;
                    resolve(model); // Devolver el objeto cargado
                }, undefined, (error) => reject(error));
            });

            // Ajustar posición y escala del objeto
            object.position.set(0, 0, 0);
            object.scale.set(this.objectSize, this.objectSize, this.objectSize);

            // Retornar el objeto cargado
            return object;

        } catch (error) {
            console.error("Error al cargar el modelo GLB:", error);
            throw error; // Propagar el error si ocurre
        }
    }

    animate() {
        requestAnimationFrame(() => this.animate()); // Llamar a la función en cada cuadro

        // Actualizar los controles
        this.controls.update();

        // Renderizar la escena
        this.renderer.render(this.scene, this.camera);
    }
}


const Mars = new Generate3dPlanet("Mars");
Mars.initialize()

const Mercury = new Generate3dPlanet("Mercury");
Mercury.initialize()

const Venus = new Generate3dPlanet("Venus");
Venus.initialize()

const Earth = new Generate3dPlanet("Earth");
Earth.initialize()

const Jupiter = new Generate3dPlanet("Jupiter");
Jupiter.initialize()

const Saturn = new Generate3dPlanet("Saturn");
Saturn.initialize()

const Uranus = new Generate3dPlanet("Uranus");
Uranus.initialize()

const Neptune = new Generate3dPlanet("Neptune");
Neptune.initialize()
