type WaveEdgesProps = {
  bottom?: boolean;
  fillClassName?: string;
  variant?: "edges" | "ambient";
};

const edgeLayers = [
  {
    path: "M-60 0H1500V12C1230 74 1038 7 782 46C516 87 272 10-60 60V0Z",
    className: "fluid-wave-layer fluid-wave-layer--base",
  },
  {
    path: "M-80 0H1520V23C1260 91 1016 21 756 59C492 97 230 30-80 72V0Z",
    className: "fluid-wave-layer fluid-wave-layer--middle",
  },
  {
    path: "M-100 0H1540V35C1288 101 1056 43 804 69C548 96 280 49-100 84V0Z",
    className: "fluid-wave-layer fluid-wave-layer--deep",
  },
] as const;

function EdgeStack({
  position,
  fillClassName,
}: {
  position: "top" | "bottom";
  fillClassName: string;
}) {
  return (
    <div className={`fluid-wave-stack fluid-wave-stack--${position}`}>
      {edgeLayers.map((layer, index) => (
        <svg
          key={layer.className}
          className={`${layer.className} ${fillClassName}`}
          viewBox="0 0 1440 112"
          preserveAspectRatio="none"
          focusable="false"
        >
          <path d={layer.path} />
          {index === 0 ? (
            <path
              d="M-60 60C272 10 516 87 782 46C1038 7 1230 74 1500 12"
              className="fluid-wave-contour"
              vectorEffect="non-scaling-stroke"
            />
          ) : null}
        </svg>
      ))}
    </div>
  );
}

function AmbientWaves() {
  return (
    <div className="fluid-wave-ambient" aria-hidden="true">
      <svg className="fluid-wave-ambient__layer fluid-wave-ambient__layer--one" viewBox="0 0 1440 360" preserveAspectRatio="none" focusable="false">
        <path d="M-120 96C102 20 304 172 568 91C840 7 1010 177 1254 82C1380 32 1490 58 1560 98V400H-120Z" />
      </svg>
      <svg className="fluid-wave-ambient__layer fluid-wave-ambient__layer--two" viewBox="0 0 1440 360" preserveAspectRatio="none" focusable="false">
        <path d="M-140 158C98 69 330 205 548 132C798 47 1012 218 1218 143C1365 91 1495 107 1580 158V400H-140Z" />
      </svg>
      <svg className="fluid-wave-ambient__layer fluid-wave-ambient__layer--three" viewBox="0 0 1440 360" preserveAspectRatio="none" focusable="false">
        <path d="M-180 232C92 155 286 280 542 211C790 145 1024 287 1254 222C1382 186 1500 202 1600 240V400H-180Z" />
      </svg>
      <svg className="fluid-wave-ambient__layer fluid-wave-ambient__layer--glint" viewBox="0 0 1440 360" preserveAspectRatio="none" focusable="false">
        <path d="M-160 118C80 45 312 181 558 108C804 34 1025 190 1250 114C1394 66 1496 84 1600 126" />
      </svg>
    </div>
  );
}

export default function WaveEdges({
  bottom = true,
  fillClassName = "fill-background",
  variant = "edges",
}: WaveEdgesProps) {
  if (variant === "ambient") {
    return <AmbientWaves />;
  }

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
      <EdgeStack position="top" fillClassName={fillClassName} />
      {bottom ? <EdgeStack position="bottom" fillClassName={fillClassName} /> : null}
    </div>
  );
}
