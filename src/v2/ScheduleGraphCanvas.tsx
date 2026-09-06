/**
 * SyncPro v2 — Three.js Interactive 3D Critical Path Schedule Mesh
 * Directly implements Skill 4 (Three.js 3D scene) + Animmaster interactive mouse physics:
 * Renders an interactive 3D CPM network topology with glowing nodes,
 * precedence logic links, and pulsating energy along the Coral Orange Critical Path.
 */
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

interface ActivityNode {
  id: string;
  name: string;
  wbs: string;
  x: number;
  y: number;
  z: number;
  isCritical: boolean;
  float: string;
  color: number;
}

const NODES: ActivityNode[] = [
  // WBS 1: Substructure & Foundations
  { id: "A1010", name: "Secant Piling Grids A-D", wbs: "Substructure", x: -14, y: -4, z: -2, isCritical: true, float: "0d", color: 0xff6b35 },
  { id: "A1020", name: "Basement Dewatering & Raft", wbs: "Substructure", x: -9, y: -3, z: 2, isCritical: true, float: "0d", color: 0xff6b35 },
  { id: "A1030", name: "Retaining Wall Shoring", wbs: "Substructure", x: -10, y: -6, z: -4, isCritical: false, float: "+6d", color: 0x10b981 },

  // WBS 2: Podium & Superstructure
  { id: "A1120", name: "Podium Core Wall L01-L04", wbs: "Superstructure", x: -3, y: -1, z: 0, isCritical: true, float: "0d", color: 0xff6b35 },
  { id: "A1150", name: "Podium PT Transfer Slab", wbs: "Superstructure", x: 2, y: 1, z: -2, isCritical: true, float: "0d", color: 0xff6b35 },
  { id: "A1180", name: "Tower Columns L05-L12", wbs: "Superstructure", x: 6, y: 3, z: 1, isCritical: false, float: "+4d", color: 0xf59e0b },

  // WBS 3: MEP & Risers
  { id: "A1210", name: "MEP Chilled Water Risers L04-L18", wbs: "MEP Systems", x: 1, y: 4, z: 4, isCritical: true, float: "-8d", color: 0xf87171 },
  { id: "A1240", name: "HVAC Heavy Ductwork Installation", wbs: "MEP Systems", x: 5, y: 5, z: 3, isCritical: true, float: "-8d", color: 0xf87171 },
  { id: "A1280", name: "Electrical Substation Commissioning", wbs: "MEP Systems", x: 4, y: -2, z: 5, isCritical: false, float: "+12d", color: 0x10b981 },

  // WBS 4: Building Envelope & Apex
  { id: "A1310", name: "Unitized Curtain Wall Grids 4-8", wbs: "Facade Envelope", x: 10, y: 6, z: -1, isCritical: true, float: "-11d", color: 0xff6b35 },
  { id: "A1350", name: "Structural Glazing Spire Cap", wbs: "Facade Envelope", x: 14, y: 8, z: 0, isCritical: true, float: "0d", color: 0xff6b35 },
  { id: "A1390", name: "Integrated Handover & Final Inspection", wbs: "Handover", x: 18, y: 9, z: 0, isCritical: true, float: "0d", color: 0xff6b35 },
];

// Precedence relationships (from index -> to index, isCritical)
const LINKS: Array<[number, number, boolean]> = [
  [0, 1, true],
  [0, 2, false],
  [1, 3, true],
  [2, 3, false],
  [3, 4, true],
  [3, 6, true],
  [4, 5, false],
  [6, 7, true],
  [7, 9, true],
  [5, 9, false],
  [9, 10, true],
  [10, 11, true],
  [8, 11, false],
];

