window.addEventListener("load", (e) => {
  e.preventDefault();

  //reference the dom
  const smallBlock = document.getElementById("smallBlock");
  const searchBlock = document.getElementById("searchResult");
  const add = document.getElementById("add");
  const desc = document.getElementById("desc");
  const assign = document.getElementById("assign");
  let severity = document.getElementById("severity");
  const selectFilter = document.getElementById("filter");
  const search = document.getElementById("search");

  const issues = [];
  let filterId = "";
  let inEditingElement = null;
  let searchField = null;

  // generate unique id
  function generateId() {
    return (
      Math.random().toString(36).substring(2) +
      new Date().getTime().toString(36)
    );
  }

  //load data from localStorage
  const LoadDataLocalStorageHandler = (data) => {
    if (data === null) {
      alert("localStorage is empty!");
    } else {
      data.map((issue) => {
        return smallBlockUI(issue, issue.id, data);
      });
    }
    return data;
  };

  // remove an item from the array of objects from localSotrage
  const removeFromLocalStorage = (id) => {
    const data = JSON.parse(localStorage.getItem("Issue"));
    const index = data.findIndex((is) => is.id === id);
    data.splice(index, 1);
    localStorage.setItem("Issue", JSON.stringify(data));
  };

  // remove an item from the array of objects from localSotrage and also th UI
  const removeFromLocalStorageHandler = (newBlock) => {
    newBlock.parentNode.removeChild(newBlock);
  };

  const inEditMode = () => {
    document.querySelector("#add").classList.add("ds-none");
    document.querySelector("#update").classList.remove("ds-none");
    document.querySelector("#back").classList.remove("ds-none");
  };

  const outEditMode = (e) => {
    e.preventDefault();
    document.querySelector("#add").classList.remove("ds-none");
    document.querySelector("#update").classList.add("ds-none");
    document.querySelector("#back").classList.add("ds-none");
    desc.value = "";
    assign.value = "";
    inEditingElement = null;
  };

  //edit post
  const editPostHandler = (e, id, issueLS, block) => {
    e.preventDefault();
    const data = localStorage.getItem("Issue");
    const issueId = issueLS.find((is) => is.id === id);
    filterId = JSON.parse(data).find((issue) => issue.id === issueId.id);
    desc.value = filterId.description;
    severity.options[severity.selectedIndex].text = filterId.severity;
    assign.value = filterId.assigned;
    inEditingElement = block;
    inEditMode();
  };

  const updatePost = (e) => {
    e.preventDefault();
    const data = JSON.parse(localStorage.getItem("Issue"));
    const issueId = data.find((is) => is.id === filterId.id);
    issueId.description = desc.value;
    issueId.severity = severity.options[severity.selectedIndex].text;
    issueId.assigned = assign.value;
    localStorage.setItem("Issue", JSON.stringify(data));
    updatePostUI(data, issueId);
    outEditMode(e);
  };

  const updatePostUI = (data, issueId) => {
    postUi(inEditingElement, issueId, issueId.id, data);
  };

  const postUi = (newBlock, issue, id, data) => {
    newBlock.classList.add("small-block");
    newBlock.innerHTML = `
      <h4 class='issue-id'>Issue ID: ${issue.id}</h4>
      <h2 class='description'>${issue.description}</h2>
      <p>Severity: ${issue.severity}</p>
      <p>Assigned: ${issue.assigned}</p>
      <button class="edit"><i class="fa fa-pencil"></i> Edit</button>
      <button class="delete"><i class="fa fa-trash"></i> Delete</button>
    `;
    const btnDelete = newBlock.querySelector(".delete");
    const btnEdit = newBlock.querySelector(".edit");

    btnDelete.addEventListener("click", (e) => {
      removeFromLocalStorageHandler(newBlock);
      removeFromLocalStorage(id);
      e.preventDefault();
    });

    btnEdit.addEventListener("click", (e) =>
      editPostHandler(e, id, data, newBlock)
    );
  };

  //  Post UI
  const smallBlockUI = (issue, id, data) => {
    const newBlock = document.createElement("div");
    postUi(newBlock, issue, id, data);

    return smallBlock.appendChild(newBlock);
  };

  const searchBlockUI = (issue, id, data) => {
    const newBlock = document.createElement("div");
    postUi(newBlock, issue, id, data);

    return searchBlock.appendChild(newBlock);
  };

  // add post to ui
  const addPostHandler = (e) => {
    const id = generateId();
    e.preventDefault();
    let issue = {
      id,
      description: desc.value,
      severity: severity.options[severity.selectedIndex].text,
      assigned: assign.value,
    };

    let issueLS = localStorage.getItem("Issue");

    if (issueLS === null) {
      issues.push(issue);
      localStorage.setItem(`Issue`, JSON.stringify(issues));
    } else {
      let data = JSON.parse(issueLS);
      data.push(issue);
      issues.push(issue);
      localStorage.setItem("Issue", JSON.stringify(data));
      smallBlockUI(issue, id, issues);
    }

    desc.value = "";
    assign.value = "";
  };

  selectFilter.addEventListener("change", (e) => {
    e.preventDefault();
    searchField = e.target.value;
  });

  search.addEventListener("change", (e) => {
    e.preventDefault();
    const filteredIssue = issues
      .filter((issue) => issue[searchField.toLowerCase()] === e.target.value)
      .map((issue) => {
        searchBlock.classList.add("search");
        searchBlockUI(issue, issue.id, issues);
      });
  });

  const data = JSON.parse(localStorage.getItem("Issue"));
  data.forEach((issue) => {
    issues.push(issue);
  });
  LoadDataLocalStorageHandler(issues);

  // add users input to the Ui and localStorage
  add.addEventListener("click", (e) => addPostHandler(e));

  // back button
  document
    .querySelector("#back")
    .addEventListener("click", (e) => outEditMode(e));

  // update post
  document
    .querySelector("#update")
    .addEventListener("click", (e) => updatePost(e));
});
