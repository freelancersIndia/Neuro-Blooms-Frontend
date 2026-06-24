import React from 'react';

/**
 * SectionDivider — Reusable organic cloud/wave/curve SVG divider.
 *
 * Props:
 *   variant   — 'cloud' | 'wave' | 'organic'  (default: 'cloud')
 *   fromColor — hex background color of section ABOVE
 *   toColor   — hex background color of section BELOW
 *   flip      — boolean, flip vertically for bottom-of-section use
 *   height    — number, px height of the divider (default: 100)
 */

const paths = {
  // Sequence of rounded cartoon cloud humps
  cloud: 'M0,60 C40,40 80,40 120,60 C160,20 240,20 280,60 C320,30 380,30 420,60 C480,10 580,10 640,60 C680,35 740,35 780,60 C840,15 940,15 1000,60 C1040,40 1080,40 1120,60 C1150,45 1180,45 1200,60 L1200,0 L0,0 Z',
  // Smooth undulating wave
  wave: 'M0,60 C150,110 300,10 450,60 C600,110 750,10 900,60 C1050,110 1150,30 1200,50 L1200,0 L0,0 Z',
  // Playful irregular blobs
  organic: 'M0,50 C100,20 200,90 350,60 C500,30 600,100 750,50 C900,10 1050,80 1200,40 L1200,0 L0,0 Z',
};

export const SectionDivider = ({
  variant = 'cloud',
  fromColor = '#FFFFFF',
  toColor = '#FFFFFF',
  flip = false,
  height = 100,
}) => {
  const d = paths[variant] || paths.cloud;

  return (
    <div
      className="relative w-full overflow-hidden pointer-events-none select-none z-[5]"
      style={{
        height: `${height}px`,
        marginTop: flip ? 0 : `-1px`,
        marginBottom: flip ? `-1px` : 0,
        backgroundColor: flip ? fromColor : toColor,
        transform: flip ? 'scaleY(-1)' : undefined,
      }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1200 100"
        preserveAspectRatio="none"
        className="absolute bottom-0 left-0 w-full"
        style={{ height: '100%', display: 'block' }}
      >
        <path d={d} fill={flip ? toColor : fromColor} />
      </svg>
    </div>
  );
};

export const CloudDivider = (props) => <SectionDivider {...props} variant="cloud" />;
export const WaveDivider = (props) => <SectionDivider {...props} variant="wave" />;
export const OrganicDivider = (props) => <SectionDivider {...props} variant="organic" />;

export default SectionDivider;
