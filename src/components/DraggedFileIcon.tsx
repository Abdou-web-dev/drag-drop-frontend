import { Button, Tooltip } from "antd";
import Papa, { ParseResult } from "papaparse";
import { useEffect, useState } from "react";
import csv_logo from "../assets/img/csv_logo.svg";
import delete_icon from "../assets/img/delete_icon.svg";
// import "./upload_styles.scss";

export function DraggedFileIcon({
  path: pathUrl,
  index,
  removeFile,
  fileTypes,
  files,
}: {
  path: string;
  index: number;
  removeFile: (file: number | string) => void;
  fileTypes: string[];
  files: File[];
}) {
  // const pathUrl = (window.URL || window.webkitURL).createObjectURL(uplFileUrl);
  const [iconPath, seticonPath] = useState<string>("");

  useEffect(() => {
    switch (fileTypes[index]) {
      case "text/csv":
        seticonPath(csv_logo);
        break;
      default:
        // seticonPath(fallback_logo);
        break;
    }
  }, [fileTypes]);

  // State to store parsed data
  const [parsedData, setParsedData] = useState([]);

  //State to store table Column name
  const [tableRows, setTableRows] = useState([]);

  //State to store the values
  const [values, setValues] = useState([]);

  useEffect(() => {
    if (files[index]) {
      Papa.parse(files[index], {
        header: true,
        skipEmptyLines: true,
        complete: function (results: ParseResult<any>) {
          const rowsArray: any[] = [];
          const valuesArray: any = [];

          // Iterating data to get column name and their values
          results.data.map((d: any) => {
            rowsArray.push(Object.keys(d));
            valuesArray.push(Object.values(d));
          });

          // Parsed Data Response in array format:
          let data: any = results.data;
          setParsedData(data);

          // Filtered Column Names
          // console.log(rowsArray, rowsArray[0], "rowsArray");
          setTableRows(rowsArray[0]);

          // Filtered Values
          setValues(valuesArray);
        },
      });
    }
  }, [files]);

  let isCsv: boolean = fileTypes[index].toLowerCase().includes("csv");

  if (isCsv) {
    return (
      <>
        <td className="t-data csv-icon">
          {pathUrl !== "" && (
            <div className="uploaded-file-container">
              <>
                <div className="uploaded-file-tooltip-wrapper">
                  <Tooltip title={files[index]?.name}>
                    <img
                      className="uploaded-file-image"
                      width={"30px"}
                      height={"30px"}
                      src={iconPath}
                      alt={""}
                      // data-tooltip-id="my-anchor-element"
                    />
                  </Tooltip>
                </div>

                <Button
                  className="uploaded-file-delete-btn"
                  onClick={() => {
                    removeFile(pathUrl);
                  }}
                >
                  <img
                    width={"20px"}
                    height={"20px"}
                    src={delete_icon}
                    alt=""
                  />
                </Button>
              </>
            </div>
          )}
        </td>
      </>
    );
  } else return <span className="can-not">You can only upload csv Files</span>;
}
