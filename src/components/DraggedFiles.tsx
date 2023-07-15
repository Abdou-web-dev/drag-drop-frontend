// import Papa, { ParseResult } from "papaparse";
import React from "react";
import { DroppableProvided } from "react-beautiful-dnd";
import { DraggedFileIcon } from "./DraggedFileIcon";
import { DraggedFileTable } from "./DraggedFileTable";
import "./drag_table.scss";

export const DraggedFiles = ({
  files,
  fileNames: filePaths,
  fileTypes,
  removeFile,
  tableColumns,
  setTableColumns,
  dropZoneRef,
  provided,
}: {
  files: File[];
  fileNames: string[];
  fileTypes: string[];
  removeFile: (file: string | number) => void;
  tableColumns: string[];
  setTableColumns: React.Dispatch<React.SetStateAction<string[]>>;
  dropZoneRef?: (element: HTMLElement | null) => void;
  provided?: DroppableProvided;
}) => {
  return (
    <>
      <div className="dragged-files-container">
        <table className="main-table">
          {/* display the uploaded files */}
          <>
            {files?.length ? (
              <thead className="t-head">
                <tr className="t-row">
                  <th scope="col">Uploaded Files : </th>
                </tr>
              </thead>
            ) : (
              <div>
                <span>No files have been yet uploaded !</span>
              </div>
            )}
            <>
              {filePaths ? (
                <tbody
                  className={`t-body`}
                  // ${!uploadedfiles?.length ? "classA" : "classB"}
                >
                  <tr className="t-row">
                    {filePaths?.map((path: string, index: number) => {
                      return (
                        <React.Fragment key={path}>
                          <div className="display-flex">
                            <DraggedFileIcon
                              {...{ path, removeFile, index, fileTypes, files }}
                            />
                            <DraggedFileTable
                              {...{
                                files,
                                index,
                                tableColumns,
                                setTableColumns,
                                dropZoneRef,
                                provided,
                              }}
                            />
                          </div>
                        </React.Fragment>
                      );
                    })}
                  </tr>
                </tbody>
              ) : null}
            </>
          </>
        </table>
      </div>
    </>
  );
};

// key={generateRandomId()}
// https://medium.com/how-to-react/how-to-parse-or-read-csv-files-in-reactjs-81e8ee4870b0
