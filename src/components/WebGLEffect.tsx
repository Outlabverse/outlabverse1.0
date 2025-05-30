'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import gsap from 'gsap';

// Simplified vertex shader
const vertexShader = `
  varying vec2 vUv;
  
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

// Simplified fragment shader with less complexity
const fragmentShader = `
  uniform float time;
  uniform vec3 color1;
  uniform vec3 color2;
  uniform vec3 color3;
  
  varying vec2 vUv;
  
  // Simple noise function
  float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
  }
  
  void main() {
    vec2 st = vUv;
    
    // Create simple gradient
    float n = sin(st.x * 3.0 + time * 0.2) * 0.5 + 0.5;
    n += sin(st.y * 2.0 + time * 0.1) * 0.2;
    
    // Mix between colors based on noise
    vec3 color = mix(color1, color2, n);
    color = mix(color, color3, pow(n, 2.0));
    
    // Simple vignette
    float vignette = 1.0 - length(st - 0.5) * 1.5;
    vignette = smoothstep(0.0, 1.0, vignette);
    color *= vignette;
    
    gl_FragColor = vec4(color, 1.0);
  }
`;

const WebGLEffect = () => {
  const canvasRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!canvasRef.current) return;
    
    // Store a reference to the DOM element for cleanup
    const canvasContainer = canvasRef.current;
    
    // Set up scene
    const scene = new THREE.Scene();
    
    // Set up camera
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;
    
    // Set up renderer with lower resolution
    const renderer = new THREE.WebGLRenderer({ 
      antialias: false, // Disable antialiasing for performance
      alpha: true 
    });
    
    // Reduce resolution for better performance
    const pixelRatio = Math.min(window.devicePixelRatio, 1.5);
    const width = window.innerWidth;
    const height = window.innerHeight;
    
    renderer.setSize(width, height);
    renderer.setPixelRatio(pixelRatio);
    canvasRef.current.appendChild(renderer.domElement);
    
    // Create geometry - using a simple plane for shader effects
    const geometry = new THREE.PlaneGeometry(10, 10, 16, 16); // Reduced segments
    
    // Create shader material
    const uniforms = {
      time: { value: 0 },
      color1: { value: new THREE.Color(0x1a1a2e) },
      color2: { value: new THREE.Color(0x4a306d) },
      color3: { value: new THREE.Color(0x6d28d9) },
    };
    
    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader,
      fragmentShader,
      side: THREE.DoubleSide,
    });
    
    // Create mesh
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    
    // Post-processing with lower quality
    const composer = new EffectComposer(renderer);
    const renderPass = new RenderPass(scene, camera);
    composer.addPass(renderPass);
    
    // Add bloom effect with reduced quality
    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(width, height),
      0.5,  // reduced strength
      0.2,  // reduced radius
      0.3   // increased threshold for less bloom
    );
    composer.addPass(bloomPass);
    
    // Resize handler - more efficient
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      composer.setSize(width, height);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Mouse interaction with less frequent updates
    const mouse = new THREE.Vector2();
    let mouseUpdatePending = false;
    
    const handleMouseMove = (event: MouseEvent) => {
      if (mouseUpdatePending) return;
      
      mouseUpdatePending = true;
      requestAnimationFrame(() => {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        
        // Rotate the mesh slightly based on mouse position
        gsap.to(mesh.rotation, {
          x: mouse.y * 0.03, // reduced effect
          y: mouse.x * 0.03, // reduced effect
          duration: 1,
          ease: 'power2.out',
        });
        
        mouseUpdatePending = false;
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    // Animation loop with throttling
    const clock = new THREE.Clock();
    let lastRender = 0;
    const fps = 30; // Target 30fps instead of 60+
    const fpsInterval = 1000 / fps;
    
    const animate = () => {
      const now = performance.now();
      const elapsed = now - lastRender;
      
      if (elapsed > fpsInterval) {
        lastRender = now - (elapsed % fpsInterval);
        
        const elapsedTime = clock.getElapsedTime();
        uniforms.time.value = elapsedTime;
        
        composer.render();
      }
      
      requestAnimationFrame(animate);
    };
    
    animate();
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      if (canvasContainer) {
        canvasContainer.innerHTML = '';
      }
    };
  }, []);
  
  return <div ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10" />;
};

export default WebGLEffect; 