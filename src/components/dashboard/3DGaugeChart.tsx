'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { Settings, AlertTriangle } from 'lucide-react';

interface GaugeChartProps {
  value: number;
  maxValue?: number;
  title?: string;
  subtitle?: string;
}

export default function GaugeChart({ 
  value, 
  maxValue = 100,
  title = 'Generator Load',
  subtitle = 'Current system load'
}: Readonly<GaugeChartProps>) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const gaugeRef = useRef<THREE.Mesh | null>(null);
  const needleRef = useRef<THREE.Mesh | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    
    // Setup
    const width = container.clientWidth;
    const height = 200;

    // Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.z = 5;
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Gauge Background
    const gaugeGeometry = new THREE.RingGeometry(1.5, 2, 64, 1, 0, Math.PI);
    const gaugeMaterial = new THREE.MeshBasicMaterial({
      color: 0xEEEEEE,
      side: THREE.DoubleSide,
    });
    const gauge = new THREE.Mesh(gaugeGeometry, gaugeMaterial);
    scene.add(gauge);
    gaugeRef.current = gauge;

    // Needle
    const needleGeometry = new THREE.BufferGeometry();
    const vertices = new Float32Array([
      0, 0, 0,
      -0.05, 0, 0,
      0, 1.8, 0,
    ]);
    needleGeometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
    const needleMaterial = new THREE.MeshBasicMaterial({ color: 0xFF4444 });
    const needle = new THREE.Mesh(needleGeometry, needleMaterial);
    scene.add(needle);
    needleRef.current = needle;

    // Markers
    for (let i = 0; i <= 10; i++) {
      const angle = (Math.PI / 10) * i;
      const markerGeometry = new THREE.BoxGeometry(0.1, 0.3, 0.1);
      const markerMaterial = new THREE.MeshBasicMaterial({ color: 0x666666 });
      const marker = new THREE.Mesh(markerGeometry, markerMaterial);
      
      marker.position.x = -2 * Math.cos(angle);
      marker.position.y = 2 * Math.sin(angle);
      marker.rotation.z = angle - Math.PI / 2;
      
      scene.add(marker);
    }

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    // Cleanup
    return () => {
      if (container && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  // Update needle position based on value
  useEffect(() => {
    if (!needleRef.current) return;

    const normalizedValue = Math.min(Math.max(value, 0), maxValue);
    const angle = (normalizedValue / maxValue) * Math.PI;
    needleRef.current.rotation.z = -angle;
  }, [value, maxValue]);

  const getStatusColor = () => {
    if (value >= 90) return 'text-red-500';
    if (value >= 75) return 'text-yellow-500';
    return 'text-green-500';
  };

  const getProgressBarColor = () => {
    if (value >= 90) return 'bg-red-500';
    if (value >= 75) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Settings className="w-5 h-5 text-blue-600" />
          <h3 className="text-base font-semibold text-gray-700">{title}</h3>
        </div>
        {value >= 75 && (
          <AlertTriangle className={`w-5 h-5 ${getStatusColor()}`} />
        )}
      </div>

      <div className="text-sm text-gray-500 mb-4">{subtitle}</div>

      <div ref={containerRef} className="w-full h-[200px]" />

      <div className="mt-4 flex justify-between items-center">
        <div className="text-sm text-gray-500">System Load</div>
        <div className={`text-2xl font-bold ${getStatusColor()}`}>
          {Math.round(value)}%
        </div>
      </div>

      <div className="mt-4 w-full bg-gray-100 rounded-full h-1.5">
        <div 
          className={`h-full rounded-full transition-all duration-500 ${getProgressBarColor()}`}
          style={{ width: `${Math.min(100, value)}%` }}
        />
      </div>
    </div>
  );
}
