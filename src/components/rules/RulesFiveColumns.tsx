import { Draggable, DroppableProvided } from "react-beautiful-dnd";
import "./rules.scss";

export const RulesFiveColumns = ({
  tableColumns,
  provided,
  rules,
}: {
  tableColumns: string[];
  provided: DroppableProvided;
  rules: {
    rule: string;
    id: number;
  }[];
}) => {
  // <li>Rule 1 : Col2 = Col1 - Col3</li>

  return (
    <>
      <div className={`rules-three-cols`}>
        <ul
          ref={provided.innerRef}
          {...provided.droppableProps}
          style={{ maxWidth: "250px", border: "1px solid" }}
        >
          {rules?.map((ruleElement, index) => {
            return (
              <Draggable
                key={ruleElement?.id}
                draggableId={ruleElement?.id.toString()}
                index={index}
              >
                {(provided) => (
                  <div
                    className="item"
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <li>{ruleElement.rule}</li>
                  </div>
                )}
              </Draggable>
            );
          })}

          {provided.placeholder}
        </ul>
      </div>
    </>
  );
};

// const [{ isOver }, leftDrop] = useDrop(() => ({
//   accept: "",
//   // drop: (item) => addItemToBoard(item.id),
//   collect: (monitor) => ({
//     isOver: !!monitor.isOver(),
//   }),
// }));

// https://blog.logrocket.com/drag-and-drop-react-dnd/
// https://blog.logrocket.com/drag-and-drop-react-dnd/
// https://stackoverflow.com/questions/60029734/react-beautiful-dnd-i-get-unable-to-find-draggable-with-id-1
// solutoin found here : https://github.com/atlassian/react-beautiful-dnd/issues/2350
{
  /*
      <DndProvider backend={HTML5Backend}>
        <div className="">
           <DragDropArea />
            </div>
      </DndProvider>
        */
}
{
  /* https://www.copycat.dev/blog/react-drag-and-drop/ */
}
