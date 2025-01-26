const express = require('express');
const bodyParser = require('body-parser');
const exceljs = require('exceljs');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;

// Use body-parser to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (HTML, CSS, JS, Images, etc.) from the RK-UI folder
app.use(express.static(path.join(__dirname, '../RK-UI')));
app.post('/submit-contact', (req, res) => {
    const { Name, Email, Message } = req.body;
    console.log(Name, Email, Message); // Log the submitted data

    const filePath = path.join(__dirname, 'contacts.xlsx');
    const workbook = new exceljs.Workbook();

    if (fs.existsSync(filePath)) {
        workbook.xlsx.readFile(filePath)
            .then(() => {
                const worksheet = workbook.getWorksheet(1);
                worksheet.addRow([Name, Email, Message]);
                return workbook.xlsx.writeFile(filePath);
            })
            .then(() => {
                res.send('<script>document.getElementById("msg").innerText = "Your message has been saved!";</script>');
            })
            .catch((err) => {
                console.error('Error writing to file:', err);
                res.status(500).send('<script>document.getElementById("msg").innerText = "Error saving contact details.";</script>');
            });
    } else {
        const worksheet = workbook.addWorksheet('Contacts');
        worksheet.addRow(['Name', 'Email', 'Message']);
        worksheet.addRow([Name, Email, Message]);

        workbook.xlsx.writeFile(filePath)
            .then(() => {
                res.send('<script>document.getElementById("msg").innerText = "Your message has been saved!";</script>');
            })
            .catch((err) => {
                console.error('Error writing to file:', err);
                res.status(500).send('<script>document.getElementById("msg").innerText = "Error saving contact details.";</script>');
            });
    }
});
