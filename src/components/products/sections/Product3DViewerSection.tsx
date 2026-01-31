"use client";

import { Suspense, useRef, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { PresentationControls, Stage, useGLTF } from "@react-three/drei";
import type { Group } from "three";

// Type for Sanity file asset
interface SanityFileAsset {
  _id?: string;
  _ref?: string;
  url?: string;
  originalFilename?: string;
  extension?: string;
}

interface SanityFileRef {
  asset?: SanityFileAsset;
  _type?: string;
}

// ✅ Updated helper function to get file URL
function getSanityFileUrl(fileRef: SanityFileRef | null | undefined): string {
  console.log('File reference received:', fileRef); // Debug log
  
  // First check if we have a direct URL from the query
  if (fileRef?.asset?.url) {
    console.log('Using direct URL:', fileRef.asset.url);
    return fileRef.asset.url;
  }
  
  // Fallback: construct URL from _ref
  if (fileRef?.asset?._ref) {
    const ref = fileRef.asset._ref;
    const [, id, extension] = ref.split('-');
    const url = `https://cdn.sanity.io/files/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/${process.env.NEXT_PUBLIC_SANITY_DATASET}/${id}.${extension}`;
    console.log('Constructed URL from ref:', url);
    return url;
  }
  
  console.warn('No valid file reference found');
  return '';
}

// 3D Model Component
function Model({ 
  modelPath, 
  scale = 1, 
  autoRotate = true 
}: { 
  modelPath: string; 
  scale?: number; 
  autoRotate?: boolean;
}) {
  const { scene } = useGLTF(modelPath);
  const meshRef = useRef<Group>(null);

  useFrame(() => {
    if (meshRef.current && autoRotate) {
      meshRef.current.rotation.y += 0.003;
    }
  });

  return <primitive ref={meshRef} object={scene} scale={scale} position={[0, 0, 0]} />;
}

function LoadingFallback() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#3b82f6" wireframe />
    </mesh>
  );
}

// Main Component
interface Product3DViewerSectionProps {
  data: {
    title?: string;
    description?: string;
    modelFile?: SanityFileRef;
    modelScale?: number;
    autoRotate?: boolean;
    backgroundColor?: string;
  };
}

