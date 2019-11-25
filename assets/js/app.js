// karimmoussouni.com

import {Vector3} from "three";

/****************************************
 * commonjs
 ***************************************/
var THREE = require('three');

/** import */
import { OrbitControls } from '../../node_modules/three/examples/jsm/controls/OrbitControls.js';
import { FBXLoader } from '../../node_modules/three/examples/jsm/loaders/FBXLoader';

const axios = require('axios');

// import '../scss/app.scss';

/** variables */
var baseUrl = "http://karimmoussouni.local/"

var container, controls;
var camera, scene, renderer, light;
var clock = new THREE.Clock();
var mixer;

var loader, line;

var collidedObjectUuid = [];

var firstLetter = true;
var text;
var fontMap = {
    "helvetiker": 0,
    "gentilis": 2,
};
var weightMap = {
    "regular": 0,
    "bold": 1
};
var reverseFontMap = [];
var reverseWeightMap = [];
for ( var i in fontMap ) reverseFontMap[ fontMap[ i ] ] = i;
for ( var i in weightMap ) reverseWeightMap[ weightMap[ i ] ] = i;
var targetRotation = 0;
var targetRotationOnMouseDown = 0;
var mouseX = 0;
var mouseXOnMouseDown = 0;
var windowHalfX = window.innerWidth / 2;

var raycaster, intersects, intersect;
var mouse;
var offset = new THREE.Vector3( 1.3, 1.3, 1.3 );

/****************************************
 * Sequence
 ***************************************/
init();
animate();

/****************************************
 * Init the scene
 ***************************************/
