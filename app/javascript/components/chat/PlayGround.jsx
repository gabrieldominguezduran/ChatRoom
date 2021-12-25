import React, { useState, useEffect, useContext } from "react";
import { ActiveRoomContext } from "../ActiveRoomContext";
import Editor from "./Editor";

export default function PlayGround() {
  const { activeRoom } = useContext(ActiveRoomContext);
  const [language, setLanguage] = useState("xml");
  const [html, setHtml] = useState("");
  const [css, setCss] = useState("");
  const [js, setJs] = useState("");
  const [srcDoc, setSrcDoc] = useState("");

  useEffect(() => {
    const { play_ground } = activeRoom;
    if (play_ground) {
      setHtml(play_ground.html_code);
      setCss(play_ground.css_code);
      setJs(play_ground.js_code);
    }
    setSrcDoc("");
  }, [activeRoom]);

  // useEffect(() => {
  //   const timeout = setTimeout(() => {
  //     updatePlayGround();
  //   }, 500);
  //   return () => clearTimeout(timeout);
  // }, [html, css, js]);

  const updatePlayGround = async () => {
    const { play_ground } = activeRoom;
    if (play_ground) {
      play_ground.html_code = html;
      play_ground.css_code = css;
      play_ground.js_code = js;

      const data = { play_ground };
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      };
      try {
        await fetch(`/update_playground`, requestOptions);
      } catch (error) {
        console.log("error", error);
      }
    }
  };

  const runCode = () => {
    const src = `
    <html>
      <body>${html}</body>
      <style>${css}</style>
      <script>${js}</script>
    </html>
  `;

    setSrcDoc(src);
    updatePlayGround();
  };

  return (
    <section className="card col-md-12 col-lg-4 editor">
      {activeRoom && !activeRoom.id ? (
        <div className="text-white bg-dark editor__playGround">
          <h1 className="editor__title">PlayGround</h1>
        </div>
      ) : (
        <>
          <div className="editor__selector">
            <select
              name="language"
              className="editor__language form-select"
              onChange={(e) => setLanguage(e.target.value)}
            >
              <option value="xml">HTML</option>
              <option value="css">CSS</option>
              <option value="javascript">JS</option>
            </select>
            <button className="btn editor__btn" onClick={runCode}>
              Run
            </button>
          </div>

          {language && language === "xml" ? (
            <Editor language={language} value={html} onChange={setHtml} />
          ) : null}
          {language && language === "css" ? (
            <Editor language={language} value={css} onChange={setCss} />
          ) : null}
          {language && language === "javascript" ? (
            <Editor language={language} value={js} onChange={setJs} />
          ) : null}
          <div className="editor__iframe mt-2">
            <iframe
              srcDoc={srcDoc}
              title="output"
              sandbox="allow-scripts"
              frameBorder="0"
              width="100%"
              height="100%"
            />
          </div>
        </>
      )}
    </section>
  );
}
