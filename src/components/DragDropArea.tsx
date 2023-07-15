import { Button } from "antd";
import { LegacyRef, useRef } from "react";
import arrow_down from "../assets/img/arrow-down.svg";
import upload_icon from "../assets/img/upload_icon.svg";

export const DragDropArea = ({
  handleDragDropEvent,
  setFiles,
}: {
  handleDragDropEvent: (e: Event) => void;
  setFiles: (e: Event) => void;
}) => {
  const inputRef:
    | React.MutableRefObject<undefined>
    | LegacyRef<HTMLInputElement>
    | any = useRef();

  return (
    <>
      <div className="drag-drop-area-container">
        <div
          className="drag-drop-area"
          style={{ border: "1px solid lightgray" }}
          onDragEnter={(e: any) => {
            //fires when the mouse's coursor has entered the droppable area
            handleDragDropEvent(e);
          }}
          onDragOver={(e: any) => {
            //fires when the mouse's coursor is hovering on the droppable area
            handleDragDropEvent(e);
          }}
          onDrop={(e: any) => {
            //fires when the files are droppoed into the area
            handleDragDropEvent(e);
            setFiles(e);
            console.log("onDrop fired");
          }}
          // onDragLeave={() => setDragDropClassName("")}
        >
          <p>Drag and drop files here : </p>
          <div className="arrow-text">
            <img width={`64px`} height={`30px`} src={arrow_down} alt="" />
            <span>Accepted files : csv</span>
          </div>
        </div>

        <div className="upload-btn-wrapper">
          <Button
            className={`upload-btn`}
            onClick={() => {
              inputRef.current.click();
              // console.log("upload btn clicked");
            }}
          >
            <img src={upload_icon} alt="" />
            <span>Upload :</span>
          </Button>
        </div>

        <div>
          {/* Hide the crappy looking default HTML input */}
          <>
            <input
              ref={inputRef}
              type="file"
              multiple
              style={{ display: "none" }}
              onChange={(e: React.ChangeEvent<HTMLInputElement> | any) => {
                setFiles(e);
                inputRef.current.value = null;
              }}
            />
          </>
        </div>
      </div>
    </>
  );
};
