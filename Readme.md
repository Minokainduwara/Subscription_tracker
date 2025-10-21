# 💳 Subscription Tracker Backend

A **Node.js + Express** backend project built for learning modern backend development concepts — including **JWT Authentication**, **middleware-based API protection**, and **Arcjet integration** for security and analytics.

This backend powers a **Subscription Tracker** application, helping users manage and monitor their active subscriptions securely.

---

## 🚀 Tech Stack

| Technology | Purpose |
|-------------|----------|
| **Node.js** | Server-side JavaScript runtime |
| **Express.js** | Web framework for building REST APIs |
| **MySQL** | Database to store users and subscription data |
| **JWT (JSON Web Tokens)** | Authentication & Authorization |
| **Arcjet** | API protection, rate limiting, and telemetry |
| **dotenv** | Manage environment variables |
| **bcrypt.js** | Hash and verify passwords securely |
| **mysql2 / Sequelize** | MySQL connection & ORM |

---

## 📂 Project Structure

```
subscription_tracker/
├── config/
│   ├── db.js                    # MySQL database connection
│   └── arcjet.js                # Arcjet API protection setup
├── controllers/
│   ├── authController.js        # Login and Register logic
│   └── subscriptionController.js # CRUD for subscriptions
├── middleware/
│   └── authMiddleware.js        # JWT token verification
├── models/
│   ├── User.js                  # User model
│   └── Subscription.js          # Subscription model
├── routes/
│   ├── authRoutes.js            # Auth endpoints
│   └── subscriptionRoutes.js    # Subscription endpoints
├── .env                         # Environment variables
├── .gitignore
├── package.json
├── server.js                    # Main entry point
└── README.md
```

---

## 🔐 Features

✅ **User Authentication**
- Register & login using JWT
- Passwords securely hashed using `bcrypt.js`

✅ **Subscription Management**
- Add, view, update, and delete subscription records
- Track subscription name, price, type, and renewal date

✅ **Protected Routes**
- JWT-based route protection middleware
- Access subscription endpoints only with valid tokens

✅ **Arcjet Integration**
- Adds API security with rate limiting, telemetry, and abuse prevention

✅ **Error Handling**
- Centralized error responses and validation

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/<your-username>/subscription_tracker.git
cd subscription_tracker
```

### 2️⃣ Install Dependencies
```bash
npm install
```

### 3️⃣ Setup Environment Variables
Create a `.env` file in the project root with the following values:

```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=subscription_tracker
JWT_SECRET=your_jwt_secret_key
ARCJET_KEY=your_arcjet_api_key
```

### 4️⃣ Setup MySQL Database
Make sure MySQL is running on your system (use XAMPP or MySQL server).

Create the database:
```sql
CREATE DATABASE subscription_tracker;
```

Run the following SQL schema to create tables:
```sql
-- Users Table
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Subscriptions Table
CREATE TABLE subscriptions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  renewalDate DATE NOT NULL,
  type ENUM('monthly', 'yearly') DEFAULT 'monthly',
  userId INT NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
);
```

### 5️⃣ Run the Server
```bash
npm run dev
```
or
```bash
node server.js
```

Server will start on `http://localhost:5000`

---

## 🧩 API Endpoints

### Authentication Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `POST` | `/api/auth/register` | Register a new user | ❌ |
| `POST` | `/api/auth/login` | Login and receive JWT | ❌ |

### Subscription Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `GET` | `/api/subscriptions` | Get all user subscriptions | ✅ |
| `GET` | `/api/subscriptions/:id` | Get a specific subscription | ✅ |
| `POST` | `/api/subscriptions` | Add a new subscription | ✅ |
| `PUT` | `/api/subscriptions/:id` | Update a subscription | ✅ |
| `DELETE` | `/api/subscriptions/:id` | Delete a subscription | ✅ |

---

## 📮 API Usage Examples

### 1. Register a New User

**Request:**
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "Minoka Induwara",
  "email": "minoka@example.com",
  "password": "securePassword123"
}
```

**Response:**
```json
{
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "name": "Minoka Induwara",
    "email": "minoka@example.com"
  }
}
```

---

### 2. Login

**Request:**
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "minoka@example.com",
  "password": "securePassword123"
}
```

