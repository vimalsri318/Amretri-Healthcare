export async function submitToGoogleSheets(formType: string, data: Record<string, any>): Promise<boolean> {
  const url = import.meta.env.VITE_GOOGLE_SHEETS_URL;
  if (!url) {
    console.warn("VITE_GOOGLE_SHEETS_URL environment variable is not defined. Form submission will not be saved to Google Sheets.");
    return true; // Return true so client-side actions and toasts still proceed normally
  }

  try {
    const payload = {
      formType,
      timestamp: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
      ...data,
    };

    // We use mode: 'no-cors' because Google Apps Script Web App redirects (302) to Google Drive,
    // which triggers CORS preflight errors in modern browsers for standard cross-origin JSON POSTs.
    // Setting mode to 'no-cors' safely lets the request run on the script server.
    await fetch(url, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    return true;
  } catch (error) {
    console.error("Error submitting to Google Sheets:", error);
    return false;
  }
}
