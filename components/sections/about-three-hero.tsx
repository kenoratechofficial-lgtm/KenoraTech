"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, Bot, Code2, Gauge, Globe2, ShieldCheck } from "lucide-react";
import * as THREE from "three";
import designReference from "@/assets/homepage.png";

const cards = [
  {
    title: "AI Solutions",
    subtitle: "Smart Automation",
    icon: Bot,
    className: "left-4 top-16 lg:left-14 lg:top-24"
  },
  {
    title: "Web Development",
    subtitle: "Modern & Scalable",
    icon: Globe2,
    className: "right-4 top-24 lg:right-14 lg:top-32"
  },
  {
    title: "Performance",
    subtitle: "99.9% Uptime",
    icon: Gauge,
    className: "left-4 bottom-16 lg:left-10 lg:bottom-24"
  },
  {
    title: "Secure & Reliable",
    subtitle: "Enterprise Grade",
    icon: ShieldCheck,
    className: "right-4 bottom-14 lg:right-10 lg:bottom-24"
  }
];

function makeParticleTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 64;
  canvas.height = 64;

  const context = canvas.getContext("2d");
  if (!context) {
    return null;
  }

  const gradient = context.createRadialGradient(32, 32, 0, 32, 32, 30);
  gradient.addColorStop(0, "rgba(255,255,255,1)");
  gradient.addColorStop(0.35, "rgba(84,205,255,0.82)");
  gradient.addColorStop(0.72, "rgba(153,56,255,0.32)");
  gradient.addColorStop(1, "rgba(153,56,255,0)");
  context.fillStyle = gradient;
  context.fillRect(0, 0, 64, 64);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

