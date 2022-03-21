CREATE TABLE products_allergies (
    id INT AUTO_INCREMENT, 
    products_id INT,
    allergy_id INT,
    create_at DATETIME DEFAULT NOW(),
    PRIMARY KEY (id),
    FOREIGN KEY (products_id) REFERENCES products(id),
    FOREIGN KEY (allergy_id) REFERENCES allergies(id)
);