**Response:**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "name": "Minoka Induwara",
    "email": "minoka@example.com"
  }
}
```

---

### 3. Add a New Subscription

**Request:**
```http
POST /api/subscriptions
Content-Type: application/json
Authorization: Bearer <your_token_here>

{
  "name": "Netflix Premium",
  "price": 15.99,
  "renewalDate": "2025-11-22",
  "type": "monthly"
}
```

**Response:**
```json
{
  "message": "Subscription added successfully",
  "subscription": {
    "id": 1,
    "name": "Netflix Premium",
    "price": 15.99,
    "renewalDate": "2025-11-22",
    "type": "monthly",
    "userId": 1
  }
}
```

---

### 4. Get All Subscriptions

**Request:**
```http
GET /api/subscriptions
Authorization: Bearer <your_token_here>
```

**Response:**
```json
{
  "subscriptions": [
    {
      "id": 1,
      "name": "Netflix Premium",
      "price": 15.99,
      "renewalDate": "2025-11-22",
      "type": "monthly",
      "userId": 1
    },
    {
      "id": 2,
      "name": "Spotify Family",
      "price": 14.99,
      "renewalDate": "2025-12-15",
      "type": "monthly",
      "userId": 1
    }
  ]
}
```

---

### 5. Update a Subscription

**Request:**
```http
PUT /api/subscriptions/1
Content-Type: application/json
Authorization: Bearer <your_token_here>

{
  "name": "Netflix Standard",
  "price": 12.99
}
```

**Response:**
```json
{
  "message": "Subscription updated successfully",
  "subscription": {
    "id": 1,
    "name": "Netflix Standard",
    "price": 12.99,
    "renewalDate": "2025-11-22",
    "type": "monthly",
    "userId": 1
  }
}
```

---

### 6. Delete a Subscription

**Request:**
```http
DELETE /api/subscriptions/1
Authorization: Bearer <your_token_here>
```

**Response:**
```json
{
  "message": "Subscription deleted successfully"
}
```

---

## 🔒 JWT Authentication Flow

1. User registers or logs in
2. Server returns a JWT token
3. Client saves the token (e.g., in localStorage or cookies)
4. Client sends the token in headers for all protected routes:
   ```
   Authorization: Bearer <your_token_here>
   ```
5. The server verifies the token using middleware before granting access

---

## 🧾 Code Examples

### 🧍‍♂️ User Model (`models/User.js`)
```javascript
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define('User', {
  id: { 
    type: DataTypes.INTEGER, 
    autoIncrement: true, 
    primaryKey: true 
  },
  name: { 
    type: DataTypes.STRING, 
    allowNull: false 
  },
  email: { 
    type: DataTypes.STRING, 
    unique: true, 
    allowNull: false 
  },
  password: { 
    type: DataTypes.STRING, 
    allowNull: false 
  },
});

module.exports = User;
```

---

### 💼 Subscription Model (`models/Subscription.js`)
```javascript
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Subscription = sequelize.define('Subscription', {
  id: { 
    type: DataTypes.INTEGER, 
    autoIncrement: true, 
    primaryKey: true 
  },
  name: { 
    type: DataTypes.STRING, 
    allowNull: false 
  },
  price: { 
    type: DataTypes.FLOAT, 
    allowNull: false 
  },
  renewalDate: { 
    type: DataTypes.DATE, 
    allowNull: false 
  },
  type: {
    type: DataTypes.ENUM('monthly', 'yearly'),
    defaultValue: 'monthly'
  },
  userId: { 
    type: DataTypes.INTEGER, 
    allowNull: false 
  },
});

module.exports = Subscription;
```

---

### 🛡️ Arcjet Integration (`config/arcjet.js`)
```javascript
const arcjet = require('@arcjet/node');

const arcjetInstance = arcjet({
  key: process.env.ARCJET_KEY,
  app: 'subscription-tracker-backend',
  rules: [
    arcjet.rateLimit({
      mode: 'LIVE',
      window: '10s',
      max: 10,
    }),
  ],
});

module.exports = arcjetInstance;
```

Use this middleware in `server.js`:
```javascript
const arcjet = require('./config/arcjet');
app.use(arcjet.express());
```

---

### 🧑‍💻 Protected Route Example (`routes/subscriptionRoutes.js`)
```javascript
const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/authMiddleware');
const { 
  getSubscriptions, 
  addSubscription,
  updateSubscription,
  deleteSubscription 
} = require('../controllers/subscriptionController');

