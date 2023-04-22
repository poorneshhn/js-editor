import "./code-editor.css";
import { FC, useRef } from "react";
import MonacoEditor, { EditorDidMount } from "@monaco-editor/react";
import prettier from "prettier";
import parser from "prettier/parser-babel";
import codeShift from "jscodeshift";
import Highlighter from "monaco-jsx-highlighter";
import "./syntax.css";
interface codeEditorInitialProps {
  initialValue: string;
  onChange: (value: string) => void;
}

const CodeEditor: FC<codeEditorInitialProps> = ({
  onChange,
  initialValue,
}): JSX.Element => {
  const editorRef = useRef<any>();
  const onEditorDidMount: EditorDidMount = (
    getValue,
    monacoEditorReference
  ) => {
    editorRef.current = monacoEditorReference;
    monacoEditorReference.onDidChangeModelContent(() => {
      onChange(getValue());
    });

    const highlighter = new Highlighter(
      // @ts-ignore
      window.monaco,
      codeShift,
      monacoEditorReference
    );

    highlighter.highLightOnDidChangeModelContent(
      () => {},
      () => {},
      undefined,
      () => {}
    );
  };

  const formatOnClick = () => {
    // get the value
    const unformattedCode = editorRef.current.getModel().getValue();
    // format the value
    const formattedCode = prettier
      .format(unformattedCode, {
        parser: "babel",
        plugins: [parser],
        useTabs: false,
        singleQuote: true,
        semi: true,
      })
      .replace(/\n$/, "");
    // set the value
    if (unformattedCode === formattedCode) return;
    editorRef.current.setValue(formattedCode);
  };

  return (
    <div className="editor-wrapper">
      <button
        className="button button-format is-primary is-small"
        onClick={formatOnClick}
      >
        Format
      </button>
      <MonacoEditor
        editorDidMount={onEditorDidMount}
        value={initialValue}
        options={{
          wordWrap: "on",
          minimap: {
            enabled: false,
          },
          showUnused: false,
          fontSize: 16,
          scrollBeyondLastLine: false,
          folding: false,
          lineNumbersMinChars: 3,
          automaticLayout: true,
        }}
        language="javascript"
        theme="dark"
        width={"100%"}
        height={"100%"}
      />
    </div>
  );
};

export default CodeEditor;
