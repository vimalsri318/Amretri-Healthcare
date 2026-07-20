# Google Sheets Integration Setup Guide

Follow this step-by-step guide to connect your website forms and Blog CMS to your Google Sheet.

## Step 1: Open Google Sheets

1. Open your Google Sheet: https://docs.google.com/spreadsheets/d/1xTAqZSaXePb5CEDhL-mf4XqwDKFY3fbAB70eaMKEyNA/edit?usp=sharing
2. You can rename it to **"Amretri Healthcare CMS"** from the top.

## Step 2: Open Apps Script

1. In the top menu, click **Extensions → Apps Script**.
2. Delete all existing code in the `Code.gs` file.

## Step 3: Paste the Full Script

Copy and paste the **entire** block below into the editor:

```javascript
// ============================================================
//  AMRETRI HEALTHCARE — UNIFIED APPS SCRIPT
//  Handles: Website form submissions + Blog CMS
// ============================================================

// ── TRIGGERS ─────────────────────────────────────────────────

function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu("📝 Blog Manager")
    .addItem("✏️ Write New Blog Post", "showBlogForm")
    .addSeparator()
    .addItem("🎨 Setup / Format Blog Sheet", "setupBlogSheet")
    .addItem("📋 View Publishing Guide", "showGuide")
    .addToUi();
}

// ── GET: Serve blog posts to the website ─────────────────────

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
      // Skip rows where Published column is not "Yes"
      var publishedColIdx = headers.indexOf("published");
      if (publishedColIdx !== -1 && row[publishedColIdx] !== "Yes") continue;

      var record = {};
      for (var j = 0; j < headers.length; j++) {
        record[headers[j]] = row[j];
      }
      jsonArray.push(record);
    }

    return ContentService.createTextOutput(JSON.stringify(jsonArray))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// ── POST: Record website form submissions ────────────────────

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var formType = data.formType || "inquiry";

    var sheetName = "Inquiries";
    if (formType === "appointment")   sheetName = "Appointments";
    else if (formType === "career")   sheetName = "Careers";
    else if (formType !== "inquiry")  sheetName = formType.charAt(0).toUpperCase() + formType.slice(1) + "s";

    var ss   = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName(sheetName);
    if (!sheet) sheet = ss.insertSheet(sheetName);

    var headers = sheet.getLastColumn() > 0
      ? sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0]
      : [];

    var keys = Object.keys(data).filter(function(k) { return k !== "formType"; });
    var headersChanged = false;
    keys.forEach(function(k) {
      if (headers.indexOf(k) === -1) { headers.push(k); headersChanged = true; }
    });
    if (headersChanged) sheet.getRange(1, 1, 1, headers.length).setValues([headers]);

    var row = headers.map(function(h) {
      var v = data[h];
      if (v === undefined || v === null) return "";
      return typeof v === "object" ? JSON.stringify(v) : v;
    });
    sheet.appendRow(row);

    return ContentService.createTextOutput(JSON.stringify({ status: "success" }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ status: "error", message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// ── BLOG SHEET SETUP (Format + Example Row) ──────────────────

function setupBlogSheet() {
  var ss    = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("Blogs");
  if (!sheet) sheet = ss.insertSheet("Blogs");

  // Clear existing content
  sheet.clearContents();
  sheet.clearFormats();

  // ── Column definitions
  var cols = [
    { name: "id",        width: 60,  note: "Auto number. Just use 1, 2, 3... in order.",                           example: "1" },
    { name: "title",     width: 340, note: "The headline of the blog post. Keep it clear and engaging.",            example: "5 Ways to Prevent Billing Leakage in Hospital Pharmacies" },
    { name: "desc",      width: 380, note: "A short 1-2 sentence summary shown on the blog card.",                 example: "Billing leakages silently drain hospital revenue. Here are five proven guards to stop it." },
    { name: "category",  width: 130, note: "Pick ONE from the dropdown: Operations / Strategy / Inventory / Lab / Radiology", example: "Operations" },
    { name: "date",      width: 130, note: "Publication date. Format: Month DD, YYYY",                             example: "July 20, 2026" },
    { name: "readTime",  width: 100, note: "Estimated reading time e.g. 4 min read",                              example: "5 min read" },
    { name: "author",    width: 160, note: "Full name of the author",                                              example: "Amrendra Nath Sinha" },
    { name: "content",   width: 600, note: "Full article body. Use HTML tags:\n<p> for paragraphs\n<h4> for subheadings\n<strong> for bold\n<ul><li> for bullet lists\n<br> for line break\n\nExample:\n<h4>Introduction</h4>\n<p>Your first paragraph here...</p>", example: "<h4>Introduction</h4><p>Billing leakages are a silent drain on hospital revenue. Here are five actionable ways to secure your operations.</p><h4>1. Real-time Inventory-to-Billing Sync</h4><p>Ensure your pharmacy software is synced with the billing module so every dispensed medicine is instantly billed.</p>" },
    { name: "published", width: 110, note: "Type Yes to make this post LIVE on the website. Type No to save as draft.", example: "Yes" },
  ];

  // ── Set column widths
  cols.forEach(function(c, i) {
    sheet.setColumnWidth(i + 1, c.width);
  });

  // ── Header row (Row 1) — dark brand header
  var headerRange = sheet.getRange(1, 1, 1, cols.length);
  headerRange.setValues([cols.map(function(c) { return c.name.toUpperCase(); })]);
  headerRange.setBackground("#1a2e44");
  headerRange.setFontColor("#ffffff");
  headerRange.setFontWeight("bold");
  headerRange.setFontSize(11);
  headerRange.setHorizontalAlignment("center");
  headerRange.setVerticalAlignment("middle");
  sheet.setRowHeight(1, 42);

  // ── Description row (Row 2) — light blue hint row
  var descRow = cols.map(function(c) { return c.note.split("\n")[0]; });
  var descRange = sheet.getRange(2, 1, 1, cols.length);
  descRange.setValues([descRow]);
  descRange.setBackground("#e8f4fd");
  descRange.setFontColor("#555555");
  descRange.setFontSize(8);
  descRange.setFontStyle("italic");
  descRange.setWrap(true);
  sheet.setRowHeight(2, 36);

  // ── Notes (hover tooltips) on header cells
  cols.forEach(function(c, i) {
    sheet.getRange(1, i + 1).setNote(c.note);
  });

  // ── Example row (Row 3) — light yellow sample
  var exampleRange = sheet.getRange(3, 1, 1, cols.length);
  exampleRange.setValues([cols.map(function(c) { return c.example; })]);
  exampleRange.setBackground("#fffde7");
  exampleRange.setFontColor("#888800");
  exampleRange.setFontSize(9);
  exampleRange.setFontStyle("italic");
  exampleRange.setWrap(true);
  sheet.setRowHeight(3, 80);

  // Label column A row 3 as EXAMPLE
  sheet.getRange(3, 1).setNote("⚠️ This is an EXAMPLE row. You can delete it once you understand the format.");

  // ── Category dropdown validation (from row 4 onwards, category column = col 4)
  var catCol    = 4;
  var catRule   = SpreadsheetApp.newDataValidation()
    .requireValueInList(["Operations", "Strategy", "Inventory", "Lab", "Radiology", "Compliance", "Technology"], true)
    .setAllowInvalid(false)
    .setHelpText("Choose a category from the list.")
    .build();
  sheet.getRange(4, catCol, 200, 1).setDataValidation(catRule);

  // ── Published dropdown validation (col 9)
  var pubCol  = 9;
  var pubRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(["Yes", "No"], true)
    .setAllowInvalid(false)
    .setHelpText("Yes = Live on website. No = Draft.")
    .build();
  sheet.getRange(4, pubCol, 200, 1).setDataValidation(pubRule);

  // ── Freeze header rows
  sheet.setFrozenRows(2);
  sheet.setFrozenColumns(1);

  // ── Alternating row colors for data rows (4 onwards, up to 50)
  for (var r = 4; r <= 53; r++) {
    var rowRange = sheet.getRange(r, 1, 1, cols.length);
    rowRange.setBackground(r % 2 === 0 ? "#f9f9f9" : "#ffffff");
    rowRange.setFontSize(10);
    rowRange.setVerticalAlignment("top");
    rowRange.setWrap(true);
    sheet.setRowHeight(r, 120);
  }

  // ── Title column bold
  sheet.getRange(4, 2, 50, 1).setFontWeight("bold");

  // ── Published column — conditional formatting: Yes=green, No=red
  var yesRule = SpreadsheetApp.newConditionalFormatRule()
    .whenTextEqualTo("Yes")
    .setBackground("#d4edda")
    .setFontColor("#155724")
    .setRanges([sheet.getRange(4, pubCol, 200, 1)])
    .build();
  var noRule = SpreadsheetApp.newConditionalFormatRule()
    .whenTextEqualTo("No")
    .setBackground("#f8d7da")
    .setFontColor("#721c24")
    .setRanges([sheet.getRange(4, pubCol, 200, 1)])
    .build();
  sheet.setConditionalFormatRules([yesRule, noRule]);

  // ── Sheet tab color
  sheet.setTabColor("#1a6bb5");

  SpreadsheetApp.getUi().alert(
    "✅ Blog Sheet is Ready!\n\n" +
    "• Row 1 = Column headers (dark blue)\n" +
    "• Row 2 = What to type in each column (blue hint)\n" +
    "• Row 3 = Example post (yellow — delete when ready)\n" +
    "• Rows 4 onwards = Your actual blog posts\n\n" +
    "Use 📝 Blog Manager → Write New Blog Post to publish without touching columns!"
  );
}

// ── BLOG WRITE FORM (Sidebar Dialog) ─────────────────────────

function showBlogForm() {
  var html = HtmlService.createHtmlOutput(
    '<!DOCTYPE html>' +
    '<html>' +
    '<head>' +
    '<style>' +
    '  * { box-sizing: border-box; margin: 0; padding: 0; }' +
    '  body { font-family: "Google Sans", Arial, sans-serif; font-size: 13px; color: #2c2c2c; background: #f5f7fa; }' +
    '  .header { background: linear-gradient(135deg, #1a2e44 0%, #1a6bb5 100%); color: white; padding: 18px 20px; }' +
    '  .header h2 { font-size: 16px; font-weight: 700; margin-bottom: 3px; }' +
    '  .header p { font-size: 11px; opacity: 0.8; }' +
    '  .form { padding: 16px; display: flex; flex-direction: column; gap: 12px; }' +
    '  label { font-size: 11px; font-weight: 700; color: #444; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px; display: block; }' +
    '  .hint { font-size: 10px; color: #888; margin-top: 2px; margin-bottom: 4px; font-style: italic; }' +
    '  input, select, textarea { width: 100%; border: 1.5px solid #dde3ea; border-radius: 6px; padding: 8px 10px; font-size: 12px; color: #2c2c2c; background: #fff; transition: border 0.2s; font-family: inherit; }' +
    '  input:focus, select:focus, textarea:focus { border-color: #1a6bb5; outline: none; }' +
    '  textarea { resize: vertical; line-height: 1.5; }' +
    '  .row2 { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }' +
    '  .badge { display: inline-block; background: #e8f4fd; color: #1a6bb5; font-size: 10px; padding: 2px 8px; border-radius: 10px; font-weight: 600; margin-bottom: 4px; }' +
    '  .btn { background: linear-gradient(135deg, #1a6bb5, #1a2e44); color: white; border: none; border-radius: 8px; padding: 11px; font-size: 13px; font-weight: 700; cursor: pointer; width: 100%; letter-spacing: 0.3px; margin-top: 4px; }' +
    '  .btn:hover { opacity: 0.92; }' +
    '  .btn-draft { background: #f0f4f8; color: #555; border: 1.5px solid #dde3ea; }' +
    '  .btn-row { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-top: 4px; }' +
    '  .tip-box { background: #fffde7; border: 1px solid #f0e27a; border-radius: 6px; padding: 10px 12px; font-size: 10.5px; color: #665c00; line-height: 1.6; }' +
    '  .tip-box strong { color: #4a3f00; }' +
    '  #status { text-align: center; font-size: 11px; color: #1a6bb5; min-height: 16px; font-weight: 600; }' +
    '</style>' +
    '</head>' +
    '<body>' +
    '<div class="header">' +
    '  <h2>✏️ Write a New Blog Post</h2>' +
    '  <p>Fill in the fields below and click Publish to go live on the website.</p>' +
    '</div>' +
    '<div class="form">' +

    '  <div>' +
    '    <label>📰 Blog Title *</label>' +
    '    <p class="hint">Write a clear, engaging headline for the article</p>' +
    '    <input id="title" type="text" placeholder="e.g. 5 Ways to Prevent Billing Leakage in Hospital Pharmacies" />' +
    '  </div>' +

    '  <div>' +
    '    <label>📝 Short Description *</label>' +
    '    <p class="hint">1-2 sentences shown on the blog card (shown as preview)</p>' +
    '    <textarea id="desc" rows="2" placeholder="e.g. Billing leakages are a silent drain on hospital revenue. Here are five proven guards to stop it."></textarea>' +
    '  </div>' +

    '  <div class="row2">' +
    '    <div>' +
    '      <label>🏷️ Category *</label>' +
    '      <select id="category">' +
    '        <option value="Operations">Operations</option>' +
    '        <option value="Strategy">Strategy</option>' +
    '        <option value="Inventory">Inventory</option>' +
    '        <option value="Lab">Lab</option>' +
    '        <option value="Radiology">Radiology</option>' +
    '        <option value="Compliance">Compliance</option>' +
    '        <option value="Technology">Technology</option>' +
    '      </select>' +
    '    </div>' +
    '    <div>' +
    '      <label>👤 Author Name *</label>' +
    '      <input id="author" type="text" placeholder="e.g. Amrendra Nath Sinha" />' +
    '    </div>' +
    '  </div>' +

    '  <div class="row2">' +
    '    <div>' +
    '      <label>📅 Date</label>' +
    '      <input id="date" type="text" placeholder="e.g. July 20, 2026" />' +
    '    </div>' +
    '    <div>' +
    '      <label>⏱️ Read Time</label>' +
    '      <input id="readTime" type="text" placeholder="e.g. 5 min read" value="5 min read" />' +
    '    </div>' +
    '  </div>' +

    '  <div>' +
    '    <label>📄 Full Article Content *</label>' +
    '    <div class="tip-box">' +
    '      <strong>How to format:</strong><br>' +
    '      Use these simple HTML tags in your text:<br>' +
    '      <code>&lt;h4&gt;Subheading&lt;/h4&gt;</code> — for section titles<br>' +
    '      <code>&lt;p&gt;Text here.&lt;/p&gt;</code> — for paragraphs<br>' +
    '      <code>&lt;strong&gt;bold&lt;/strong&gt;</code> — for bold words<br>' +
    '      <code>&lt;ul&gt;&lt;li&gt;Point&lt;/li&gt;&lt;/ul&gt;</code> — for bullet list<br>' +
    '      <code>&lt;br&gt;</code> — for a blank line' +
    '    </div>' +
    '    <textarea id="content" rows="10" style="margin-top:8px;font-family:monospace;font-size:11px;" placeholder="&lt;h4&gt;Introduction&lt;/h4&gt;&#10;&lt;p&gt;Start writing your first paragraph here...&lt;/p&gt;&#10;&#10;&lt;h4&gt;Section Title&lt;/h4&gt;&#10;&lt;p&gt;Write your next section here.&lt;/p&gt;"></textarea>' +
    '  </div>' +

    '  <div id="status"></div>' +

    '  <div class="btn-row">' +
    '    <button class="btn btn-draft" onclick="submitBlog(false)">💾 Save as Draft</button>' +
    '    <button class="btn" onclick="submitBlog(true)">🚀 Publish Live</button>' +
    '  </div>' +

    '</div>' +

    '<script>' +
    'function submitBlog(publish) {' +
    '  var title    = document.getElementById("title").value.trim();' +
    '  var desc     = document.getElementById("desc").value.trim();' +
    '  var content  = document.getElementById("content").value.trim();' +
    '  var author   = document.getElementById("author").value.trim();' +
    '  var category = document.getElementById("category").value;' +
    '  var date     = document.getElementById("date").value.trim();' +
    '  var readTime = document.getElementById("readTime").value.trim();' +
    '  var status   = document.getElementById("status");' +
    '  if (!title || !desc || !content || !author) {' +
    '    status.style.color = "#cc0000";' +
    '    status.textContent = "⚠️ Please fill in Title, Description, Content, and Author.";' +
    '    return;' +
    '  }' +
    '  status.style.color = "#1a6bb5";' +
    '  status.textContent = "Saving...";' +
    '  google.script.run' +
    '    .withSuccessHandler(function(id) {' +
    '      status.style.color = "#155724";' +
    '      status.textContent = publish ? "✅ Published! Your post is now live on the website." : "💾 Saved as draft (ID: " + id + "). Set Published = Yes when ready.";' +
    '      setTimeout(function() { clearForm(); status.textContent = ""; }, 3000);' +
    '    })' +
    '    .withFailureHandler(function(err) {' +
    '      status.style.color = "#cc0000";' +
    '      status.textContent = "❌ Error: " + err;' +
    '    })' +
    '    .saveBlogPost(title, desc, category, date, readTime, author, content, publish ? "Yes" : "No");' +
    '}' +
    'function clearForm() {' +
    '  ["title","desc","content","author","date"].forEach(function(id) { document.getElementById(id).value = ""; });' +
    '  document.getElementById("readTime").value = "5 min read";' +
    '}' +
    '<\/script>' +
    '</body></html>'
  ).setTitle("📝 Write New Blog Post").setWidth(480).setHeight(700);

  SpreadsheetApp.getUi().showSidebar(html);
}

// ── Save blog post from sidebar ───────────────────────────────

function saveBlogPost(title, desc, category, date, readTime, author, content, published) {
  var ss    = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("Blogs");
  if (!sheet) {
    setupBlogSheet();
    sheet = ss.getSheetByName("Blogs");
  }

  // Get last row to auto-assign ID
  var lastRow = sheet.getLastRow();
  var newId   = lastRow <= 2 ? 1 : lastRow - 2;  // minus 2 for header + hint rows

  var today = date || Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "MMMM dd, yyyy");
  var time  = readTime || "5 min read";

  sheet.appendRow([newId, title, desc, category, today, time, author, content, published]);

  // Style the new row
  var newRowNum = sheet.getLastRow();
  var newRange  = sheet.getRange(newRowNum, 1, 1, 9);
  newRange.setBackground(newRowNum % 2 === 0 ? "#f9f9f9" : "#ffffff");
  newRange.setFontSize(10);
  newRange.setVerticalAlignment("top");
  newRange.setWrap(true);
  sheet.setRowHeight(newRowNum, 120);
  sheet.getRange(newRowNum, 2).setFontWeight("bold");

  return newId;
}

// ── Publishing Guide dialog ───────────────────────────────────

function showGuide() {
  var html = HtmlService.createHtmlOutput(
    '<style>body{font-family:Google Sans,Arial,sans-serif;padding:16px;font-size:13px;line-height:1.7;color:#2c2c2c;}' +
    'h3{color:#1a2e44;margin:14px 0 6px;}code{background:#f0f4f8;padding:2px 6px;border-radius:4px;font-size:11px;}' +
    '.green{color:#155724;font-weight:700;}.red{color:#721c24;font-weight:700;}</style>' +
    '<h2>📋 Blog Publishing Guide</h2>' +
    '<h3>Columns in the Blog Sheet</h3>' +
    '<ul>' +
    '<li><strong>id</strong> — Just a number: 1, 2, 3...</li>' +
    '<li><strong>title</strong> — Headline of the article</li>' +
    '<li><strong>desc</strong> — Short 1-2 line preview (shown on blog card)</li>' +
    '<li><strong>category</strong> — Pick from the dropdown list</li>' +
    '<li><strong>date</strong> — e.g. <code>July 20, 2026</code></li>' +
    '<li><strong>readTime</strong> — e.g. <code>5 min read</code></li>' +
    '<li><strong>author</strong> — Full name of the writer</li>' +
    '<li><strong>content</strong> — Full article in HTML format</li>' +
    '<li><strong>published</strong> — <span class="green">Yes</span> = Live on website. <span class="red">No</span> = Draft (hidden)</li>' +
    '</ul>' +
    '<h3>HTML Formatting Tags</h3>' +
    '<ul>' +
    '<li><code>&lt;h4&gt;Section Title&lt;/h4&gt;</code></li>' +
    '<li><code>&lt;p&gt;Paragraph text here.&lt;/p&gt;</code></li>' +
    '<li><code>&lt;strong&gt;Bold text&lt;/strong&gt;</code></li>' +
    '<li><code>&lt;ul&gt;&lt;li&gt;Bullet point&lt;/li&gt;&lt;/ul&gt;</code></li>' +
    '<li><code>&lt;br&gt;</code> — blank line</li>' +
    '</ul>' +
    '<h3>To Publish a Blog</h3>' +
    '<p>Use <strong>📝 Blog Manager → Write New Blog Post</strong> in the top menu. It is much easier than filling columns manually!</p>'
  ).setTitle("Blog Guide").setWidth(420).setHeight(500);
  SpreadsheetApp.getUi().showModalDialog(html, "📋 Blog Publishing Guide");
}
```

