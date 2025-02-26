// 'use client';

import CloseIcon from '@/components/UI/Icon/CloseIcon';
import { Tooltip } from '@mui/material';

type TagBadgeType = {
  label: string;
  setItems?: (label: string) => void;
  tooltipText?: string;
  // children: ReactNode;
}

export default function TagBadge({ label, setItems, tooltipText = `Remove` }: TagBadgeType) {
  return (
    <>
      <Tooltip title={tooltipText} placement={`top`}>
        <div onClick={setItems ? () => setItems(label) : undefined} className={`font-semibold cursor-pointer text-nowrap text-red-600 px-4 py-2 flex items-center gap-2
                  border border-red-600 rounded-full`}>
          <span className={`inline-block text-sm`}>{label}</span>
          <CloseIcon strokeColor={`#e82929`} height={16} width={16} variant={`small`} />
        </div>
      </Tooltip>
    </>
  );
}
