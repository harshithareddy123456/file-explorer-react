import explorer from "./data/data";
import Component from "./Components/Component";
import { useState } from "react";
import useCustomhook from "./hooks/customHook";

function App() {
  const [exploredata, setExploredata] = useState(explorer);
  const { insertnode, editnode, deletenode } = useCustomhook();
  const handleInsertnode = (folderId, item, isFolder) => {
    const finaltree = insertnode(exploredata, folderId, item, isFolder);
    setExploredata(finaltree);
  };
  const handleeditnode = (folderId, item) => {
    const finaltree = editnode(exploredata, folderId, item);
    setExploredata(finaltree);
  };
  const handledeletenode = (folderId) => {
    const finaltree = deletenode(exploredata, folderId);
    setExploredata(finaltree);
  };
  return (
    <div>
      <Component
        explorer={exploredata}
        handleInsertdata={handleInsertnode}
        handleeditdata={handleeditnode}
        handledeletedata={handledeletenode}
      />
    </div>
  );
}

export default App;
