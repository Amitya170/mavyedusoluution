/**
 * MAVY EDUSOLUTIONS — HYPER-DIMENSIONAL 4D VISUAL & INTERACTIVE ENGINE
 * 
 * Replaces textbook math sliders with breathtaking, tactile 4D aesthetics:
 * - Liquid-glass & metallic 4D morphing crystal sphere (time-evolved displacement)
 * - Gyroscopic orbital rings & floating linguistic glass shards with mouse parallax
 * - Interactive 3D acoustic speech waveform ribbon for AI Voice & Data
 * - Dimensional icon depth & realistic lighting
 */

(function () {
  'use strict';

  // --- 1. HERO 4D HYPER-DIMENSIONAL CRYSTAL CENTERPIECE ---
  class Hero4DVisual {
    constructor(containerId) {
      this.container = document.getElementById(containerId);
      if (!this.container || typeof THREE === 'undefined') return;

      this.scene = null;
      this.camera = null;
      this.renderer = null;
      this.orb = null;
      this.innerCore = null;
      this.rings = [];
      this.shards = [];
      this.particles = null;
      this.clock = new THREE.Clock();
      this.mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };

      this.init();
    }

    init() {
      const width = this.container.clientWidth || 550;
      const height = this.container.clientHeight || 520;

      // Scene & Camera
      this.scene = new THREE.Scene();
      this.camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
      this.camera.position.set(0, 0, 7.5);

      // Renderer with ultra-clean transparent alpha
      this.renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance'
      });
      this.renderer.setSize(width, height);
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
      this.renderer.toneMappingExposure = 1.2;
      this.container.appendChild(this.renderer.domElement);

      // --- STUDIO LIGHTING RIG ---
      const ambient = new THREE.AmbientLight(0xffffff, 0.7);
      this.scene.add(ambient);

      // Champagne Gold Key Light
      const keyLight = new THREE.PointLight(0xd4af37, 3.5, 30);
      keyLight.position.set(5, 6, 6);
      this.scene.add(keyLight);

      // Titanium Sapphire Rim Light
      const rimLight = new THREE.PointLight(0x38bdf8, 4.0, 30);
      rimLight.position.set(-6, -4, 5);
      this.scene.add(rimLight);

      // Emerald Accent Fill
      const fillLight = new THREE.DirectionalLight(0x10b981, 1.2);
      fillLight.position.set(0, -6, -4);
      this.scene.add(fillLight);

      // Master Group
      this.group = new THREE.Group();
      this.scene.add(this.group);

      // Build 4D Visual Layers
      this.createMorphingOrb();
      this.createOrbitalRings();
      this.createFloatingShards();
      this.createCosmicParticles();

      // Bind Mouse Events
      this.bindEvents();

      // Start 60fps Loop
      this.animate();
    }

    createMorphingOrb() {
      // 1. High-Subdivision Sphere for 4D Continuous Surface Morphing
      const geo = new THREE.IcosahedronGeometry(1.6, 32);
      this.originalVertices = [];
      const pos = geo.attributes.position;
      for (let i = 0; i < pos.count; i++) {
        this.originalVertices.push(new THREE.Vector3(pos.getX(i), pos.getY(i), pos.getZ(i)));
      }

      // Outer Frosted Liquid-Glass Material
      const glassMat = new THREE.MeshPhysicalMaterial({
        color: 0x0e172a,
        emissive: 0xd4af37,
        emissiveIntensity: 0.15,
        roughness: 0.15,
        metalness: 0.85,
        clearcoat: 1.0,
        clearcoatRoughness: 0.1,
        transparent: true,
        opacity: 0.88,
        wireframe: false
      });

      this.orb = new THREE.Mesh(geo, glassMat);
      this.group.add(this.orb);

      // 2. Inner Golden Luminescent Hyper-Core
      const coreGeo = new THREE.IcosahedronGeometry(0.9, 4);
      const coreMat = new THREE.MeshStandardMaterial({
        color: 0xd4af37,
        emissive: 0xd4af37,
        emissiveIntensity: 0.6,
        roughness: 0.3,
        metalness: 0.9,
        wireframe: true
      });
      this.innerCore = new THREE.Mesh(coreGeo, coreMat);
      this.group.add(this.innerCore);
    }

    createOrbitalRings() {
      // 4D Gyroscopic Orbital Rings with metallic gradient sheen
      const ringConfigs = [
        { radius: 2.35, tube: 0.022, rotX: 1.1, rotY: 0.4, color: 0xd4af37, speed: 0.008 },
        { radius: 2.75, tube: 0.018, rotX: 0.5, rotY: 1.3, color: 0x38bdf8, speed: -0.006 },
        { radius: 3.10, tube: 0.015, rotX: 1.8, rotY: -0.6, color: 0xe2b887, speed: 0.004 }
      ];

      ringConfigs.forEach(cfg => {
        const ringGeo = new THREE.TorusGeometry(cfg.radius, cfg.tube, 16, 100);
        const ringMat = new THREE.MeshStandardMaterial({
          color: cfg.color,
          roughness: 0.2,
          metalness: 0.95,
          emissive: cfg.color,
          emissiveIntensity: 0.25
        });
        const ringMesh = new THREE.Mesh(ringGeo, ringMat);
        ringMesh.rotation.x = cfg.rotX;
        ringMesh.rotation.y = cfg.rotY;
        this.group.add(ringMesh);
        this.rings.push({ mesh: ringMesh, speed: cfg.speed });
      });
    }

    createFloatingShards() {
      // Floating dimensional crystal shards representing discrete localized language tokens
      const shardGeo = new THREE.OctahedronGeometry(0.12, 0);
      const shardMat = new THREE.MeshStandardMaterial({
        color: 0x38bdf8,
        emissive: 0xd4af37,
        emissiveIntensity: 0.4,
        roughness: 0.1,
        metalness: 0.9
      });

      for (let i = 0; i < 28; i++) {
        const shard = new THREE.Mesh(shardGeo, shardMat);
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(Math.random() * 2 - 1);
        const radius = 2.1 + Math.random() * 1.2;

        shard.position.set(
          radius * Math.sin(phi) * Math.cos(theta),
          radius * Math.sin(phi) * Math.sin(theta),
          radius * Math.cos(phi)
        );

        shard.scale.setScalar(0.7 + Math.random() * 0.8);
        this.group.add(shard);
        this.shards.push({
          mesh: shard,
          speed: 0.003 + Math.random() * 0.007,
          axis: new THREE.Vector3(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5).normalize()
        });
      }
    }

    createCosmicParticles() {
      // Sub-atomic neural particle cloud
      const pCount = 1200;
      const pGeo = new THREE.BufferGeometry();
      const pPos = new Float32Array(pCount * 3);
      const pCol = new Float32Array(pCount * 3);

      const gold = new THREE.Color(0xd4af37);
      const sapphire = new THREE.Color(0x38bdf8);

      for (let i = 0; i < pCount; i++) {
        const radius = 1.8 + Math.random() * 2.5;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(Math.random() * 2 - 1);

        pPos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
        pPos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
        pPos[i * 3 + 2] = radius * Math.cos(phi);

        const lerpC = Math.random() > 0.5 ? gold : sapphire;
        pCol[i * 3] = lerpC.r;
        pCol[i * 3 + 1] = lerpC.g;
        pCol[i * 3 + 2] = lerpC.b;
      }

      pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
      pGeo.setAttribute('color', new THREE.BufferAttribute(pCol, 3));

      const pMat = new THREE.PointsMaterial({
        size: 0.035,
        vertexColors: true,
        transparent: true,
        opacity: 0.75,
        blending: THREE.AdditiveBlending
      });

      this.particles = new THREE.Points(pGeo, pMat);
      this.group.add(this.particles);
    }

    bindEvents() {
      const onMove = (clientX, clientY) => {
        const rect = this.container.getBoundingClientRect();
        const x = clientX - rect.left;
        const y = clientY - rect.top;
        this.mouse.targetX = (x / rect.width) * 2 - 1;
        this.mouse.targetY = -(y / rect.height) * 2 + 1;
      };

      window.addEventListener('mousemove', (e) => onMove(e.clientX, e.clientY), { passive: true });
      window.addEventListener('touchmove', (e) => {
        if (e.touches.length > 0) onMove(e.touches[0].clientX, e.touches[0].clientY);
      }, { passive: true });

      window.addEventListener('resize', () => {
        const w = this.container.clientWidth;
        const h = this.container.clientHeight;
        if (w && h && this.camera && this.renderer) {
          this.camera.aspect = w / h;
          this.camera.updateProjectionMatrix();
          this.renderer.setSize(w, h);
        }
      });
    }

    animate() {
      requestAnimationFrame(() => this.animate());
      const time = this.clock.getElapsedTime();

      // Smooth mouse follow
      this.mouse.x += (this.mouse.targetX - this.mouse.x) * 0.05;
      this.mouse.y += (this.mouse.targetY - this.mouse.y) * 0.05;

      // Group Parallax Tilt
      this.group.rotation.y = time * 0.15 + this.mouse.x * 0.5;
      this.group.rotation.x = Math.sin(time * 0.2) * 0.1 - this.mouse.y * 0.3;

      // --- 4D MORPHING SURFACE EQUATIONS ---
      // Dynamically morph the orb's surface vertices across the 4th temporal dimension
      if (this.orb && this.originalVertices) {
        const pos = this.orb.geometry.attributes.position;
        for (let i = 0; i < pos.count; i++) {
          const orig = this.originalVertices[i];
          // 4-Dimensional Perlin-like harmonic displacement
          const wave1 = Math.sin(orig.x * 2.5 + time * 1.8) * 0.12;
          const wave2 = Math.cos(orig.y * 2.2 + time * 1.5) * 0.10;
          const wave3 = Math.sin(orig.z * 3.0 + time * 2.0) * 0.08;
          const factor = 1.0 + wave1 + wave2 + wave3;

          pos.setXYZ(i, orig.x * factor, orig.y * factor, orig.z * factor);
        }
        pos.needsUpdate = true;
        this.orb.geometry.computeVertexNormals();
      }

      // Rotate Inner Golden Core counter-directionally
      if (this.innerCore) {
        this.innerCore.rotation.x = -time * 0.3;
        this.innerCore.rotation.z = time * 0.25;
      }

      // Gyroscopic Orbital Rings Rotation
      this.rings.forEach(r => {
        r.mesh.rotation.z += r.speed;
        r.mesh.rotation.x += r.speed * 0.5;
      });

      // Shard tumbling
      this.shards.forEach(s => {
        s.mesh.rotation.x += s.speed;
        s.mesh.rotation.y += s.speed * 1.5;
      });

      // Cosmic Particle slow drift
      if (this.particles) {
        this.particles.rotation.y = -time * 0.06;
      }

      this.renderer.render(this.scene, this.camera);
    }
  }

  // --- 2. INTERACTIVE 3D ACOUSTIC SPEECH WAVE RIBBON ---
  class AcousticWaveVisual {
    constructor(canvasId) {
      this.canvas = document.getElementById(canvasId);
      if (!this.canvas) return;
      this.ctx = this.canvas.getContext('2d');
      this.width = 0;
      this.height = 0;
      this.time = 0;
      this.mouseHover = 0.5;
      this.targetHover = 0.5;

      this.init();
    }

    init() {
      const resize = () => {
        this.width = this.canvas.clientWidth || 800;
        this.height = this.canvas.clientHeight || 180;
        this.canvas.width = this.width * Math.min(window.devicePixelRatio, 2);
        this.canvas.height = this.height * Math.min(window.devicePixelRatio, 2);
        this.ctx.scale(Math.min(window.devicePixelRatio, 2), Math.min(window.devicePixelRatio, 2));
      };

      resize();
      window.addEventListener('resize', resize);

      this.canvas.addEventListener('mousemove', (e) => {
        const r = this.canvas.getBoundingClientRect();
        this.targetHover = (e.clientX - r.left) / r.width;
      });

      this.animate();
    }

    animate() {
      requestAnimationFrame(() => this.animate());
      this.time += 0.025;
      this.mouseHover += (this.targetHover - this.mouseHover) * 0.08;

      const w = this.width;
      const h = this.height;
      this.ctx.clearRect(0, 0, w, h);

      const numWaves = 4;
      const colors = [
        'rgba(212, 175, 55, 0.7)',   // Champagne gold
        'rgba(56, 189, 248, 0.65)',  // Titanium sapphire
        'rgba(226, 184, 135, 0.45)', // Warm bronze
        'rgba(16, 185, 129, 0.4)'    // Emerald accent
      ];

      for (let wave = 0; wave < numWaves; wave++) {
        this.ctx.beginPath();
        const baseFreq = 0.015 + wave * 0.008;
        const speed = (wave + 1) * 1.2;
        const amplitude = 25 + wave * 14 + (Math.sin(this.mouseHover * Math.PI) * 20);

        for (let x = 0; x <= w; x += 4) {
          // Acoustic modulation envelope (bell curve tapered at edges)
          const envelope = Math.sin((x / w) * Math.PI);
          const y = (h / 2) + Math.sin(x * baseFreq + this.time * speed) * amplitude * envelope *
            Math.cos(x * 0.005 - this.time * 0.5);

          if (x === 0) this.ctx.moveTo(x, y);
          else this.ctx.lineTo(x, y);
        }

        this.ctx.strokeStyle = colors[wave];
        this.ctx.lineWidth = 2.2 - wave * 0.35;
        this.ctx.shadowBlur = 12;
        this.ctx.shadowColor = colors[wave];
        this.ctx.stroke();
      }
    }
  }

  // Auto-init on page load
  function initVisuals() {
    if (document.getElementById('hero4DVisualContainer')) {
      new Hero4DVisual('hero4DVisualContainer');
    }
    if (document.getElementById('acousticWaveCanvas')) {
      new AcousticWaveVisual('acousticWaveCanvas');
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initVisuals);
  } else {
    initVisuals();
  }
})();
