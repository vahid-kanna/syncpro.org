import { useEffect, useRef } from "react";
import * as THREE from "three";

export function Construction3DCanvas() {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const width = container.clientWidth || 800;
    const height = container.clientHeight || 600;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(28, 22, 34);
    camera.lookAt(0, 8, 0);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Group for entire building
    const buildingGroup = new THREE.Group();
    scene.add(buildingGroup);

    // 1. Foundation Grid
    const gridHelper = new THREE.GridHelper(40, 20, 0x3b82f6, 0x1e293b);
    gridHelper.position.y = 0;
    buildingGroup.add(gridHelper);

    // 2. Procedural Tower Structure (Columns, Slabs, Core Wall)
    const floorCount = 14;
    const floorHeight = 1.4;
    const slabWidth = 12;
    const slabDepth = 9;

    const edgeMaterial = new THREE.LineBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.55,
    });

    const activeEdgeMaterial = new THREE.LineBasicMaterial({
      color: 0xf59e0b, // Warm Ochre Amber
      transparent: true,
      opacity: 0.9,
    });

    const solidMaterial = new THREE.MeshBasicMaterial({
      color: 0x0f172a,
      transparent: true,
      opacity: 0.4,
    });

    const cpmNodeGeometry = new THREE.SphereGeometry(0.22, 12, 12);
    const cpmNodeMaterial = new THREE.MeshBasicMaterial({ color: 0xf59e0b });
    const cpmNodes: THREE.Mesh[] = [];

    for (let i = 0; i < floorCount; i++) {
      const currentY = (i + 1) * floorHeight;
      const currentWidth = slabWidth * (1 - i * 0.025);
      const currentDepth = slabDepth * (1 - i * 0.025);

      // Floor Slab
      const slabGeo = new THREE.BoxGeometry(currentWidth, 0.15, currentDepth);
      const slabMesh = new THREE.Mesh(slabGeo, solidMaterial);
      slabMesh.position.set(0, currentY, 0);

      const slabEdges = new THREE.EdgesGeometry(slabGeo);
      const isTopActive = i >= floorCount - 3;
      const slabLine = new THREE.LineSegments(
        slabEdges,
        isTopActive ? activeEdgeMaterial : edgeMaterial
      );
      slabLine.position.set(0, currentY, 0);

      buildingGroup.add(slabMesh);
      buildingGroup.add(slabLine);

      // Core Wall / Elevator Shaft
      const coreGeo = new THREE.BoxGeometry(3.5, floorHeight, 3.5);
      const coreEdges = new THREE.EdgesGeometry(coreGeo);
      const coreLine = new THREE.LineSegments(coreEdges, edgeMaterial);
      coreLine.position.set(0, currentY - floorHeight / 2, 0);
      buildingGroup.add(coreLine);

      // Corner Columns
      const colHeight = floorHeight;
      const colOffsets = [
        [-currentWidth / 2 + 0.3, -currentDepth / 2 + 0.3],
        [currentWidth / 2 - 0.3, -currentDepth / 2 + 0.3],
        [-currentWidth / 2 + 0.3, currentDepth / 2 - 0.3],
        [currentWidth / 2 - 0.3, currentDepth / 2 - 0.3],
      ];

      colOffsets.forEach(([cx, cz]) => {
        const colGeo = new THREE.CylinderGeometry(0.08, 0.08, colHeight, 6);
        const colMesh = new THREE.Mesh(colGeo, edgeMaterial);
        colMesh.position.set(cx, currentY - colHeight / 2, cz);
        buildingGroup.add(colMesh);
      });

      // CPM Activity Pulse Nodes
      if (i % 2 === 0) {
        const node = new THREE.Mesh(cpmNodeGeometry, cpmNodeMaterial);
        node.position.set(
          (Math.sin(i * 1.5) * currentWidth) / 2.5,
          currentY + 0.2,
          (Math.cos(i * 1.5) * currentDepth) / 2.5
        );
        buildingGroup.add(node);
        cpmNodes.push(node);
      }
    }

    // 3. Construction Tower Crane on Top
    const craneGroup = new THREE.Group();
    const craneMastGeo = new THREE.BoxGeometry(0.8, 6, 0.8);
    const craneMastEdges = new THREE.EdgesGeometry(craneMastGeo);
    const craneMast = new THREE.LineSegments(craneMastEdges, activeEdgeMaterial);
    craneMast.position.set(2, floorCount * floorHeight + 3, 0);
    craneGroup.add(craneMast);

    // Crane Jib (Horizontal Arm)
    const craneJibGeo = new THREE.BoxGeometry(10, 0.4, 0.4);
    const craneJibEdges = new THREE.EdgesGeometry(craneJibGeo);
    const craneJib = new THREE.LineSegments(craneJibEdges, activeEdgeMaterial);
    craneJib.position.set(4, floorCount * floorHeight + 6, 0);
    craneGroup.add(craneJib);

    buildingGroup.add(craneGroup);

    // CPM Network Line connecting nodes
    const cpmPoints = cpmNodes.map((n) => n.position);
    const cpmCurve = new THREE.CatmullRomCurve3(cpmPoints);
    const cpmGeo = new THREE.BufferGeometry().setFromPoints(cpmCurve.getPoints(50));
    const cpmLineMaterial = new THREE.LineBasicMaterial({
      color: 0xf59e0b,
      linewidth: 2,
    });
    const cpmTrack = new THREE.Line(cpmGeo, cpmLineMaterial);
    buildingGroup.add(cpmTrack);

    // Animation & Mouse Parallax
    let targetRotationY = 0;
    let targetRotationX = 0;
    let animId: number;

    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetRotationY = x * 0.45;
      targetRotationX = y * 0.25;
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });

    const onResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    const resizeObserver = new ResizeObserver(onResize);
    resizeObserver.observe(container);

    let clock = 0;
    function animate() {
      clock += 0.015;

      // Slow steady rotation + mouse influence
      buildingGroup.rotation.y += 0.003;
      buildingGroup.rotation.y += (targetRotationY - buildingGroup.rotation.y * 0.1) * 0.02;
      buildingGroup.rotation.x += (targetRotationX - buildingGroup.rotation.x) * 0.02;

      // Crane Jib rotation
      craneJib.rotation.y = Math.sin(clock * 0.5) * 0.8;

      // CPM nodes pulse
      cpmNodes.forEach((node, idx) => {
        const s = 1 + Math.sin(clock * 3 + idx) * 0.25;
        node.scale.set(s, s, s);
      });

      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", onMouseMove);
      resizeObserver.disconnect();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 0,
        opacity: 0.85,
        pointerEvents: "none",
        overflow: "hidden",
      }}
      aria-hidden="true"
    />
  );
}
