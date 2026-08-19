import { useEffect, useRef } from "react";
import * as THREE from "three";

export function ThreeBuildingCanvas() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0a0b0e, 0.035);

    // Camera setup
    const width = container.clientWidth || 800;
    const height = container.clientHeight || 600;
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(12, 14, 18);
    camera.lookAt(0, 4, 0);

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // Color tokens (Strict Non-AI Palette: Vermilion, Brass, Titanium, Deep Slate)
    const vermilion = new THREE.Color(0xff4500); // #FF4500 (Signal Vermilion)
    const brass = new THREE.Color(0xd49b4b);     // #D49B4B (Architectural Brass)
    const titanium = new THREE.Color(0x3a4250);  // #3A4250 (Structure Steel)
    const faintGrid = new THREE.Color(0x181c24);  // #181C24 (Sub-grid)

    // Master Structure Group
    const structureGroup = new THREE.Group();
    scene.add(structureGroup);

    // 1. Procedural Building Floors & Columns
    const floorCount = 12;
    const floorWidth = 7;
    const floorDepth = 7;
    const floorHeight = 0.9;

    const columnMat = new THREE.LineBasicMaterial({ color: titanium, transparent: true, opacity: 0.65 });
    const floorMat = new THREE.LineBasicMaterial({ color: titanium, transparent: true, opacity: 0.45 });
    const activeFloorMat = new THREE.LineBasicMaterial({ color: vermilion, transparent: true, opacity: 0.9 });
    const coreMat = new THREE.LineBasicMaterial({ color: brass, transparent: true, opacity: 0.75 });

    // Floors (Wireframe boxes)
    for (let i = 0; i < floorCount; i++) {
      const y = i * floorHeight;
      const scale = 1 - (i * 0.025); // tapered skyscraper
      const w = floorWidth * scale;
      const d = floorDepth * scale;

      const floorGeo = new THREE.EdgesGeometry(new THREE.BoxGeometry(w, 0.08, d));
      const isCritical = i === 8 || i === 9; // Live active pour levels
      const floorMesh = new THREE.LineSegments(floorGeo, isCritical ? activeFloorMat : floorMat);
      floorMesh.position.set(0, y, 0);
      structureGroup.add(floorMesh);

      // Core walls in center
      const coreGeo = new THREE.EdgesGeometry(new THREE.BoxGeometry(w * 0.35, floorHeight, d * 0.35));
      const coreMesh = new THREE.LineSegments(coreGeo, coreMat);
      coreMesh.position.set(0, y + floorHeight / 2, 0);
      structureGroup.add(coreMesh);
    }

    // 2. Corner Structural Columns
    const colGeo = new THREE.BufferGeometry();
    const colPositions: number[] = [];
    const h = floorCount * floorHeight;
    const halfW = floorWidth / 2;
    const halfD = floorDepth / 2;

    const corners = [
      [-halfW, -halfD],
      [halfW, -halfD],
      [halfW, halfD],
      [-halfW, halfD],
    ];

    corners.forEach(([cx, cz]) => {
      colPositions.push(cx, 0, cz, cx * 0.75, h, cz * 0.75);
    });

    colGeo.setAttribute("position", new THREE.Float32BufferAttribute(colPositions, 3));
    const columns = new THREE.LineSegments(colGeo, columnMat);
    structureGroup.add(columns);

    // 3. Construction Tower Crane on Top
    const craneGroup = new THREE.Group();
    craneGroup.position.set(0, h, 0);

    // Crane Mast
    const mastGeo = new THREE.EdgesGeometry(new THREE.BoxGeometry(0.6, 4.5, 0.6));
    const mast = new THREE.LineSegments(mastGeo, new THREE.LineBasicMaterial({ color: brass }));
    mast.position.y = 2.25;
    craneGroup.add(mast);

    // Crane Jib (Boom)
    const jibGroup = new THREE.Group();
    jibGroup.position.y = 4.2;

    const jibGeo = new THREE.EdgesGeometry(new THREE.BoxGeometry(8, 0.35, 0.35));
    const jib = new THREE.LineSegments(jibGeo, new THREE.LineBasicMaterial({ color: vermilion }));
    jib.position.x = 2.5; // forward reach
    jibGroup.add(jib);

    // Crane Counter-Jib
    const counterJibGeo = new THREE.EdgesGeometry(new THREE.BoxGeometry(2.5, 0.35, 0.35));
    const counterJib = new THREE.LineSegments(counterJibGeo, new THREE.LineBasicMaterial({ color: brass }));
    counterJib.position.x = -1.25;
    jibGroup.add(counterJib);

    // Crane Cable & Hook
    const cableGeo = new THREE.BufferGeometry();
    cableGeo.setAttribute("position", new THREE.Float32BufferAttribute([4.5, 0, 0, 4.5, -3.2, 0], 3));
    const cable = new THREE.Line(cableGeo, new THREE.LineBasicMaterial({ color: vermilion }));
    jibGroup.add(cable);

    craneGroup.add(jibGroup);
    structureGroup.add(craneGroup);

    // 4. Ground Foundation Grid
    const gridHelper = new THREE.GridHelper(32, 32, faintGrid, faintGrid);
    gridHelper.position.y = -0.05;
    scene.add(gridHelper);

    // 5. Floating CPM Critical Path Nodes (Particles)
    const nodeCount = 36;
    const nodeGeo = new THREE.BufferGeometry();
    const nodePos = new Float32Array(nodeCount * 3);
    const nodeColors = new Float32Array(nodeCount * 3);

    for (let i = 0; i < nodeCount; i++) {
      const angle = (i / nodeCount) * Math.PI * 4;
      const radius = 3.5 + Math.sin(i * 0.5) * 1.5;
      const ny = (i / nodeCount) * (h + 2);
      nodePos[i * 3] = Math.cos(angle) * radius;
      nodePos[i * 3 + 1] = ny;
      nodePos[i * 3 + 2] = Math.sin(angle) * radius;

      // Color selection (Vermilion or Brass)
      const isVerm = i % 3 === 0;
      nodeColors[i * 3] = isVerm ? 1.0 : 0.83;
      nodeColors[i * 3 + 1] = isVerm ? 0.27 : 0.61;
      nodeColors[i * 3 + 2] = isVerm ? 0.0 : 0.29;
    }

    nodeGeo.setAttribute("position", new THREE.BufferAttribute(nodePos, 3));
    nodeGeo.setAttribute("color", new THREE.BufferAttribute(nodeColors, 3));

    const nodeMat = new THREE.PointsMaterial({
      size: 0.22,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
    });
    const cpmNodes = new THREE.Points(nodeGeo, nodeMat);
    structureGroup.add(cpmNodes);

    // Mouse Interaction
    let targetRotationY = 0;
    let targetRotationX = 0;

    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      targetRotationY = x * 0.8;
      targetRotationX = y * 0.3;
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });

    // Resize Handler
    const onResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", onResize);

    // Animation Loop
    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Smooth continuous building rotation + mouse parallax
      structureGroup.rotation.y += (targetRotationY + elapsed * 0.08 - structureGroup.rotation.y) * 0.04;
      structureGroup.rotation.x += (targetRotationX - structureGroup.rotation.x) * 0.04;

      // Rotate crane jib realistically
      jibGroup.rotation.y = Math.sin(elapsed * 0.45) * 0.65;

      // Pulse active critical path nodes
      nodeMat.size = 0.22 + Math.sin(elapsed * 3.0) * 0.05;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="three-building-canvas"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none",
        opacity: 0.85,
      }}
      aria-hidden="true"
    />
  );
}
