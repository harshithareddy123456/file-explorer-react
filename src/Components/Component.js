import React, { useEffect, useState } from "react";
import "../styles/styles.css";

export default function Component(props) {
  const { explorer, handleInsertdata, handleeditdata, handledeletedata } =
    props;
  console.log(explorer.isFolder);
  const [expand, setExpand] = useState(false);
  const [edit, setisEdit] = useState(false);
  const [editvalue, setEditvalue] = useState(explorer.name);
  const [create, setCreate] = useState({
    visible: false,
    isFolder: false,
  });
  useEffect(() => {
    if (!expand) {
      setCreate({
        visible: false,
        isFolder: false,
      });
    }
  }, [expand]);
  const handleFolder = (e, isFolder) => {
    e.stopPropagation();
    setExpand(true);
    setCreate({
      visible: true,
      isFolder,
    });
  };
  const handleaddfolder = (e) => {
    if (e.keyCode === 13) {
      let value = e.target.value;
      handleInsertdata(explorer.id, value, create.isFolder);
      setCreate({ ...create, visible: false });
    }
  };
  const handleeditchange = (e) => {
    e.stopPropagation();
    setEditvalue(e.target.value);
  };
  const handleeditfolder = (e) => {
    e.stopPropagation();
    if (e.keyCode === 13) {
      handleeditdata(explorer.id, editvalue);
      setisEdit(false);
    }
  };
  const handleInputclick = (e) => {
    e.stopPropagation();
  };
  const handledelete = (e) => {
    e.stopPropagation();
    handledeletedata(explorer.id);
  };
  return (
    <>
      {explorer && explorer.isFolder ? (
        <>
          <div onClick={() => setExpand(!expand)} className="folder">
            <div>
              📁
              {!edit ? (
                explorer.name
              ) : (
                <span>
                  <input
                    onChange={(e) => handleeditchange(e)}
                    onKeyDown={(e) => handleeditfolder(e)}
                    type="text"
                    value={editvalue}
                    onBlur={() => setisEdit(false)}
                    onClick={(e) => handleInputclick(e)}
                  ></input>
                </span>
              )}
            </div>
            <div className="buttons">
              <button
                className="icons"
                onClick={(e) => {
                  e.stopPropagation();
                  setisEdit(true);
                  setEditvalue(explorer.name);
                }}
              >
                ✏️
              </button>
              <button className="icons" onClick={(e) => handledelete(e)}>
                🗑️
              </button>
              <button
                style={{ marginRight: "10px" }}
                onClick={(e) => handleFolder(e, true)}
              >
                Folder ➕
              </button>
              <button onClick={(e) => handleFolder(e, false)}>File ➕</button>
            </div>
          </div>
          {expand && (
            <div style={{ marginLeft: "10px" }}>
              {create.visible ? (
                create.isFolder ? (
                  <div>
                    📁
                    <input
                      onBlur={() => setCreate({ ...create, visible: false })}
                      type="text"
                      onKeyDown={(e) => handleaddfolder(e)}
                    ></input>
                  </div>
                ) : (
                  <div>
                    📄
                    <input
                      onBlur={() => setCreate({ ...create, visible: false })}
                      type="text"
                      onKeyDown={(e) => handleaddfolder(e)}
                    ></input>
                  </div>
                )
              ) : null}
              {explorer.items.map((item) => (
                <Component
                  handledeletedata={handledeletedata}
                  handleeditdata={handleeditdata}
                  handleInsertdata={handleInsertdata}
                  explorer={item}
                  key={item.id}
                />
              ))}
            </div>
          )}
        </>
      ) : explorer.isFolder !== undefined ? (
        <div className="file">
          <div>
            📄
            {!edit ? (
              explorer.name
            ) : (
              <span>
                <input
                  onChange={(e) => handleeditchange(e)}
                  onKeyDown={(e) => handleeditfolder(e)}
                  type="text"
                  value={editvalue}
                  onBlur={() => setisEdit(false)}
                  onClick={(e) => handleInputclick(e)}
                ></input>
              </span>
            )}
          </div>
          <div>
            <button
              className="icons"
              onClick={(e) => {
                e.stopPropagation();
                setisEdit(true);
                setEditvalue(explorer.name);
              }}
            >
              ✏️
            </button>
            <button className="icons" onClick={(e) => handledelete(e)}>
              🗑️
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}
