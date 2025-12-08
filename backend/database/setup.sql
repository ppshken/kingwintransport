-- Setup script to create and initialize the database
-- Run this first: mysql -u root -p < database/setup.sql

-- Create database if not exists
CREATE DATABASE IF NOT EXISTS kingwin_transport CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Use the database
USE kingwin_transport;

-- Show success message
SELECT 'Database created successfully!' AS message;
