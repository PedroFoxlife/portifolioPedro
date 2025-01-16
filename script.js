// Configuração Inicial do Three.js
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
const textureLoader = new THREE.TextureLoader(); // Definindo o textureLoader

renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('background').appendChild(renderer.domElement);

// Configuração da Câmera
camera.position.set(0, 2, 5);

// Adicionar Luzes
const light = new THREE.PointLight(0xffffff, 1);
light.position.set(0, 5, 5);
scene.add(light);

const ambientLight = new THREE.AmbientLight(0x404040, 0.5); // Luz suave
scene.add(ambientLight);

const movingLight = new THREE.PointLight(0xff0077, 1, 10);
movingLight.position.set(0, 5, 5);
scene.add(movingLight);

// Criação do Plano com Ondas
const geometry = new THREE.PlaneGeometry(20, 20, 50, 50);
const material = new THREE.MeshStandardMaterial({
  color:0x9c3bff ,
  wireframe: false,
  side: THREE.DoubleSide,
});
const plane = new THREE.Mesh(geometry, material);
plane.rotation.x = -Math.PI / 2;
scene.add(plane);

// Grupo para Ícones
const iconsGroup = new THREE.Group();
scene.add(iconsGroup);

// Texturas dos ícones
const iconTextures = [
  textureLoader.load('assets/icons/js.png'),
  textureLoader.load('assets/icons/css.png'),
  textureLoader.load('assets/icons/html.png'),
  textureLoader.load('assets/icons/angular.png'),
  textureLoader.load('assets/icons/react.png'),
  textureLoader.load('assets/icons/boot.png'),
  textureLoader.load('assets/icons/git.png'),
];

// Tamanho dos ícones e número de ícones
const iconSize = 1;
const iconCount = iconTextures.length;

// Criar ícones como partículas
for (let i = 0; i < iconCount; i++) {
  const iconMaterial = new THREE.SpriteMaterial({ 
    map: iconTextures[i], 
    color: 0xffffff // Ajuste da cor para branco
  });
  const iconSprite = new THREE.Sprite(iconMaterial);

  // Posicionar aleatoriamente no espaço
  iconSprite.position.set(
    (Math.random() - 0.5) * 20, // X
    Math.random() * 5,         // Y (altura)
    (Math.random() - 0.5) * 20 // Z
  );
 

  // Ajustar tamanho dos ícones
  iconSprite.scale.set(iconSize, iconSize, 1);

  // Adicionar ícone ao grupo
  iconsGroup.add(iconSprite);

  // Definir uma velocidade de rotação aleatória
  iconSprite.rotationSpeed = Math.random() * 0.0002 + 0.0001;

  // Oscilação vertical aleatória
  iconSprite.oscillationAmplitude = Math.random() * 0.1 + 0.05;
}

// Função de animação para as ondas
function animateWaves() {
  const time = Date.now() * 0.001;
  plane.geometry.vertices.forEach((vertex) => {
    vertex.z = Math.sin(vertex.x * 2 + time) * 0.3 + Math.cos(vertex.y * 2 + time) * 0.3;
  });
  plane.geometry.verticesNeedUpdate = true;
}

// Função de animação das partículas (removida para simplificar)
function animateParticles() {
  // Partículas não estão mais sendo usadas
}

// Função de animação dos ícones
function animateIcons() {
  iconsGroup.children.forEach((icon) => {
    // Orbitar em torno do ponto central
    icon.position.x = Math.sin(Date.now() * icon.rotationSpeed) * 5;
    icon.position.z = Math.cos(Date.now() * icon.rotationSpeed) * 5;

    // Oscilar verticalmente
    icon.position.y += Math.sin(Date.now() * icon.oscillationAmplitude) * 0.01;

    // Rotação individual
    icon.rotation.y += icon.rotationSpeed * 2;
  });

  iconsGroup.rotation.y += 0.001; // Rotação do grupo
}

// Função de animação principal
function animate() {
  requestAnimationFrame(animate);
  animateWaves(); // Ondas
  animateIcons(); // Ícones

  renderer.render(scene, camera);
}
animate();

// Redimensionamento Responsivo
window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});

// Texto Animado - Primeira Animação
document.querySelectorAll('.animated-text').forEach((el) => {
    const text = el.dataset.text;
    el.innerHTML = '';
    text.split('').forEach((char, i) => {
        const span = document.createElement('span');
        span.textContent = char;
        span.style.animationDelay = `${i * 0.1}s`;
        span.classList.add('highlighted-text'); // Adiciona a classe de destaque
        el.appendChild(span);
    });
});

// Texto Animado - Segunda Animação
document.querySelectorAll('.animated-text2').forEach((el) => {
    const text = el.dataset.text;
    el.innerHTML = '';
    text.split('').forEach((char, i) => {
        const span = document.createElement('span');
        span.textContent = char;
        span.style.animationDelay = `${i * 5}s`;
        span.classList.add('highlighted-text'); // Adiciona a classe de destaque
        el.appendChild(span);
    });
});




document.getElementById('meusProjetos').addEventListener('click', () => {
    const currentSection = document.getElementById('home');
    const nextSection = document.getElementById('projects');
  
    // Adicionar animação de saída na seção atual
    currentSection.classList.add('exit-animation');
  
    // Quando a animação de saída terminar
    currentSection.addEventListener('animationend', function handleExit() {
      currentSection.classList.remove('active', 'exit-animation');
      currentSection.classList.add('hidden');
  
      // Mostrar a próxima seção com animação de entrada
      nextSection.classList.remove('hidden');
      nextSection.classList.add('active', 'entry-animation');
  
      // Remover a classe de entrada após a animação
      nextSection.addEventListener('animationend', function handleEntry() {
        nextSection.classList.remove('entry-animation');
        nextSection.removeEventListener('animationend', handleEntry);
      });
  
      // Remover o listener da animação de saída
      currentSection.removeEventListener('animationend', handleExit);
    });
  });
  
  // Botão para voltar à seção inicial
  document.getElementById('voltarInicio').addEventListener('click', () => {
    const currentSection = document.getElementById('projects');
    const previousSection = document.getElementById('home');
  
    // Adicionar animação de saída na seção atual
    currentSection.classList.add('exit-animation');
  
    // Quando a animação de saída terminar
    currentSection.addEventListener('animationend', function handleExit() {
      currentSection.classList.remove('active', 'exit-animation');
      currentSection.classList.add('hidden');
  
      // Mostrar a seção inicial com animação de entrada
      previousSection.classList.remove('hidden');
      previousSection.classList.add('active', 'entry-animation');
  
      // Remover a classe de entrada após a animação
      previousSection.addEventListener('animationend', function handleEntry() {
        previousSection.classList.remove('entry-animation');
        previousSection.removeEventListener('animationend', handleEntry);
      });
  
      // Remover o listener da animação de saída
      currentSection.removeEventListener('animationend', handleExit);
    });
  });
  