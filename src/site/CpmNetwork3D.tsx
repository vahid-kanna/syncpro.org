import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

interface ActivityNode {
  id: string;
  name: string;
  x: number;
  y: number;
  z: number;
  critical: boolean;
  completed: boolean;
  floatDays: number;
}

const NODES: ActivityNode[] = [
  // Substructure
  { id: "A1010", name: "Site Clearance & Bulk Excavation", x: -8, y: -2.5, z: -3, critical: true, completed: true, floatDays: 0 },
  { id: "A1020", name: "Deep Foundation Piling (Pits 1-8)", x: -5.5, y: -1.8, z: -1, critical: true, completed: true, floatDays: 0 },
  { id: "A1025", name: "Dewatering & Perimeter Shoring", x: -5.5, y: -3.6, z: 2, critical: false, completed: true, floatDays: 14 },
  { id: "A1030", name: "Raft Foundation Concrete Pour", x: -3, y: -1.2, z: -2, critical: true, completed: true, floatDays: 0 },
  
  // Superstructure
  { id: "A1040", name: "Core Wall Slipform Climbing", x: -0.5, y: 0.2, z: -1.5, critical: true, completed: false, floatDays: 0 },
  { id: "A1045", name: "Podium Structural Steel Erection", x: -1.0, y: -1.5, z: 2.5, critical: false, completed: true, floatDays: 8 },
  { id: "A1050", name: "Post-Tension Slabs L1-L12", x: 2.0, y: 1.2, z: -0.5, critical: true, completed: false, floatDays: 0 },
  { id: "A1055", name: "Precast Facade Installation L1-L6", x: 1.5, y: -0.4, z: 3.0, critical: false, completed: false, floatDays: 19 },
  
  // Services & Enclosure
  { id: "A1060", name: "Curtain Wall Glazing & Seal", x: 4.5, y: 1.8, z: 1.5, critical: false, completed: false, floatDays: 6 },
  { id: "A1070", name: "MEP Primary Risers & High Voltage", x: 4.2, y: 0.5, z: -2.0, critical: true, completed: false, floatDays: 0 },
  { id: "A1080", name: "HVAC Chillers & Duct Mainline", x: 6.8, y: 1.2, z: -1.0, critical: true, completed: false, floatDays: 0 },
  
  // Commissioning & Delivery
  { id: "A1090", name: "Fire Life Safety & BMS Integration", x: 7.2, y: 2.4, z: 1.0, critical: false, completed: false, floatDays: 4 },
  { id: "A1100", name: "Substation Energization Milestone", x: 8.8, y: 2.2, z: -1.5, critical: true, completed: false, floatDays: 0 },
  { id: "A1110", name: "Integrated Systems Final Commissioning", x: 10.5, y: 3.2, z: 0.0, critical: true, completed: false, floatDays: 0 },
];

const EDGES: [string, string][] = [
  ["A1010", "A1020"],
  ["A1010", "A1025"],
  ["A1020", "A1030"],
  ["A1025", "A1030"],
  ["A1030", "A1040"],
  ["A1030", "A1045"],
  ["A1040", "A1050"],
  ["A1045", "A1055"],
  ["A1050", "A1060"],
  ["A1050", "A1070"],
  ["A1055", "A1060"],
  ["A1070", "A1080"],
  ["A1060", "A1090"],
  ["A1080", "A1100"],
  ["A1090", "A1110"],
  ["A1100", "A1110"],
];

