import { Divider } from "antd";
import { useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
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
import { DraggedFiles } from "./components/DraggedFiles";
import { TransformationRules } from "./components/TransformationRules";

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

  let rules = [
    {
      rule:
        tableColumns?.length === 3
          ? "Col2 = Col1 - Col3"
          : tableColumns?.length === 4
          ? "Col2 = Col1 - Col3 + Col4"
          : tableColumns?.length === 5
          ? "Col2 = Col1 - Col3 * Col4 - Col5"
          : "",

      id: 1,
    },
    {
      // rule: "Col3 = Col1 + Col2",
      rule:
        tableColumns?.length === 3
          ? "Col2 = Col1 - Col3"
          : tableColumns?.length === 4
          ? "Col2 = Col1 - Col3 + Col4"
          : tableColumns?.length === 5
          ? "Col2 = Col1 - Col3 * Col4 - Col5"
          : "",
      id: 2,
    },
    {
      // rule: "Col1 = Col2 / Col3",
      rule:
        tableColumns?.length === 3
          ? "Col2 = Col1 * Col3"
          : tableColumns?.length === 4
          ? "Col2 = Col1 + Col3 + Col4"
          : tableColumns?.length === 5
          ? "Col2 = Col1 / Col3 + Col4 - Col5"
          : "",
      id: 3,
    },
    {
      // rule: "Col3 = Col1 * Col2",
      rule:
        tableColumns?.length === 3
          ? "Col2 = Col1 - Col3"
          : tableColumns?.length === 4
          ? "Col2 = Col1 + Col3 * Col4"
          : tableColumns?.length === 5
          ? "Col2 = Col1 / Col3 / Col4 - Col5"
          : "",
      id: 4,
    },
    {
      // rule: "Col2 = Col3 * Col2",
      rule:
        tableColumns?.length === 3
          ? "Col2 = Col1 / Col3"
          : tableColumns?.length === 4
          ? "Col2 = Col1 + Col3 + Col4"
          : tableColumns?.length === 5
          ? "Col2 = Col1 + Col3 * Col4 - Col5"
          : "",
      id: 5,
    },
  ];
  const [storedItems, setStoredItems] = useState<
    {
      rule: string;
      id: number;
    }[]
  >(rules);

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
                  className="dragged-files-and-rules-inner"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  // style={{ border: "1px solid" }}
                >
                  <DraggedFiles
                    {...{
                      files,
                      fileNames,
                      fileTypes,
                      removeFile,
                      tableColumns,
                      setTableColumns,
                      provided,
                    }}
                    dropZoneRef={provided.innerRef}
                  />
                  <TransformationRules
                    {...{
                      files,
                      fileNames,
                      fileTypes,
                      tableColumns,
                      provided,
                      rules,
                    }}
                    // dropZoneRef={provided.innerRef}
                  />
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
