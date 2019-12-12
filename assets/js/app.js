// karimmoussouni.com
// import webgl from "./asc/webgl.asc.asc";

/****************************************
 * commonjs
 ***************************************/
var THREE = require('three');
var TWEEN = require('tween/tween.js');

/** import */
import { OrbitControls } from '../../node_modules/three/examples/jsm/controls/OrbitControls.js';
import { FBXLoader } from '../../node_modules/three/examples/jsm/loaders/FBXLoader';

const axios = require('axios');

import {ShowSection, showProject, updateProgress} from './ui';
import '../scss/app.scss';

/** variables */
var baseUrl = "/../../"
// var baseUrl = "/var/www/karimmoussouni/"
// var baseUrl = "http://karimmoussouni.local/../"

var container, controls;
var camera, scene, renderer, light;
var clock = new THREE.Clock();
var mixer;

var loader, line;

var collidedObjectUuid = [];
var INTERSECTED;

// for ( var i in weightMap ) reverseWeightMap[ weightMap[ i ] ] = i;
// var windowHalfX = window.innerWidth / 2;

var raycaster, intersects, intersect;
var mouse;
var windowHalfX = window.innerWidth / 2;

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
    container = document.getElementById('root' );

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

    var tweenlight = new TWEEN.Tween({
            x: light.position.x,
            y: light.position.y,
            z: light.position.z,
            r: light.rotation.x
        })
        .to({ x: 0, y: 100, z: 0, r: -2*Math.PI}, 1000)
        .onUpdate(function() {
            light.rotation.set(this.r, light.rotation.y, light.rotation.z);
        });
    tweenlight.start();

    /**
     * grid
     */
    createPortfolio();

    /////////////////////////////////////////
    // model - freelance
    /////////////////////////////////////////
    loader = new FBXLoader();
    loader.load( '/build/3d/Freelance/malcolmHappyIdle.fbx', function ( object ) {
        mixer = new THREE.AnimationMixer( object );
        var action = mixer.clipAction( object.animations[ 0 ] );
        action.play();

        object.name = "freelance";
        object.type = "Mesh";

        collidedObjectUuid.push(object.uuid);

        scene.add( object );

        document.getElementById('loading').style.display = 'none';
        document.getElementById('card').style.display = 'block';
    }, function ( e ) {
        updateProgress(e);
    }, function ( error ) {
        console.error( error );
    } );

    collidedObjectUuid.push(loader.uuid);

    /////////////////////////////////////////
    // title / text
    /////////////////////////////////////////
    var text = new THREE.FontLoader();
    text.load( '/build/3d/Freelance/fonts/helvetiker_regular.typeface.json', function ( font ) {
        var xMid, text;
        var color = 0x006699;
        var matDark = new THREE.LineBasicMaterial( {
            color: color,
            opacity: 0.1
            // side: THREE.DoubleSide
        } );
        var matLite = new THREE.MeshBasicMaterial( {
            color: color,
            transparent: true,
            opacity: 0.4,
            side: THREE.DoubleSide
        } );
        var message = "Contact\n         me :)";
        var shapes = font.generateShapes( message, 100 );
        var geometry = new THREE.ShapeBufferGeometry( shapes );
        geometry.computeBoundingBox();
        xMid = - 0.5 * ( geometry.boundingBox.max.x - geometry.boundingBox.min.x );
        geometry.translate( xMid, 50, -100 );
        text = new THREE.Mesh( geometry, matLite );

        text.name = "Text";
        text.km = "Text";
        scene.add( text );
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
            geometry.translate( xMid, 50, -100 );
            var lineMesh = new THREE.Line( geometry, matDark );
            lineText.add( lineMesh );
        }

        lineText.name = "lineText";
        lineText.km = "lineText";
        scene.add( lineText );
        // scene.add( new THREE.BoxHelper( lineText) );
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

    raycaster = new THREE.Raycaster();
    mouse = new THREE.Vector2();

    // Orbit Camera Controls
    controls = new OrbitControls( camera, renderer.domElement );
    controls.target.set( 0, 200, 0 );
    controls.update();

    // events
    document.addEventListener( 'mousemove', onDocumentMouseMove, false );
    document.addEventListener( 'mousedown', onDocumentMouseDown, false );
    document.addEventListener( 'keypress', onDocumentMouseDown, false );
    document.addEventListener( 'touchstart', onDocumentMouseDown, false );

    // document.addEventListener( 'touchstart', onDocumentTouchStart, false );
    // document.addEventListener( 'touchmove', onDocumentTouchMove, false );
    // document.addEventListener( 'keypress', onDocumentKeyPress, false );
    // document.addEventListener( 'keydown', onDocumentKeyDown, false );

    window.addEventListener( 'resize', onWindowResize, false );
}

