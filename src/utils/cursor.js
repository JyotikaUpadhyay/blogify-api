function encodeCursor(value) {
  return Buffer.from(value.toString()).toString("base64");
}

function decodeCursor(cursor) {
  return Buffer.from(cursor, "base64").toString("utf-8");
}

module.exports = { encodeCursor, decodeCursor };
