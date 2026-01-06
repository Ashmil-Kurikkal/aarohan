import { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import { Sphere, Torus, Cylinder, Icosahedron } from "@react-three/drei"
import * as THREE from "three"

// Helper to create glowing light rays
const Beam = ({ color, rotation, scale }) => {
  return (
    <group rotation={rotation}>
      {/* args: [topRadius, bottomRadius, height, segments] 
        0.02 to 0.4 creates a "Cone" shape (light spreading out)
      */}
      <Cylinder args={[0.02, 0.4, 6, 16]} position={[0, 3, 0]} rotation={[0,0,0]}>
         <meshBasicMaterial 
            color={color} 
            transparent 
            opacity={0.15} // Low opacity because AdditiveBlending adds up
            blending={THREE.AdditiveBlending} // CRITICAL: Makes it look like light
            depthWrite={false} // Prevents glitchy overlapping
            side={THREE.DoubleSide}
         />
      </Cylinder>
    </group>
  )
}

export default function FestivalTotem() {
  const groupRef = useRef()
  const ringsRef = useRef()
  const coreRef = useRef()

  // Generate beams
  const beams = useMemo(() => {
    return new Array(16).fill(0).map((_, i) => {
      const x = Math.random() * Math.PI * 2
      const y = Math.random() * Math.PI * 2
      const z = Math.random() * Math.PI * 2
      // Using Gold and pure White for intense core brightness
      const colors = ["#fbbf24", "#d97706", "#ffffff", "#f59e0b"] 
      return {
        rotation: [x, y, z],
        color: colors[Math.floor(Math.random() * colors.length)],
        scale: 0.5 + Math.random() * 0.5
      }
    })
  }, [])

  useFrame((state, delta) => {
    if (!groupRef.current) return

    const t = state.clock.getElapsedTime()
    
    // Float
    groupRef.current.position.y = Math.sin(t * 0.5) * 0.1

    // Slow rotation of the core and beams
    coreRef.current.rotation.y -= delta * 0.05
    coreRef.current.rotation.z += delta * 0.02

    // Ring rotation
    if (ringsRef.current) {
        ringsRef.current.rotation.x = Math.sin(t * 0.2) * 0.2
        ringsRef.current.rotation.y = t * 0.1
    }

    // Mouse Interaction
    const mouseX = state.pointer.x
    const mouseY = state.pointer.y
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, mouseX * 0.2, 0.05)
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -mouseY * 0.2, 0.05)
  })

  // Material for the Golden Rings
  const goldMaterialProps = {
    color: "#d97706", 
    metalness: 1,
    roughness: 0.15,
  }

  return (
    <group ref={groupRef} dispose={null} scale={1.6}>
      
      {/* --- BEAMS & CORE --- */}
      <group ref={coreRef}>
          {beams.map((data, i) => (
            <Beam key={i} {...data} />
          ))}
          
          {/* The Lantern Shell (Darker to contrast with the light beams) */}
          <Icosahedron args={[0.9, 1]}>
             <meshStandardMaterial 
                color="#000000" // Pure black core to make lights pop
                metalness={0.8}
                roughness={0.2}
             />
          </Icosahedron>
          
          {/* Glowing cracks/wireframe on the shell */}
          <Icosahedron args={[0.91, 1]}>
             <meshBasicMaterial 
                color="#fbbf24"
                wireframe
                transparent
                opacity={0.1}
             />
          </Icosahedron>
      </group>

      {/* --- RINGS --- */}
      <group ref={ringsRef}>
          <Torus args={[1.4, 0.02, 16, 100]} rotation={[Math.PI / 2, 0, 0]}>
            <meshStandardMaterial {...goldMaterialProps} />
          </Torus>
          <Torus args={[1.8, 0.015, 16, 100]} rotation={[0, Math.PI / 4, 0]}>
            <meshStandardMaterial {...goldMaterialProps} />
          </Torus>
           <Torus args={[2.2, 0.01, 16, 100]} rotation={[Math.PI / 3, 0, Math.PI / 3]}>
            <meshStandardMaterial {...goldMaterialProps} />
          </Torus>
      </group>

      {/* Internal light source for the totem self-illumination */}
      <pointLight position={[0, 0, 0]} intensity={1.5} color="#fbbf24" distance={3} />
    </group>
  )
}