function init()
{
    container = document.createElement( 'div' );
    document.body.appendChild( container );

    /**
     * Camera
     * @type {PerspectiveCamera}
     */
    camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 3000 );
    camera.position.set( 175, 550, 500 );

    /**
     * Scene
     * @type {Scene}
     */
    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0xa0a0a0 );
    scene.fog = new THREE.Fog( 0xaaaaaa, 200, 2000 );

    /**
     * Lights
     */
    light = new THREE.HemisphereLight( 0xffffff, 0x004400 );
    light.position.set( 0, 200, 0 );
    scene.add( light );

    light = new THREE.DirectionalLight( 0xffffff );
    light.position.set( 0, 200, 100 );
    light.castShadow = true;
    light.shadow.camera.top = 180;
    light.shadow.camera.bottom = - 100;
    light.shadow.camera.left = - 120;
    light.shadow.camera.right = 120;
    scene.add( light );

    scene.add( new THREE.PointLightHelper( light, 15 ) );

    /**
     * grid
     */
    createPortfolio();

    /////////////////////////////////////////
    // model - freelance
    /////////////////////////////////////////
    loader = new FBXLoader();
    loader.load( 'build/3d/Freelance/malcolmHappyIdle.fbx', function ( object ) {
        console.info( 'FBX model loading...' );

        mixer = new THREE.AnimationMixer( object );
        var action = mixer.clipAction( object.animations[ 0 ] );
        action.play();
        object.traverse( function ( child ) {
            if ( child.isMesh ) {
                child.castShadow = true;
                child.receiveShadow = true;
            }
        } );

        object.updateWorldMatrix();
        object.name = "freelance";
        collidedObjectUuid.push(object.uuid);
        scene.add( object );
        scene.add( new THREE.BoxHelper( object ) );

    }, undefined, function ( error ) {
        console.error( error );
    } );

    /////////////////////////////////////////
    // title / text
    /////////////////////////////////////////
    var text = new THREE.FontLoader();
    text.load( 'build/3d/Freelance/fonts/helvetiker_regular.typeface.json', function ( font ) {
        var xMid, text;
        var color = 0x006699;
        var matDark = new THREE.LineBasicMaterial( {
            color: color,
            side: THREE.DoubleSide
        } );
        var matLite = new THREE.MeshBasicMaterial( {
            color: color,
            transparent: true,
            opacity: 0.4,
            side: THREE.DoubleSide
        } );
        var message = "   Customize \nyour freelance.";
        var shapes = font.generateShapes( message, 100 );
        var geometry = new THREE.ShapeBufferGeometry( shapes );
        geometry.computeBoundingBox();
        xMid = - 0.5 * ( geometry.boundingBox.max.x - geometry.boundingBox.min.x );
        geometry.translate( xMid, 50, 0 );
        // make shape ( N.B. edge view not visible )
        text = new THREE.Mesh( geometry, matLite );
        text.position.z = -50;

        text.traverse( function ( child ) {
            if ( child.isMesh ) {
                child.castShadow = true;
                child.receiveShadow = false;
            }
        } );

        // text.prototype.name = "text";
        scene.add( text );
        // make line shape ( N.B. edge view remains visible )
        var holeShapes = [];
        for ( var i = 0; i < shapes.length; i ++ ) {
            var shape = shapes[ i ];
            if ( shape.holes && shape.holes.length > 0 ) {
                for ( var j = 0; j < shape.holes.length; j ++ ) {
                    var hole = shape.holes[ j ];
                    holeShapes.push( hole );
                }
            }
        }
        shapes.push.apply( shapes, holeShapes );
        var lineText = new THREE.Object3D();
        for ( var i = 0; i < shapes.length; i ++ ) {
            var shape = shapes[ i ];
            var points = shape.getPoints();
            var geometry = new THREE.BufferGeometry().setFromPoints( points );
            geometry.translate( xMid, 50, -50 );
            var lineMesh = new THREE.Line( geometry, matDark );
            lineText.add( lineMesh );
        }
        scene.add( lineText );
        scene.add( new THREE.BoxHelper( lineText) );
    } );

    // intersect Line
    var geometry = new THREE.BufferGeometry();
    geometry.setAttribute( 'position', new THREE.BufferAttribute( new Float32Array( 4 * 3 ), 3 ) );
    var material = new THREE.LineBasicMaterial( { color: 0xff0000, transparent: false } );
    // var material = new THREE.LineBasicMaterial( { color: 0xff0000, transparent: true } );
    line = new THREE.Line( geometry, material );
    scene.add( line );

    // WebGL Renderer
    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.shadowMap.enabled = true;
    container.appendChild( renderer.domElement );

    // Orbit Camera Controls
    controls = new OrbitControls( camera, renderer.domElement );
    controls.target.set( 0, 200, 0 );
    controls.update();

    // events
    document.addEventListener( 'mousemove', onDocumentMouseMove, false );
    document.addEventListener( 'mousedown', onDocumentMouseDown, false );

    // document.addEventListener( 'touchstart', onDocumentTouchStart, false );
    // document.addEventListener( 'touchmove', onDocumentTouchMove, false );
    // document.addEventListener( 'keypress', onDocumentKeyPress, false );
    // document.addEventListener( 'keydown', onDocumentKeyDown, false );

    raycaster = new THREE.Raycaster();
    mouse = new THREE.Vector2();

    window.addEventListener( 'resize', onWindowResize, false );
}

/****************************************
 * Events
 ***************************************/
