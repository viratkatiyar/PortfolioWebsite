import { ReactNode, useEffect, useRef } from "react";

interface MagneticLinkProps {
  children: ReactNode;
  className?: string;
  href: string;
  target?: string;
  rel?: string;
  "data-cursor"?: string;
}

const MagneticLink = ({
  children,
  className,
  href,
  target,
  rel,
  "data-cursor": dataCursor,
}: MagneticLinkProps) => {
  const containerRef = useRef<HTMLSpanElement>(null);
  const linkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const link = linkRef.current;
    if (!container || !link) return;

    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;
    let isHovering = false;
    let frameId: number;

    const updatePosition = () => {
      const rect = container.getBoundingClientRect();
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Reset to center if not hovering
      const targetX = isHovering ? mouseX : centerX;
      const targetY = isHovering ? mouseY : centerY;

      currentX += (targetX - currentX) * 0.1;
      currentY += (targetY - currentY) * 0.1;

      link.style.setProperty("--siLeft", `${currentX}px`);
      link.style.setProperty("--siTop", `${currentY}px`);

      frameId = requestAnimationFrame(updatePosition);
    };

    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Threshold for magnetic effect (matches original 40x40 area roughly)
      if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
        mouseX = x;
        mouseY = y;
        isHovering = true;
      } else {
        isHovering = false;
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    frameId = requestAnimationFrame(updatePosition);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <span ref={containerRef} className="magnetic-container">
      <a
        ref={linkRef}
        href={href}
        target={target}
        rel={rel}
        className={className}
        data-cursor={dataCursor}
      >
        {children}
      </a>
    </span>
  );
};

export default MagneticLink;
