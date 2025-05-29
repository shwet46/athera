const { google } = require('googleapis');

async function scheduleEvent(auth, summary, startTime, endTime) {
  const calendar = google.calendar({ version: 'v3', auth });
  const event = {
    summary,
    start: { dateTime: startTime },
    end: { dateTime: endTime },
    conferenceData: {
      createRequest: { requestId: Math.random().toString(36).substring(7) },
    },
  };
  const response = await calendar.events.insert({
    calendarId: 'primary',
    resource: event,
    conferenceDataVersion: 1,
  });
  return response.data;
}

module.exports = { scheduleEvent };