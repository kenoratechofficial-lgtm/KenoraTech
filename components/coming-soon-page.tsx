"use client";

import Image from "next/image";
import { type CSSProperties, useEffect, useState } from "react";

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isLive: boolean;
};

const particles = [
  [6, 14, 1.5, 18, -24, 11, -1], [12, 76, 1, -22, -18, 14, -4], [18, 30, 1, 26, 15, 10, -7], [24, 60, 1.5, -18, 24, 13, -2],
  [33, 10, 1, 14, 28, 12, -6], [39, 81, 1.5, 30, -20, 15, -3], [46, 22, 1, -24, 18, 11, -8], [54, 73, 1, 20, -30, 13, -5],
  [62, 12, 1.5, -20, 22, 14, -9], [69, 50, 1, 28, 18, 10, -2], [76, 20, 1.5, -26, -16, 15, -6], [83, 77, 1, 18, -26, 12, -4],
  [91, 37, 1, -16, 28, 13, -7], [95, 68, 1.5, -30, -18, 11, -3]
];

function getTodatAtEightIST() {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "numeric",
    day: "numeric"
  }).formatToParts(new Date());
  const value = (type: string) => Number(parts.find((part) => part.type === type)?.value);

  // IST is UTC+05:30 year-round, so this remains stable across the visitor's timezone.
  return new Date(Date.UTC(value("year"), value("month") - 1, value("day") + 1, 2, 30, 0));
}

function getTimeLeft(targetTime: number): TimeLeft {
  const difference = Math.max(0, targetTime - Date.now());
  const totalSeconds = Math.floor(difference / 1000);

  return {
    days: 0,
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
    isLive: difference === 0
  };
}

const units = ["Days", "Hours", "Minutes", "Seconds"] as const;

export function ComingSoonPage() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

  useEffect(() => {
    const targetTime = getTodatAtEightIST().getTime();
    const updateCountdown = () => {
      const nextTimeLeft = getTimeLeft(targetTime);
      setTimeLeft(nextTimeLeft);
    };
    updateCountdown();
    const interval = window.setInterval(updateCountdown, 1000);
    return () => window.clearInterval(interval);
  }, []);

  const values = timeLeft
    ? [timeLeft.days, timeLeft.hours, timeLeft.minutes, timeLeft.seconds]
    : [0, 0, 0, 0];

  return (
    <main className="launch-page">
      <div className="launch-grid" aria-hidden="true" />
      <div className="launch-orb launch-orb-one" aria-hidden="true" />
      <div className="launch-orb launch-orb-two" aria-hidden="true" />
      <div className="launch-particles" aria-hidden="true">
        {particles.map(([left, top, size, driftX, driftY, duration, delay], index) => (
          <span
            key={index}
            style={{
              left: `${left}%`,
              top: `${top}%`,
              width: `${size * 3}px`,
              height: `${size * 3}px`,
              "--particle-x": `${driftX}px`,
              "--particle-y": `${driftY}px`,
              "--particle-duration": `${duration}s`,
              "--particle-delay": `${delay}s`
            } as CSSProperties}
          />
        ))}
      </div>

      <section className="launch-content" aria-label="KenoraTech launch countdown">
        <h1>Something Big <span>Is Coming</span></h1>
        <p className="launch-brand">KenoraTech</p>

        <div className="launch-rule" aria-hidden="true"><i /></div>
        <p className="launch-date">TODAY <b>•</b> 8:00 AM</p>
        <p className="launch-timezone">IST · INDIA STANDARD TIME</p>

        {timeLeft?.isLive ? (
          <p className="launch-live">WE ARE LIVE</p>
        ) : (
          <>
            <p className="launch-countdown-label">LAUNCHING IN</p>
            <div className="launch-countdown" role="timer" aria-live="polite" aria-label="Time remaining until launch">
              {values.map((value, index) => (
                <div className="launch-countdown-item" key={units[index]}>
                  <strong>{String(value).padStart(2, "0")}</strong>
                  <span>{units[index]}</span>
                </div>
              ))}
            </div>
          </>
        )}
        <p className="launch-ready">BE READY</p>
      </section>
    </main>
  );
}
