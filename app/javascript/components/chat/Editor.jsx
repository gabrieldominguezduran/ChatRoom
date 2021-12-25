import React from "react";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import "codemirror/mode/xml/xml";
import "codemirror/mode/javascript/javascript";
import "codemirror/mode/css/css";
import { Controlled as CodeMirror } from "react-codemirror2";

export default function Editor(props) {
  const { language, value, onChange } = props;

  function handleChange(editor, data, value) {
    onChange(value);
  }
  return (
    <CodeMirror
      value={value}
      options={{
        mode: language,
        lint: true,
        lineNumbers: true,
        lineWrapping: true,
        theme: "material",
      }}
      onBeforeChange={handleChange}
    />
  );
}
