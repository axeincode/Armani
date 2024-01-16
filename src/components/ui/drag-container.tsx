// components/DragContainer.js
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

type DragContainerProps = {
  children: React.ReactNode;
};

const DragContainer = ({ children }: DragContainerProps) => {
  return (
    <DndProvider backend={HTML5Backend}>
      <>{children}</>
    </DndProvider>
  );
};

export default DragContainer;
