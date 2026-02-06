"use client";
import { useEffect, useRef } from "react";

export default function AnimatedCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();

    // Particle system with golden/amber theme
    interface Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      hue: number;
    }

    const particles: Particle[] = [];

    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 1,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: (Math.random() - 0.5) * 0.3,
        opacity: Math.random() * 0.4 + 0.2,
        hue: Math.random() * 30 + 30, // Golden hues (30-60)
      });
    }

    // Arabic geometric pattern points
    const drawArabicPattern = (x: number, y: number, size: number, rotation: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);

      // 8-pointed star (common in Islamic art)
      ctx.strokeStyle = `rgba(218, 165, 32, 0.08)`;
      ctx.lineWidth = 1.5;
      ctx.beginPath();

      for (let i = 0; i < 8; i++) {
        const angle = (Math.PI * 2 * i) / 8;
        const outerRadius = size;
        const innerRadius = size * 0.4;

        const x1 = Math.cos(angle) * outerRadius;
        const y1 = Math.sin(angle) * outerRadius;
        const x2 = Math.cos(angle + Math.PI / 8) * innerRadius;
        const y2 = Math.sin(angle + Math.PI / 8) * innerRadius;

        if (i === 0) ctx.moveTo(x1, y1);
        else ctx.lineTo(x1, y1);
        ctx.lineTo(x2, y2);
      }
      ctx.closePath();
      ctx.stroke();
      ctx.restore();
    };

    let animationFrame: number;
    let time = 0;

    const animate = () => {
      if (!ctx) return;
      time += 0.01;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Gradient background with Arabic theme colors
      const gradient = ctx.createRadialGradient(
        canvas.width * 0.5,
        canvas.height * 0.3,
        0,
        canvas.width * 0.5,
        canvas.height * 0.3,
        canvas.width * 0.8,
      );
      gradient.addColorStop(0, "rgba(139, 69, 19, 0.03)"); // Saddle brown
      gradient.addColorStop(0.5, "rgba(218, 165, 32, 0.02)"); // Goldenrod
      gradient.addColorStop(1, "rgba(160, 82, 45, 0.01)"); // Sienna
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Animated Arabic geometric patterns
      const pattern1Rotation = time * 0.1;
      const pattern2Rotation = -time * 0.15;

      drawArabicPattern(canvas.width * 0.15, canvas.height * 0.2, 100, pattern1Rotation);
      drawArabicPattern(canvas.width * 0.85, canvas.height * 0.7, 120, pattern2Rotation);
      drawArabicPattern(canvas.width * 0.5, canvas.height * 0.9, 80, pattern1Rotation * 1.5);

      // Update and draw particles
      particles.forEach((particle) => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        if (particle.x > canvas.width) particle.x = 0;
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.y > canvas.height) particle.y = 0;
        if (particle.y < 0) particle.y = canvas.height;

        // Golden particles
        const gradient = ctx.createRadialGradient(
          particle.x,
          particle.y,
          0,
          particle.x,
          particle.y,
          particle.size * 2,
        );
        gradient.addColorStop(0, `hsla(${particle.hue}, 70%, 50%, ${particle.opacity})`);
        gradient.addColorStop(1, `hsla(${particle.hue}, 70%, 30%, 0)`);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // Floating Oud perfume bottle silhouette
      ctx.save();
      const bottleX = canvas.width * 0.82;
      const bottleY = canvas.height * 0.45 + Math.sin(time) * 15;
      const bottleRotation = Math.sin(time * 0.5) * 0.03;

      ctx.translate(bottleX, bottleY);
      ctx.rotate(bottleRotation);

      // Traditional Arabian perfume bottle (Al-Tahoun style)
      ctx.fillStyle = "rgba(218, 165, 32, 0.06)";
      ctx.strokeStyle = "rgba(218, 165, 32, 0.12)";
      ctx.lineWidth = 2;

      // Bottle body
      ctx.beginPath();
      ctx.moveTo(0, -50);
      ctx.bezierCurveTo(-15, -50, -25, -40, -25, -20);
      ctx.lineTo(-20, 40);
      ctx.bezierCurveTo(-20, 50, -10, 55, 0, 55);
      ctx.bezierCurveTo(10, 55, 20, 50, 20, 40);
      ctx.lineTo(25, -20);
      ctx.bezierCurveTo(25, -40, 15, -50, 0, -50);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Ornate cap
      ctx.beginPath();
      ctx.moveTo(-18, -50);
      ctx.lineTo(-15, -65);
      ctx.bezierCurveTo(-15, -70, -7, -72, 0, -72);
      ctx.bezierCurveTo(7, -72, 15, -70, 15, -65);
      ctx.lineTo(18, -50);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      ctx.restore();

      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed top-0 left-0 -z-10 h-full w-full"
    />
  );
}
