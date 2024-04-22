function useCustomhook() {
  function insertnode(tree, folderId, item, isFolder) {
    if (tree.id === folderId && tree.isFolder) {
      tree.items.unshift({
        id: new Date().getTime(),
        name: item,
        isFolder: isFolder,
        items: [],
      });
    }
    let latestnode = [];
    latestnode = tree.items.map((node) => {
      return insertnode(node, folderId, item, isFolder);
    });

    return { ...tree, items: latestnode };
  }
  function editnode(tree, folderId, item) {
    if (tree.id === folderId) {
      tree.name = item;
    }
    let nextnodes = [];
    nextnodes = tree.items.map((node) => {
      return editnode(node, folderId, item);
    });
    return { ...tree, items: nextnodes };
  }

  function deletenode(tree, folderId) {
    if (tree.id === folderId) {
      return (tree = {});
    } else {
      let nextnodes = tree.items.map((node) => {
        return deletenode(node, folderId);
      });
      return { ...tree, items: nextnodes };
    }
  }
  return { insertnode, editnode, deletenode };
}

export default useCustomhook;
