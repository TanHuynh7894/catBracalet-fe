import React, { useRef } from 'react';
import { useGLTF, Float, PresentationControls, Stage } from '@react-three/drei';

export const BraceletModel = ({ modelPath }) => {
    const { scene } = useGLTF(modelPath);

    return (
        <PresentationControls
            speed={1.5}
            global
            zoom={0.7}
            polar={[-0.1, Math.PI / 4]}
        >
            <ambientLight intensity={1.5} />
            <directionalLight position={[5, 5, 5]} intensity={2} />
            <Float speed={2} rotationIntensity={1.5} floatIntensity={1.5}>
                <primitive
                    object={scene}
                    scale={2.5}
                    position={[0, 0, 0]}
                />
            </Float>
        </PresentationControls>
    );
};
