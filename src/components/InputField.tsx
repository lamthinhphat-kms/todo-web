import React, { PropsWithChildren, useRef } from "react";
import "./styles.css";

type inputProp = PropsWithChildren<{
  task: string;
  setTaskList: React.Dispatch<React.SetStateAction<string>>;
  handleAdd: (e: React.FormEvent) => void;
}>;

function InputField(props: inputProp) {
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <form
      className="input"
      onSubmit={(e) => {
        props.handleAdd(e);
        inputRef.current?.blur();
      }}
    >
      <input
        ref={inputRef}
        type="input"
        placeholder="Input task"
        className="input_box"
        value={props.task}
        onChange={(e) => props.setTaskList(e.target.value)}
      />
      <button className="input_btn" type="submit">
        Add
      </button>
    </form>
  );
}

export default InputField;