router.get('/', verifyToken, getSubscriptions);
router.post('/', verifyToken, addSubscription);
router.put('/:id', verifyToken, updateSubscription);
router.delete('/:id', verifyToken, deleteSubscription);

module.exports = router;
```

---

### 🧑‍🏫 JWT Middleware (`middleware/authMiddleware.js`)
```javascript
const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader) {
    return res.status(401).json({ 
      message: 'Access denied, no token provided.' 
    });
  }

  const token = authHeader.split(' ')[1];
  
  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).json({ 
      message: 'Invalid token.' 
    });
  }
};
```

---

### 🎯 Auth Controller Example (`controllers/authController.js`)
```javascript
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Register User
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // Generate token
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: { id: user.id, name: user.name, email: user.email },
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Login User
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate token
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(200).json({
      message: 'Login successful',
      token,
      user: { id: user.id, name: user.name, email: user.email },
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
```

---

## 🧰 NPM Scripts

```bash
npm start         # Run the production server
npm run dev       # Run server with nodemon (auto reload)
npm test          # Run tests (if implemented)
```

---

## 📦 Dependencies

```json
{
  "dependencies": {
    "express": "^4.18.2",
    "mysql2": "^3.6.0",
    "sequelize": "^6.32.1",
    "jsonwebtoken": "^9.0.2",
    "bcryptjs": "^2.4.3",
    "dotenv": "^16.3.1",
    "@arcjet/node": "^1.0.0",
    "cors": "^2.8.5"
  },
  "devDependencies": {
    "nodemon": "^3.0.1"
  }
}
```

---

## 🧠 Learning Objectives

This backend project helps you understand and practice:

- ✅ Structuring an Express project using the MVC pattern
- ✅ Handling authentication using JWT manually
- ✅ Securing routes with custom middleware
- ✅ Integrating Arcjet for modern API protection
- ✅ Connecting and querying MySQL databases in Node.js
- ✅ Managing environment variables with dotenv
- ✅ Writing clean, modular backend code
- ✅ Implementing RESTful API design principles
- ✅ Error handling and validation
- ✅ Password hashing with bcrypt

---

## 🛠️ Testing with Postman

You can import this Postman collection to test all endpoints:

1. Create a new collection in Postman
2. Add environment variables:
    - `BASE_URL`: `http://localhost:5000`
    - `TOKEN`: (will be set after login)
3. Test the endpoints in this order:
    - Register → Login → Get Subscriptions → Add Subscription

---

## 🚧 Future Enhancements

- [ ] Add password reset functionality
- [ ] Implement email verification
- [ ] Add subscription categories
- [ ] Create notification system for upcoming renewals
- [ ] Add analytics dashboard endpoints
- [ ] Implement refresh tokens
- [ ] Add unit and integration tests
- [ ] Create API documentation with Swagger

---

## 🐛 Troubleshooting

### Database Connection Issues
```bash
# Make sure MySQL is running
# Check credentials in .env file
# Verify database exists
```

### JWT Token Errors
```bash
# Ensure JWT_SECRET is set in .env
# Check token format: Bearer <token>
# Verify token hasn't expired
```

### Port Already in Use
```bash
# Change PORT in .env file
# Or kill the process using port 5000
```

---

## 📄 License

This project is open-source and available under the **MIT License**.

---

## 👨‍💻 Author

**Minoka Induwara**  
📧 [your-email@example.com]  
🌐 [GitHub Profile](https://github.com/your-username)

---

## 🙏 Acknowledgments

- Express.js Documentation
- JWT.io
- Arcjet Security Platform
- MySQL Documentation
- Sequelize ORM

---

## 📚 Additional Resources

- [Express.js Best Practices](https://expressjs.com/en/advanced/best-practice-security.html)
- [JWT Introduction](https://jwt.io/introduction)
- [MySQL Tutorial](https://dev.mysql.com/doc/)
- [Sequelize Documentation](https://sequelize.org/)
- [Arcjet Documentation](https://docs.arcjet.com/)

---

**🛠️ Built as a backend learning project using Node.js, Express, JWT, and Arcjet.**

*Happy Coding! 🚀*