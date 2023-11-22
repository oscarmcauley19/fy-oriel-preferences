import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import SortableList from "./SortableList";

export default function RankingsPage() {
   return (
      <>
         <DndProvider backend={HTML5Backend}>
            <SortableList />
         </DndProvider>
      </>
   );
}