// karimmoussouni.com
/****************************************
 * commonjs
 ***************************************/
var THREE = require('three');
var TWEEN = require('tween/tween.js');

/** import */
import { OrbitControls } from '../../node_modules/three/examples/jsm/controls/OrbitControls.js';
import { FBXLoader } from '../../node_modules/three/examples/jsm/loaders/FBXLoader';

const axios = require('axios');

import {ShowSection, showProject} from './ui';
import '../scss/app.scss';

/** variables */
var baseUrl = "http://karimmoussouni.local/"

var container, controls;
var camera, scene, renderer, light;
var clock = new THREE.Clock();
var mixer;

var loader, line;

var collidedObjectUuid = [];

var fontMap = {
    "helvetiker": 0,
    "gentilis": 2,
};
var weightMap = {
    "regular": 0,
    "bold": 1
};
// var reverseFontMap = [];
// var reverseWeightMap = [];
// for ( var i in fontMap ) reverseFontMap[ fontMap[ i ] ] = i;
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
            // console.log(this.r, this.x, this.y, this.z, this.o);
            // light.position.set(this.x, this.y, this.z);
            light.rotation.set(this.r, light.rotation.y, light.rotation.z);
            // light.scale.set(this.s,this.s,this.s);

            // light.material.opacity = this.o;
        });
    tweenlight.start();


    // scene.add( new THREE.PointLightHelper( light, 15 ) );

    /**
     * grid
     */
    createPortfolio();

    /////////////////////////////////////////
    // model - freelance
    /////////////////////////////////////////
    loader = new FBXLoader();
    // loader.load( 'build/3d/Freelance/freelance.fbx', function ( object ) {
    loader.load( '/build/3d/Freelance/malcolmHappyIdle.fbx', function ( object ) {
        // console.info( 'FBX model loading...' );

        mixer = new THREE.AnimationMixer( object );
        var action = mixer.clipAction( object.animations[ 0 ] );
        action.play();

        object.traverse( function ( child ) {
            if ( child.isMesh ) {
                // console.log('child is mesh')

                // var box = new THREE.BoxHelper( child );
                // box.geometry.computeBoundingBox();
                // scene.add( box );

                // child.castShadow = true;
                // child.receiveShadow = true;

                // collidedObjectUuid.push(child.uuid);
                // console.log('child = ' + child.uuid);
                // child.updateMatrixWorld();
                // child.updateMatrix();
                // child.updateWorldMatrix();
                // child.matrixAutoUpdate = true;
                // child.isObject3D = true;
                // child.geometry.computeBoundingBox();
            }
        } );

        // object.updateWorldMatrix();
        // object.updateMatrix();
        object.name = "freelance";
        object.type = "Mesh";
        // console.log('object = ' + object.uuid);

        collidedObjectUuid.push(object.uuid);

        scene.add( object );

        document.getElementById('loading').style.display = 'none';
        document.getElementById('card').style.display = 'block';
    }, undefined, function ( error ) {
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
        // make shape ( N.B. edge view not visible )
        text = new THREE.Mesh( geometry, matLite );
        // text.position.z = -50;

        // text.traverse( function ( child ) {
        //     if ( child.isMesh ) {
        //         child.castShadow = true;
        //         child.receiveShadow = false;
        //     }
        // } );

        text.name = "Text";
        text.km = "Text";
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
    // console.log('create portforlio');

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
    material.side = THREE.DoubleSide;
    material.opacity = 1.0;

    // var plane = new THREE.Mesh( geometry );
    var floorGeometry = new THREE.PlaneGeometry(100, 100);
    // var floorGeometry = new THREE.PlaneGeometry(100, 100, 10, 10);
    var plane = new THREE.Mesh(floorGeometry, material);
    collidedObjectUuid.push(plane.uuid);
    plane.name = name;
    plane.km = "Project";
    // plane.material = material;
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

    console.log(event.target);
    console.log(event);

    if(event.target  instanceof HTMLCanvasElement) {
        mouse.set( ( event.clientX / window.innerWidth ) * 2 - 1, - ( event.clientY / window.innerHeight ) * 2 + 1 );
        raycaster.setFromCamera( mouse, camera );
        intersects = raycaster.intersectObjects( scene.children, true );
        if ( intersects.length > 0 ) {
            intersect = intersects[ 0 ];
            // console.log('down on ' + intersect.object.name + '/' + intersect.object.uuid);
            // delete cube
            // if ( isShiftDown ) {
            //     if ( intersect.object !== plane ) {
            //         scene.remove( intersect.object );
            //         scene.children.splice( scene.children.indexOf( intersect.object ), 1 );
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

            handleClick(intersect.object, intersect.object.uuid)
        }
    }
}

function handleClick(object, uuid, state='project') {
    console.log('click / TYPE= ' + object.type + " / NAME= " + object.name + " / UUID= " + uuid + " / KM= " + object.km);

    //cv
    if(object.name == 'Shoes' || object.name == 'Bottoms' || object.name == 'Shoes' || object.name == 'Hats' || object.name == 'Tops') {
        console.log('RESUME')
        ShowSection('resume');
    }

    // contact
    if(object.km == 'Text') {
        console.log('BLOG')
        ShowSection('contact');
    }

    // portfolio/project
    if(object.km == 'Project') {
        var tweenProject = new TWEEN.Tween({
                x: object.position.x,
                y: object.position.y,
                z: object.position.z,
                r: object.rotation.x,
                o: object.material.opacity,
                s: object.scale.x
            })
            .to({ x: camera.position.x, y: camera.position.y, z: 0, r: -2*Math.PI, o: 0, s: 5}, 1000)
            .onUpdate(function() {
                // console.log(this.r, this.x, this.y, this.z, this.o, this.s);
                object.position.set(this.x, this.y, this.z);
                object.rotation.set(this.r, object.rotation.y, object.rotation.z);
                object.scale.set(this.s,this.s,this.s);
                object.material.opacity = this.o;
            })
            .onComplete(function() {
                console.log('done');
                showProject(object);
            })
        ;

        var tweenCamera = new TWEEN.Tween({
                x: camera.rotation.x,
                y: camera.rotation.y,
                z: camera.rotation.z
            })
            .to({ x: 0, y: 0, z: 0}, 1000)
            .onUpdate(function() {
                // console.log('Camera: '  + this.x, this.y, this.z);
                camera.rotation.set(this.x, this.y, this.z);
            });

            tweenCamera.start();
            tweenProject.start();
    }
    // blog

    // exits
}

function onDocumentMouseMove( event ) {
    event.preventDefault();
    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

    raycaster.setFromCamera( mouse, camera );
    intersects = raycaster.intersectObjects( scene.children );

    if ( intersects.length > 0 ) {
        intersect = intersects[0];
        if(collidedObjectUuid.indexOf(intersect.object.uuid) != -1) {
            var face = intersect.face;
            var linePosition = new THREE.BufferAttribute();
            // var linePosition = line.geometry.attributes['position'];

            if(intersect.object.geometry) {
                var meshPosition = intersect.object.position;
                if(face) {
                    // console.log('intersect ' + intersect.object.uuid + '      name: ' + intersect.object.name);
                    // intersect.object.scale.add( offset );

                    // var currentHex = face.material.emissive.getHex();
                    // face.color.setHex(0xff0000);
                    // intersect.visible = true;
                    // linePosition.copyAt( 0, meshPosition, face.a );
                    // linePosition.copyAt( 1, meshPosition, face.b );
                    // linePosition.copyAt( 2, meshPosition, face.c );
                    // linePosition.copyAt( 3, meshPosition, face.a );
                    // intersect.object.updateMatrix();
                    // line.geometry.applyMatrix( intersect.object.matrix );
                    // line.visible = true;
                } else {
                    line.visible = false;
                }
            }
        } else { line.visible = false; }
    } else { line.visible = false; }

    controls.update();
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
