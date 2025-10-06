import { memo } from 'react';
import { LucideProps } from 'lucide-react';

function SeparatorIcon(props: LucideProps) {
  return (
    <svg fill="none" viewBox="0 0 12 82" preserveAspectRatio="none" {...props}>
      <path
        d="M0.5 0V31L10.5 41L0.5 51V82"
        stroke="currentcolor"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

export default memo(SeparatorIcon);
