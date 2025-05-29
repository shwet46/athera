const { google } = require('googleapis');

async function listDriveFiles(auth) {
  const drive = google.drive({ version: 'v3', auth });
  const res = await drive.files.list({
    pageSize: 10,
    fields: 'files(id, name)',
  });
  return res.data.files;
}

module.exports = { listDriveFiles };