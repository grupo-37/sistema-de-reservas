// Middleware para permitir solo a usuarios con rol 'host' registrar propiedades
// Se asume que req.user ya contiene la información del usuario autenticado
export default function onlyHost(req, res, next) {
  // Si no hay usuario autenticado
  if (!req.user) {
    return res.status(401).json({ error: "No autenticado" });
  }
  // Si el usuario no es host
  if (req.user.role !== "host") {
    return res.status(403).json({ error: "Solo los usuarios host pueden registrar propiedades" });
  }
  // Si es host, continúa
  next();
}
