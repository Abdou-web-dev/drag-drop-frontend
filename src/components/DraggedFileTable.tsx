import Papa, { ParseResult } from "papaparse";
import { useEffect, useState } from "react";
import { DroppableProvided } from "react-beautiful-dnd";
// import "./upload_styles.scss";

export function DraggedFileTable({
  index,
  files,
  tableColumns,
  setTableColumns,
  dropZoneRef,
  provided,
}: {
  index: number;
  files: File[];
  tableColumns: string[];
  setTableColumns: React.Dispatch<React.SetStateAction<string[]>>;
  dropZoneRef?: (element: HTMLElement | null) => void;
  provided?: DroppableProvided;
}) {
  // State to store parsed data
  const [parsedData, setParsedData] = useState([]);

  //State to store the values
  const [values, setValues] = useState<string[]>([]);

  useEffect(() => {
    if (files[index]) {
      Papa.parse(files[index], {
        header: true,
        skipEmptyLines: true,
        complete: function (results: ParseResult<any>) {
          const comlumnsArray: any[] = [];
          const valuesArray: any = [];

          // Iterating data to get column name and their values
          results.data.map((d: any) => {
            comlumnsArray.push(Object.keys(d));
            // console.log(comlumnsArray, "comlumnsArray");
            valuesArray.push(Object.values(d));
          });

          // Parsed Data Response in array format:
          let data: any = results.data;
          setParsedData(data);

          // Filtered Column Names
          // console.log(comlumnsArray, comlumnsArray[0], "comlumnsArray");
          setTableColumns(comlumnsArray[0]);
          // console.log(comlumnsArray[0], "comlumnsArray");

          // Filtered Values
          setValues(valuesArray);
        },
      });
    }
  }, [files]);

  console.log(tableColumns.length);

  return (
    <>
      {/* Table */}
      <table className="data-table-container">
        <thead>
          <tr>
            {tableColumns.map((columnCellKey, index) => {
              // console.log(typeof columnCellKey); string
              return <th key={columnCellKey}>{columnCellKey}</th>;
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
      </table>
      {/* <div
        ref={dropZoneRef}
        {...provided.droppableProps}
        style={{ border: "1px solid", width: "270px", height: "200px" }}
      ></div> */}
    </>
  );
}