export function ScheduleGraphCanvas() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [hoveredNode, setHoveredNode] = useState<ActivityNode | null>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check prefers-reduced-motion
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const width = container.clientWidth || 1180;
    const height = 360;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 2, 34);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    container.appendChild(renderer.domElement);

    // Node spheres group
    const nodeGroup = new THREE.Group();
    scene.add(nodeGroup);

    const nodeMeshes: THREE.Mesh[] = [];
    const sphereGeo = new THREE.SphereGeometry(0.45, 24, 24);

    NODES.forEach((node) => {
      const mat = new THREE.MeshBasicMaterial({
        color: node.color,
        wireframe: false,
      });
      const mesh = new THREE.Mesh(sphereGeo, mat);
      mesh.position.set(node.x, node.y, node.z);
      mesh.userData = node;

      // Glow halo ring around critical nodes
      if (node.isCritical) {
        const ringGeo = new THREE.RingGeometry(0.65, 0.8, 28);
        const ringMat = new THREE.MeshBasicMaterial({
          color: node.color,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.5,
        });
        const ring = new THREE.Mesh(ringGeo, ringMat);
        ring.rotation.x = Math.PI / 2;
        mesh.add(ring);
      }

      nodeGroup.add(mesh);
      nodeMeshes.push(mesh);
    });

    // Links lines group
    const linkGroup = new THREE.Group();
    scene.add(linkGroup);

    LINKS.forEach(([fromIdx, toIdx, isCrit]) => {
      const p1 = NODES[fromIdx];
      const p2 = NODES[toIdx];

      const points = [
        new THREE.Vector3(p1.x, p1.y, p1.z),
        new THREE.Vector3(p2.x, p2.y, p2.z),
      ];

      const lineGeo = new THREE.BufferGeometry().setFromPoints(points);
      const lineMat = new THREE.LineBasicMaterial({
        color: isCrit ? 0xff6b35 : 0x3b4252,
        linewidth: isCrit ? 2.5 : 1,
        transparent: true,
        opacity: isCrit ? 0.85 : 0.35,
      });

      const line = new THREE.Line(lineGeo, lineMat);
      linkGroup.add(line);
    });

    // Ambient floating particles
    const particleCount = 70;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 45;
      particlePositions[i + 1] = (Math.random() - 0.5) * 20;
      particlePositions[i + 2] = (Math.random() - 0.5) * 25;
    }

    particleGeo.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xff6b35,
      size: 0.12,
      transparent: true,
      opacity: 0.35,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Mouse tracking & raycasting
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2(-999, -999);
    let targetRotX = 0;
    let targetRotY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      mouse.x = x;
      mouse.y = y;

      targetRotY = x * 0.18;
      targetRotX = -y * 0.12;

      setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };

    const handleMouseLeave = () => {
      mouse.x = -999;
      mouse.y = -999;
      targetRotX = 0;
      targetRotY = 0;
      setHoveredNode(null);
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      camera.aspect = newWidth / height;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, height);
    };
    window.addEventListener("resize", handleResize);

    // Animation Loop
    let animId: number;
    let isVisible = true;

    // IntersectionObserver to pause rendering when offscreen
    const io = new IntersectionObserver((entries) => {
      isVisible = entries[0].isIntersecting;
    }, { threshold: 0.1 });
    io.observe(container);

    let clock = 0;
    const animate = () => {
      animId = requestAnimationFrame(animate);

      if (!isVisible) return;

      clock += 0.015;

      if (!prefersReduced) {
        // Inertia camera rotation
        nodeGroup.rotation.y += (targetRotY - nodeGroup.rotation.y) * 0.05;
        nodeGroup.rotation.x += (targetRotX - nodeGroup.rotation.x) * 0.05;
        linkGroup.rotation.y = nodeGroup.rotation.y;
        linkGroup.rotation.x = nodeGroup.rotation.x;

        // Subtle particle drift
        particles.rotation.y += 0.0008;

        // Pulse critical halos
        nodeMeshes.forEach((mesh, idx) => {
          if (mesh.userData.isCritical) {
            const scale = 1 + Math.sin(clock * 3 + idx) * 0.08;
            mesh.scale.set(scale, scale, scale);
          }
        });
      }

      // Raycast test for hovered node
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(nodeMeshes);

      if (intersects.length > 0) {
        const hit = intersects[0].object.userData as ActivityNode;
        setHoveredNode(hit);
        container.style.cursor = "pointer";
      } else {
        setHoveredNode(null);
        container.style.cursor = "default";
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      io.disconnect();
      window.removeEventListener("resize", handleResize);
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div className="three-cpm-container" ref={containerRef}>
      {/* Overlay Badge */}
      <div className="cpm-legend-tag mono xs">
        <span className="legend-dot critical" />
        <span className="dim">CRITICAL PATH BACKBONE (0d / NEGATIVE FLOAT)</span>
        <span className="legend-sep">·</span>
        <span className="legend-dot buffer" />
        <span className="dim">BUFFER FLOAT (&ge;+4d)</span>
      </div>

      {/* Interactive Node Tooltip */}
      {hoveredNode && (
        <div
          className="node-hover-tooltip mono xs"
          style={{
            left: Math.min(Math.max(mousePos.x + 12, 10), 850),
            top: Math.max(mousePos.y - 65, 10),
          }}
        >
          <div className="tooltip-head">
            <span className="act-id-tag">{hoveredNode.id}</span>
            <span className={hoveredNode.isCritical ? "bad fw-bold" : "ok"}>
              FLOAT: {hoveredNode.float}
            </span>
          </div>
          <p className="tooltip-name">{hoveredNode.name}</p>
          <span className="tooltip-wbs dim">{hoveredNode.wbs} WBS PACKAGE</span>
        </div>
      )}
    </div>
  );
}
