# Google Apps Script Setup for Member Task Assignment

This document explains how to set up the Google Apps Script that serves as the backend API to connect your React application with Google Sheets.

## Prerequisites

- Access to Google Sheets with the "Members List" sheet containing columns: Username, Vertical, Task Title, Description
- Google Apps Script account

## Steps to Create the Script

1. Open Google Apps Script (script.google.com)
2. Create a new project
3. Replace the default code with the following:

```javascript
function doGet(e) {
  // Get the username parameter from the request
  var username = e.parameter.username;
  
  if (!username) {
    return ContentService.createTextOutput(JSON.stringify({
      error: "Username parameter is required"
    })).setMimeType(ContentService.MimeType.JSON);
  }
  
  try {
    // Open the Google Sheet by its ID
    // Replace YOUR_SHEET_ID with the actual ID of your Google Sheet
    var ss = SpreadsheetApp.openById("YOUR_SHEET_ID");
    var sheet = ss.getSheetByName("Members List"); // Make sure this matches your sheet name
    
    if (!sheet) {
      return ContentService.createTextOutput(JSON.stringify({
        error: "Sheet 'Members List' not found"
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    // Get all data from the sheet
    var data = sheet.getDataRange().getValues();
    
    // Find the row matching the username in the first column (Username)
    for (var i = 1; i < data.length; i++) { // Start from 1 to skip header row
      if (data[i][0].toString() === username) { // Assuming Username is in column A (index 0)
        // Found matching username, return the task data
        // Assuming: Column A (0) = Username, B (1) = Vertical, C (2) = Task Title, D (3) = Description
        var taskData = {
          username: data[i][0],
          vertical: data[i][1],
          taskTitle: data[i][2],
          description: data[i][3]
        };
        
        return ContentService.createTextOutput(JSON.stringify(taskData)).setMimeType(ContentService.MimeType.JSON);
      }
    }
    
    // No task found for this user
    return ContentService.createTextOutput(JSON.stringify({
      message: "No task assigned",
      username: username
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    console.error("Error in script:", error);
    return ContentService.createTextOutput(JSON.stringify({
      error: "Internal server error: " + error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}
```

4. Replace `YOUR_SHEET_ID` with the actual ID of your Google Sheet (found in the URL of your Google Sheet)
5. Make sure the column indices in the script match your sheet structure:
   - Column A (index 0) = Username
   - Column B (index 1) = Vertical
   - Column C (index 2) = Task Title
   - Column D (index 3) = Description

## Deploying the Script

1. Click on "Deploy" > "New Deployment"
2. Select "Web App" as the deployment type
3. Configure:
   - Execute as: "Me"
   - Who has access: "Anyone" (or restrict as needed)
4. Click "Deploy"
5. Copy the deployment URL

## Setting Up Environment Variables

1. Create a `.env` file in your project root (or copy `.env.example` to `.env`)
2. Add your Google Apps Script URL:
```
VITE_GOOGLE_SHEETS_SCRIPT_URL=https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec
```

Replace `YOUR_DEPLOYMENT_ID` with the actual deployment ID from your Google Apps Script deployment.

## Testing

You can test the endpoint directly by visiting:
`https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec?username=testuser`

This should return either a task object or a "No task assigned" message.

## Security Notes

- Ensure your Google Sheet has appropriate sharing settings
- Consider restricting script access to specific domains if possible
- Regularly audit who has access to the sheet and script