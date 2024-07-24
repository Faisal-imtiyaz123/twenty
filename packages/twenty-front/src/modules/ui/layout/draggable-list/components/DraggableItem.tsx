import React, { useState } from 'react';
import { useTheme } from '@emotion/react';
import { Draggable } from '@hello-pangea/dnd';
import { useDraggableItemTopPosition } from '@/ui/layout/draggable-list/hooks/useDraggableItemTopPosition';
import { useDropDownTopPosition } from '@/ui/layout/dropdown/hooks/useDropDownTopPosition';

type DraggableItemProps =
  | {
      draggableId: string;
      isDragDisabled?: boolean;
      index: number;
      itemComponent: React.ReactElement;
      isDraggableListInsideScrollableContainer?: never;
      isDraggableListScrollable?: boolean;
    }
  | {
      draggableId: string;
      isDragDisabled?: boolean;
      index: number;
      itemComponent: React.ReactElement;
      isDraggableListInsideScrollableContainer?: boolean;
      isDraggableListScrollable?: never;
    };

export const DraggableItem = ({
  draggableId,
  isDragDisabled = false,
  index,
  itemComponent,
  isDraggableListInsideScrollableContainer = false,
  isDraggableListScrollable = false,
}: DraggableItemProps) => {
  const theme = useTheme();
  const [isDragged, setIsDragged] = useState<boolean>(false);

  const { draggableItemRef, topPosition } =
    useDraggableItemTopPosition(isDragged);
  const { dropDownTopPosition } = useDropDownTopPosition();
  const calculateTop = () => {
    setIsDragged(true);
    if (isDraggableListInsideScrollableContainer) return {};
    if (isDraggableListScrollable)
      return { top: `${topPosition - Number(dropDownTopPosition)}px` };
    return { top: 'auto' };
  };
  console.log(topPosition)

  return (
    <Draggable
      key={draggableId}
      draggableId={draggableId}
      index={index}
      isDragDisabled={isDragDisabled}
    >
      {(draggableProvided, draggableSnapshot) => {
        const draggableStyle = draggableProvided.draggableProps.style;
        const isDragged = draggableSnapshot.isDragging;
        return (
          <div ref={draggableItemRef}>
            <div
              ref={draggableProvided.innerRef}
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...draggableProvided.draggableProps}
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...draggableProvided.dragHandleProps}
              style={{
                ...draggableStyle,
                left: 'auto',
                ...(isDragged ? {top:"auto"} : {}),
                transform: draggableStyle?.transform?.replace(
                  /\(-?\d+px,/,
                  '(0,',
                ),
                background: isDragged
                  ? theme.background.transparent.light
                  : 'none',
              }}
            >
              {itemComponent}
            </div>
          </div>
        );
      }}
    </Draggable>
  );
};
