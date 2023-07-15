import { Divider } from "antd";
import { useState } from "react";
import { DragDropContext, Draggable } from "react-beautiful-dnd";
import { useFileUpload } from "react-use-file-upload/dist/lib/useFileUpload";
import "./App.css";
import "./App.scss";
import { StrictModeDroppable } from "./StrictModeDroppable";
import icon1 from "./assets/img/avatarmale28.png";
import icon2 from "./assets/img/avatarmale29.png";
import icon3 from "./assets/img/avatarmale30.png";
import icon4 from "./assets/img/avatarmale31.png";
import icon5 from "./assets/img/avatarmale32.png";
import { DragDropArea } from "./components/DragDropArea";

function App() {
  const {
    files,
    fileNames,
    fileTypes,
    handleDragDropEvent,
    clearAllFiles,
    createFormData,
    setFiles,
    removeFile,
  } = useFileUpload();

  //State to store table Column name
  const [tableColumns, setTableColumns] = useState<string[]>([]);
  const namesData = [
    {
      name: "icon1",
      imageUrl: icon1,
      id: "1",
    },
    {
      name: "icon2",
      imageUrl: icon2,
      id: 2,
    },
    {
      name: "icon3",
      imageUrl: icon3,
      id: 3,
    },
    {
      name: "icon4",
      imageUrl: icon4,
      id: 4,
    },
    {
      name: "icon5",
      imageUrl: icon5,
      id: 5,
    },
  ];
  const [storedItems, setStoredItems] = useState(namesData);

  function handleOnDragEnd(result: any): void {
    console.log("handleOnDragEnd called");
    const items = Array.from(storedItems);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setStoredItems(items);
  }

  return (
    <div className="App app-container">
      <DragDropArea {...{ handleDragDropEvent, setFiles }} />
      <Divider style={{ width: "50vw", backgroundColor: "black" }}></Divider>
      <div className="dragged-files-and-rules-container">
        <DragDropContext
          onDragEnd={handleOnDragEnd}
          // onDragStart={() => {}}
        >
          <StrictModeDroppable droppableId="droppable-1">
            {(provided) => (
              <>
                <div
                  className="flex-center"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  style={{ maxWidth: "250px", border: "1px solid" }}
                >
                  {storedItems?.map((item, index) => {
                    return (
                      <Draggable
                        key={item?.id}
                        draggableId={item?.id.toString()}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            className="items"
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <img src={item.imageUrl} alt="img" />
                            <p>{item.name}</p>
                          </div>
                        )}
                      </Draggable>
                    );
                  })}

                  {provided.placeholder}
                </div>
              </>
            )}
          </StrictModeDroppable>
        </DragDropContext>
      </div>
    </div>
  );
}

export default App;
