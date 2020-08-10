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

add.addEventListener("click", (e) => {
  e.preventDefault();
  let issues = [];
  let issue = {
    id: generateId(),
    description: desc.value,
    severity: severity.options[severity.selectedIndex].text,
    assigned: assign.value,
  };
  issues.push(issue);

  let block = issues.map((issue) => {
    return `
        <div class="small-block">
          <h4 class='issue-id'>Issue ID: ${issue.id}</h4>
          <h2 class='description'>${issue.description}</h2>
          <p>Severity: ${issue.severity}</p>
          <p>Assigned: ${issue.assigned}</p>
          <button id="delete">Delete</button>
        </div>
      `;
  });

  smallBlock.innerHTML = block;
});
