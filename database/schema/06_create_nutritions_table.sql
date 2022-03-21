CREATE TABLE nutritions (
    id INT AUTO_INCREMENT, 
    products_id INT NOT NULL,
    caffein FLOAT NULL,
    fat FLOAT NULL,
    sugar FLOAT NULL,
    sodium FLOAT NULL,
    create_at DATETIME DEFAULT NOW(),
    PRIMARY KEY (id),
    FOREIGN KEY (products_id) REFERENCES products(id) 
);