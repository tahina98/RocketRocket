
import * as THREE from 'three';
import {GLTFLoader} from "three/addons/loaders/GLTFLoader.js";
import {SpotLight} from "three";


window.onload=initialisation;


function initialisation(){
    animate();
    request();
    liste();
}


//creation de la scene
const scene = new THREE.Scene();

//Constante contenant la place qu'aura le canva Three.js
const place = document.getElementById('canvaContainer')

//choix de la couleur de background
scene.background = new THREE.Color( 'black' );
//creation de la camera
const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.set(6, 4, 10.5); // Position plongeante de la caméra
camera.lookAt(0, 0, 0); // Regarder le centre de la scène

//creation d'un spotlight
const color = new THREE.Color("#faeacf");
const spot = new SpotLight( color, 5, 3000, Math.PI, 0, 0 );
scene.add(spot);


//rendu et mise sur le dom
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );

//mise du canva dans la div
 const canva =renderer.domElement ;
 place.appendChild(canva);

//chargement du modele blender
const loader = new GLTFLoader();
let model;
loader.load( 'octaneModel.glb', function ( gltf ) {
        model =gltf.scene;
        scene.add( model );

}, undefined, function ( error ) {

        console.error( error );

} );

//position de la camera
camera.position.z = 10;

//quand on scroll la voiture tourne
function onMouseWheel() {
        model.rotation.y += 0.2;
}

window.addEventListener('wheel', onMouseWheel);



//fonction qui permet d'afficher tout
function animate() {

    requestAnimationFrame( animate );
    /*model.rotation.y += 0.01;*/

    renderer.render( scene, camera );
}

/*--------------------------------------------------------------------------------------------------*/

//API https://zsr.octane.gg/teams/active
function request(){


    fetch('https://zsr.octane.gg/events/5f35882d53fbbb5894b43040')
        .then(res=>res.json())
        .then(
json=>{document.getElementById('request').innerText=`${json['name']}`;

}
        )
}
function liste(){
    fetch('https://zsr.octane.gg/teams/active')
        .then(res=>res.json())
        .then(
            json=>{
                    const div =document.getElementById("liste");
                    const taille = json['teams'].length;
                for (let obj of json['teams']) {
                    let creer =document.createElement('div');
                    creer.className='team';
                    let texte=document.createElement('h2');
                    texte.innerText=`${obj['team']['name']}`;
                    div.appendChild(creer);
                    creer.appendChild(texte)

                    let listJoueur = document.createElement('div');
                    listJoueur.className='listJoueur';
                    creer.appendChild(listJoueur);

                    for (let joueur of obj['players']) {
                        let nom=document.createElement('p');
                        nom.className='nom';
                        nom.innerText=`${joueur['tag']}`;
                        listJoueur.appendChild(nom);
                    }
                }

            }
        )
}