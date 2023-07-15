import { Button, Table, Tooltip } from "antd";
import { ColumnsType } from "antd/es/table";
import Papa, { ParseResult } from "papaparse";
import React, { useEffect, useState } from "react";
// import csv_logo from "../assets/img/csv_logo.svg";
// import delete_icon from "../assets/img/delete_icon.svg";
// import "./upload_styles.scss";

export function DraggedFile({
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
        // seticonPath(csv_logo);
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
  const [values, setValues] = useState<any | number[]>([]);

  useEffect(() => {
    if (files[index]) {
      Papa.parse(files[index], {
        header: true,
        skipEmptyLines: true,
        complete: function (results: ParseResult<any>) {
          const rowsArray: any[] = [];
          const valuesArray: number[] | any = [];

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

  function getItem(
    key: React.Key,
    column1: number,
    column2: number,
    column3: number
  ): DataType | any {
    if (column1 && column2 && column3) {
      return {
        key,
        column1,
        column2,
        column3,
      } as DataType;
    } else return;
  }

  let tableValues =
    values !== undefined &&
    values[0]?.map((value: any) => {
      // console.log(values, values[0], value, "value");
      if (value) {
        return value;
      }
      value?.map((val: any) => {
        if (val) return val;
      });
    });
  // console.log(tableValues[1], " tableValues[1]");

  // const { lala } = tableValues[1] || {};
  // console.log(lala, "lala");

  const data: DataType[] = [
    getItem(
      "1",
      tableValues[1] !== undefined && tableValues[1],
      tableValues[1] !== undefined && tableValues[1],
      tableValues[1] !== undefined && tableValues[1]
    ),
  ];

  const columns: ColumnsType<DataType> = [
    {
      title: "Column 1",
      // dataIndex: "name",
      key: "key1",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Column 2",
      // dataIndex: "age",
      key: "key2",
    },
    {
      title: "Column 3",
      // dataIndex: "address",
      key: "key3",
    },
  ];

  interface DataType {
    key: React.Key;
    column1: number;
    column2: number;
    column3: number;
    // tags: string[];
  }

  if (isCsv) {
    return (
      <>
        <td
          className="t-data"
          style={{
            borderLeft: "1px solid black",
            borderRight: "1px solid black",
          }}
          // key={path}
        >
          {pathUrl !== "" && (
            <div className="uploaded-file-container">
              <>
                <div className="uploaded-file-tooltip-wrapper">
                  <Tooltip title={files[index]?.name}>
                    <img
                      className="uploaded-file-image"
                      width={"40px"}
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
                    width={"25px"}
                    height={"25px"}
                    // src={delete_icon}
                    alt=""
                  />
                </Button>
              </>
            </div>
          )}
        </td>

        <div>
          <Table columns={columns} dataSource={tableValues && data} />

          {/* <table>
            <thead>
              <tr>
                {tableRows.map((rows, index) => {
                  return <th key={index}>{rows}</th>;
                })}
              </tr>
            </thead>
            <tbody>
              {values.map((value: any, index) => {
                return (
                  <tr key={index}>
                    {value.map((val: any, i: number) => {
                      return <td key={i}>{val}</td>;
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table> */}
        </div>
      </>
    );
  } else return <span className="can-not">You can only upload csv Files</span>;
}

// npm i @tanstack/react-table
