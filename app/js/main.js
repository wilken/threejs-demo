require({
    baseUrl: 'js',
    // three.js should have UMD support soon, but it currently does not
    shim: { 'vendor/three': { exports: 'THREE' } }
}, [
    'vendor/three'
], function(THREE) {

var camera, scene, renderer;
var geometry, material, mesh, group;
var totalGeom = new THREE.Geometry();
var x=0;

init();
animate();

function init() {

    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.z = 400;

    scene = new THREE.Scene();

    geometry = new THREE.BoxGeometry(40, 40, 40);
    material = new THREE.MeshBasicMaterial({wireframe:true, color:'blue'});
    material = new THREE.MeshLambertMaterial({color: 0xffffff,transparent: false, opacity: 0.8});
  //  material.shading=THREE.FlatShading;
//    material = new THREE.MeshNormalMaterial({transparent: true, opacity: 0.8});
    group = new THREE.Object3D();
    for(var i=0;i<10;i++){
        for(var j=0;j<10;j++){
            for(var k=0;k<10;k++){
                mesh = new THREE.Mesh(geometry, material);
                mesh.position.x=i*40-160;
                mesh.position.y=j*40-160;
                mesh.position.z=k*40-160;
               // mesh.scale.set(0.1,0.1,0.1)
                //mesh.updateMatrix();
                group.add(mesh);
            }
        }
    }
    scene.add(group);
    scene.fog = new THREE.FogExp2( 0x0, 0.00225 );
    // directional lighting
    var directionalLight = new THREE.DirectionalLight(0xffffff);
    directionalLight.position.set(0, 0.3, 1).normalize();
    scene.add(directionalLight);
    /*
      var spot=new THREE.PointLight( 0x0000ff, 1, 1250 );
    spot.position.set(0,10,0).normalize();
    scene.add(spot)
    */

    renderer = new THREE.WebGLRenderer({antialias: false});
    renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(renderer.domElement);

}

function animate() {

    // note: three.js includes requestAnimationFrame shim
    requestAnimationFrame(animate);

 //   group.rotation.x = Date.now() * 0.000003;
 //   group.rotation.z = Date.now() * 0.00008;
 //   group.rotation.y = Date.now() * 0.00018;
    group.rotation.x +=  0.0003;
    group.rotation.z +=  0.008;
    group.rotation.y +=  0.0018;
    scene.fog.density =Math.sin(x)*0.01
    x=x+0.049
    var child = group.children[Math.round(Math.random()*group.children.length)-1]
  //  child.visible = !child.visible
    child.scale.set(Math.random()*3,Math.random(),Math.random())
  //  child.scale.set(Math.random()*1.1,Math.random()*0.2,Math.random()*0.2)
    renderer.render(scene, camera);

}

});
