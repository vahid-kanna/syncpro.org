import { useEffect, useRef } from "react";

export function InteractiveShaderCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let animId: number;

    function syncSize() {
      if (!canvas) return;
      const w = canvas.clientWidth || 1280;
      const h = canvas.clientHeight || 720;
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
    }

    const resizeObserver = typeof ResizeObserver !== "undefined"
      ? new ResizeObserver(syncSize)
      : null;

    if (resizeObserver) {
      resizeObserver.observe(canvas);
    }
    syncSize();

    const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl") as WebGLRenderingContext | null;
    if (!gl) return;

    const vs = `
      attribute vec2 a_position;
      varying vec2 v_texCoord;
      void main() {
        v_texCoord = a_position * 0.5 + 0.5;
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;

    const fs = `
      precision highp float;
      uniform float u_time;
      uniform vec2 u_resolution;
      uniform vec2 u_mouse;
      varying vec2 v_texCoord;

      void main() {
        vec2 uv = v_texCoord;
        vec2 mouse = u_mouse / u_resolution;
        
        // Fluid obsidian wave flow
        float flow = sin(uv.x * 2.2 + u_time * 0.35) * 0.08;
        float flow2 = cos(uv.y * 1.8 - u_time * 0.25) * 0.1;
        
        // SyncPro Dark Industrial Palette
        vec3 color_base = vec3(0.047, 0.055, 0.067);    // #0C0E11
        vec3 color_surface = vec3(0.078, 0.094, 0.114); // #14181D
        vec3 accent_amber = vec3(0.941, 0.659, 0.227);  // #F0A83A (Site Amber)
        vec3 accent_steel = vec3(0.345, 0.588, 0.878);  // #5896E0 (Steel Blue)
        
        // Dynamic noise pulse
        float noise = sin(uv.x * 7.0 + flow * 3.5) * cos(uv.y * 7.0 + flow2 * 3.5);
        vec3 finalColor = mix(color_base, color_surface, uv.y + flow);
        
        // Ambient site-amber & steel pulse
        finalColor += accent_amber * (max(0.0, noise) * 0.04);
        finalColor += accent_steel * (max(0.0, -noise) * 0.03);
        
        // Interactive mouse proximity glow
        float dist = distance(uv, mouse);
        float glow = 1.0 - smoothstep(0.0, 0.45, dist);
        finalColor += accent_amber * glow * 0.06;

        gl_FragColor = vec4(finalColor, 1.0);
      }
    `;

    function createShader(type: number, src: string) {
      if (!gl) return null;
      const s = gl.createShader(type);
      if (!s) return null;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    }

    const vShader = createShader(gl.VERTEX_SHADER, vs);
    const fShader = createShader(gl.FRAGMENT_SHADER, fs);
    if (!vShader || !fShader) return;

    const prog = gl.createProgram();
    if (!prog) return;
    gl.attachShader(prog, vShader);
    gl.attachShader(prog, fShader);
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW,
    );

    const pos = gl.getAttribLocation(prog, "a_position");
    gl.enableVertexAttribArray(pos);
    gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);

    const uTime = gl.getUniformLocation(prog, "u_time");
    const uRes = gl.getUniformLocation(prog, "u_resolution");
    const uMouse = gl.getUniformLocation(prog, "u_mouse");

    const mouse = { x: canvas.width / 2, y: canvas.height / 2 };

    const onMouseMove = (e: MouseEvent) => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      if (rect.width && rect.height) {
        const nx = (e.clientX - rect.left) / rect.width;
        const ny = 1.0 - (e.clientY - rect.top) / rect.height;
        mouse.x = nx * canvas.width;
        mouse.y = ny * canvas.height;
      }
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });

    function render(t: number) {
      if (!gl || !canvas) return;
      gl.viewport(0, 0, canvas.width, canvas.height);
      if (uTime) gl.uniform1f(uTime, t * 0.001);
      if (uRes) gl.uniform2f(uRes, canvas.width, canvas.height);
      if (uMouse) gl.uniform2f(uMouse, mouse.x, mouse.y);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      animId = requestAnimationFrame(render);
    }

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", onMouseMove);
      if (resizeObserver) resizeObserver.disconnect();
    };
  }, []);

  return (
    <div
      className="interactive-shader-bg"
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 0,
        opacity: 0.55,
        mixBlendMode: "screen",
        pointerEvents: "none",
      }}
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        style={{
          display: "block",
          width: "100%",
          height: "100%",
        }}
      />
    </div>
  );
}
