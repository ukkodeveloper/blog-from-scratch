import Box from '@/components/Box';
import Txt from '@/components/Txt';
import type { ReactNode } from 'react';

interface CalloutProps {
  icon: ReactNode;
  title: string;
  content: string;
}

export default function Callout({ icon, title, content }: CalloutProps) {
  return (
    <Box as="section">
      <div className="flex items-center justify-start space-x-2">
        {icon}
        <Txt fontSize="md">{title}</Txt>
      </div>
      <Txt className="pl-6" color="neutral">
        {content}
      </Txt>
    </Box>
  );
}