4. Click **Save** (floppy disk icon) at the top.

## Step 4: Run the Setup

1. In the Apps Script editor, select `setupBlogSheet` from the function dropdown (top-center).
2. Click the ▶️ **Run** button.
3. Authorize the script when prompted (click Advanced → Go to project → Allow).
4. Go back to your Google Sheet — you'll see the **Blogs** tab is now beautifully formatted!

## Step 5: Deploy as Web App

1. Click **Deploy → New deployment**.
2. Click the gear icon → Select **Web app**.
3. Set:
   - **Execute as**: `Me`
   - **Who has access**: `Anyone`
4. Click **Deploy** and copy the Web App URL.

## Step 6: Set Environment Variable

In your `.env` file and Vercel settings:
```env
VITE_GOOGLE_SHEETS_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
```

---

## How to Write a Blog Post (After Setup)

Once set up, writing a blog is easy — **no columns needed!**

1. Open your Google Sheet
2. Click **📝 Blog Manager** in the top menu
3. Click **✏️ Write New Blog Post**
4. A sidebar opens — fill in the fields
5. Click **🚀 Publish Live** — it immediately appears on your website!

> **Note:** After writing content in the sidebar, you can also directly type in the sheet rows. Row 3 (yellow) is an example row — delete it once you understand the format.
