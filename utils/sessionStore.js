const sessions = new Map();

function storeSession(userId, tokens) {
  sessions.set(userId, tokens);
}

function getSession(userId) {
  return sessions.get(userId);
}

module.exports = { storeSession, getSession };