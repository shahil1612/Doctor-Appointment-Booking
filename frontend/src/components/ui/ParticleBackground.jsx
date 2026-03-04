import { motion } from "framer-motion";

// Generate stable particle positions outside component
const generateParticles = () =>
  [...Array(30)].map(() => ({
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    xMovement: Math.random() * 50 - 25,
    duration: 10 + Math.random() * 10,
    delay: Math.random() * 5,
  }));

const PARTICLES = generateParticles();

const ParticleBackground = () => {
  return (
    <div className="absolute inset-0">
      <div className="absolute inset-0 bg-blue-900/20"></div>

      {/* Floating Particles */}
      {PARTICLES.map((particle, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-blue-400/35 rounded-full"
          style={{
            left: particle.left,
            top: particle.top,
          }}
          animate={{
            y: [0, -100, 0],
            x: [0, particle.xMovement, 0],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

export default ParticleBackground;
