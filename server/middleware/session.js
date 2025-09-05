// Hämta sessioninfo
export function getSession(req, res) {
  res.json({
    userId: req.session.userId || null,
    isAdmin: req.session.isAdmin || false,
    cart: req.session.cart || [],
  });
}