async function chat(_req, res) {
  try {
    res.status(200).render('chat');
  } catch (e) {
    console.log(e);
  }
}

module.exports = chat;
