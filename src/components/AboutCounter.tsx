import { useState, useEffect, useRef } from "react";

interface AnimatedNumberProps {
  targetNumber: number;
  duration?: number;
}

const AboutCounter = ({
  targetNumber,
  duration = 1000,
}: AnimatedNumberProps) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(Date.now());

  // Calculate decimal places based on target number
  const getDecimalPlaces = (num: number): number => {
    if (Number.isInteger(num)) return 0;
    const str = num.toString();
    const decimalPart = str.split(".")[1] || "";
    return decimalPart.length;
  };

  const decimalPlaces = getDecimalPlaces(targetNumber);

  useEffect(() => {
    if (!isVisible) return;

    const animate = () => {
      const startTime = startTimeRef.current;
      const now = Date.now();
      const progress = Math.min((now - startTime) / duration, 1);

      // Calculate current value and round to specified decimal places
      const currentValue = progress * targetNumber;
      const roundedValue =
        decimalPlaces > 0
          ? Number(currentValue.toFixed(decimalPlaces))
          : Math.round(currentValue);

      setCount(roundedValue);

      if (progress < 1) {
        intervalRef.current = requestAnimationFrame(animate);
      }
    };

    startTimeRef.current = Date.now();
    intervalRef.current = requestAnimationFrame(animate);

    return () => {
      if (intervalRef.current) {
        cancelAnimationFrame(intervalRef.current);
      }
    };
  }, [targetNumber, duration, decimalPlaces, isVisible]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setIsVisible(true);
            setHasAnimated(true);
          }
        });
      },
      { threshold: 0.1 } // Trigger when 10% visible
    );

    const currentContainer = containerRef.current;

    if (currentContainer) {
      observer.observe(currentContainer);
    }

    return () => {
      if (currentContainer) {
        observer.unobserve(currentContainer);
      }
    };
  }, [hasAnimated]);

  return (
    <div ref={containerRef}>
      <p className="text-4xl font-bold">
        {decimalPlaces > 0
          ? count.toFixed(decimalPlaces)
          : count.toLocaleString()}
        K
      </p>
    </div>
  );
};

export default AboutCounter;
