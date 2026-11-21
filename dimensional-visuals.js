/**
 * MAVY EDUSOLUTIONS — HYPER-DIMENSIONAL VISUAL SUITE
 * 
 * 1. Hero 4D Morphing Crystal Orb & Gyroscopic Rings (Temporal 4D Displacement)
 * 2. Interactive 3D Neural Earth Globe with Global Routing Arcs & City Beacons
 * 3. 4D Acoustic Voice Lab (Harmonic Waveform Ribbon + Multi-Band Frequency Spectrum EQ)
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

      this.scene = new THREE.Scene();
      this.camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
      this.camera.position.set(0, 0, 7.5);

      this.renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance'
      });
      this.renderer.setSize(width, height);
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
      this.renderer.toneMappingExposure = 1.25;
      this.container.appendChild(this.renderer.domElement);

      // Lighting Rig
      const ambient = new THREE.AmbientLight(0xffffff, 0.7);
      this.scene.add(ambient);

      const keyLight = new THREE.PointLight(0xd4af37, 4.0, 35);
      keyLight.position.set(5, 7, 6);
      this.scene.add(keyLight);

      const rimLight = new THREE.PointLight(0x38bdf8, 4.5, 35);
      rimLight.position.set(-6, -5, 5);
      this.scene.add(rimLight);

      const accentLight = new THREE.DirectionalLight(0x10b981, 1.2);
      accentLight.position.set(0, -6, -4);
      this.scene.add(accentLight);

      this.group = new THREE.Group();
      this.scene.add(this.group);

      this.createMorphingOrb();
      this.createOrbitalRings();
      this.createFloatingShards();
      this.createCosmicParticles();
      this.bindEvents();
      this.animate();
    }

    createMorphingOrb() {
      const geo = new THREE.IcosahedronGeometry(1.65, 32);
      this.originalVertices = [];
      const pos = geo.attributes.position;
      for (let i = 0; i < pos.count; i++) {
        this.originalVertices.push(new THREE.Vector3(pos.getX(i), pos.getY(i), pos.getZ(i)));
      }

      const glassMat = new THREE.MeshPhysicalMaterial({
        color: 0x0c1222,
        emissive: 0xd4af37,
        emissiveIntensity: 0.2,
        roughness: 0.12,
        metalness: 0.88,
        clearcoat: 1.0,
        clearcoatRoughness: 0.1,
        transparent: true,
        opacity: 0.88
      });

      this.orb = new THREE.Mesh(geo, glassMat);
      this.group.add(this.orb);

      // Inner Golden Luminescent Hyper-Core
      const coreGeo = new THREE.IcosahedronGeometry(0.95, 4);
      const coreMat = new THREE.MeshStandardMaterial({
        color: 0xd4af37,
        emissive: 0xd4af37,
        emissiveIntensity: 0.75,
        roughness: 0.25,
        metalness: 0.95,
        wireframe: true
      });
      this.innerCore = new THREE.Mesh(coreGeo, coreMat);
      this.group.add(this.innerCore);
    }

    createOrbitalRings() {
      const ringConfigs = [
        { radius: 2.45, tube: 0.024, rotX: 1.1, rotY: 0.4, color: 0xd4af37, speed: 0.009 },
        { radius: 2.85, tube: 0.019, rotX: 0.5, rotY: 1.3, color: 0x38bdf8, speed: -0.007 },
        { radius: 3.25, tube: 0.016, rotX: 1.8, rotY: -0.6, color: 0xe2b887, speed: 0.005 }
      ];

      ringConfigs.forEach(cfg => {
        const ringGeo = new THREE.TorusGeometry(cfg.radius, cfg.tube, 16, 100);
        const ringMat = new THREE.MeshStandardMaterial({
          color: cfg.color,
          roughness: 0.15,
          metalness: 0.95,
          emissive: cfg.color,
          emissiveIntensity: 0.3
        });
        const ringMesh = new THREE.Mesh(ringGeo, ringMat);
        ringMesh.rotation.x = cfg.rotX;
        ringMesh.rotation.y = cfg.rotY;
        this.group.add(ringMesh);
        this.rings.push({ mesh: ringMesh, speed: cfg.speed });
      });
    }

    createFloatingShards() {
      const shardGeo = new THREE.OctahedronGeometry(0.12, 0);
      const shardMat = new THREE.MeshStandardMaterial({
        color: 0x38bdf8,
        emissive: 0xd4af37,
        emissiveIntensity: 0.45,
        roughness: 0.1,
        metalness: 0.9
      });

      for (let i = 0; i < 30; i++) {
        const shard = new THREE.Mesh(shardGeo, shardMat);
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(Math.random() * 2 - 1);
        const radius = 2.2 + Math.random() * 1.3;

        shard.position.set(
          radius * Math.sin(phi) * Math.cos(theta),
          radius * Math.sin(phi) * Math.sin(theta),
          radius * Math.cos(phi)
        );

        shard.scale.setScalar(0.7 + Math.random() * 0.8);
        this.group.add(shard);
        this.shards.push({
          mesh: shard,
          speed: 0.003 + Math.random() * 0.007
        });
      }
    }

    createCosmicParticles() {
      const pCount = 1400;
      const pGeo = new THREE.BufferGeometry();
      const pPos = new Float32Array(pCount * 3);
      const pCol = new Float32Array(pCount * 3);

      const gold = new THREE.Color(0xd4af37);
      const sapphire = new THREE.Color(0x38bdf8);

      for (let i = 0; i < pCount; i++) {
        const radius = 1.8 + Math.random() * 2.8;
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
        opacity: 0.8,
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

      this.mouse.x += (this.mouse.targetX - this.mouse.x) * 0.05;
      this.mouse.y += (this.mouse.targetY - this.mouse.y) * 0.05;

      this.group.rotation.y = time * 0.16 + this.mouse.x * 0.5;
      this.group.rotation.x = Math.sin(time * 0.2) * 0.1 - this.mouse.y * 0.3;

      // 4D continuous temporal surface morphing
      if (this.orb && this.originalVertices) {
        const pos = this.orb.geometry.attributes.position;
        for (let i = 0; i < pos.count; i++) {
          const orig = this.originalVertices[i];
          const wave1 = Math.sin(orig.x * 2.5 + time * 1.8) * 0.13;
          const wave2 = Math.cos(orig.y * 2.2 + time * 1.5) * 0.11;
          const wave3 = Math.sin(orig.z * 3.0 + time * 2.0) * 0.09;
          const factor = 1.0 + wave1 + wave2 + wave3;
          pos.setXYZ(i, orig.x * factor, orig.y * factor, orig.z * factor);
        }
        pos.needsUpdate = true;
        this.orb.geometry.computeVertexNormals();
      }

      if (this.innerCore) {
        this.innerCore.rotation.x = -time * 0.35;
        this.innerCore.rotation.z = time * 0.25;
      }

      this.rings.forEach(r => {
        r.mesh.rotation.z += r.speed;
        r.mesh.rotation.x += r.speed * 0.5;
      });

      this.shards.forEach(s => {
        s.mesh.rotation.x += s.speed;
        s.mesh.rotation.y += s.speed * 1.5;
      });

      if (this.particles) {
        this.particles.rotation.y = -time * 0.06;
      }

      this.renderer.render(this.scene, this.camera);
    }
  }

  // --- 2. INTERACTIVE 3D NEURAL EARTH GLOBE ---
  class Interactive3DGlobe {
    constructor(containerId) {
      this.container = document.getElementById(containerId);
      if (!this.container || typeof THREE === 'undefined') return;

      this.scene = null;
      this.camera = null;
      this.renderer = null;
      this.globeGroup = null;
      this.isDragging = false;
      this.prevMouse = { x: 0, y: 0 };
      this.rotationVelocity = { x: 0, y: 0.003 };

      this.cities = [
        { name: 'Tokyo', lat: 35.6762, lon: 139.6503, hub: 'JP-APAC Hub', throughput: '4.2M tokens/s', color: 0xd4af37 },
        { name: 'London', lat: 51.5074, lon: -0.1278, hub: 'EMEA Core', throughput: '6.1M tokens/s', color: 0x38bdf8 },
        { name: 'San Francisco', lat: 37.7749, lon: -122.4194, hub: 'AI Labs Node', throughput: '8.4M tokens/s', color: 0x10b981 },
        { name: 'Berlin', lat: 52.5200, lon: 13.4050, hub: 'EU Regulatory Node', throughput: '3.8M tokens/s', color: 0xd4af37 },
        { name: 'Dubai', lat: 25.2048, lon: 55.2708, hub: 'MENA RTL Nexus', throughput: '2.9M tokens/s', color: 0xe2b887 },
        { name: 'Singapore', lat: 1.3521, lon: 103.8198, hub: 'SEA Multilingual', throughput: '3.5M tokens/s', color: 0x38bdf8 },
        { name: 'São Paulo', lat: -23.5505, lon: -46.6333, hub: 'LATAM Gateway', throughput: '2.1M tokens/s', color: 0x10b981 },
        { name: 'Bengaluru', lat: 12.9716, lon: 77.5946, hub: 'Indic Dialect Center', throughput: '5.2M tokens/s', color: 0xd4af37 }
      ];

      this.init();
    }

    latLonToVector3(lat, lon, radius) {
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lon + 180) * (Math.PI / 180);
      return new THREE.Vector3(
        -(radius * Math.sin(phi) * Math.cos(theta)),
        radius * Math.cos(phi),
        radius * Math.sin(phi) * Math.sin(theta)
      );
    }

    init() {
      const width = this.container.clientWidth || 700;
      const height = this.container.clientHeight || 450;

      this.scene = new THREE.Scene();
      this.camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
      this.camera.position.set(0, 0, 6.2);

      this.renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance'
      });
      this.renderer.setSize(width, height);
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      this.container.appendChild(this.renderer.domElement);

      const ambient = new THREE.AmbientLight(0xffffff, 0.8);
      this.scene.add(ambient);

      const dirLight = new THREE.DirectionalLight(0xd4af37, 2.5);
      dirLight.position.set(5, 5, 5);
      this.scene.add(dirLight);

      this.globeGroup = new THREE.Group();
      this.scene.add(this.globeGroup);

      // 1. Globe Base Sphere (Dark Obsidian with Soft Blue Atmospheric Fresnel)
      const baseGeo = new THREE.SphereGeometry(2.0, 48, 48);
      const baseMat = new THREE.MeshStandardMaterial({
        color: 0x080c18,
        roughness: 0.4,
        metalness: 0.85,
        wireframe: false
      });
      const globeMesh = new THREE.Mesh(baseGeo, baseMat);
      this.globeGroup.add(globeMesh);

      // 2. Latitude & Longitude Wireframe Grid
      const gridGeo = new THREE.SphereGeometry(2.02, 24, 24);
      const gridMat = new THREE.MeshBasicMaterial({
        color: 0x1e293b,
        wireframe: true,
        transparent: true,
        opacity: 0.35
      });
      const gridMesh = new THREE.Mesh(gridGeo, gridMat);
      this.globeGroup.add(gridMesh);

      // 3. Dense Continental Constellation Particles
      const pCount = 2800;
      const pGeo = new THREE.BufferGeometry();
      const pPos = new Float32Array(pCount * 3);
      const pCol = new Float32Array(pCount * 3);
      const gold = new THREE.Color(0xd4af37);
      const sapphire = new THREE.Color(0x38bdf8);

      for (let i = 0; i < pCount; i++) {
        const u = Math.random();
        const v = Math.random();
        const theta = u * 2.0 * Math.PI;
        const phi = Math.acos(2.0 * v - 1.0);
        const r = 2.04;

        pPos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
        pPos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
        pPos[i * 3 + 2] = r * Math.cos(phi);

        const c = Math.random() > 0.4 ? sapphire : gold;
        pCol[i * 3] = c.r;
        pCol[i * 3 + 1] = c.g;
        pCol[i * 3 + 2] = c.b;
      }
      pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
      pGeo.setAttribute('color', new THREE.BufferAttribute(pCol, 3));

      const pMat = new THREE.PointsMaterial({
        size: 0.028,
        vertexColors: true,
        transparent: true,
        opacity: 0.85
      });
      const points = new THREE.Points(pGeo, pMat);
      this.globeGroup.add(points);

      // 4. City Beacons & Illuminated Data Nodes
      this.cityNodes = [];
      const nodeGeo = new THREE.SphereGeometry(0.045, 16, 16);
      this.cities.forEach(city => {
        const v = this.latLonToVector3(city.lat, city.lon, 2.06);
        const nodeMat = new THREE.MeshStandardMaterial({
          color: city.color,
          emissive: city.color,
          emissiveIntensity: 0.9,
          roughness: 0.1
        });
        const node = new THREE.Mesh(nodeGeo, nodeMat);
        node.position.copy(v);
        node.userData = city;
        this.globeGroup.add(node);
        this.cityNodes.push(node);

        // Pulsing Ring Beacon
        const ringGeo = new THREE.RingGeometry(0.05, 0.09, 24);
        const ringMat = new THREE.MeshBasicMaterial({
          color: city.color,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.75
        });
        const ring = new THREE.Mesh(ringGeo, ringMat);
        ring.position.copy(v);
        ring.lookAt(new THREE.Vector3(0, 0, 0));
        this.globeGroup.add(ring);
      });

      // 5. Connect Cities with Radiant Flight Arc Splines
      this.createFlightArcs();

      this.bindEvents();
      this.animate();
    }

    createFlightArcs() {
      const connections = [
        [0, 2], // Tokyo <-> San Francisco
        [1, 0], // London <-> Tokyo
        [1, 3], // London <-> Berlin
        [3, 4], // Berlin <-> Dubai
        [4, 7], // Dubai <-> Bengaluru
        [7, 5], // Bengaluru <-> Singapore
        [2, 6], // San Francisco <-> Sao Paulo
        [1, 6]  // London <-> Sao Paulo
      ];

      connections.forEach(([c1, c2]) => {
        const p1 = this.latLonToVector3(this.cities[c1].lat, this.cities[c1].lon, 2.06);
        const p2 = this.latLonToVector3(this.cities[c2].lat, this.cities[c2].lon, 2.06);

        // Arc mid-point lifted outwards into space
        const mid = p1.clone().add(p2).multiplyScalar(0.5);
        const dist = p1.distanceTo(p2);
        mid.normalize().multiplyScalar(2.06 + dist * 0.28);

        const curve = new THREE.QuadraticBezierCurve3(p1, mid, p2);
        const curvePoints = curve.getPoints(40);
        const arcGeo = new THREE.BufferGeometry().setFromPoints(curvePoints);
        const arcMat = new THREE.LineBasicMaterial({
          color: 0xd4af37,
          transparent: true,
          opacity: 0.65
        });
        const arcLine = new THREE.Line(arcGeo, arcMat);
        this.globeGroup.add(arcLine);
      });
    }

    bindEvents() {
      const dom = this.renderer.domElement;

      const onStart = (x, y) => {
        this.isDragging = true;
        this.prevMouse = { x, y };
      };

      const onMove = (x, y) => {
        if (!this.isDragging) return;
        const dx = x - this.prevMouse.x;
        const dy = y - this.prevMouse.y;
        this.globeGroup.rotation.y += dx * 0.006;
        this.globeGroup.rotation.x += dy * 0.006;
        this.prevMouse = { x, y };
      };

      const onEnd = () => {
        this.isDragging = false;
      };

      dom.addEventListener('mousedown', (e) => onStart(e.clientX, e.clientY));
      window.addEventListener('mousemove', (e) => onMove(e.clientX, e.clientY));
      window.addEventListener('mouseup', onEnd);

      dom.addEventListener('touchstart', (e) => {
        if (e.touches.length === 1) onStart(e.touches[0].clientX, e.touches[0].clientY);
      }, { passive: true });
      window.addEventListener('touchmove', (e) => {
        if (e.touches.length === 1) onMove(e.touches[0].clientX, e.touches[0].clientY);
      }, { passive: true });
      window.addEventListener('touchend', onEnd);

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
      if (!this.isDragging) {
        this.globeGroup.rotation.y += this.rotationVelocity.y;
      }
      this.renderer.render(this.scene, this.camera);
    }
  }

  // --- 3. 4D ACOUSTIC VOICE LAB (WAVEFORM & REAL-TIME SPECTRUM EQ) ---
  class AcousticVoiceLab {
    constructor(canvasId) {
      this.canvas = document.getElementById(canvasId);
      if (!this.canvas) return;
      this.ctx = this.canvas.getContext('2d');
      this.time = 0;
      this.hoverX = 0.5;

      this.init();
    }

    init() {
      const resize = () => {
        this.width = this.canvas.clientWidth || 800;
        this.height = this.canvas.clientHeight || 160;
        this.canvas.width = this.width * Math.min(window.devicePixelRatio, 2);
        this.canvas.height = this.height * Math.min(window.devicePixelRatio, 2);
        this.ctx.scale(Math.min(window.devicePixelRatio, 2), Math.min(window.devicePixelRatio, 2));
      };

      resize();
      window.addEventListener('resize', resize);

      this.canvas.addEventListener('mousemove', (e) => {
        const r = this.canvas.getBoundingClientRect();
        this.hoverX = (e.clientX - r.left) / r.width;
      });

      this.animate();
    }

    animate() {
      requestAnimationFrame(() => this.animate());
      this.time += 0.035;

      const w = this.width;
      const h = this.height;
      this.ctx.clearRect(0, 0, w, h);

      // 1. Draw Multi-Band Frequency Spectrum Bars (Background Equalizer)
      const numBars = 48;
      const barWidth = w / numBars;
      for (let i = 0; i < numBars; i++) {
        const barNorm = i / numBars;
        const harmonic = Math.sin(barNorm * Math.PI * 3 + this.time * 2) *
          Math.cos(barNorm * Math.PI * 2 - this.time);
        const distFromHover = Math.abs(barNorm - this.hoverX);
        const hoverBoost = Math.max(0, 1 - distFromHover * 3.5) * 45;
        const barHeight = Math.max(6, Math.abs(harmonic) * (h * 0.45) + hoverBoost);

        const gradient = this.ctx.createLinearGradient(0, h, 0, h - barHeight);
        gradient.addColorStop(0, 'rgba(56, 189, 248, 0.08)');
        gradient.addColorStop(1, 'rgba(212, 175, 55, 0.45)');

        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(i * barWidth + 2, h - barHeight, barWidth - 4, barHeight);
      }

      // 2. Draw Multi-Layer Harmonic Waveform Ribbons
      const waves = [
        { freq: 0.016, amp: 26, color: '#d4af37', width: 2.4, speed: 1.4 },
        { freq: 0.024, amp: 18, color: '#38bdf8', width: 1.8, speed: 1.8 },
        { freq: 0.032, amp: 12, color: '#10b981', width: 1.4, speed: 2.2 }
      ];

      waves.forEach(wave => {
        this.ctx.beginPath();
        for (let x = 0; x <= w; x += 4) {
          const envelope = Math.sin((x / w) * Math.PI);
          const y = (h * 0.45) + Math.sin(x * wave.freq + this.time * wave.speed) *
            wave.amp * envelope * (1 + (1 - Math.abs((x / w) - this.hoverX)) * 0.8);

          if (x === 0) this.ctx.moveTo(x, y);
          else this.ctx.lineTo(x, y);
        }
        this.ctx.strokeStyle = wave.color;
        this.ctx.lineWidth = wave.width;
        this.ctx.shadowBlur = 12;
        this.ctx.shadowColor = wave.color;
        this.ctx.stroke();
      });
    }
  }

  // Auto-initialize when ready
  function initSuite() {
    if (document.getElementById('hero4DVisualContainer')) {
      new Hero4DVisual('hero4DVisualContainer');
    }
    if (document.getElementById('globeCanvasContainer')) {
      new Interactive3DGlobe('globeCanvasContainer');
    }
    if (document.getElementById('acousticWaveCanvas')) {
      new AcousticVoiceLab('acousticWaveCanvas');
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSuite);
  } else {
    initSuite();
  }
})();
