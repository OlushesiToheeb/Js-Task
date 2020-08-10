window.addEventListener("load", () => {
  const smallBlock = document.getElementById("smallBlock");

  function generateId() {
    return (
      Math.random().toString(36).substring(2) +
      new Date().getTime().toString(36)
    );
  }

  const issues = [
    {
      id: generateId(),
      description: "Fight",
      severity: "Low",
      assigned: "John",
    },
    {
      id: generateId(),
      description: "Freedom",
      severity: "High",
      assigned: "Fred",
    },
    {
      id: generateId(),
      description: "War",
      severity: "Medium",
      assigned: "Dart",
    },
  ];

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
