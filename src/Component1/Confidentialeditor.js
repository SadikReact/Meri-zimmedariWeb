import React, { useState } from "react";
import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Link, useNavigate } from "react-router-dom";
import Mynavbar from "./Mynavbar";
const Confidentialeditor = () => {
  const navigate = useNavigate();
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const onEditorStateChange = newEditorState => {
    console.log(newEditorState);
    setEditorState(newEditorState);
  };
  const handleNext = () => {
    navigate("/confidentialnote");
  };
  return (
    <>
      <Mynavbar />
      <div>
        <p
          style={{
            fontSize: "22px",
            color: "rgb(43, 77, 129)",
            fontWeight: "400",
            backgroundImage:
              "linear-gradient(to right, rgb(194, 215, 233) , rgb(229, 234, 238))",
          }}
        >
          <span className="ml-3">My Account </span>
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              class="bi bi-arrow-right"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"
              />
            </svg>
          </span>
          <span> Confidential Note</span>
        </p>
      </div>

      <div className="container">
        <div
          style={{
            border: "1px solid rgb(201, 198, 198)",
            padding: "20px",
            height: "25rem",
            overflow: "auto",
          }}
        >
          <Editor
            toolbarClassName="demo-toolbar-absolute"
            wrapperClassName="demo-wrapper"
            editorClassName="demo-editor"
            editorState={editorState}
            onEditorStateChange={onEditorStateChange}
            toolbar={{
              options: ["inline", "blockType", "fontSize", "fontFamily"],
              inline: {
                options: [
                  "bold",
                  "italic",
                  "underline",
                  "strikethrough",
                  "monospace",
                ],
                bold: { className: "bordered-option-classname" },
                italic: { className: "bordered-option-classname" },
                underline: { className: "bordered-option-classname" },
                strikethrough: {
                  className: "bordered-option-classname",
                },
                code: { className: "bordered-option-classname" },
              },
              blockType: {
                className: "bordered-option-classname",
              },
              fontSize: {
                className: "bordered-option-classname",
              },
              fontFamily: {
                className: "bordered-option-classname",
              },
            }}
          />
        </div>

        <div className="container mt-2">
          <div style={{ float: "left" }}>
            <Link to={"/"}>
              <p
                style={{
                  color: "rgb(82, 114, 161)",
                  fontSize: "20px",
                  fontWeight: "500",
                }}
              >
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    class="bi bi-arrow-left"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"
                    />
                  </svg>
                </span>
                <span className="ml-3">BACK</span>
              </p>
            </Link>
          </div>
          <div style={{ float: "right", bottom: "0px" }}>
            <button
              onClick={handleNext}
              style={{
                border: "none",
                backgroundColor: "rgb(182, 205, 236)",
                padding: "8px",
                width: "8rem",
                borderRadius: "5px",
              }}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Confidentialeditor;
