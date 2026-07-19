# Google Sheets Integration Setup Guide

Follow this step-by-step guide to connect the forms on your website to your Google Sheet.

## Step 1: Open Google Sheets
1. Open your Google Sheet: https://docs.google.com/spreadsheets/d/1xTAqZSaXePb5CEDhL-mf4XqwDKFY3fbAB70eaMKEyNA/edit?usp=sharing
2. (Optional) You can rename it from "Untitled spreadsheet" to "Amretri Healthcare Leads".
3. **Important (for Blogs):** Create a new sheet tab called **`Blogs`** inside the spreadsheet. Add the following column headers in the first row (A1 to H1):
   `id` | `title` | `desc` | `category` | `date` | `readTime` | `author` | `content`
   *You can write blog posts under these headers. You can even use HTML tags (like `<p>`, `<strong>`, etc.) inside the `content` cell to format your articles!*

## Step 2: Open Apps Script
1. In the Google Sheets top menu, click on **Extensions** -> **Apps Script**.
2. Delete any code currently in the `Code.gs` editor window.

## Step 3: Paste the Script
Copy and paste the following Google Apps Script code into the editor:

```javascript
// GET Request: Fetches blogs list
function doGet(e) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName("Blogs");
    if (!sheet) {
      return ContentService.createTextOutput(JSON.stringify([]))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    var data = sheet.getDataRange().getValues();
    if (data.length <= 1) {
      return ContentService.createTextOutput(JSON.stringify([]))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    var headers = data[0];
    var jsonArray = [];
    
    for (var i = 1; i < data.length; i++) {
      var row = data[i];
      var record = {};
      for (var j = 0; j < headers.length; j++) {
        var header = headers[j];
        record[header] = row[j];
      }
      jsonArray.push(record);
    }
    
    return ContentService.createTextOutput(JSON.stringify(jsonArray))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// POST Request: Records website form submissions
function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var formType = data.formType || "inquiry";
    
    // Map formType to a clean sheet tab name
    var sheetName = "Inquiries";
    if (formType === "appointment") {
      sheetName = "Appointments";
    } else if (formType === "career") {
      sheetName = "Careers";
    } else if (formType === "inquiry") {
      sheetName = "Inquiries";
    } else {
      sheetName = formType.charAt(0).toUpperCase() + formType.slice(1) + "s";
    }

    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName(sheetName);
    if (!sheet) {
      sheet = ss.insertSheet(sheetName);
    }

    // Get existing headers from first row
    var headers = [];
    if (sheet.getLastColumn() > 0) {
      headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    }

    // Identify all keys in incoming data (excluding formType)
    var keys = Object.keys(data).filter(function(key) {
      return key !== "formType";
    });

    // Check if we need to add new headers/columns
    var headersChanged = false;
    keys.forEach(function(key) {
      if (headers.indexOf(key) === -1) {
        headers.push(key);
        headersChanged = true;
      }
    });

    // If headers changed, update the first row
    if (headersChanged) {
      sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    }

    // Map the incoming data to match the header column order
    var rowValues = headers.map(function(header) {
      var val = data[header];
      if (val === undefined || val === null) {
        return "";
      }
      if (typeof val === "object") {
        return JSON.stringify(val);
      }
      return val;
    });

    // Append the row to the sheet
    sheet.appendRow(rowValues);

    return ContentService.createTextOutput(JSON.stringify({ status: "success" }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ status: "error", message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

3. Click the **Save** icon (floppy disk) at the top of the editor.

## Step 4: Deploy as Web App
1. Click the **Deploy** button at the top-right and select **New deployment**.
2. Click the gear icon (Configuration) and select **Web app**.
3. Fill in the fields:
   - **Description**: `Amretri Healthcare Forms Endpoint`
   - **Execute as**: `Me (your-email@gmail.com)`
   - **Who has access**: **`Anyone`** *(This is critical to allow submissions from the website)*
4. Click **Deploy**.
5. Google will ask you to authorize access. Click **Authorize access**, choose your account, click **Advanced**, click **Go to Untitled project (unsafe)**, and click **Allow**.
6. Copy the **Web app URL** generated (it will look like `https://script.google.com/macros/s/AKfycb.../exec`).

## Step 5: Configure Environment Variable
1. In your local development project, open the `.env` file in the root directory.
2. Replace the empty `VITE_GOOGLE_SHEETS_URL` value with your copied Web App URL:
   ```env
   VITE_GOOGLE_SHEETS_URL=https://script.google.com/macros/s/AKfycb.../exec
   ```
3. Commit and push the `.env` changes to GitHub (if deploying via Vercel, also add this key-value pair under **Environment Variables** in your Vercel Project Settings dashboard).
