const sendTaskToSheet = async () => {
  try {
    const response = await fetch("https://script.google.com/macros/s/AKfycbzagIEii0xJrAJ8ZujSbYz_j0Qk5P0B99LQa7pgPDMwiglSq2uJtHefNOfLsF2zy5HX/exec", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        taskTitle: "Design Poster",
        priority: 5,
        vertical: "Design",
        description: "Create poster for hackathon",
        assignedMember: "Arjun",
        estimatedTime: "2 hours",
        deadline: "2026-01-15",
      }),
    });

    const result = await response.json();
    console.log("Success:", result);
  } catch (error) {
    console.error("Error sending task:", error);
  }
};
