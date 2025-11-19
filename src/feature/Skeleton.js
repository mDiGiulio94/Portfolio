import React from "react";
import styled, { keyframes } from "styled-components";

const shimmer = keyframes`
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
  }
`;

const SkeletonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 18px 16px;
  border-radius: 10px;
  background: var(--color-hover-card);
  border: 1px solid var(--color-border);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.05);
`;

const SkeletonLine = styled.span`
  height: 14px;
  border-radius: 6px;
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0.04) 25%,
    rgba(255, 255, 255, 0.08) 37%,
    rgba(255, 255, 255, 0.04) 63%
  );
  background-size: 400% 100%;
  animation: ${shimmer} 1.2s ease-in-out infinite;
  opacity: 0.8;
`;

const HeaderLine = styled(SkeletonLine)`
  height: 18px;
  width: 40%;
  margin-bottom: 6px;
`;

export default function Skeleton({
  lines = 6,
  showHeader = true,
  className,
}) {
  const widths = React.useMemo(() => {
    const pattern = [100, 92, 88, 96, 76];
    return Array.from({ length: lines }, (_, idx) => {
      const base = pattern[idx % pattern.length];
      const adjustment = idx % 2 === 0 ? -4 : -8;
      const width = Math.max(55, base + adjustment);
      return `${width}%`;
    });
  }, [lines]);

  return (
    <SkeletonContainer className={className} aria-hidden>
      {showHeader && <HeaderLine />}
      {widths.map((width, idx) => (
        <SkeletonLine key={idx} style={{ width }} />
      ))}
    </SkeletonContainer>
  );
}