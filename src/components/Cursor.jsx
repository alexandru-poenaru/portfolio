import { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

const Cursor = () => {
  const glowRef = useRef(null);

  useEffect(() => {
    const glow = glowRef.current;
    if (!glow) return;

    const onMove = (e) => {
      glow.style.transform = `translate(${e.clientX - 200}px, ${e.clientY - 200}px)`;
      glow.style.opacity = '1';
    };
    const onLeave = () => { glow.style.opacity = '0'; };
    const onEnter = () => { glow.style.opacity = '1'; };

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseenter', onEnter);

    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseenter', onEnter);
    };
  }, []);

  return ReactDOM.createPortal(
    <SpotlightGlow ref={glowRef} />,
    document.body
  );
};

const SpotlightGlow = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 400px;
  height: 400px;
  border-radius: 50%;
  background: radial-gradient(circle, ${props => props.theme.glow} 0%, transparent 70%);
  pointer-events: none;
  z-index: 9998;
  opacity: 0;
  transition: opacity 0.4s ease;
  transform: translate(-9999px, -9999px);

  @media (hover: none) and (pointer: coarse) {
    display: none;
  }
`;

export default Cursor;
