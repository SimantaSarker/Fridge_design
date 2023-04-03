var scene, camera, renderer, meshFloor;
var fridge_right_left_behind,fridge_lowerpart,fridge_front;

var ambientLight, light;

var keyboard = {};
var degree = 0;
var click = 1;

var panel_width = innerWidth;
var panel_height = innerHeight;

var socket = 
{     //camera lookAt height and movement speed
    height: 1.5, 
    speed: 0.3 
}

//init function 
function init() 
{

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(90, panel_width / panel_height, 0.1, 1000); 

    //texture loader
    var texture_1 = new THREE.TextureLoader().load("textures/texture_1.jpg");
    var texture_fridge_front = new THREE.TextureLoader().load("textures/fridge_front.jpg");
    var texture_mesh_floor=new THREE.TextureLoader().load("textures/mesh_floor.jpg");
    var texture_fridge_lowerpart=new THREE.TextureLoader().load("textures/fridge_lowerpart.jpg");
    var texture_fridge_right_left_behind=new THREE.TextureLoader().load("textures/fridge_right_left_behind.jpg"); 
    var texture_5 = new THREE.TextureLoader().load("textures/texture_5.jpg");
    texture_5.wrapS = THREE.RepeatWrapping;
    texture_5.wrapT = THREE.RepeatWrapping;
    texture_5.repeat.set(5,5);
 

   // new_side_start
    fridge_right_left_behind= new THREE.Mesh
    (
        new THREE.BoxGeometry(1.5, 5.0, 1.5),
        new THREE.MeshPhongMaterial
        ({
            color: 0xffffff,
            map:texture_fridge_right_left_behind
        })
    );
    scene.add(fridge_right_left_behind);
    fridge_right_left_behind.position.set(-1.9, 0, 0);
    fridge_right_left_behind.receiveShadow = true;
    fridge_right_left_behind.castShadow = true;
  // new_side_end
    


  fridge_lowerpart = new THREE.Mesh
    (
        new THREE.BoxGeometry(0.1, 2.0, 1.5),
        new THREE.MeshPhongMaterial
        ({
            color: 0xffffff,
            map:texture_fridge_lowerpart
        })
    );
    scene.add(fridge_lowerpart);
    fridge_lowerpart.position.set(-1.1, 0, 0);
    fridge_lowerpart.receiveShadow = true;
    fridge_lowerpart.castShadow = true;





     fridge_front= new THREE.Mesh
    (
        new THREE.BoxGeometry(0.1, 1.42, 1.5),
        new THREE.MeshPhongMaterial
        ({
            color: 0xffffff,
            map:texture_fridge_front
        })
    );
    scene.add(fridge_front);
    fridge_front.position.set(-1.1, 1.79, 0);
    fridge_front.receiveShadow = true;
    fridge_front.castShadow = true;
  


    //hatol refrigerator ar
    fridge_lowerpart = new THREE.Mesh
    (
        new THREE.BoxGeometry(0.14, 0.1, 1.50),
        new THREE.MeshPhongMaterial
        ({
            color: 0xffffff,
            map:texture_5
        })
    );
    scene.add(fridge_lowerpart);
    fridge_lowerpart.position.set(-1.1, 0.4, 0);
    fridge_lowerpart.receiveShadow = true;
    fridge_lowerpart.castShadow = true;
    // end of hatol



    //meshFloor
    meshFloor = new THREE.Mesh(
        new THREE.PlaneGeometry(innerWidth,innerHeight, 10, 10),
        new THREE.MeshPhongMaterial
        ({
            color: 0xffffff,
            wireframe: false,
            map: texture_mesh_floor
        })
    );
    meshFloor.rotation.x -= Math.PI / 2;
    meshFloor.receiveShadow = true;
    scene.add(meshFloor);
    //meshFloor

    //light
    //AmbientLight
    ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    //pointLight
    light = new THREE.PointLight(0xffffff, 2, 100);
    light.position.set(-3, 6, -3);
    light.castShadow = true;
    light.shadow.camera.near = .5;
    light.shadow.camera.far = 15;
    scene.add(light);
    //light

    
    /*
    var socket = { //camera lookAt height and movement speed
    height: 1.5,
    speed: 0.3
    */
   //camera 
   camera.position.set(3, socket.height, -2.9);
   camera.lookAt(new THREE.Vector3(0, socket.height, 0));

    //renderer
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(panel_width,panel_height);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setClearColor(0xFFC0CB);
    document.body.appendChild(renderer.domElement);
    //renderer

    animate(); //call functionForAnimation
}

//functionForAnimation
function animate() 
{

    requestAnimationFrame(animate);

    //Up(w)
    if (keyboard[87])
     {
        camera.position.x -= Math.sin(camera.rotation.y) * socket.speed;
        camera.position.z -= -Math.cos(camera.rotation.y) * socket.speed;
    }
    //Down(s)
    if (keyboard[83])
    {
        camera.position.x += Math.sin(camera.rotation.y) * socket.speed;
        camera.position.z += -Math.cos(camera.rotation.y) * socket.speed;
    }
    //left(a)
    if (keyboard[65]) 
    {
        camera.position.x += Math.sin(camera.rotation.y + Math.PI / 2) * socket.speed;
        camera.position.z += -Math.cos(camera.rotation.y + Math.PI / 2) * socket.speed;
    }
    //Right(d)
    if (keyboard[68]) 
    {
        camera.position.x += Math.sin(camera.rotation.y - Math.PI / 2) * socket.speed;
        camera.position.z += -Math.cos(camera.rotation.y - Math.PI / 2) * socket.speed;
    }

    //Left turn(q)
    if (keyboard[81]) 
    {
        camera.rotation.y -= Math.PI * 0.01;
    }
    //Right turn(e)
    if (keyboard[69]) 
    {
        camera.rotation.y += Math.PI * 0.01;
    }

    //lightAnimation
    if (degree < 360) 
    {
        degree += 0.5;
    } 
    else 
    {
        degree = 0;
    }

    light.position.x = Math.sin(degree * Math.PI / 180) * 3;
    light.position.z = Math.cos(degree * Math.PI / 180) * 3;
    //lightAnimation

    renderer.render(scene, camera);
}
//functionForAnimation


function keyDown(event)
 {
    keyboard[event.keyCode] = true;
}

function keyUp(event) 
{
    keyboard[event.keyCode] = false;
}




//eventListener
window.addEventListener('keydown', keyDown);
window.addEventListener('keyup', keyUp);
//window.addEventListener('click', onClick);
//eventListener

window.onload = init; //call init function on load