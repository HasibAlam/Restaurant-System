const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3301;

app.use(cors());
app.use(bodyParser.json());

// MySQL connection configuration
const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'swe30003_assignment3'
});

    // GET route for fetching menu items
    app.get('/menuitems', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM "menuitems"');
        res.json(result.rows);
    } catch (error) {
        console.error('Error querying database:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
    });

    // GET route for fetching a single menu item by ID
    app.get('/menuitems/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var itemId, result, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    itemId = req.params.id;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, pool.query('SELECT * FROM "menuitems" WHERE item_id = $1', [itemId])];
                case 2:
                    result = _a.sent();
                    if (result.rows.length > 0) {
                        res.json(result.rows[0]);
                    }
                    else {
                        res.status(404).json({ success: false, message: 'Menu item not found' });
                    }
                    return [3 /*break*/, 4];
                case 3:
                    error_2 = _a.sent();
                    console.error('Error querying database:', error_2);
                    res.status(500).json({ success: false, message: 'Internal server error' });
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); });
    // POST route for authentication
    app.post('/authenticate', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var _a, username, password, result, error_3;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = req.body, username = _a.username, password = _a.password;
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, pool.query('SELECT * FROM "users" WHERE username = $1 AND password = $2', [username, password])];
                case 2:
                    result = _b.sent();
                    if (result.rows.length > 0) {
                        res.json({ success: true });
                    }
                    else {
                        res.status(401).json({ success: false, message: 'Invalid credentials' });
                    }
                    return [3 /*break*/, 4];
                case 3:
                    error_3 = _b.sent();
                    console.error('Error querying database:', error_3);
                    res.status(500).json({ success: false, message: 'Internal server error' });
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); });
    // DELETE route for deleting a menu item by ID
    app.delete('/menuitems/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var itemId, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    itemId = req.params.id;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, pool.query('DELETE FROM "menuitems" WHERE item_id = $1', [itemId])];
                case 2:
                    _a.sent();
                    res.json({ success: true, message: "Menu item with ID ".concat(itemId, " deleted successfully") });
                    return [3 /*break*/, 4];
                case 3:
                    error_4 = _a.sent();
                    console.error('Error deleting menu item:', error_4);
                    res.status(500).json({ success: false, message: 'Internal server error' });
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); });
    // PUT route for updating a menu item by ID
    app.put('/menuitems/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var itemId, _a, item_name, description, price, error_5;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    itemId = req.params.id;
                    _a = req.body, item_name = _a.item_name, description = _a.description, price = _a.price;
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, pool.query('UPDATE "menuitems" SET item_name = $1, description = $2, price = $3 WHERE item_id = $4', [item_name, description, price, itemId])];
                case 2:
                    _b.sent();
                    res.json({ success: true, message: "Menu item with ID ".concat(itemId, " updated successfully") });
                    return [3 /*break*/, 4];
                case 3:
                    error_5 = _b.sent();
                    console.error('Error updating menu item:', error_5);
                    res.status(500).json({ success: false, message: 'Internal server error' });
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); });
    // POST route for adding a new menu item
    app.post('/menuitems', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var _a, item_name, description, price, error_6;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = req.body, item_name = _a.item_name, description = _a.description, price = _a.price;
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, pool.query('INSERT INTO "menuitems" (item_name, description, price) VALUES ($1, $2, $3)', [item_name, description, price])];
                case 2:
                    _b.sent();
                    res.json({ success: true, message: 'New menu item added successfully' });
                    return [3 /*break*/, 4];
                case 3:
                    error_6 = _b.sent();
                    console.error('Error adding new menu item:', error_6);
                    res.status(500).json({ success: false, message: 'Internal server error' });
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); });
    // Reservation routes
    // GET route for fetching all reservations
    app.get('/reservations', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var result, error_7;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, pool.query('SELECT * FROM "reservation"')];
                case 1:
                    result = _a.sent();
                    res.json(result.rows);
                    return [3 /*break*/, 3];
                case 2:
                    error_7 = _a.sent();
                    console.error('Error querying database:', error_7);
                    res.status(500).json({ success: false, message: 'Internal server error' });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); });
    // POST route for creating a reservation
    app.post('/reservations', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var _a, customer_name, reservation_date, reservation_time, num_guests, manager_id, error_8;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = req.body, customer_name = _a.customer_name, reservation_date = _a.reservation_date, reservation_time = _a.reservation_time, num_guests = _a.num_guests, manager_id = _a.manager_id;
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, pool.query('INSERT INTO "reservation" (customer_name, reservation_date, reservation_time, num_guests, manager_id) VALUES ($1, $2, $3, $4, $5)', [customer_name, reservation_date, reservation_time, num_guests, manager_id])];
                case 2:
                    _b.sent();
                    res.json({ success: true, message: 'Reservation created successfully' });
                    return [3 /*break*/, 4];
                case 3:
                    error_8 = _b.sent();
                    console.error('Error creating reservation:', error_8);
                    res.status(500).json({ success: false, message: 'Internal server error' });
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); });
    // PUT route for updating a reservation by ID
    app.put('/reservations/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var reservationId, _a, customer_name, reservation_date, reservation_time, num_guests, manager_id, error_9;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    reservationId = req.params.id;
                    _a = req.body, customer_name = _a.customer_name, reservation_date = _a.reservation_date, reservation_time = _a.reservation_time, num_guests = _a.num_guests, manager_id = _a.manager_id;
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, pool.query('UPDATE "reservation" SET customer_name = $1, reservation_date = $2, reservation_time = $3, num_guests = $4, manager_id = $5 WHERE reservation_id = $6', [customer_name, reservation_date, reservation_time, num_guests, manager_id, reservationId])];
                case 2:
                    _b.sent();
                    res.json({ success: true, message: "Reservation with ID ".concat(reservationId, " updated successfully") });
                    return [3 /*break*/, 4];
                case 3:
                    error_9 = _b.sent();
                    console.error('Error updating reservation:', error_9);
                    res.status(500).json({ success: false, message: 'Internal server error' });
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); });
    // DELETE route for deleting a reservation by ID
    app.delete('/reservations/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var reservationId, error_10;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    reservationId = req.params.id;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, pool.query('DELETE FROM "reservation" WHERE reservation_id = $1', [reservationId])];
                case 2:
                    _a.sent();
                    res.json({ success: true, message: "Reservation with ID ".concat(reservationId, " deleted successfully") });
                    return [3 /*break*/, 4];
                case 3:
                    error_10 = _a.sent();
                    console.error('Error deleting reservation:', error_10);
                    res.status(500).json({ success: false, message: 'Internal server error' });
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); });
    // PUT route for confirming a reservation by ID
    app.put('/reservations/:id/confirm', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var reservationId, error_11;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    reservationId = req.params.id;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, pool.query('UPDATE "reservation" SET status = $1 WHERE reservation_id = $2', ['confirmed', reservationId])];
                case 2:
                    _a.sent();
                    res.json({ success: true, message: "Reservation with ID ".concat(reservationId, " confirmed successfully") });
                    return [3 /*break*/, 4];
                case 3:
                    error_11 = _a.sent();
                    console.error('Error confirming reservation:', error_11);
                    res.status(500).json({ success: false, message: 'Internal server error' });
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); });
    // GET route for fetching order history
    app.get('/orders', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var result, error_12;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, pool.query('SELECT * FROM "orderhistory"')];
                case 1:
                    result = _a.sent();
                    res.json(result.rows);
                    return [3 /*break*/, 3];
                case 2:
                    error_12 = _a.sent();
                    console.error('Error querying database:', error_12);
                    res.status(500).json({ success: false, message: 'Internal server error' });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); });
    // POST route for creating a new order
    app.post('/orders', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var _a, total_amount, status, ordered_items, order_date, error_13;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = req.body, total_amount = _a.total_amount, status = _a.status, ordered_items = _a.ordered_items;
                    order_date = new Date();
                    if (!total_amount || isNaN(total_amount)) {
                        return [2 /*return*/, res.status(400).json({ success: false, message: 'Total amount must be provided and must be a number' })];
                    }
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, pool.query('INSERT INTO "orderhistory" (order_date, total_amount, status, ordered_items) VALUES ($1, $2, $3, $4)', [order_date, total_amount, status, ordered_items])];
                case 2:
                    _b.sent();
                    res.json({ success: true, message: 'Order created successfully' });
                    return [3 /*break*/, 4];
                case 3:
                    error_13 = _b.sent();
                    console.error('Error creating order:', error_13);
                    res.status(500).json({ success: false, message: 'Internal server error' });
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); });
    // PUT route for updating order status by ID
    app.put('/orders/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var orderId, status, error_14;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    orderId = req.params.id;
                    status = req.body.status;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, pool.query('UPDATE "orderhistory" SET status = $1 WHERE order_id = $2', [status, orderId])];
                case 2:
                    _a.sent();
                    res.json({ success: true, message: "Order with ID ".concat(orderId, " status updated successfully") });
                    return [3 /*break*/, 4];
                case 3:
                    error_14 = _a.sent();
                    console.error('Error updating order status:', error_14);
                    res.status(500).json({ success: false, message: 'Internal server error' });
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); });
    // DELETE route for deleting an order by ID
    app.delete('/orders/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var orderId, error_15;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    orderId = req.params.id;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, pool.query('DELETE FROM "orderhistory" WHERE order_id = $1', [orderId])];
                case 2:
                    _a.sent();
                    res.json({ success: true, message: "Order with ID ".concat(orderId, " deleted successfully") });
                    return [3 /*break*/, 4];
                case 3:
                    error_15 = _a.sent();
                    console.error('Error deleting order:', error_15);
                    res.status(500).json({ success: false, message: 'Internal server error' });
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); });
    app.listen(port, function () {
        console.log("Server running on port ".concat(port));
    });
    exports.default = app;
