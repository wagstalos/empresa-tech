AOS.init();

$(".js-tilt").tilt({
  glare: true,
  maxGlare: 0.5,
  scale: 1.2,
});

$(document).ready(function () {
  $(".menu-mobile").on("click", function () {
    $(".links-mobile").toggleClass("show");
  });
});

// const canvas = document.getElementById("renderCanvas");

// // Cria o motor Babylon
// const engine = new BABYLON.Engine(canvas, true);

// // Função para criar a cena
// const createScene = () => {
//     // Cria uma cena básica
//     const scene = new BABYLON.Scene(engine);

//     // Adiciona uma câmera de arco para movimentação fácil
//     const camera = new BABYLON.ArcRotateCamera("Camera", Math.PI / 2, Math.PI / 4, 4, BABYLON.Vector3.Zero(), scene);
//     camera.attachControl(canvas, true);

//     // Adiciona uma luz hemisférica
//     const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 0), scene);

//     // Cria uma esfera
//     const sphere = BABYLON.MeshBuilder.CreateSphere("sphere", { diameter: 1 }, scene);

//     return scene;
// };

// // Cria a cena
// const scene = createScene();

// // Loop de renderização
// engine.runRenderLoop(() => {
//     scene.render();
// });

// // Redimensiona a cena ao ajustar a janela
// window.addEventListener("resize", () => {
//     engine.resize();
// });



const canvas = document.getElementById("renderCanvas");

// Cria o motor Babylon com fundo transparente
const engine = new BABYLON.Engine(canvas, true, {
  preserveDrawingBuffer: true,
  stencil: true,
});

// Função para criar a cena
const createScene = () => {
  const scene = new BABYLON.Scene(engine);

  // Define a cor de fundo como transparente
  scene.clearColor = new BABYLON.Color4(0, 0, 0, 0); // Fundo transparente

  const camera = new BABYLON.ArcRotateCamera(
    "Camera",
    Math.PI / 2,
    Math.PI / 4,
    10, // Aumente a distância da câmera para 10
    BABYLON.Vector3.Zero(),
    scene
  );
  camera.attachControl(canvas, true);

  const light = new BABYLON.HemisphericLight(
    "light",
    new BABYLON.Vector3(1, 1, 0),
    scene
  );

  // Carrega o modelo de borboleta
  BABYLON.SceneLoader.ImportMesh(
    "",
    "img/",
    "DragonFly.glb",
    scene,
    function (meshes, particleSystems, skeletons) {
      meshes.forEach((mesh) => {
        mesh.position = new BABYLON.Vector3(0, 0, 0);
      });

      // Verifica se o modelo possui esqueleto e animações
      if (skeletons.length > 0) {
        const skeleton = skeletons[0];

        // Inicia a animação com um fator de velocidade
        const animationSpeedFactor = 0.2; // 0.2 para 20% da velocidade original

        // Acessa as animações do esqueleto
        skeleton.animations.forEach(animation => {
          // Modifica a velocidade da animação
          animation.speed = animationSpeedFactor;
          // Inicia a animação
          scene.beginAnimation(skeleton, 0, animation.to, true, animationSpeedFactor);
        });
      }
    }
  );

  return scene;
};

// Cria e renderiza a cena
const scene = createScene();
engine.runRenderLoop(() => {
  scene.render();
});

// Redimensiona a cena ao ajustar a janela
window.addEventListener("resize", () => {
  engine.resize();
});