function createPortfolio() {
    console.log('create portforlio');

    var countProject = 0;
    var url;
    var j = 0, x = 0;
    var i = 0, y = 0;

    // api get all projets
    axios.get('/api/projects').then(function (response) {
        if(response.data["hydra:member"]) {
            countProject = response.data["hydra:member"].length;
            response.data["hydra:member"].map((elmnt) => {
                var name = elmnt.title;
                axios.get(elmnt.image).then(function (response) {
                    if(response.data.contentUrl) {
                        url = response.data.contentUrl;
                        x = i%10;
                        y = parseInt(j/10%10);
                        createPlane(x, y, name, url)
                        i++; j+=1;
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
            });
        }
    })
    .catch(function (error) {
        console.log(error);
    });
}

function createPlane(i, j, name, imagesUrl) {
    var cote = 100;
    var delta = 5*cote;
    var geometry = new THREE.PlaneGeometry( 100, 100 );

    // console.log("loading " + imagesUrl + "at x=" +i+"     y="+j)
    var textureLoader = new THREE.TextureLoader();
    textureLoader.crossOrigin = "*";
    var texture = textureLoader.load( imagesUrl );
    var material = new THREE.MeshBasicMaterial( { map: texture } );

    var plane = new THREE.Mesh( geometry, material );
    collidedObjectUuid.push(plane.uuid);
    plane.name = name;
    plane.rotation.x = - Math.PI / 2;
    plane.position.set( -delta + 100*i, cote, -delta + cote*j );

    scene.add( plane );
}

/****************************************
 * Animate / Interact
 ***************************************/
function animate() {
    raycaster.setFromCamera( mouse, camera );
    intersects = raycaster.intersectObjects( scene.children );

    if ( intersects.length > 0 ) {
        intersect = intersects[0];
        if(collidedObjectUuid.indexOf(intersect.object.uuid) != -1) {
            var face = intersect.face;
            var linePosition = new THREE.BufferAttribute();
            // var linePosition = line.geometry.attributes['position'];

            scene.add( new THREE.BoxHelper( intersect.object ) );

            if(intersect.object.geometry) {
                var meshPosition = intersect.object.position;
                if(face) {
                    console.log('intersect ' + intersect.object.uuid + '      name: ' + intersect.object.name);
                    // intersect.object.scale.add( offset );

                    // var currentHex = face.material.emissive.getHex();
                    // face.color.setHex(0xff0000);
                    intersect.visible = true;
                    linePosition.copyAt( 0, meshPosition, face.a );
                    linePosition.copyAt( 1, meshPosition, face.b );
                    linePosition.copyAt( 2, meshPosition, face.c );
                    linePosition.copyAt( 3, meshPosition, face.a );
                    intersect.object.updateMatrix();
                    line.geometry.applyMatrix( intersect.object.matrix );
                    line.visible = true;
                } else {
                    line.visible = false;
                }
            }
        } else { line.visible = false; }
    } else { line.visible = false; }

    // Update animations
    requestAnimationFrame( animate );
    var delta = clock.getDelta();
    if ( mixer ) mixer.update( delta );

    renderer.render( scene, camera );
    // stats.update();
}

/********************************************************************************************************************
 * Events
 *******************************************************************************************************************/
function onWindowResize() {
    windowHalfX = window.innerWidth / 2;
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}

function onDocumentKeyPress( event ) {
}

function onDocumentMouseDown( event ) {
    event.preventDefault();
    mouse.set( ( event.clientX / window.innerWidth ) * 2 - 1, - ( event.clientY / window.innerHeight ) * 2 + 1 );
    raycaster.setFromCamera( mouse, camera );
    intersects = raycaster.intersectObjects( scene.children );
    if ( intersects.length > 0 ) {
        intersect = intersects[ 0 ];
        // delete cube
        // if ( isShiftDown ) {
        //     if ( intersect.object !== plane ) {
                scene.remove( intersect.object );
                scene.children.splice( scene.children.indexOf( intersect.object ), 1 );
            // }
            // create cube
        // } else {
        //     var voxel = new THREE.Mesh( cubeGeo, cubeMaterial );
        //     voxel.position.copy( intersect.point ).add( intersect.face.normal );
        //     voxel.position.divideScalar( 50 ).floor().multiplyScalar( 50 ).addScalar( 25 );
        //     scene.add( voxel );
        //     scene.children.push( voxel );
        // }
        // render();

        handleClick(intersect.object.uuid, )
    }
}

function handleClick(uuid, state) {
    //cv

    // blog

    // portfolio/project

    // contact

    // exits
}

function onDocumentMouseMove( event ) {
    event.preventDefault();
    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
}

function onDocumentMouseUp() {
}

function onDocumentMouseOut() {
}

function onDocumentTouchStart( event ) {
}

function onDocumentTouchMove( event ) {
}

function onDocumentKeyDown( event ) {
}
