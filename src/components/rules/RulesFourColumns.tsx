import { Draggable, DroppableProvided } from "react-beautiful-dnd";
import "./rules.scss";

export const RulesFourColumns = ({
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
