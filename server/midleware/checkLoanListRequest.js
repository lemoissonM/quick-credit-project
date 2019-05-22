
export default function normalizeRequest(req, res, next) {
  let { status, repaid } = req.query;

  if (repaid) { repaid = repaid.trim().toLowerCase(); }
  if (status) { status = status.trim().toLowerCase(); }
  req.repaid = repaid;
  req.status = status;
  next();
}