/****************************************
 * Events
 ***************************************/
function createPortfolio() {
    var countProject = 0;
    var url;
    var j = 0, x = 0;
    var i = 0, y = 0;

    // api get all projets
    axios.get('/api/articles').then(function (response) {
        if(response.data) {
            countProject = response.data.length;
            response.data.map((elmnt) => {
                // console.log(elmnt)
                x = i%10;
                y = parseInt(j/10%10);
                createPlane(x, y, elmnt);
                i++; j+=1;
            });
        }
    })
    .catch(function (error) {
        console.log(error);
    });
}

function createPlane(i, j, project) {
    var cote = 100;
    var delta = 5*cote;

    var loader = new THREE.TextureLoader().setPath( '' );

    var texture = loader.load(project.image.filePath.replace('public/','/') );

    var material = new THREE.MeshStandardMaterial( { map: texture } );

    var geometry = new THREE.PlaneGeometry(100, 100);
    var plane = new THREE.Mesh(geometry); //, material);
    plane.material = material;
    plane.elmnt = project;
    plane.km = "Project";
    collidedObjectUuid.push(plane.uuid);
    plane.rotation.x = - Math.PI / 2;
    plane.position.set( -delta + 100*i, cote, -delta + cote*j );

    scene.add( plane );
}

/****************************************
 * Animate / Interact
 ***************************************/
function animate() {

    // Update animations
    requestAnimationFrame( animate );
    TWEEN.update();

    var delta = clock.getDelta();
    if ( mixer ) mixer.update( delta );

    renderer.render( scene, camera );
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
    // event.preventDefault();

    if(event.target  instanceof HTMLCanvasElement) {
        mouse.set( ( event.clientX / window.innerWidth ) * 2 - 1, - ( event.clientY / window.innerHeight ) * 2 + 1 );
        raycaster.setFromCamera( mouse, camera );
        intersects = raycaster.intersectObjects( scene.children, true );
        if ( intersects.length > 0 ) {
            intersect = intersects[ 0 ];

            handleClick(intersect.object, intersect.object.uuid)
        }
    }
}

function handleClick(object, uuid, state='project') {
    //cv
    if(object.name == 'Shoes' || object.name == 'Bottoms' || object.name == 'Shoes' || object.name == 'Hats' || object.name == 'Tops') {
        ShowSection('resume');
    }

    // contact
    if(object.km == 'Text') {
        ShowSection('contact');
    }

    // portfolio/project
    if(object.km == 'Project') {
        showProject(object);
        // ShowSection('article');

        // var tweenProject = new TWEEN.Tween({
        //         x: object.position.x,
        //         y: object.position.y,
        //         z: object.position.z,
        //         r: object.rotation.x,
        //         o: object.material.opacity,
        //         s: object.scale.x
        //     })
        //     .to({ x: camera.position.x, y: camera.position.y, z: 0, r: -2*Math.PI, o: 0, s: 5}, 1000)
        //     .onUpdate(function() {
        //         object.position.set(this.x, this.y, this.z);
        //         object.rotation.set(this.r, object.rotation.y, object.rotation.z);
        //         object.scale.set(this.s,this.s,this.s);
        //         object.material.opacity = this.o;
        //     })
        //     .onComplete(function() {
        //         showProject(object);
        //     })
        // ;
        //
        // var tweenCamera = new TWEEN.Tween({
        //         x: camera.rotation.x,
        //         y: camera.rotation.y,
        //         z: camera.rotation.z
        //     })
        //     .to({ x: 0, y: 0, z: 0}, 1000)
        //     .onUpdate(function() {
        //         camera.rotation.set(this.x, this.y, this.z);
        //     });
        //
        //     tweenCamera.start();
        //     tweenProject.start();
    }
    // blog
}

