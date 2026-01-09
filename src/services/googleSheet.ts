const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbzSlQg4HsVlQE3_x8ZOiSeAVw9mlXK8Xe8jnNAmNLWH89-mH1TRkin23iNkgrtQFzjs/exec";

export async function createTaskInSheet(payload: {
  TaskTitle: string;
  Priority: number;
  Vertical: string;
  Description?: string;
  EstimatedTime?: string;
  Deadline: string;
  Status: string;
}) {
  const formBody = new URLSearchParams();

  Object.entries(payload).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      formBody.append(key, String(value));
    }
  });

  const response = await fetch(GOOGLE_SCRIPT_URL, {
    method: "POST",
    body: formBody, // ✅ NO headers
  });

  if (!response.ok) {
    throw new Error("Failed to write to Google Sheet");
  }
}
