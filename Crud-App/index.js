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
        return smallBlockUI(issue);
      });
    }
    return data;
  };

  // remove an item from the array of objects from localSotrage and also th UI
  const removeFromLocalStorage = (id) => {
    const index = issues.findIndex((is) => is.id === id);
    issues.splice(index, 1);
    localStorage.setItem("Issue", JSON.stringify(issues));
  };

  // the smallBlock Ui
  const smallBlockUI = (issue, id) => {
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
    const small = newBlock.querySelector(".small-block");

    btnDelete.addEventListener("click", () => {
      removeFromLocalStorage(id);
      newBlock.parentNode.removeChild(newBlock);
    });

    return smallBlock.appendChild(newBlock);
  };

  const data = JSON.parse(localStorage.getItem("Issue"));
  LoadDataLocalStorageHandler(data);

  // add users input to the Ui and localStorage
  add.addEventListener("click", (e) => {
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

    smallBlockUI(issue, id);

    desc.value = "";
    assign.value = "";
  });
});
