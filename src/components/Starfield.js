import React, { useMemo, useEffect } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';

// A single star component
const Star = ({ id, x, y, size, twinkleDuration, twinkleDelay }) => (
    <motion.div
        key={id}
        className="absolute rounded-full bg-white"
        style={{ left: `${x}%`, top: `${y}%`, width: size, height: size }}
        animate={{ opacity: [0.1, 0.8, 0.1] }}
        transition={{
            duration: twinkleDuration,
            repeat: Infinity,
            repeatType: 'mirror',
            delay: twinkleDelay,
        }}
    />
);

// A layer of stars that reacts to mouse movement
const StarLayer = ({ stars, factor, mouseX, mouseY }) => {
    const x = useTransform(mouseX, (val) => val * -factor);
    const y = useTransform(mouseY, (val) => val * -factor);

    return (
        <motion.div className="absolute inset-0" style={{ x, y }}>
            {stars.map(star => <Star {...star} />)}
        </motion.div>
    );
};

// A shooting star component
const ShootingStar = ({ id }) => {
    const y = useMemo(() => Math.random() * 100, []);
    const duration = useMemo(() => Math.random() * 2 + 3, []);
    const delay = useMemo(() => Math.random() * 10 + 2, []);

    return (
        <motion.div
            key={id}
            className="absolute h-[2px] w-20 bg-gradient-to-l from-white to-transparent"
            style={{ top: `${y}%` }}
            initial={{ right: '-100px' }}
            animate={{ right: '110%' }}
            transition={{ duration, delay, repeat: Infinity, ease: 'linear' }}
        />
    );
};

// The main Starfield component that orchestrates everything
const Starfield = () => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    useEffect(() => {
        const handleMouseMove = (e) => {
            mouseX.set(e.clientX - window.innerWidth / 2);
            mouseY.set(e.clientY - window.innerHeight / 2);
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [mouseX, mouseY]);

    const layersData = useMemo(() => [
        { count: 60, size: 0.8, factor: 0.01 },
        { count: 40, size: 1.2, factor: 0.02 },
        { count: 20, size: 1.6, factor: 0.04 },
    ], []);

    const starsForLayers = useMemo(() => layersData.map(layer => 
        Array.from({ length: layer.count }).map((_, i) => ({
            id: `star-${layer.factor}-${i}`,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * layer.size + (layer.size / 2),
            twinkleDuration: Math.random() * 2 + 1,
            twinkleDelay: Math.random() * 2,
        }))
    ), [layersData]);

    const shootingStars = useMemo(() => Array.from({ length: 3 }).map((_, i) => ({ id: `ss-${i}` })), []);

    return (
        <div className="absolute inset-0 z-0 overflow-hidden">
            {starsForLayers.map((stars, index) => (
                <StarLayer
                    key={`layer-${index}`}
                    stars={stars}
                    factor={layersData[index].factor}
                    mouseX={mouseX}
                    mouseY={mouseY}
                />
            ))}
            {shootingStars.map(star => <ShootingStar key={star.id} {...star} />)}
        </div>
    );
};

export default Starfield; 