import express, { Request, Response } from 'express';
import { Pool } from 'pg';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());

// PostgreSQL connection configuration
const pool = new Pool({
  connectionString: process.env.POSTGRES_URL_NO_SSL,
  ssl: {
    rejectUnauthorized: false
  }
});

app.get('/', (req: Request, res: Response) => {
  res.send('Server is running');
});

// GET route for fetching menu items
app.get('/menuitems', async (req: Request, res: Response) => {
  try {
    const result = await pool.query('SELECT * FROM "menuitems"');
    res.json(result.rows);
  } catch (error) {
    console.error('Error querying database:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// GET route for fetching a single menu item by ID
app.get('/menuitems/:id', async (req: Request, res: Response) => {
  const itemId = req.params.id;

  try {
    const result = await pool.query('SELECT * FROM "menuitems" WHERE item_id = $1', [itemId]);
    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).json({ success: false, message: 'Menu item not found' });
    }
  } catch (error) {
    console.error('Error querying database:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// POST route for authentication
app.post('/authenticate', async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const result = await pool.query('SELECT * FROM "users" WHERE username = $1 AND password = $2', [username, password]);
    if (result.rows.length > 0) {
      res.json({ success: true });
    } else {
      res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Error querying database:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// DELETE route for deleting a menu item by ID
app.delete('/menuitems/:id', async (req: Request, res: Response) => {
  const itemId = req.params.id;

  try {
    await pool.query('DELETE FROM "menuitems" WHERE item_id = $1', [itemId]);
    res.json({ success: true, message: `Menu item with ID ${itemId} deleted successfully` });
  } catch (error) {
    console.error('Error deleting menu item:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// PUT route for updating a menu item by ID
app.put('/menuitems/:id', async (req: Request, res: Response) => {
  const itemId = req.params.id;
  const { item_name, description, price } = req.body;

  try {
    await pool.query('UPDATE "menuitems" SET item_name = $1, description = $2, price = $3 WHERE item_id = $4', [item_name, description, price, itemId]);
    res.json({ success: true, message: `Menu item with ID ${itemId} updated successfully` });
  } catch (error) {
    console.error('Error updating menu item:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// POST route for adding a new menu item
app.post('/menuitems', async (req: Request, res: Response) => {
  const { item_name, description, price } = req.body;

  try {
    await pool.query('INSERT INTO "menuitems" (item_name, description, price) VALUES ($1, $2, $3)', [item_name, description, price]);
    res.json({ success: true, message: 'New menu item added successfully' });
  } catch (error) {
    console.error('Error adding new menu item:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// Reservation routes
// GET route for fetching all reservations
app.get('/reservations', async (req: Request, res: Response) => {
  try {
    const result = await pool.query('SELECT * FROM "reservation"');
    res.json(result.rows);
  } catch (error) {
    console.error('Error querying database:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// POST route for creating a reservation
app.post('/reservations', async (req: Request, res: Response) => {
  const { customer_name, reservation_date, reservation_time, num_guests, manager_id } = req.body;

  try {
    await pool.query('INSERT INTO "reservation" (customer_name, reservation_date, reservation_time, num_guests, manager_id) VALUES ($1, $2, $3, $4, $5)', [customer_name, reservation_date, reservation_time, num_guests, manager_id]);
    res.json({ success: true, message: 'Reservation created successfully' });
  } catch (error) {
    console.error('Error creating reservation:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// PUT route for updating a reservation by ID
app.put('/reservations/:id', async (req: Request, res: Response) => {
  const reservationId = req.params.id;
  const { customer_name, reservation_date, reservation_time, num_guests, manager_id } = req.body;

  try {
    await pool.query('UPDATE "reservation" SET customer_name = $1, reservation_date = $2, reservation_time = $3, num_guests = $4, manager_id = $5 WHERE reservation_id = $6', [customer_name, reservation_date, reservation_time, num_guests, manager_id, reservationId]);
    res.json({ success: true, message: `Reservation with ID ${reservationId} updated successfully` });
  } catch (error) {
    console.error('Error updating reservation:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// DELETE route for deleting a reservation by ID
app.delete('/reservations/:id', async (req: Request, res: Response) => {
  const reservationId = req.params.id;

  try {
    await pool.query('DELETE FROM "reservation" WHERE reservation_id = $1', [reservationId]);
    res.json({ success: true, message: `Reservation with ID ${reservationId} deleted successfully` });
  } catch (error) {
    console.error('Error deleting reservation:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// PUT route for confirming a reservation by ID
app.put('/reservations/:id/confirm', async (req: Request, res: Response) => {
  const reservationId = req.params.id;

  try {
    await pool.query('UPDATE "reservation" SET status = $1 WHERE reservation_id = $2', ['confirmed', reservationId]);
    res.json({ success: true, message: `Reservation with ID ${reservationId} confirmed successfully` });
  } catch (error) {
    console.error('Error confirming reservation:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// GET route for fetching order history
app.get('/orders', async (req: Request, res: Response) => {
  try {
    const result = await pool.query('SELECT * FROM "orderhistory"');
    res.json(result.rows);
  } catch (error) {
    console.error('Error querying database:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// POST route for creating a new order
app.post('/orders', async (req: Request, res: Response) => {
  const { total_amount, status, ordered_items } = req.body;
  const order_date = new Date(); // Set order date to current date

  if (!total_amount || isNaN(total_amount)) {
    return res.status(400).json({ success: false, message: 'Total amount must be provided and must be a number' });
  }

  try {
    await pool.query('INSERT INTO "orderhistory" (order_date, total_amount, status, ordered_items) VALUES ($1, $2, $3, $4)', [order_date, total_amount, status, ordered_items]);
    res.json({ success: true, message: 'Order created successfully' });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// PUT route for updating order status by ID
app.put('/orders/:id', async (req: Request, res: Response) => {
  const orderId = req.params.id;
  const { status } = req.body;

  try {
    await pool.query('UPDATE "orderhistory" SET status = $1 WHERE order_id = $2', [status, orderId]);
    res.json({ success: true, message: `Order with ID ${orderId} status updated successfully` });
  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// DELETE route for deleting an order by ID
app.delete('/orders/:id', async (req: Request, res: Response) => {
  const orderId = req.params.id;

  try {
    await pool.query('DELETE FROM "orderhistory" WHERE order_id = $1', [orderId]);
    res.json({ success: true, message: `Order with ID ${orderId} deleted successfully` });
  } catch (error) {
    console.error('Error deleting order:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

export default app;

