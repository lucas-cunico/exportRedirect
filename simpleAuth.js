module.exports = (domains = []) => (req, res, next) => {
  if (!domains.includes(req.get("host"))) {
    if (!req.session.authenticated) {
      if (
        req.body &&
        req.body.login === "admin" &&
        req.body.password === "intel1900"
      ) {
        req.session.authenticated = true;
        return res.redirect("/");
      } else {
        return res.send(
          `<form method="post" action="/">
            <input type="text" name="login" required/>
            <input type="password" name="password" required />
            <button type="submit">send</button>
            </form>`
        );
      }
    }
  }
  next();
};
