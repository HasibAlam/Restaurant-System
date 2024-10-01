USE swe30003_assignment3;

-- Insert Menu Items
INSERT INTO MenuItems (item_name, description, price) VALUES
('Hamburger', 'Juicy beef patty with lettuce, tomato, and cheese on a sesame seed bun', 9.99),
('Cheeseburger', 'Hamburger with an extra slice of cheese', 10.99),
('Chicken Sandwich', 'Grilled chicken breast topped with lettuce, tomato, and mayo on a toasted bun', 8.99),
('French Fries', 'Golden and crispy fries', 3.99),
('Onion Rings', 'Crispy breaded onion rings', 4.99),
('Caesar Salad', 'Romaine lettuce, croutons, parmesan cheese, and Caesar dressing', 7.99),
('Greek Salad', 'Mixed greens, olives, feta cheese, tomatoes, cucumbers, and Greek dressing', 8.99),
('Margarita Pizza', 'Classic pizza topped with tomato sauce, mozzarella cheese, and fresh basil', 11.99),
('Pepperoni Pizza', 'Margarita pizza with pepperoni slices', 12.99),
('Pasta Carbonara', 'Spaghetti with bacon, egg, parmesan cheese, and cream sauce', 13.99);

-- Insert Users
INSERT INTO users (username, password, account_type) VALUES
('manager', 'password', 'manager'),
('kitchenstaff', 'password', 'kitchenstaff'),
('frontstaff', 'password', 'frontstaff');
