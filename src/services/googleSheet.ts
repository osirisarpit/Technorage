import { MemberTask } from "@/data/types";

/**
 * Single source of truth for Google Apps Script Web App
 */
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzlr9eNT3WQ6xhlSTFmWzIggUtDz95rfpq7GuY3vZOEYemrMhvROa0-XY34EdRXhYg/exec";

if (!GOOGLE_SCRIPT_URL) {
  console.warn("Google Apps Script URL is not configured");
}

/* -------------------------------------------------------------------------- */
/*                               CREATE TASK (LEAD)                            */
/* -------------------------------------------------------------------------- */

export interface CreateTaskPayload {
  TaskTitle: string;
  Priority: number;
  Vertical: string;
  Description?: string;
  EstimatedTime?: string;
  Deadline: string;
  Status: string;
}

/**
 * Creates a new task in Google Sheets (Task List)
 * Used by Lead Dashboard
 */
export async function createTaskInSheet(
  payload: CreateTaskPayload
): Promise<void> {
  const formBody = new URLSearchParams();

  Object.entries(payload).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      formBody.append(key, String(value));
    }
  });

  const response = await fetch(GOOGLE_SCRIPT_URL, {
    method: "POST",
    body: formBody, // ❗ DO NOT add headers (GAS requirement)
  });

  if (!response.ok) {
    throw new Error(
      `Failed to create task in Google Sheet: ${response.status}`
    );
  }
}

/* -------------------------------------------------------------------------- */
/*                          FETCH MEMBER ASSIGNED TASK                         */
/* -------------------------------------------------------------------------- */

/**
 * Fetches the task assigned to a specific member from Google Sheets (Members List)
 * @param username Firebase displayName (must match Username column)
 * @returns MemberTask | null
 */
export async function fetchMemberTask(
  username: string
): Promise<MemberTask | null> {
  if (!GOOGLE_SCRIPT_URL) {
    console.warn("Google Apps Script URL is not configured, returning null for member task");
    return null;
  }

  try {
    const url = `${GOOGLE_SCRIPT_URL}?username=${encodeURIComponent(username)}`;

    const response = await fetch(url);

    if (!response.ok) {
      console.error(`HTTP error! status: ${response.status}`);
      throw new Error(
        `Failed to fetch member task: ${response.status} ${response.statusText}`
      );
    }

    // Apps Script sometimes returns text/plain
    const responseText = await response.text();

    let data: any;
    try {
      data = JSON.parse(responseText);
    } catch {
      throw new Error(`Invalid JSON from Google Script: ${responseText}`);
    }

    if (data.message?.includes("No task assigned")) {
      return null;
    }

    // Normalize response → frontend format
    if (!data.Name || !data.Vertical || !data.TaskTitle) {
      throw new Error("Invalid task data received from Google Sheets");
    }

    return {
      username: data.Name,
      vertical: data.Vertical,
      taskTitle: data.TaskTitle,
      description: data.Description ?? "",
    };
  } catch (error) {
    console.error("Error fetching member task:", error);
    // Return null instead of throwing error to prevent white screen
    if (error instanceof TypeError && error.message.includes('fetch')) {
      console.warn('Network error occurred, returning null to prevent crash');
      return null;
    }
    throw error;
  }
}
