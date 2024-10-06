import * as THREE from 'three';
import { MTLLoader, OBJLoader } from 'three/examples/jsm/Addons.js';
export class OrbitalEllipse {
    constructor(name = "", semiMajorAxis, eccentricity, inclination, ascendingNode, perihelion, speed = 1, color = 0x00ff00, ObjectSize = 1) {
        this.name = name;
        this.semiMajorAxis = semiMajorAxis;   // Semi eje mayor (a)
        this.eccentricity = eccentricity;     // Excentricidad (e)
        this.inclination = inclination;       // Inclinación (i)
        this.ascendingNode = ascendingNode;   // Longitud del nodo ascendente (Ω)
        this.perihelion = perihelion;         // Argumento del periastro (ω)
        this.speed = speed;                   //Speed planet
        this.color = color;                   //Color draw
        this.objectSize = ObjectSize          //Size object 3d
        this.Object3d = null;                 // Color de la órbita (opcional)
        this.finalPoints = [];                //Points x, y, z



        // Crear geometría de elipse
        const curve = new THREE.EllipseCurve(
            0, 0, // Centro de la elipse (x, y)
            this.semiMajorAxis, // Semi eje mayor
            this.semiMajorAxis * Math.sqrt(1 - this.eccentricity ** 2), // Semi eje menor
            0, 2 * Math.PI, // Ángulo inicial y final (de 0 a 360 grados)
            false, // Sentido antihorario
            0 // Rotación
        );

        // Obtener puntos de la curva (en 2D)
        const points = curve.getPoints((100 - this.speed) * 10);

        // Crear la geometría a partir de los puntos
        const geometry = new THREE.BufferGeometry().setFromPoints(points);

        // Convertir puntos en 3D añadiendo el eje Z (inicialmente z=0)
        const positions = geometry.attributes.position.array;
        for (let i = 0; i < positions.length; i += 3) {
            const x = positions[i];
            const y = positions[i + 1];
            const z = 0;

            // Crear un vector 3D con los puntos (x, y, z) y rotarlo en Y
            const vector = new THREE.Vector3(x, y, z);
            vector.applyAxisAngle(new THREE.Vector3(1, 0, 0), THREE.MathUtils.degToRad(90));  // Rotación en X (plano XY)
            vector.applyAxisAngle(new THREE.Vector3(0, 0, 1), THREE.MathUtils.degToRad(this.inclination));  // Inclinación (Z)
            vector.applyAxisAngle(new THREE.Vector3(0, 1, 0), THREE.MathUtils.degToRad(this.ascendingNode)); // Nodo ascendente
            vector.applyAxisAngle(new THREE.Vector3(1, 0, 0), THREE.MathUtils.degToRad(this.perihelion));    // Perihelio (X)
            // Actualizar los valores rotados en la geometría
            positions[i] = vector.x;
            positions[i + 1] = vector.y;
            positions[i + 2] = vector.z;
        }

        // Crear material para la línea
        const material = new THREE.LineBasicMaterial({ color: this.color });

        // Crear el objeto línea a partir de la geometría y el material
        this.ellipse = new THREE.Line(geometry, material);

        for (let i = 0; i < positions.length; i += 3) {
            this.finalPoints.push({ x: positions[i], y: positions[i + 1], z: positions[i + 2]});
        }
    }

    // Método para obtener la órbita (elipse)
    getEllipse() {
        return this.ellipse;
    }

    getElipsePoints() {
        return this.finalPoints;
    }

    getSphere() {
        //Create second 3d object
        const CelestialObj = new THREE.Mesh(new THREE.SphereGeometry(this.objectSize), new THREE.MeshBasicMaterial({ color: this.color }));
        CelestialObj.name = this.name;
        return CelestialObj
    }
}