function onDocumentMouseMove( event ) {
    // event.preventDefault();
    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

    raycaster.setFromCamera( mouse, camera );
    intersects = raycaster.intersectObjects( scene.children, false );

    if ( intersects.length > 0 ) {
        intersect = intersects[0];

        if(INTERSECTED != intersect) {
            INTERSECTED = intersect;
            // console.log("new intersect KM/NAME="+INTERSECTED.object.km+INTERSECTED.object.name);

            if(INTERSECTED.object.name=="Body"
                || INTERSECTED.object.name=="Tops"
                || INTERSECTED.object.name=="Hats"
                || INTERSECTED.object.name=="Hair") {
                // KM => stop animation
                INTERSECTED.currentScale = INTERSECTED.object.scale;
            }
            else if(INTERSECTED.object.km=="Project") {
                // Project => scale
                INTERSECTED.currentScale = INTERSECTED.object.scale;
                scaleParts(INTERSECTED.object, {x:INTERSECTED.object.scale.x+0.4, y:INTERSECTED.object.scale.y+0.4, z:INTERSECTED.object.scale.z+0.4});
            }
            else if(INTERSECTED.object.km=="Text") {
                // Contact => color
                if(INTERSECTED.object.material.emissive) {
                    INTERSECTED.object.material.emissive.setHex(0xff0000);
                }
            }

        }
        else {}
    } else {
        if(INTERSECTED) {
            // console.log("intersects.length = "+intersects.length);

            if(INTERSECTED.currentScale) {
                scaleParts(INTERSECTED.object, {
                    x: INTERSECTED.currentScale.x,
                    y: INTERSECTED.currentScale.y,
                    z: INTERSECTED.currentScale.z
                });
            }
            // if(INTERSECTED.object.material.emissive) INTERSECTED.object.material.emissive.setHex( 0x444444 );
            // INTERSECTED.object.material.transparent = false;
            // INTERSECTED.object.material.opacity = 1;
            INTERSECTED = null;
        }
    }

    controls.update();
    camera.updateMatrixWorld();
}

function scaleParts(mesh, to)  {
    // console.log(to)
    // console.log(mesh.scale)
    var tween = new TWEEN.Tween({
        x: mesh.scale.x,
        y: mesh.scale.y,
        z: mesh.scale.z
    })
    .to({
        x: to.x,
        y: to.y,
        z: to.z
    }, 100)
    .onUpdate(function() {
        mesh.scale.set(this.x, this.y, this.z);
    });

    tween.start();
}







// var mesh = INTERSECTED.object;
// var intersect = intersects[ 0 ];
// var face = intersect.face;
// var linePosition = line.geometry.attributes.position;
// if(mesh.geometry.attributes && face)
// {
//     var meshPosition = mesh.geometry.attributes.position;
//     linePosition.copyAt( 0, meshPosition, face.a );
//     linePosition.copyAt( 1, meshPosition, face.b );
//     linePosition.copyAt( 2, meshPosition, face.c );
//     linePosition.copyAt( 3, meshPosition, face.a );
//     mesh.updateMatrix();
//     line.geometry.applyMatrix( mesh.matrix );
//     line.visible = true;
// }
