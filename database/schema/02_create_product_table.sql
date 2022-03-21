-- create products table 
CREATE TABLE products
(
    id INT NOT NULL AUTO_INCREMENT,
    korean_name VARCHAR(200) NOT NULL UNIQUE,
    english_name VARCHAR(200) NULL,
    category_id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (category_id) 
    REFERENCES categories(id)
);