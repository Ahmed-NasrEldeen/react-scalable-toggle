import { StrictMode, type ReactNode, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ScalableToggle } from '../src/ScalableToggle';
import '../src/ScalableToggle.css';
import './demo.css';

const ratio = 96 / 44;

type ExampleRowProps = {
  title: string;
  description: string;
  children: ReactNode;
};

function ExampleRow({ title, description, children }: ExampleRowProps) {
  return (
    <div className="row">
      <div>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      {children}
    </div>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m20 6-11 11-5-5" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}

function FilledCheckIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm-1.2 14.8-4.2-4.2L8 11.2l2.8 2.8 5.7-5.7 1.4 1.4-7.1 7.1Z" />
    </svg>
  );
}

function FilledXIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm3.9 13.1-1.4 1.4-2.5-2.5-2.5 2.5-1.4-1.4 2.5-2.5-2.5-2.5 1.4-1.4 2.5 2.5 2.5-2.5 1.4 1.4-2.5 2.5 2.5 2.5Z" />
    </svg>
  );
}

function App() {
  const [height, setHeight] = useState(44);
  const [evidence, setEvidence] = useState(
    'Click labels, icons, track, and knob. Every enabled toggle should switch from anywhere inside the track.',
  );

  const liveWidth = useMemo(() => Math.round(height * ratio), [height]);

  const updateEvidence = (label: string) => (checked: boolean) => {
    setEvidence(
      `${label} changed to ${checked ? 'on' : 'off'}. Label, text, icon, track, and knob clicks are reaching the input.`,
    );
  };

  return (
    <main>
      <section className="hero">
        <p className="eyebrow">Local package draft</p>
        <h1>React Scalable Toggle</h1>
        <p className="summary">
          One height value scales the full switch: track, knob, labels, icons,
          padding, and animation distance.
        </p>
      </section>

      <section className="showcase" aria-label="Scaling showcase">
        <div className="showcase-copy">
          <p className="eyebrow">The main idea</p>
          <h2>One prop scales the whole switch.</h2>
          <p>
            Set <code>height</code> once. The width, knob, padding, icon size,
            label size, radius, and travel distance follow proportionally.
          </p>
          <pre>
            <code>{'<ScalableToggle height={44} />'}</code>
          </pre>
        </div>

        <div className="scale-lab" aria-label="Live size preview">
          <div className="scale-stack">
            {[24, 36, 56, 88].map((size) => (
              <ScalableToggle
                key={size}
                aria-label={`${size} pixel scalable toggle`}
                className="scale-toggle"
                defaultChecked
                height={size}
                checkedLabel="On"
                uncheckedLabel="Off"
              />
            ))}
          </div>

          <div className="slider-card">
            <div>
              <h3>Try a height</h3>
              <p>
                <span>{height}</span>px height, width follows ratio
              </p>
            </div>
            <ScalableToggle
              aria-label="Live height scalable toggle"
              className="live-toggle"
              defaultChecked
              height={height}
              width={liveWidth}
              checkedLabel="On"
              uncheckedLabel="Off"
            />
            <input
              aria-label="Toggle height"
              className="height-slider"
              max="96"
              min="20"
              onChange={(event) => setHeight(Number(event.currentTarget.value))}
              type="range"
              value={height}
            />
          </div>
        </div>
      </section>

      <section className="panel" aria-label="Toggle examples">
        <ExampleRow title="Small" description="height 24">
          <ScalableToggle aria-label="Small scalable toggle" height={24} onChange={updateEvidence('Small scalable toggle')} checkedLabel="On" uncheckedLabel="Off" />
        </ExampleRow>

        <ExampleRow title="Default" description="height 44">
          <ScalableToggle aria-label="Default scalable toggle" className="blue" height={44} onChange={updateEvidence('Default scalable toggle')} checkedLabel="On" uncheckedLabel="Off" />
        </ExampleRow>

        <ExampleRow title="No Text" description="plain switch with no label content">
          <ScalableToggle aria-label="No text scalable toggle" height={44} onChange={updateEvidence('No text scalable toggle')} />
        </ExampleRow>

        <ExampleRow title="Large Icons" description="height 64">
          <ScalableToggle aria-label="Large icon scalable toggle" className="violet" height={64} onChange={updateEvidence('Large icon scalable toggle')} checkedIcon={<FilledCheckIcon />} uncheckedIcon={<FilledXIcon />} />
        </ExampleRow>

        <ExampleRow title="Disabled" description="still scales, no interaction">
          <ScalableToggle aria-label="Disabled scalable toggle" disabled height={44} checkedLabel="On" uncheckedLabel="Off" />
        </ExampleRow>
      </section>

      <section className="panel compact">
        <h2>Click Check</h2>
        <p>{evidence}</p>
      </section>

      <section className="panel" aria-label="Framework styling examples">
        <ExampleRow title="MUI Style" description="external CSS variables mapped from a MUI-like theme">
          <ScalableToggle aria-label="MUI styled scalable toggle" className="mui-example" defaultChecked height={44} checkedLabel="On" uncheckedLabel="Off" />
        </ExampleRow>

        <ExampleRow title="Chakra Style" description="teal palette and rounded focus-friendly styling">
          <ScalableToggle aria-label="Chakra styled scalable toggle" className="chakra-example" defaultChecked height={42} checkedLabel="Yes" uncheckedLabel="No" />
        </ExampleRow>

        <ExampleRow title="Tailwind Style" description="utility-like colors with snappy motion">
          <ScalableToggle aria-label="Tailwind styled scalable toggle" className="tailwind-example" defaultChecked height={42} checkedLabel="On" uncheckedLabel="Off" />
        </ExampleRow>

        <ExampleRow title="Ant Design Style" description="compact blue control with system typography">
          <ScalableToggle aria-label="Ant Design styled scalable toggle" className="antd-example" defaultChecked height={36} checkedLabel="Yes" uncheckedLabel="No" />
        </ExampleRow>

        <ExampleRow title="RSuite Style" description="external CSS variables mapped from an RSuite-like theme">
          <ScalableToggle aria-label="RSuite styled scalable toggle" className="rsuite-example" defaultChecked height={40} checkedLabel="Yes" uncheckedLabel="No" />
        </ExampleRow>

        <ExampleRow title="Radix Style" description="minimal neutral style with strong contrast">
          <ScalableToggle aria-label="Radix styled scalable toggle" className="radix-example" defaultChecked height={38} checkedLabel="1" uncheckedLabel="0" />
        </ExampleRow>

        <ExampleRow title="Custom Font" description="font family, size, and weight through CSS variables">
          <ScalableToggle aria-label="Custom font scalable toggle" className="font-example" defaultChecked height={50} checkedLabel="Go" uncheckedLabel="Wait" />
        </ExampleRow>
      </section>

      <section className="panel" aria-label="Icon examples">
        <ExampleRow title="Lucide-Style Icons" description="stroke icons passed as custom content">
          <ScalableToggle aria-label="Lucide style icon scalable toggle" className="icon-stroke" defaultChecked height={54} checkedIcon={<CheckIcon />} uncheckedIcon={<XIcon />} />
        </ExampleRow>

        <ExampleRow title="Material-Style Icons" description="filled icons passed as custom content">
          <ScalableToggle aria-label="Material style icon scalable toggle" className="icon-fill" defaultChecked height={54} checkedIcon={<FilledCheckIcon />} uncheckedIcon={<FilledXIcon />} />
        </ExampleRow>

        <ExampleRow title="Mixed Icon And Text" description="icons and labels together scale from height">
          <ScalableToggle aria-label="Mixed icon and text scalable toggle" className="mixed-example icon-stroke" defaultChecked height={58} checkedIcon={<CheckIcon />} checkedLabel="Yes" uncheckedIcon={<XIcon />} uncheckedLabel="No" width={150} />
        </ExampleRow>
      </section>

      <section className="panel" aria-label="Design style examples">
        <ExampleRow title="Success Theme" description="green approval state for dashboards">
          <ScalableToggle aria-label="Success themed scalable toggle" className="success-example" defaultChecked height={48} checkedLabel="Live" uncheckedLabel="Hold" />
        </ExampleRow>

        <ExampleRow title="Warning Theme" description="warm state for review or attention flows">
          <ScalableToggle aria-label="Warning themed scalable toggle" className="warning-example" defaultChecked height={48} checkedLabel="Warn" uncheckedLabel="Safe" width={116} />
        </ExampleRow>

        <ExampleRow title="Dark Theme" description="dark UI colors through the same variables">
          <ScalableToggle aria-label="Dark themed scalable toggle" className="dark-example" defaultChecked height={48} checkedLabel="On" uncheckedLabel="Off" />
        </ExampleRow>
      </section>
    </main>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