export function AboutThreeHero() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const heroRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const hero = heroRef.current;

    if (!canvas || !hero) {
      return;
    }

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance"
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(hero.clientWidth, hero.clientHeight);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, hero.clientWidth / hero.clientHeight, 0.1, 100);
    camera.position.set(0, 0.3, 8.4);

    const root = new THREE.Group();
    scene.add(root);

    const pointer = new THREE.Vector2(0, 0);
    const clock = new THREE.Clock();
    const particleTexture = makeParticleTexture();
    let animationId = 0;

    const fieldCount = 760;
    const fieldPositions = new Float32Array(fieldCount * 3);
    const fieldColors = new Float32Array(fieldCount * 3);
    const blue = new THREE.Color("#16b7ff");
    const violet = new THREE.Color("#8d35ff");

    for (let index = 0; index < fieldCount; index += 1) {
      const i = index * 3;
      fieldPositions[i] = (Math.random() - 0.5) * 15;
      fieldPositions[i + 1] = (Math.random() - 0.48) * 8;
      fieldPositions[i + 2] = (Math.random() - 0.5) * 9;

      const color = blue.clone().lerp(violet, Math.random());
      fieldColors[i] = color.r;
      fieldColors[i + 1] = color.g;
      fieldColors[i + 2] = color.b;
    }

    const fieldGeometry = new THREE.BufferGeometry();
    fieldGeometry.setAttribute("position", new THREE.BufferAttribute(fieldPositions, 3));
    fieldGeometry.setAttribute("color", new THREE.BufferAttribute(fieldColors, 3));

    const field = new THREE.Points(
      fieldGeometry,
      new THREE.PointsMaterial({
        size: 0.045,
        map: particleTexture ?? undefined,
        transparent: true,
        opacity: 0.88,
        vertexColors: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      })
    );
    root.add(field);

    const sphereGroup = new THREE.Group();
    sphereGroup.position.y = 0.15;
    root.add(sphereGroup);

    const halo = new THREE.Mesh(
      new THREE.SphereGeometry(1.92, 64, 64),
      new THREE.MeshBasicMaterial({
        color: "#125eff",
        transparent: true,
        opacity: 0.09,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      })
    );
    sphereGroup.add(halo);

    const wire = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.85, 4),
      new THREE.MeshBasicMaterial({
        color: "#4fdbff",
        wireframe: true,
        transparent: true,
        opacity: 0.54,
        blending: THREE.AdditiveBlending
      })
    );
    sphereGroup.add(wire);

    const sphereParticleCount = 420;
    const spherePositions = new Float32Array(sphereParticleCount * 3);
    for (let index = 0; index < sphereParticleCount; index += 1) {
      const i = index * 3;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const radius = 1.9 + Math.random() * 0.08;

      spherePositions[i] = radius * Math.sin(phi) * Math.cos(theta);
      spherePositions[i + 1] = radius * Math.cos(phi);
      spherePositions[i + 2] = radius * Math.sin(phi) * Math.sin(theta);
    }

    const sphereParticlesGeometry = new THREE.BufferGeometry();
    sphereParticlesGeometry.setAttribute("position", new THREE.BufferAttribute(spherePositions, 3));

    const sphereParticles = new THREE.Points(
      sphereParticlesGeometry,
      new THREE.PointsMaterial({
        size: 0.055,
        color: "#9b5cff",
        map: particleTexture ?? undefined,
        transparent: true,
        opacity: 0.92,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      })
    );
    sphereGroup.add(sphereParticles);

    const ringMaterials = [
      new THREE.MeshBasicMaterial({
        color: "#9c32ff",
        transparent: true,
        opacity: 0.82,
        blending: THREE.AdditiveBlending
      }),
      new THREE.MeshBasicMaterial({
        color: "#14bfff",
        transparent: true,
        opacity: 0.36,
        blending: THREE.AdditiveBlending
      })
    ];

    const orbitA = new THREE.Mesh(new THREE.TorusGeometry(2.65, 0.012, 12, 220), ringMaterials[0]);
    orbitA.rotation.set(1.45, 0.14, 0.15);
    orbitA.scale.x = 1.62;
    sphereGroup.add(orbitA);

    const orbitB = new THREE.Mesh(new THREE.TorusGeometry(2.35, 0.008, 12, 220), ringMaterials[1]);
    orbitB.rotation.set(1.5, -0.16, -0.14);
    orbitB.scale.x = 1.78;
    sphereGroup.add(orbitB);

    const platform = new THREE.Group();
    platform.position.y = -2.35;
    root.add(platform);

    for (let index = 0; index < 4; index += 1) {
      const platformRing = new THREE.Mesh(
        new THREE.TorusGeometry(1.6 + index * 0.18, 0.018, 12, 180),
        new THREE.MeshBasicMaterial({
          color: index % 2 ? "#8b2eff" : "#0fb8ff",
          transparent: true,
          opacity: 0.44 - index * 0.06,
          blending: THREE.AdditiveBlending
        })
      );
      platformRing.rotation.x = Math.PI / 2;
      platformRing.scale.x = 1.55;
      platform.add(platformRing);
    }

    const floorGrid = new THREE.GridHelper(13, 34, "#6328ff", "#0b5bff");
    floorGrid.position.y = -2.58;
    floorGrid.material.transparent = true;
    floorGrid.material.opacity = 0.16;
    root.add(floorGrid);

    const resize = () => {
      const width = hero.clientWidth;
      const height = hero.clientHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    const onPointerMove = (event: PointerEvent) => {
      const rect = hero.getBoundingClientRect();
      pointer.x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      pointer.y = ((event.clientY - rect.top) / rect.height - 0.5) * -2;
      hero.style.setProperty("--mouse-x", `${event.clientX - rect.left}px`);
      hero.style.setProperty("--mouse-y", `${event.clientY - rect.top}px`);
    };

    const onPointerLeave = () => {
      pointer.set(0, 0);
    };

    const animate = () => {
      const elapsed = clock.getElapsedTime();

      root.rotation.y += (pointer.x * 0.16 - root.rotation.y) * 0.035;
      root.rotation.x += (pointer.y * 0.08 - root.rotation.x) * 0.035;
      field.rotation.y = elapsed * 0.018;
      wire.rotation.y = elapsed * 0.16;
      wire.rotation.x = elapsed * 0.05;
      sphereParticles.rotation.y = -elapsed * 0.12;
      orbitA.rotation.z = elapsed * 0.18;
      orbitB.rotation.z = -elapsed * 0.16;
      platform.rotation.y = elapsed * 0.05;

      renderer.render(scene, camera);
      animationId = requestAnimationFrame(animate);
    };

    window.addEventListener("resize", resize);
    hero.addEventListener("pointermove", onPointerMove);
    hero.addEventListener("pointerleave", onPointerLeave);
    animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
      hero.removeEventListener("pointermove", onPointerMove);
      hero.removeEventListener("pointerleave", onPointerLeave);
      fieldGeometry.dispose();
      sphereParticlesGeometry.dispose();
      halo.geometry.dispose();
      wire.geometry.dispose();
      orbitA.geometry.dispose();
      orbitB.geometry.dispose();
      platform.children.forEach((child) => {
        if (child instanceof THREE.Mesh) {
          child.geometry.dispose();
          if (Array.isArray(child.material)) {
            child.material.forEach((material) => material.dispose());
          } else {
            child.material.dispose();
          }
        }
      });
      floorGrid.geometry.dispose();
      if (Array.isArray(floorGrid.material)) {
        floorGrid.material.forEach((material) => material.dispose());
      } else {
        floorGrid.material.dispose();
      }
      ringMaterials.forEach((material) => material.dispose());
      if (particleTexture) {
        particleTexture.dispose();
      }
      renderer.dispose();
    };
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative isolate min-h-[760px] overflow-hidden bg-[#02040d] text-white md:min-h-[820px]"
      style={{
        "--mouse-x": "50%",
        "--mouse-y": "45%"
      } as React.CSSProperties}
    >
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20 mix-blend-screen blur-[1px]"
        style={{ backgroundImage: `url(${designReference.src})` }}
      />
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden="true" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_var(--mouse-x)_var(--mouse-y),rgba(38,174,255,0.18),transparent_18rem),radial-gradient(circle_at_center,rgba(104,33,255,0.22),transparent_28rem),linear-gradient(180deg,rgba(2,4,13,0.1),#02040d_94%)]" />
      <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-[#02040d] to-transparent" />

      <div className="container relative z-10 flex min-h-[760px] flex-col items-center justify-center py-20 text-center md:min-h-[820px]">
        <div className="pointer-events-none absolute left-1/2 top-[44%] hidden h-40 w-40 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full md:flex">
          <span className="bg-gradient-to-br from-[#7eeeff] via-[#386eff] to-[#bf35ff] bg-clip-text text-[9rem] font-black leading-none text-transparent drop-shadow-[0_0_26px_rgba(36,182,255,0.9)]">
            K
          </span>
        </div>

        <div className="max-w-3xl pt-10">
          <span className="inline-flex rounded-full border border-[#31d6ff]/40 bg-white/5 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-[#75e9ff] shadow-[0_0_28px_rgba(49,214,255,0.24)] backdrop-blur-md">
            About KenoraTech
          </span>
          <h1 className="mt-5 text-balance text-4xl font-black leading-tight tracking-normal sm:text-5xl lg:text-6xl">
            Intelligent digital systems built around impact.
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-white/72 sm:text-lg">
            We combine strategy, design, automation and engineering to create fast, secure and scalable products for
            ambitious businesses.
          </p>
          <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/contact"
              className="inline-flex h-12 items-center gap-3 rounded-md bg-gradient-to-r from-[#8b20ff] to-[#12aaff] px-5 text-sm font-bold text-white shadow-[0_0_32px_rgba(40,158,255,0.32)] transition hover:scale-[1.02]"
            >
              Start Your Project
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              href="/services"
              className="inline-flex h-12 items-center gap-3 rounded-md border border-white/18 bg-white/8 px-5 text-sm font-bold text-white/86 backdrop-blur-md transition hover:bg-white/14"
            >
              Explore Services
              <Code2 className="h-5 w-5 text-[#4ee3ff]" />
            </Link>
          </div>
        </div>

        <div className="pointer-events-none absolute inset-0 hidden lg:block">
          {cards.map((card) => {
            const Icon = card.icon;

            return (
              <article
                key={card.title}
                className={`pointer-events-auto absolute w-[300px] rounded-[1.4rem] border border-[#7741ff]/70 bg-[#070b1b]/58 p-6 text-left shadow-[0_0_34px_rgba(72,83,255,0.28),inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-[#42dfff]/80 ${card.className}`}
              >
                <div className="flex items-start gap-5">
                  <div className="flex h-16 w-16 items-center justify-center rounded-lg border border-[#35dcff]/70 bg-[#0d1230]/82 shadow-[0_0_22px_rgba(84,86,255,0.42)]">
                    <Icon className="h-9 w-9 text-[#53e7ff]" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-extrabold tracking-normal text-white">{card.title}</h2>
                    <p className="mt-2 text-lg text-white/68">{card.subtitle}</p>
                  </div>
                </div>
                <div className="mt-8 flex items-end gap-5">
                  <Code2 className="h-9 w-9 text-[#00c9ff]" />
                  <div className="h-16 flex-1 overflow-hidden rounded-sm border-b border-[#6935ff]/70">
                    <div className="flex h-full items-end gap-1">
                      {Array.from({ length: 17 }).map((_, index) => (
                        <span
                          key={index}
                          className="w-full rounded-t-sm bg-gradient-to-t from-[#6c20ff] to-[#11c8ff]"
                          style={{ height: `${18 + ((index * 11) % 46)}%` }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-16 grid w-full gap-4 sm:grid-cols-2 lg:hidden">
          {cards.map((card) => {
            const Icon = card.icon;

            return (
              <article
                key={card.title}
                className="rounded-lg border border-[#7741ff]/55 bg-[#070b1b]/68 p-5 text-left shadow-[0_0_24px_rgba(72,83,255,0.18)] backdrop-blur-xl"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-md border border-[#35dcff]/60 bg-[#0d1230]/82">
                    <Icon className="h-7 w-7 text-[#53e7ff]" />
                  </div>
                  <div>
                    <h2 className="text-lg font-extrabold tracking-normal text-white">{card.title}</h2>
                    <p className="text-sm text-white/68">{card.subtitle}</p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
