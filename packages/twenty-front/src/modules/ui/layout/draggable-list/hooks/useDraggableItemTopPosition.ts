import { useRef, useEffect, useState } from 'react';
import { isDefined } from '~/utils/isDefined';

export const useDraggableItemTopPosition = (isDragged: boolean) => {
  // eslint-disable-next-line @nx/workspace-no-state-useref
  const ref = useRef<HTMLDivElement | null>(null);
  const [topPosition, setTopPosition] = useState<number>(0);

  useEffect(() => {
    const updateTopPosition = () => {
      if (isDefined(ref.current)) {
        const rect = ref.current.getBoundingClientRect();
        setTopPosition(rect.top);
      }
    };
    updateTopPosition();
  }, [isDragged,topPosition]);

  return { draggableItemRef: ref, topPosition };
};
