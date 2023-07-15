import { Collapse, CollapseProps } from "antd";
import { DroppableProvided } from "react-beautiful-dnd";
import "./drag_table.scss";
import { RulesFiveColumns } from "./rules/RulesFiveColumns";
import { RulesFourColumns } from "./rules/RulesFourColumns";
import { RulesThreeColumns } from "./rules/RulesThreeColumns";
// import { RulesThreeColumns } from "./rules/RulesThreeColumns";

export const TransformationRules = ({
  files,
  fileNames: filePaths,
  fileTypes,
  tableColumns,
  provided,
  rules,
}: {
  files: File[];
  fileNames: string[];
  fileTypes: string[];
  tableColumns: string[];
  provided: DroppableProvided;
  rules: {
    rule: string;
    id: number;
  }[];
}) => {
  const items: CollapseProps["items"] = [
    {
      key: "1",
      label: "When 3 colmuns",
      children: <RulesThreeColumns {...{ tableColumns, provided, rules }} />,
      collapsible: tableColumns?.length === 3 ? "header" : "disabled",
    },
    {
      key: "2",
      label: "When 4 colmuns",
      children: <RulesFourColumns {...{ tableColumns, provided, rules }} />,
      collapsible: tableColumns?.length === 4 ? "header" : "disabled",
    },
    {
      key: "3",
      label: "When 5 colmuns",
      children: <RulesFiveColumns {...{ tableColumns, provided, rules }} />,
      collapsible: tableColumns?.length === 5 ? "header" : "disabled",
    },
  ];
  const onChange = (key: string | string[]) => {
    console.log(...key);
  };
  return (
    <>
      <div
        className={
          files.length ? "rules-container" : "rules-container no-files-rules"
        }
      >
        <div>
          <Collapse
            collapsible={!files.length ? "disabled" : "header"}
            items={items}
            onChange={onChange}
            // defaultActiveKey={["1"]}
            // activeKey={key}
          />
        </div>
      </div>
    </>
  );
};
