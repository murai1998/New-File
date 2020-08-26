import * as React from "react";
const ALL_NAMES = ["foo", "bar", "baz"];
interface NameListItemProps {
  readonly name: string;
  readonly onNameClick: (clickedName: string) => void;
}const NameListItem: React.FC<NameListItemProps> = (props: NameListItemProps) => (
  <li>
    <button onClick={() => props.onNameClick(props.name)}>{props.name}</button>
  </li>
);const NameList: React.FC = () => {
  const [lastClickedName, setLastClickedName] = React.useState
  <string | undefined>(undefined);  const onNameClick = (clickedName: string) => {
    setLastClickedName(clickedName);
  };  return (
    <div>
      <h1>
        {lastClickedName === undefined
          ? "No Name Clicked Yet"
          : lastClickedName}
      </h1>
      <ul>
        {ALL_NAMES.map((name: string, idx: number) => (
          <NameListItem key={idx} name={name} onNameClick={onNameClick} />
        ))}
      </ul>
    </div>
  );
};
