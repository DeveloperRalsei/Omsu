export const logger = (req, _, next) => {
  console.log(req.ip, req.url, req.query, req.method);
  if (req.method != "GET") {
    console.log(req.body);
  }

  next();
};
