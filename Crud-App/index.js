window.addEventListener("load", (e) => {
  e.preventDefault();

  //reference the dom
  const smallBlock = document.getElementById("smallBlock");
  const add = document.getElementById("add");
  const desc = document.getElementById("desc");
  const assign = document.getElementById("assign");
  let severity = document.getElementById("severity");

  const issues = [];

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
    const index = issues.findIndex((is) => is.id === id);
    issues.splice(index, 1);
    localStorage.setItem("Issue", JSON.stringify(issues));
  };

  // remove an item from the array of objects from localSotrage and also th UI
  const removeFromLocalStorageHandler = (id, newBlock) => {
    removeFromLocalStorage(id);
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
  };

  //edit post
  const editPostUiHandler = (id, issueLS) => {
    const data = localStorage.getItem("Issue");
    const issueId = issueLS.find((is) => is.id === id);
    let filterId = JSON.parse(data).find((issue) => issue.id === issueId.id);
    desc.value = filterId.description;
    severity.options[severity.selectedIndex].text = filterId.severity;
    assign.value = filterId.assigned;
    inEditMode();
  };

  //  Post UI
  const smallBlockUI = (issue, id, data) => {
    console.log(data);
    const newBlock = document.createElement("div");
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
    const small = newBlock.querySelector(".small-block");

    btnDelete.addEventListener("click", () =>
      removeFromLocalStorageHandler(id, newBlock)
    );

    btnEdit.addEventListener("click", () => editPostUiHandler(id, data));

    return smallBlock.appendChild(newBlock);
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
    issues.push(issue);
    let issueLS = localStorage.getItem("Issue");
    if (issueLS === null) {
      localStorage.setItem(`Issue`, JSON.stringify(issues));
    } else {
      let data = JSON.parse(issueLS);
      data.push(issue);
      localStorage.setItem("Issue", JSON.stringify(data));
    }

    let data = JSON.parse(localStorage.getItem("Issue"));

    smallBlockUI(issue, id, data);

    desc.value = "";
    assign.value = "";
  };

  const data = JSON.parse(localStorage.getItem("Issue"));
  LoadDataLocalStorageHandler(data);

  // add users input to the Ui and localStorage
  add.addEventListener("click", (e) => addPostHandler(e));

  // back button
  document
    .querySelector("#back")
    .addEventListener("click", (e) => outEditMode(e));
});