export default function Product3DViewerSection({ data }: Product3DViewerSectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Debug: Log the incoming data
  console.log('3D Viewer Section Data:', data);

  const modelUrl = getSanityFileUrl(data.modelFile);
  const {
    title = "360° Product View",
    description = "Rotate, zoom, and explore the product in 3D",
    modelScale = 1,
    autoRotate = true,
    backgroundColor = "#f8fafc",
  } = data;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Debug output
  if (!modelUrl) {
    console.error('No model URL generated. Data received:', {
      modelFile: data.modelFile,
      hasAsset: !!data.modelFile?.asset,
      assetUrl: data.modelFile?.asset?.url,
      assetRef: data.modelFile?.asset?._ref,
    });
    
    return (
      <section className="viewer-3d-section" ref={sectionRef}>
        <div className="section-header">
          <p className="error-message">⚠️ No 3D model uploaded</p>
          <p style={{ fontSize: '0.875rem', color: '#6b7280', marginTop: '8px' }}>
            Debug: Check console for details
          </p>
        </div>
        <style jsx>{`
          .viewer-3d-section {
            background: #ffffff;
            padding: 100px 24px;
          }
          .section-header {
            text-align: center;
          }
          .error-message {
            font-size: 1.125rem;
            color: #ef4444;
            font-weight: 500;
          }
        `}</style>
      </section>
    );
  }

  console.log('Rendering 3D model with URL:', modelUrl);

  return (
    <section className="viewer-3d-section" ref={sectionRef}>
      <div className="section-header">
        <h2 className="section-title">{title}</h2>
        {description && <p className="section-description">{description}</p>}
      </div>

      <div 
        className={`canvas-container ${isVisible ? "visible" : ""}`}
        style={{ 
          background: backgroundColor.startsWith('gradient') 
            ? 'linear-gradient(135deg, #3b82f6 0%, #1e40af 100%)' 
            : backgroundColor 
        }}
      >
        <Canvas
          camera={{ position: [0, 0, 5], fov: 50 }}
          gl={{ antialias: true, alpha: true }}
        >
          <Suspense fallback={<LoadingFallback />}>
            <ambientLight intensity={0.5} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
            <pointLight position={[-10, -10, -10]} intensity={0.5} />

            <PresentationControls
              speed={1.5}
              global
              zoom={0.8}
              polar={[-Math.PI / 4, Math.PI / 4]}
            >
              <Stage environment="city" intensity={0.6}>
                <Model 
                  modelPath={modelUrl} 
                  scale={modelScale}
                  autoRotate={autoRotate}
                />
              </Stage>
            </PresentationControls>
          </Suspense>
        </Canvas>

        <div className="controls-hint">
          <p>🖱️ Drag to rotate</p>
        </div>
      </div>

      <style jsx>{`
        .viewer-3d-section {
          background: #ffffff;
          padding: 100px 24px 120px;
          position: relative;
          overflow: hidden;
        }

        .section-header {
          max-width: 900px;
          margin: 0 auto 60px;
          text-align: center;
        }

        .section-title {
          font-size: 3rem;
          font-weight: 800;
          color: #0f172a;
          margin: 0 0 20px 0;
          line-height: 1.2;
          letter-spacing: -0.02em;
        }

        .section-description {
          font-size: 1.1875rem;
          color: #475569;
          line-height: 1.7;
          margin: 0;
          font-weight: 400;
        }

        .canvas-container {
          position: relative;
          width: 100%;
          max-width: 1200px;
          height: 600px;
          margin: 0 auto;
          border-radius: 24px;
          box-shadow:
            0 2px 8px rgba(0, 0, 0, 0.04),
            0 12px 40px rgba(0, 0, 0, 0.08),
            0 0 0 1px rgba(0, 0, 0, 0.02);
          overflow: hidden;
          opacity: 0;
          transform: scale(0.95) translateY(20px);
          transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .canvas-container.visible {
          opacity: 1;
          transform: scale(1) translateY(0);
        }

        .canvas-container:hover {
          box-shadow:
            0 4px 12px rgba(0, 0, 0, 0.06),
            0 24px 60px rgba(37, 99, 235, 0.12),
            0 0 0 1px rgba(59, 130, 246, 0.08);
        }

        .controls-hint {
          position: absolute;
          bottom: 24px;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(15, 23, 42, 0.85);
          backdrop-filter: blur(10px);
          color: #f1f5f9;
          padding: 12px 24px;
          border-radius: 999px;
          font-size: 0.875rem;
          font-weight: 500;
          z-index: 10;
          pointer-events: none;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25);
        }

        .controls-hint p {
          margin: 0;
        }

        @media (max-width: 1024px) {
          .canvas-container {
            height: 500px;
          }
          .section-title {
            font-size: 2.5rem;
          }
        }

        @media (max-width: 768px) {
          .viewer-3d-section {
            padding: 80px 20px 100px;
          }
          .canvas-container {
            height: 400px;
            border-radius: 20px;
          }
          .section-title {
            font-size: 2.125rem;
          }
          .section-description {
            font-size: 1rem;
          }
          .controls-hint {
            font-size: 0.8125rem;
            padding: 10px 20px;
            bottom: 20px;
          }
        }

        @media (max-width: 480px) {
          .viewer-3d-section {
            padding: 60px 16px 80px;
          }
          .canvas-container {
            height: 320px;
            border-radius: 16px;
          }
          .section-title {
            font-size: 1.875rem;
          }
          .section-description {
            font-size: 0.9375rem;
          }
        }
      `}</style>
    </section>
  );
}
