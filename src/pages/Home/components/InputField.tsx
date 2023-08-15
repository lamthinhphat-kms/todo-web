import React, { PropsWithChildren, useContext, useRef } from "react";
import "./styles.css";
import { AuthContext } from "../../../context/AuthContext";

type inputProp = PropsWithChildren<{
  task: string;
  setTaskList: React.Dispatch<React.SetStateAction<string>>;
  handleAdd: (e: React.FormEvent) => void;
}>;

function InputField(props: inputProp) {
  const { logout } = useContext(AuthContext);
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <form
      className="input"
      onSubmit={(e) => {
        props.handleAdd(e);
        inputRef.current?.blur();
        // logout();
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
