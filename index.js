//webserver boilerplate

const express = require("express")

// import google api

const { google } = require("googleapis"); 

// creating express app

const app = express(); 

// creating single root endpoint, request and response

app.get("/", async (req, res) => { 

    // authenticating with google api

    const auth = new google.auth.GoogleAuth({ 

        keyFile: "credentials.json",
        scopes: "https://www.googleapis.com/auth/spreadsheets"

    });

    // request client object for auth

    const client = await auth.getClient();

    // instance of Google Sheets API

    const googleSheets = google.sheets({ version: "v4", auth: client });

    // spreadsheet variable

    const spreadsheetId = "1-f2vZxgWQ1cbstJIB4GGp0SEqMuqZKR3JEZocHuSYOQ";


    // Get metadata about spreadsheet

    const metaData = await googleSheets.spreadsheets.get({
        auth,
        spreadsheetId,
    });


    // Read rows from spreadsheet

    const getRows = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        // sets the range with the sheetname in spreadsheet and the cells of that sheet
        range: "Sheet1!A:B", 

    });
    //read rows call
    res.send(getRows.data);


    // write row(s) to spreadsheet
    await googleSheets.spreadsheets.values.append({
        auth,
        spreadsheetId,
        range: "Sheet1!A:B",

        // two useful variables RAW and USER_ENTERED which attempts to pass numbers as int, date as date, etc
        valueInputOption: "USER_ENTERED",

        // info you want to pass into spreadsheet

        resource: {

            // for each row you want to add, add another nested array []
            values: [["danny", "not too bad"]],

            
        }

    });



});

app.listen(1337, (req, res) => console.log("running on 1337")); // listen
