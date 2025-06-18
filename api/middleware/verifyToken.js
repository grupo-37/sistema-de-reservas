import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['Authorization'];
    if(!authHeader){
        return res.status(401).json({ error: "Token no proporcionado" });
    }

    const [scheme, token] = authHeader.split(" ");
    if (scheme !== "Bearer" || !token) {
        return res.status(401).json({ error: "Formato de Token invalido" });
    }

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = payload.userId;
        next();
    } catch (err){
        return res.status(401).json({ error: "Token invalido" });
    }
};

export default verifyToken;