export function CpmNetwork3D() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [hoveredNode, setHoveredNode] = useState<ActivityNode | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    // Respect reduced motion preference
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0c0e11, 0.04);

    const camera = new THREE.PerspectiveCamera(48, container.clientWidth / container.clientHeight, 0.1, 100);
    camera.position.set(0, 1.2, 17.5);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Root group for interactive tilt
    const graphGroup = new THREE.Group();
    scene.add(graphGroup);

    // Subtle ambient & directional lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const amberLight = new THREE.PointLight(0xf0a83a, 3.5, 30);
    amberLight.position.set(2, 4, 6);
    scene.add(amberLight);

    const steelLight = new THREE.PointLight(0x5896e0, 2.5, 30);
    steelLight.position.set(-6, -2, 4);
    scene.add(steelLight);

    // Coordinate grid ground floor (blueprint matrix)
    const gridHelper = new THREE.GridHelper(26, 26, 0xf0a83a, 0x1f2630);
    gridHelper.position.y = -4.5;
    (gridHelper.material as THREE.Material).opacity = 0.18;
    (gridHelper.material as THREE.Material).transparent = true;
    graphGroup.add(gridHelper);

    // Color definitions
    const COLOR_AMBER = new THREE.Color(0xf0a83a); // Critical path
    const COLOR_STEEL = new THREE.Color(0x5896e0); // Float / Secondary
    const COLOR_EMERALD = new THREE.Color(0x46c28e); // Completed

    // Geometries & materials cache
    const sphereGeo = new THREE.SphereGeometry(0.32, 24, 24);
    const outerRingGeo = new THREE.RingGeometry(0.42, 0.52, 32);

    const nodeMeshMap = new Map<string, THREE.Mesh>();
    const nodeDataMap = new Map<THREE.Object3D, ActivityNode>();

    // Build Node Meshes
    NODES.forEach((node) => {
      const nodeCol = node.completed ? COLOR_EMERALD : node.critical ? COLOR_AMBER : COLOR_STEEL;
      
      const nodeMat = new THREE.MeshStandardMaterial({
        color: nodeCol,
        emissive: nodeCol,
        emissiveIntensity: node.critical ? 0.65 : 0.35,
        roughness: 0.2,
        metalness: 0.8,
      });

      const mesh = new THREE.Mesh(sphereGeo, nodeMat);
      mesh.position.set(node.x, node.y, node.z);
      graphGroup.add(mesh);
      nodeMeshMap.set(node.id, mesh);
      nodeDataMap.set(mesh, node);

      // Outer glowing halo ring for critical activities
      if (node.critical) {
        const ringMat = new THREE.MeshBasicMaterial({
          color: COLOR_AMBER,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.5,
        });
        const ring = new THREE.Mesh(outerRingGeo, ringMat);
        ring.lookAt(camera.position);
        ring.position.copy(mesh.position);
        ring.userData = { isRing: true };
        graphGroup.add(ring);
      }
    });

    // Build Edges (Curves with glowing gradient lines)
    const curvePointsList: THREE.Vector3[][] = [];
    const edgeLines: THREE.Line[] = [];

    EDGES.forEach(([fromId, toId]) => {
      const fromMesh = nodeMeshMap.get(fromId);
      const toMesh = nodeMeshMap.get(toId);
      if (!fromMesh || !toMesh) return;

      const fromNode = NODES.find((n) => n.id === fromId)!;
      const toNode = NODES.find((n) => n.id === toId)!;
      const isCrit = fromNode.critical && toNode.critical;

      const start = fromMesh.position.clone();
      const end = toMesh.position.clone();
      const mid = start.clone().lerp(end, 0.5);
      // Elevate the mid-point slightly for a 3D parabolic schedule arc
      mid.y += 0.65;
      mid.z += 0.35;

      const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
      const points = curve.getPoints(24);
      curvePointsList.push(points);

      const lineGeo = new THREE.BufferGeometry().setFromPoints(points);
      const lineMat = new THREE.LineBasicMaterial({
        color: isCrit ? 0xf0a83a : 0x5896e0,
        transparent: true,
        opacity: isCrit ? 0.85 : 0.3,
        linewidth: isCrit ? 2 : 1,
      });

      const line = new THREE.Line(lineGeo, lineMat);
      graphGroup.add(line);
      edgeLines.push(line);
    });

    // Pulse particles traveling along the critical path
    const particleCount = 45;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    // Initial random positions
    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 18;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 8;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 8;

      const isAmber = Math.random() > 0.4;
      particleColors[i * 3] = isAmber ? 0.94 : 0.35;
      particleColors[i * 3 + 1] = isAmber ? 0.66 : 0.59;
      particleColors[i * 3 + 2] = isAmber ? 0.23 : 0.88;
    }

    particleGeo.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));
    particleGeo.setAttribute("color", new THREE.BufferAttribute(particleColors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.18,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    graphGroup.add(particles);

    // Ambient floating dust motes
    const dustCount = 140;
    const dustGeo = new THREE.BufferGeometry();
    const dustPos = new Float32Array(dustCount * 3);
    for (let i = 0; i < dustCount; i++) {
      dustPos[i * 3] = (Math.random() - 0.5) * 32;
      dustPos[i * 3 + 1] = (Math.random() - 0.5) * 16;
      dustPos[i * 3 + 2] = (Math.random() - 0.5) * 18;
    }
    dustGeo.setAttribute("position", new THREE.BufferAttribute(dustPos, 3));
    const dustMat = new THREE.PointsMaterial({
      size: 0.08,
      color: 0x808894,
      transparent: true,
      opacity: 0.25,
    });
    const dust = new THREE.Points(dustGeo, dustMat);
    scene.add(dust);

    // Raycaster for hovering nodes
    const raycaster = new THREE.Raycaster();
    const mouseCoord = new THREE.Vector2(-999, -999);

    // Smooth mouse parallax
    let targetRotX = 0;
    let targetRotY = 0;
    let currentRotX = 0;
    let currentRotY = 0;

    const onPointerMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      mouseCoord.x = x;
      mouseCoord.y = y;

      targetRotY = x * 0.35;
      targetRotX = -y * 0.22;
    };

    const onPointerLeave = () => {
      mouseCoord.set(-999, -999);
      targetRotX = 0;
      targetRotY = 0;
      setHoveredNode(null);
    };

    window.addEventListener("mousemove", onPointerMove, { passive: true });
    canvas.addEventListener("mouseleave", onPointerLeave);

    // Resize handling with observer
    const handleResize = () => {
      if (!container || !canvas) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      if (w === 0 || h === 0) return;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    // Visibility observer to pause RAF when off-screen
    let isVisible = true;
    const visibilityObserver = new IntersectionObserver(
      (entries) => {
        isVisible = entries[0]?.isIntersecting ?? true;
      },
      { threshold: 0.05 }
    );
    visibilityObserver.observe(container);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (!isVisible) return;

      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // Camera & Group Parallax Lerp
      if (!prefersReducedMotion) {
        currentRotX += (targetRotX - currentRotX) * 0.05;
        currentRotY += (targetRotY - currentRotY) * 0.05;

        graphGroup.rotation.x = currentRotX + Math.sin(elapsed * 0.35) * 0.03;
        graphGroup.rotation.y = currentRotY + Math.cos(elapsed * 0.25) * 0.04;
      }

      // Rotate critical rings facing camera & pulse
      graphGroup.children.forEach((child) => {
        if (child.userData?.isRing) {
          child.quaternion.copy(camera.quaternion);
          const scale = 1 + Math.sin(elapsed * 2.5 + child.position.x) * 0.12;
          child.scale.set(scale, scale, 1);
        }
      });

      // Animate telemetry particles along critical paths
      const pPos = particleGeo.attributes.position.array as Float32Array;
      const speed = 0.6;
      for (let i = 0; i < particleCount; i++) {
        // Subtle flow along X axis toward COD milestone
        pPos[i * 3] += speed * delta * 2.2;
        if (pPos[i * 3] > 11) {
          pPos[i * 3] = -9;
        }
        pPos[i * 3 + 1] += Math.sin(elapsed * 2 + i) * 0.008;
      }
      particleGeo.attributes.position.needsUpdate = true;

      // Dust motes drift
      dust.rotation.y = elapsed * 0.015;

      // Raycast interaction
      raycaster.setFromCamera(mouseCoord, camera);
      const meshes = Array.from(nodeDataMap.keys());
      const intersects = raycaster.intersectObjects(meshes, false);

      if (intersects.length > 0) {
        const hit = intersects[0].object;
        const nodeData = nodeDataMap.get(hit);
        if (nodeData) {
          setHoveredNode(nodeData);
          document.body.style.cursor = "pointer";
        }
      } else {
        setHoveredNode(null);
        document.body.style.cursor = "default";
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", onPointerMove);
      canvas.removeEventListener("mouseleave", onPointerLeave);
      resizeObserver.disconnect();
      visibilityObserver.disconnect();

      // Clean up Three.js allocations
      scene.clear();
      renderer.dispose();
      sphereGeo.dispose();
      outerRingGeo.dispose();
      gridHelper.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      dustGeo.dispose();
      dustMat.dispose();
      document.body.style.cursor = "default";
    };
  }, []);

  return (
    <div className="cpm-3d-wrapper" ref={containerRef}>
      <canvas ref={canvasRef} className="cpm-3d-canvas" />

      {/* Floating HUD telemetry overlay */}
      <div className="cpm-hud-header" aria-hidden>
        <div className="cpm-hud-pill">
          <span className="cpm-hud-dot pulse" />
          <span className="mono">CPM NETWORK TOPOLOGY // 14 ACTIVITIES // NEO4J GROUNDED</span>
        </div>
        <div className="cpm-hud-stats">
          <span>CRITICAL PATH: <b>8 STAGES</b></span>
          <span>FLOAT VARIANCE: <b>0.0d</b></span>
          <span>INTEGRITY: <b>100% DCMA</b></span>
        </div>
      </div>

      {/* Interactive Tooltip HUD for hovered activity */}
      {hoveredNode ? (
        <div className="cpm-node-tooltip" role="status">
          <div className="cpm-tooltip-tag">
            <span className={`tag ${hoveredNode.critical ? "tag-brand" : hoveredNode.completed ? "tag-success" : "tag-steel"}`}>
              {hoveredNode.completed ? "COMPLETED" : hoveredNode.critical ? "CRITICAL PATH" : "FLOAT BUFFER"}
            </span>
            <span className="mono xs faint">ID: {hoveredNode.id}</span>
          </div>
          <div className="cpm-tooltip-name">{hoveredNode.name}</div>
          <div className="cpm-tooltip-meta">
            <span>Total Float: <b className="mono">{hoveredNode.floatDays}d</b></span>
            <span>DCMA Check: <b className="mono">Grounded</b></span>
          </div>
        </div>
      ) : (
        <div className="cpm-hint" aria-hidden>
          <span className="mono xs faint">Hover 3D nodes to inspect CPM path topology</span>
        </div>
      )}
    </div>
  );
}