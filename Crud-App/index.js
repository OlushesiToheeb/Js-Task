const smallBlock = document.getElementById("smallBlock");
const add = document.getElementById("add");
const desc = document.getElementById("desc");
const assign = document.getElementById("assign");
let severity = document.getElementById("severity");

function generateId() {
  return (
    Math.random().toString(36).substring(2) + new Date().getTime().toString(36)
  );
}

const issues = [];

add.addEventListener("click", (e) => {
  e.preventDefault();

  const id = generateId();
  const issue = {
    id,
    description: desc.value,
    severity: severity.options[severity.selectedIndex].text,
    assigned: assign.value,
  };
  issues.push(issue);

  const newBlock = document.createElement("div");
  newBlock.classList.add("small-block");
  newBlock.innerHTML = `
    <h4 class='issue-id'>Issue ID: ${issue.id}</h4>
    <h2 class='description'>${issue.description}</h2>
    <p>Severity: ${issue.severity}</p>
    <p>Assigned: ${issue.assigned}</p>
    <button class="delete"><i class="fa fa-trash"></i></button>
  `;

  smallBlock.appendChild(newBlock);

  const btnDelete = newBlock.querySelector(".delete");
  const small = newBlock.querySelector(".small-block");

  btnDelete.addEventListener("click", () => {
    const index = issues.findIndex((is) => is.id === id);
    issues.splice(index, 1);
    newBlock.parentNode.removeChild(newBlock);
  });
});
