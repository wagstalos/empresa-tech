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

function scrollTarget() {
  var links = document.querySelectorAll('a[href^="#"]');

  links.forEach(function (link) {
    link.addEventListener("click", function (event) {
      event.preventDefault();

      var targetId = link.getAttribute("href").substring(1);
      var target = document.getElementById(targetId);

      if (target) {
        var targetOffset = target.getBoundingClientRect().top + window.scrollY;

        window.scrollTo({
          top: targetOffset,
          behavior: "smooth",
        });
      }
    });
  });
}

scrollTarget();

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

  BABYLON.SceneLoader.ImportMesh(
    "",
    "img/",
    "CamaroSS.glb",
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
        skeleton.animations.forEach((animation) => {
          // Modifica a velocidade da animação
          animation.speed = animationSpeedFactor;
          // Inicia a animação
          scene.beginAnimation(
            skeleton,
            0,
            animation.to,
            true,
            animationSpeedFactor
          );
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
