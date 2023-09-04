import * as THREE from "three";
import { FontLoader } from "three/addons/loaders/FontLoader.js";
import { TextGeometry } from "three/addons/geometries/TextGeometry.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerWidth,
  0.1,
  1000
);
camera.position.z = 5;

var canvas = document.getElementById("cube");

var renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
renderer.setClearColor("#EAEAEF");
renderer.setSize(canvas.clientHeight, canvas.clientHeight);

// document.body.appendChild(renderer.domElement);

window.addEventListener("resize", () => {
  renderer.setSize(window.innerHeight, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});

var controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;

var geometry = new THREE.BoxGeometry(3, 3, 3);

var materials = [
  new THREE.MeshLambertMaterial({ color: 0x4580D6 }), // Red
  new THREE.MeshLambertMaterial({ color: 0x4580D6 }), // Orange
  new THREE.MeshLambertMaterial({ color: 0x4580D6 }), // Blue
  new THREE.MeshLambertMaterial({ color: 0x4580D6 }), // Green
  new THREE.MeshLambertMaterial({ color: 0x4580D6 }), // Black
  new THREE.MeshLambertMaterial({ color: 0x4580D6, opacity:0.1}), // White
];

var textureLoader = new THREE.TextureLoader();
textureLoader.load("./Images/cube.png", function (imageTexture) {
  var imageMaterial = new THREE.MeshLambertMaterial({ map: imageTexture });

  materials[6] = imageMaterial;
  materials[4] = imageMaterial;
  materials[5] = imageMaterial;
  materials[3] = imageMaterial;
  materials[2] = imageMaterial;
  materials[1] = imageMaterial;

  var mesh = new THREE.Mesh(geometry, materials);

  scene.add(mesh);
  mesh.rotation.y = 0.85;
  var ambientLight = new THREE.AmbientLight(0x397be1, 3);
  scene.add(ambientLight);

  var pointLight = new THREE.PointLight(0xffffff, 0.5);
  pointLight.position.set(0, 3, 5);
  scene.add(pointLight);

  var render = function () {
    requestAnimationFrame(render);
    mesh.rotation.x += 0.005;
    renderer.render(scene, camera);
  };

  render();
  renderer.domElement.addEventListener("click", function (event) {
    var mouse = new THREE.Vector2();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    var raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, camera);

    var intersects = raycaster.intersectObject(mesh, true);

    if (intersects.length > 0) {
      var clickedFace = intersects[0].face;

      if (clickedFace.materialIndex === 4) {
        window.location.href = "https://www.facebook.com";
      } else if (clickedFace.materialIndex === 2) {
        window.location.href = "https://www.google.com";
      }
    }
  });
});

// Create a raycaster
// var raycaster = new THREE.Raycaster();
// var mouse = new THREE.Vector2();

// // Add click event listener to the renderer
// renderer.domElement.addEventListener("click", onClick);

// function onClick(event) {
//   // Calculate mouse position in normalized device coordinates
//   mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
//   mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

//   // Set the raycaster origin and direction based on the mouse position
//   raycaster.setFromCamera(mouse, camera);

//   // Check for intersections
//   var intersects = raycaster.intersectObjects([mesh]);
//   if (intersects.length > 0) {
//     // Check which face was clicked and perform redirection
//     var faceIndex = intersects[0].faceIndex;
//     if (faceIndex === 2) {
//       window.location.href = "https://www.google.com";
//     } else if (faceIndex === 4) {
//       window.location.href = "https://www.instagram.com";
//     }
//     else if (faceIndex === 1) {
//       window.location.href = "https://www.instagram.com";
//     }
//     else if (faceIndex === 3) {
//       window.location.href = "https://www.instagram.com";
//     }
//     else if (faceIndex === 5) {
//       window.location.href = "https://www.instagram.com";
//     }
//     else if (faceIndex === 6) {
//       window.location.href = "https://www.instagram.com";
//     }
//   }
// }
// Add ambient light

// const loader = new FontLoader();

// loader.load("fonts/Roboto_Regular.json", function (font) {
//   const text = "Hello three.js!";
//   const geometry1 = new TextGeometry(text, {
//     font: font,
//     size: 0.5,
//     height: 0.0001,
//     curveSegments: 1,
//     bevelEnabled: true,
//     bevelThickness: 0.001,
//     bevelSize: 0.008,
//     bevelOffset: 0,
//     bevelSegments: 0,
//   });

//   var textTexture = new THREE.CanvasTexture(createTextCanvas(text));
//   var textMaterial = new THREE.MeshLambertMaterial({ map: textTexture });
//   var textMesh = new THREE.Mesh(geometry1, textMaterial);

//   textMesh.rotation.x = -Math.PI / 4;
//   mesh.add(textMesh);
// });

// function createTextCanvas(text) {
//   var canvas = document.createElement('canvas');
//   var context = canvas.getContext('2d');
//   canvas.width = 256;
//   canvas.height = 128;
//   context.fillStyle = '#ffffff';
//   context.fillRect(0, 0, canvas.width, canvas.height);
//   context.font = '20px Arial';
//   context.fillStyle = '#000000';
//   context.fillText(text, 10, 50);
//   return canvas;
// }
