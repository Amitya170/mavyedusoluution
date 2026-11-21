/**
 * MAVY EDUSOLUTIONS — AUTHENTIC 4D MATHEMATICAL PROJECTION ENGINE
 * 
 * Implements true 4-dimensional Euclidean geometry (R^4) with 6-plane rotation:
 * XY, XZ, XW, YZ, YW, ZW.
 * Projects 4D polytopes (Tesseract, 16-Cell, 24-Cell, Hopf Fibration)
 * into 3D WebGL space with physical shaders, interactive W-axis slicing,
 * and tactile audio-visual telemetry.
 */

(function () {
  'use strict';

  // --- AUDIO SYNTHESIS: Elegant Mechanical Feedback ---
  class TactileAudio {
    constructor() {
      this.ctx = null;
      this.enabled = true;
    }
    init() {
      if (!this.ctx && (window.AudioContext || window.webkitAudioContext)) {
        this.ctx = new (window.AudioContext || window.webkitAudioContext)();
      }
    }
    tick(freq = 1200, duration = 0.015, gainVal = 0.04) {
      if (!this.enabled) return;
      try {
        this.init();
        if (this.ctx && this.ctx.state === 'suspended') {
          this.ctx.resume();
        }
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(freq * 0.4, this.ctx.currentTime + duration);
        gain.gain.setValueAtTime(gainVal, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + duration);
      } catch (e) {
        // audio context blocked or unsupported
      }
    }
  }

  const audio = new TactileAudio();

  // --- 4D MATHEMATICS & GEOMETRY DEFINITIONS ---
  class Polytope4D {
    // 1. Tesseract (8-Cell / 4D Hypercube)
    // 16 vertices: (+-1, +-1, +-1, +-1)
    // 32 edges connecting vertices that differ by exactly 1 coordinate
    static createTesseract() {
      const vertices = [];
      for (let i = 0; i < 16; i++) {
        vertices.push([
          (i & 1 ? 1 : -1) * 1.0,
          (i & 2 ? 1 : -1) * 1.0,
          (i & 4 ? 1 : -1) * 1.0,
          (i & 8 ? 1 : -1) * 1.0
        ]);
      }

      const edges = [];
      for (let i = 0; i < 16; i++) {
        for (let j = i + 1; j < 16; j++) {
          // Check Hamming distance == 1
          const diff = i ^ j;
          if (diff === 1 || diff === 2 || diff === 4 || diff === 8) {
            edges.push([i, j]);
          }
        }
      }

      return {
        name: 'Tesseract (8-Cell)',
        description: 'The regular 4D hypercube. As it rotates across the W-plane, its inner cubic cell passes smoothly through its outer boundary.',
        vertices,
        edges,
        scale: 1.15
      };
    }

    // 2. 16-Cell (Hexadecachoron / 4D Cross-Polytope)
    // 8 vertices: permutations of (+-2, 0, 0, 0)
    // 24 edges connecting all non-antipodal pairs
    static create16Cell() {
      const vertices = [
        [ 2,  0,  0,  0],
        [-2,  0,  0,  0],
        [ 0,  2,  0,  0],
        [ 0, -2,  0,  0],
        [ 0,  0,  2,  0],
        [ 0,  0, -2,  0],
        [ 0,  0,  0,  2],
        [ 0,  0,  0, -2]
      ];

      const edges = [];
      for (let i = 0; i < 8; i++) {
        for (let j = i + 1; j < 8; j++) {
          // Edges exist between any two vertices except antipodal pairs (i, i^1)
          if ((i ^ j) !== 1 || (i % 2 !== 0)) {
            edges.push([i, j]);
          }
        }
      }

      return {
        name: '16-Cell (Cross-Polytope)',
        description: 'The 4D analogue of the octahedron. Features 16 tetrahedral cells meeting at sharp crystalline vertices.',
        vertices,
        edges,
        scale: 1.3
      };
    }

    // 3. 24-Cell (Icositetrachoron)
    // Unique to 4-dimensional space with no 3D analogue!
    // 24 vertices, 96 edges
    static create24Cell() {
      const vertices = [];
      // 8 vertices: permutations of (+-2, 0, 0, 0)
      for (let axis = 0; axis < 4; axis++) {
        for (const sign of [-2, 2]) {
          const v = [0, 0, 0, 0];
          v[axis] = sign;
          vertices.push(v);
        }
      }
      // 16 vertices: (+-1, +-1, +-1, +-1)
      for (let i = 0; i < 16; i++) {
        vertices.push([
          i & 1 ? 1 : -1,
          i & 2 ? 1 : -1,
          i & 4 ? 1 : -1,
          i & 8 ? 1 : -1
        ]);
      }

      // Edges connect any pair with Euclidean distance squared == 4
      const edges = [];
      for (let i = 0; i < vertices.length; i++) {
        for (let j = i + 1; j < vertices.length; j++) {
          let distSq = 0;
          for (let k = 0; k < 4; k++) {
            const d = vertices[i][k] - vertices[j][k];
            distSq += d * d;
          }
          if (Math.abs(distSq - 4.0) < 0.001) {
            edges.push([i, j]);
          }
        }
      }

      return {
        name: '24-Cell (Icositetrachoron)',
        description: 'The pinnacle of 4D geometry. Completely self-dual and has no counterpart in 3-dimensional or any other dimensional space.',
        vertices,
        edges,
        scale: 0.85
      };
    }

    // 4. Hopf Fibration (4D Hypersphere S^3 -> S^2)
    // Parameterized nested tori in 4D space
    static createHopf() {
      const vertices = [];
      const edges = [];
      const numCircles = 18;
      const pointsPerCircle = 24;

      for (let c = 0; c < numCircles; c++) {
        const theta = (c / numCircles) * Math.PI;
        const phi = (c / numCircles) * Math.PI * 2;
        const circleStartIndex = vertices.length;

        for (let p = 0; p < pointsPerCircle; p++) {
          const psi = (p / pointsPerCircle) * Math.PI * 2;
          // Hopf coordinates on S^3
          const eta = theta / 2;
          const x1 = Math.cos(eta) * Math.cos(psi);
          const x2 = Math.cos(eta) * Math.sin(psi);
          const x3 = Math.sin(eta) * Math.cos(phi + psi);
          const x4 = Math.sin(eta) * Math.sin(phi + psi);

          vertices.push([x1 * 1.8, x2 * 1.8, x3 * 1.8, x4 * 1.8]);

          const nextP = (p + 1) % pointsPerCircle;
          edges.push([circleStartIndex + p, circleStartIndex + nextP]);
        }
      }

      return {
        name: 'Hopf Fibration (4D Hypersphere)',
        description: 'A continuous mapping of the 3-sphere in 4D space, generating nested interlocking tori when projected into 3D.',
        vertices,
        edges,
        scale: 1.2
      };
    }
  }

  // --- 4D ROTATION ALGORITHMS (6 ORTHOGONAL PLANES) ---
  function rotate4D(point, angles) {
    let [x, y, z, w] = point;

    // 1. Plane XW (The crucial 4th-dimension transformation)
    if (angles.xw) {
      const cos = Math.cos(angles.xw);
      const sin = Math.sin(angles.xw);
      const nx = x * cos - w * sin;
      const nw = x * sin + w * cos;
      x = nx;
      w = nw;
    }

    // 2. Plane YW
    if (angles.yw) {
      const cos = Math.cos(angles.yw);
      const sin = Math.sin(angles.yw);
      const ny = y * cos - w * sin;
      const nw = y * sin + w * cos;
      y = ny;
      w = nw;
    }

    // 3. Plane ZW
    if (angles.zw) {
      const cos = Math.cos(angles.zw);
      const sin = Math.sin(angles.zw);
      const nz = z * cos - w * sin;
      const nw = z * sin + w * cos;
      z = nz;
      w = nw;
    }

    // 4. Standard 3D rotations: XY, XZ, YZ
    if (angles.xy) {
      const cos = Math.cos(angles.xy);
      const sin = Math.sin(angles.xy);
      const nx = x * cos - y * sin;
      const ny = x * sin + y * cos;
      x = nx;
      y = ny;
    }

    if (angles.xz) {
      const cos = Math.cos(angles.xz);
      const sin = Math.sin(angles.xz);
      const nx = x * cos - z * sin;
      const nz = x * sin + z * cos;
      x = nx;
      z = nz;
    }

    if (angles.yz) {
      const cos = Math.cos(angles.yz);
      const sin = Math.sin(angles.yz);
      const ny = y * cos - z * sin;
      const nz = y * sin + z * cos;
      y = ny;
      z = nz;
    }

    return [x, y, z, w];
  }

  // --- 4D TO 3D PERSPECTIVE PROJECTION ---
  function project4Dto3D(point4D, cameraDistanceW = 3.0, scale = 1.0, wOffset = 0.0) {
    const [x, y, z, w] = point4D;
    const adjustedW = w + wOffset;
    const denom = cameraDistanceW - adjustedW;
    // Avoid division by zero or negative flip through camera
    const factor = (denom > 0.1 ? 1.0 / denom : 10.0) * scale * 2.6;
    return {
      x: x * factor,
      y: y * factor,
      z: z * factor,
      w: adjustedW // Keep track of W coordinate for depth-based luminescence
    };
  }

  // --- MAIN WEBGL 4D ENGINE CONTROLLER ---
  class Engine4D {
    constructor(containerId) {
      this.container = document.getElementById(containerId);
      if (!this.container || typeof THREE === 'undefined') return;

      this.polytopes = {
        tesseract: Polytope4D.createTesseract(),
        cell24: Polytope4D.create24Cell(),
        cell16: Polytope4D.create16Cell(),
        hopf: Polytope4D.createHopf()
      };
      this.currentPolyKey = 'tesseract';
      this.currentPoly = this.polytopes[this.currentPolyKey];

      this.angles = {
        xw: 0,
        yw: 0,
        zw: 0,
        xy: 0,
        xz: 0,
        yz: 0
      };

      this.speeds = {
        xw: 0.007,
        yw: 0.005,
        zw: 0.003,
        xz: 0.004
      };

      this.cameraDistW = 3.2;
      this.wSliceOffset = 0.0;
      this.isDragging = false;
      this.prevMouse = { x: 0, y: 0 };

      this.initScene();
      this.initMeshes();
      this.bindEvents();
      this.buildDeckControls();
      this.animate();
    }

    initScene() {
      const width = this.container.clientWidth || 600;
      const height = this.container.clientHeight || 500;

      this.scene = new THREE.Scene();
      this.camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
      this.camera.position.set(0, 0, 7.5);

      this.renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance'
      });
      this.renderer.setSize(width, height);
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      this.container.appendChild(this.renderer.domElement);

      // Studio Lighting for physical depth
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
      this.scene.add(ambientLight);

      const keyLight = new THREE.DirectionalLight(0xd4af37, 2.5); // Champagne Gold key light
      keyLight.position.set(5, 8, 6);
      this.scene.add(keyLight);

      const fillLight = new THREE.DirectionalLight(0x38bdf8, 1.8); // Titanium Sapphire fill
      fillLight.position.set(-6, -4, 4);
      this.scene.add(fillLight);

      this.group = new THREE.Group();
      this.scene.add(this.group);
    }

    initMeshes() {
      // Clear previous
      while (this.group.children.length > 0) {
        const obj = this.group.children[0];
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) obj.material.dispose();
        this.group.remove(obj);
      }

      const poly = this.currentPoly;
      const vCount = poly.vertices.length;
      const eCount = poly.edges.length;

      // 1. Line Segments for 4D Edges
      const linePositions = new Float32Array(eCount * 6);
      const lineColors = new Float32Array(eCount * 6);
      const lineGeo = new THREE.BufferGeometry();
      lineGeo.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
      lineGeo.setAttribute('color', new THREE.BufferAttribute(lineColors, 3));

      const lineMat = new THREE.LineBasicMaterial({
        vertexColors: true,
        transparent: true,
        opacity: 0.88,
        linewidth: 2,
        blending: THREE.AdditiveBlending
      });
      this.lineMesh = new THREE.LineSegments(lineGeo, lineMat);
      this.group.add(this.lineMesh);

      // 2. Vertex Spheres with PBR Iridescent Glass
      const sphereGeo = new THREE.SphereGeometry(0.065, 16, 16);
      this.nodeMeshes = [];
      for (let i = 0; i < vCount; i++) {
        const mat = new THREE.MeshStandardMaterial({
          color: 0xd4af37, // Champagne gold
          roughness: 0.15,
          metalness: 0.85,
          emissive: 0x38bdf8,
          emissiveIntensity: 0.2
        });
        const sphere = new THREE.Mesh(sphereGeo, mat);
        this.group.add(sphere);
        this.nodeMeshes.push(sphere);
      }

      this.updateGeometry();
    }

    updateGeometry() {
      const poly = this.currentPoly;
      const projected = [];

      // Rotate in 4D space and project to 3D
      for (let i = 0; i < poly.vertices.length; i++) {
        const r4 = rotate4D(poly.vertices[i], this.angles);
        const p3 = project4Dto3D(r4, this.cameraDistW, poly.scale, this.wSliceOffset);
        projected.push(p3);

        // Update vertex spheres
        if (this.nodeMeshes[i]) {
          this.nodeMeshes[i].position.set(p3.x, p3.y, p3.z);
          // Scale sphere based on 4D W position (closer in 4th dimension = larger & brighter)
          const wNorm = (p3.w + 2.0) / 4.0;
          const s = Math.max(0.03, 0.05 + wNorm * 0.05);
          this.nodeMeshes[i].scale.set(s, s, s);
          
          // Color interpolate: Warm Champagne Gold (outer/positive W) to Titanium Sapphire (inner/negative W)
          const gold = new THREE.Color(0xd4af37);
          const sapphire = new THREE.Color(0x38bdf8);
          this.nodeMeshes[i].material.color.lerpColors(sapphire, gold, THREE.MathUtils.clamp(wNorm, 0, 1));
          this.nodeMeshes[i].material.emissiveIntensity = 0.2 + wNorm * 0.4;
        }
      }

      // Update 4D Edges
      const linePos = this.lineMesh.geometry.attributes.position.array;
      const lineCol = this.lineMesh.geometry.attributes.color.array;

      const goldColor = new THREE.Color(0xe2b887);
      const sapphireColor = new THREE.Color(0x38bdf8);

      for (let e = 0; e < poly.edges.length; e++) {
        const [i1, i2] = poly.edges[e];
        const p1 = projected[i1];
        const p2 = projected[i2];
        const idx = e * 6;

        linePos[idx] = p1.x;
        linePos[idx + 1] = p1.y;
        linePos[idx + 2] = p1.z;
        linePos[idx + 3] = p2.x;
        linePos[idx + 4] = p2.y;
        linePos[idx + 5] = p2.z;

        // Dynamic 4D luminescence interpolation
        const w1 = THREE.MathUtils.clamp((p1.w + 2.0) / 4.0, 0, 1);
        const w2 = THREE.MathUtils.clamp((p2.w + 2.0) / 4.0, 0, 1);

        const c1 = new THREE.Color().lerpColors(sapphireColor, goldColor, w1);
        const c2 = new THREE.Color().lerpColors(sapphireColor, goldColor, w2);

        lineCol[idx] = c1.r;
        lineCol[idx + 1] = c1.g;
        lineCol[idx + 2] = c1.b;
        lineCol[idx + 3] = c2.r;
        lineCol[idx + 4] = c2.g;
        lineCol[idx + 5] = c2.b;
      }

      this.lineMesh.geometry.attributes.position.needsUpdate = true;
      this.lineMesh.geometry.attributes.color.needsUpdate = true;

      // Update Telemetry Display
      this.updateTelemetry();
    }

    setPolytope(key) {
      if (this.polytopes[key]) {
        this.currentPolyKey = key;
        this.currentPoly = this.polytopes[key];
        audio.tick(1600, 0.02, 0.06);
        this.initMeshes();
      }
    }

    bindEvents() {
      const el = this.renderer.domElement;

      const onStart = (clientX, clientY) => {
        this.isDragging = true;
        this.prevMouse = { x: clientX, y: clientY };
      };

      const onMove = (clientX, clientY) => {
        if (!this.isDragging) return;
        const dx = clientX - this.prevMouse.x;
        const dy = clientY - this.prevMouse.y;

        // Mouse drag rotates both 3D perspective and the 4th spatial dimension (XW plane)
        this.angles.xz += dx * 0.008;
        this.angles.yz += dy * 0.008;
        this.angles.xw += dx * 0.004;

        this.prevMouse = { x: clientX, y: clientY };
        this.updateGeometry();
      };

      const onEnd = () => {
        this.isDragging = false;
      };

      el.addEventListener('mousedown', (e) => onStart(e.clientX, e.clientY));
      window.addEventListener('mousemove', (e) => onMove(e.clientX, e.clientY));
      window.addEventListener('mouseup', onEnd);

      el.addEventListener('touchstart', (e) => {
        if (e.touches.length === 1) {
          onStart(e.touches[0].clientX, e.touches[0].clientY);
        }
      }, { passive: true });

      window.addEventListener('touchmove', (e) => {
        if (e.touches.length === 1) {
          onMove(e.touches[0].clientX, e.touches[0].clientY);
        }
      }, { passive: true });

      window.addEventListener('touchend', onEnd);

      window.addEventListener('resize', () => {
        const w = this.container.clientWidth;
        const h = this.container.clientHeight;
        if (w && h) {
          this.camera.aspect = w / h;
          this.camera.updateProjectionMatrix();
          this.renderer.setSize(w, h);
        }
      });
    }

    buildDeckControls() {
      // Find or attach the 4D control deck UI
      const deckEl = document.getElementById('dimensionDeck');
      if (!deckEl) return;

      deckEl.innerHTML = `
        <div class="deck-header">
          <div class="deck-title">
            <span class="deck-indicator"></span>
            <strong>4D Euclidean Inspector (R⁴)</strong>
          </div>
          <div class="polytope-chips" id="polyChips">
            <button class="poly-chip active" data-poly="tesseract">Tesseract (8-Cell)</button>
            <button class="poly-chip" data-poly="cell24">24-Cell</button>
            <button class="poly-chip" data-poly="cell16">16-Cell</button>
            <button class="poly-chip" data-poly="hopf">Hopf Fibration</button>
          </div>
        </div>

        <div class="deck-body">
          <div class="deck-control">
            <div class="deck-label">
              <span>W-Axis Rotation (XW Plane)</span>
              <span id="xwVal" class="deck-val">+0.00 rad</span>
            </div>
            <input type="range" id="xwSlider" min="0" max="6.28" step="0.02" value="0" class="deck-slider">
          </div>

          <div class="deck-control">
            <div class="deck-label">
              <span>4D Slice Offset (W-Coordinate)</span>
              <span id="wSliceVal" class="deck-val">0.00</span>
            </div>
            <input type="range" id="wSliceSlider" min="-1.5" max="1.5" step="0.05" value="0" class="deck-slider">
          </div>

          <div class="deck-control">
            <div class="deck-label">
              <span>4D Camera Distance (d_w)</span>
              <span id="camDistVal" class="deck-val">3.20</span>
            </div>
            <input type="range" id="camDistSlider" min="2.0" max="5.0" step="0.1" value="3.2" class="deck-slider">
          </div>
        </div>

        <div class="deck-telemetry">
          <div class="telem-item">
            <span class="telem-label">Active Polytope</span>
            <span class="telem-data" id="telemName">Tesseract</span>
          </div>
          <div class="telem-item">
            <span class="telem-label">Vertices / Edges</span>
            <span class="telem-data" id="telemCounts">16 V / 32 E</span>
          </div>
          <div class="telem-item">
            <span class="telem-label">Orthogonal Planes</span>
            <span class="telem-data">XY · XZ · XW · YZ · YW · ZW</span>
          </div>
          <div class="telem-item">
            <span class="telem-label">Status</span>
            <span class="telem-data" style="color:var(--champagne)">Live 60fps WebGL</span>
          </div>
        </div>
      `;

      // Bind Polytope Chips
      const chips = deckEl.querySelectorAll('.poly-chip');
      chips.forEach(chip => {
        chip.addEventListener('click', () => {
          chips.forEach(c => c.classList.remove('active'));
          chip.classList.add('active');
          this.setPolytope(chip.dataset.poly);
        });
      });

      // Bind Sliders
      const xwSlider = document.getElementById('xwSlider');
      const xwVal = document.getElementById('xwVal');
      if (xwSlider) {
        xwSlider.addEventListener('input', (e) => {
          this.angles.xw = parseFloat(e.target.value);
          if (xwVal) xwVal.textContent = `${this.angles.xw.toFixed(2)} rad`;
          audio.tick(1200 + this.angles.xw * 100, 0.01, 0.02);
          this.updateGeometry();
        });
      }

      const wSliceSlider = document.getElementById('wSliceSlider');
      const wSliceVal = document.getElementById('wSliceVal');
      if (wSliceSlider) {
        wSliceSlider.addEventListener('input', (e) => {
          this.wSliceOffset = parseFloat(e.target.value);
          if (wSliceVal) wSliceVal.textContent = this.wSliceOffset.toFixed(2);
          audio.tick(1400 + this.wSliceOffset * 200, 0.01, 0.02);
          this.updateGeometry();
        });
      }

      const camDistSlider = document.getElementById('camDistSlider');
      const camDistVal = document.getElementById('camDistVal');
      if (camDistSlider) {
        camDistSlider.addEventListener('input', (e) => {
          this.cameraDistW = parseFloat(e.target.value);
          if (camDistVal) camDistVal.textContent = this.cameraDistW.toFixed(2);
          this.updateGeometry();
        });
      }
    }

    updateTelemetry() {
      const telemName = document.getElementById('telemName');
      const telemCounts = document.getElementById('telemCounts');
      if (telemName) telemName.textContent = this.currentPoly.name;
      if (telemCounts) {
        telemCounts.textContent = `${this.currentPoly.vertices.length} V / ${this.currentPoly.edges.length} E`;
      }
    }

    animate() {
      requestAnimationFrame(() => this.animate());

      // Auto-rotation in 4D hyper-planes if not dragging
      if (!this.isDragging) {
        this.angles.xw += this.speeds.xw;
        this.angles.yw += this.speeds.yw;
        this.angles.xz += this.speeds.xz;

        const xwSlider = document.getElementById('xwSlider');
        const xwVal = document.getElementById('xwVal');
        if (xwSlider) {
          const modAngle = this.angles.xw % 6.28;
          xwSlider.value = modAngle;
          if (xwVal) xwVal.textContent = `${modAngle.toFixed(2)} rad`;
        }
      }

      this.updateGeometry();
      this.renderer.render(this.scene, this.camera);
    }
  }

  // Auto-initialize when DOM is ready
  window.initMavy4DEngine = function () {
    const container = document.getElementById('fourDCanvasContainer');
    if (container) {
      window.mavy4DInstance = new Engine4D('fourDCanvasContainer');
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', window.initMavy4DEngine);
  } else {
    window.initMavy4DEngine();
  }
})();
