import jwt from 'jsonwebtoken'; // Correct import for jsonwebtoken

export const verifyToken = (req, res, next) => {
    const token = req.cookies.accessToken; // Get the token from cookies

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "You're not authorized"
        });
    }

    // If token exists, verify the token
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
        if (err) {
            return res.status(403).json({
                success: false,
                message: "Token is invalid"
            });
        }

        // Attach the user to the request object
        req.user = user

        // Call the next middleware or route handler
        next()
    });
};
// Import the verifyToken middleware

export const verifyUser = (req, res, next) => {
    // First, call the verifyToken middleware to ensure the user is authenticated
    verifyToken(req, res, next, () => {
        console.log(req.user.id, req.params.id, req.user.role);
        // Check if the logged-in user's ID matches the ID in the request params (e.g., /user/:id)
        if (req.user.id === req.params.id || req.user.role === 'admin') {
            next();  // Proceed to the next middleware or route handler
        } else {
            // If the user is not authorized to access the resource, respond with a 401 Unauthorized status
            return res.status(401).json({
                success: false,
                message: "You're not authorized to access this resource"
            });
        }
    });
};


export const verifyAdmin = (req, res, next) => {
    // First, call the verifyToken middleware to ensure the user is authenticated
    verifyToken(req, res, next, () => {
        // Check if the user has the "admin" role
        if (req.user.role === 'admin') {
            next();  // Proceed to the next middleware or route handler
        } else {
            // If the user is not an admin, respond with a 401 Unauthorized status
            return res.status(401).json({
                success: false,
                message: "You're not authorized to access this resource"
            });
        }
    });
};