import React, { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Text } from '@react-three/drei'
import * as THREE from 'three'

const BarChart3D = ({ data, title }) => {
  const groupRef = useRef()

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.1
    }
  })

  const bars = useMemo(() => {
    if (!data || data.length === 0) return []

    const maxValue = Math.max(...data.map(item => item.market_cap || 0))
    const barWidth = 0.8
    const barSpacing = 1.2

    return data.slice(0, 10).map((item, index) => {
      const height = ((item.market_cap || 0) / maxValue) * 5 + 0.1
      const x = (index - 4.5) * barSpacing
      const isPositive = (item.price_change_percentage_24h || 0) >= 0
      
      return {
        position: [x, height / 2, 0],
        scale: [barWidth, height, barWidth],
        color: isPositive ? '#10b981' : '#ef4444',
        symbol: item.symbol?.toUpperCase() || '',
        value: item.market_cap || 0,
        change: item.price_change_percentage_24h || 0
      }
    })
  }, [data])

  return (
    <group ref={groupRef}>
      {bars.map((bar, index) => (
        <group key={index}>
          <mesh position={bar.position} scale={bar.scale}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={bar.color} />
          </mesh>
          <Text
            position={[bar.position[0], -0.5, bar.position[2]]}
            rotation={[-Math.PI / 2, 0, 0]}
            fontSize={0.3}
            color="#666"
            anchorX="center"
            anchorY="middle"
          >
            {bar.symbol}
          </Text>
          <Text
            position={[bar.position[0], bar.position[1] + bar.scale[1] / 2 + 0.3, bar.position[2]]}
            fontSize={0.2}
            color={bar.color}
            anchorX="center"
            anchorY="middle"
          >
            {bar.change >= 0 ? '+' : ''}{bar.change.toFixed(1)}%
          </Text>
        </group>
      ))}
    </group>
  )
}

const Chart3D = ({ data, title = "Market Cap Visualization" }) => {
  return (
    <div className="card h-96">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        {title}
      </h3>
      <div className="h-80 w-full">
        <Canvas camera={{ position: [0, 5, 10], fov: 60 }}>
          <ambientLight intensity={0.6} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <pointLight position={[-10, -10, -10]} intensity={0.5} />
          
          <BarChart3D data={data} title={title} />
          
          <OrbitControls
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            minDistance={5}
            maxDistance={20}
          />
          
          {/* Grid */}
          <gridHelper args={[20, 20, '#444', '#444']} position={[0, -0.01, 0]} />
        </Canvas>
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
        Interactive 3D visualization - drag to rotate, scroll to zoom
      </p>
    </div>
  )
}

export default Chart3D