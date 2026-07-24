import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// ── Three.js hero canvas ──
function initThree() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(55, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
  camera.position.set(0, 0, 22);

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });

  function resize() {
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    renderer.setSize(w, h, false);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  resize();
  window.addEventListener('resize', resize);

  // Wireframe icosahedron
  const group = new THREE.Group();
  scene.add(group);

  const geo = new THREE.IcosahedronGeometry(8, 1);
  const wire = new THREE.WireframeGeometry(geo);
  const mat = new THREE.LineBasicMaterial({ color: 0xff7a3d, transparent: true, opacity: 0.35 });
  const lines = new THREE.LineSegments(wire, mat);
  group.add(lines);

  // Particle field
  const pGeo = new THREE.BufferGeometry();
  const count = 600;
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 60;
  }
  pGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const pMat = new THREE.PointsMaterial({ color: 0x8b9198, size: 0.09, transparent: true, opacity: 0.5 });
  const points = new THREE.Points(pGeo, pMat);
  scene.add(points);

  // Mouse tracking
  const mouse = { x: 0, y: 0 };
  window.addEventListener('mousemove', (e) => {
    mouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
    mouse.y = (e.clientY / window.innerHeight - 0.5) * 2;
  });

  // Render loop
  let raf;
  function animate() {
    raf = requestAnimationFrame(animate);
    group.rotation.y += 0.0015;
    group.rotation.x += 0.0006;
    points.rotation.y -= 0.0004;
    camera.position.x += (mouse.x * 3 - camera.position.x) * 0.02;
    camera.position.y += (-mouse.y * 3 - camera.position.y) * 0.02;
    camera.lookAt(0, 0, 0);
    renderer.render(scene, camera);
  }
  animate();

  return () => {
    cancelAnimationFrame(raf);
    window.removeEventListener('resize', resize);
  };
}

// ── GSAP animations ──
function initAnimations() {
  // Hero load animation
  const heroContent = document.getElementById('hero-content');
  if (heroContent) {
    gsap.fromTo(
      heroContent,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1.1, ease: 'power3.out', delay: 0.2 }
    );
  }

  // Scroll reveals
  document.querySelectorAll('.reveal').forEach((el) => {
    gsap.fromTo(
      el,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
        },
      }
    );
  });
}

initThree();
initAnimations();
