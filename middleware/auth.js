import jwt from "jsonwebtoken";


export const Authenticate = async (req, res, next) => {
    const token = req.header('Authorization'); // Consider using 'Authorization'
        if (!token) {
            return res.status(401).json({ message: "Please login first" });
        }
        console.log('Received token:', token);
        const strippedToken = token.startsWith('Bearer ') ? token.slice(7, token.length).trim() : token;

        const decode = jwt.verify(strippedToken, process.env.SECRET_KEY);
        console.log('Decoded token:', decode);

        req.user = decode; 
        next();
  
};
