
CREATE TABLE
    category(
        id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
        name VARCHAR(80) NOT NULL,
        description VARCHAR(254) NOT NULL,
        picture VARCHAR(254),
        created_at DATE DEFAULT (CURRENT_DATE),
        updated_at DATE
    );

CREATE TABLE
    sub_category(
        id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
        name VARCHAR(80) NOT NULL,
        description VARCHAR(254) NOT NULL,
        picture VARCHAR(254),
        created_at DATE DEFAULT (CURRENT_DATE),
        updated_at DATE
    );

CREATE TABLE
    product (
        id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
        name VARCHAR(80) NOT NULL,
        description VARCHAR(254) NOT NULL,
        price INT NOT NULL,
        quantity INT NOT NULL,
        availability TINYINT NOT NULL,
        category_id INT,
        sub_category_id INT,
        FOREIGN KEY (category_id) REFERENCES category(id),
        FOREIGN KEY (sub_category_id) REFERENCES sub_category(id),
        created_at DATE DEFAULT (CURRENT_DATE),
        updated_at DATE
    );

CREATE TABLE
    label(
        id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
        name VARCHAR(80) NOT NULL,
        description VARCHAR(254) NOT NULL,
        created_at DATE DEFAULT (CURRENT_DATE),
        updated_at DATE
    );

CREATE TABLE
    store(
        id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
        name VARCHAR(80) NOT NULL,
        firstname VARCHAR(80) NOT NULL,
        email VARCHAR(100) NOT NULL UNIQUE,
        phone_number VARCHAR(20),
        img_banner VARCHAR(254),
        adress VARCHAR(100),
        city VARCHAR(100),
        postal_code VARCHAR(20),
        latitude FLOAT,
        longitute FLOAT,
        website VARCHAR(254),
        -- network ?,
        means_of_payments VARCHAR(254),
        created_at DATE DEFAULT (CURRENT_DATE),
        updated_at DATE
    );

CREATE TABLE
    label_store(
        id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
        label_id INT,
        store_id INT,
        FOREIGN KEY (label_id) REFERENCES label(id),
        FOREIGN KEY (store_id) REFERENCES store(id)
    );

CREATE TABLE
    store_product(
        id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
        store_id INT,
        product_id INT,
        FOREIGN KEY (store_id) REFERENCES store(id),
        FOREIGN KEY (product_id) REFERENCES product(id)
    );

CREATE TABLE
    role(
        id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
        role VARCHAR(80)
    );

CREATE TABLE
    network (
        id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
        network VARCHAR(100)
    );

CREATE TABLE
    users (
        id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
        lastname VARCHAR(80) NOT NULL,
        firstname VARCHAR(80) NOT NULL,
        email VARCHAR(100) NOT NULL UNIQUE,
        password_hash VARCHAR(100) NOT NULL,
        salt VARCHAR(16) NOT NULL,
        profile_picture VARCHAR(254),
        phone_number VARCHAR(20),
        adress VARCHAR(100),
        city VARCHAR(100),
        postal_code VARCHAR(20),
        latitude FLOAT,
        longitute FLOAT,
        is_producer TINYINT NOT NULL,
        store_id INT,
        role_id INT,
        FOREIGN KEY (role_id) REFERENCES role(id),
        FOREIGN KEY (store_id) REFERENCES store(id),
        created_at DATE DEFAULT (CURRENT_DATE),
        updated_at DATE
    );

CREATE TABLE
    favorite(
        id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
        user_id INT,
        product_id INT,
        FOREIGN KEY (user_id) REFERENCES users(id),
        FOREIGN KEY (product_id) REFERENCES product(id),
        created_at DATE DEFAULT (CURRENT_DATE),
        updated_at DATE
    );

CREATE TABLE
    cart(
        id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
        state VARCHAR(20) NOT NULL,
        user_id INT,
        FOREIGN KEY (user_id) REFERENCES users(id),
        created_at DATE DEFAULT (CURRENT_DATE),
        updated_at DATE
    );

CREATE TABLE
    recipe(
        id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
        title VARCHAR(80),
        content VARCHAR(254),
        picture VARCHAR(254),
        created_at DATE DEFAULT (CURRENT_DATE),
        updated_at DATE
    );

CREATE TABLE
    cart_product(
        id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
        cart_id INT,
        product_id INT,
        FOREIGN KEY (cart_id) REFERENCES cart(id),
        FOREIGN KEY (product_id) REFERENCES product(id)
    );

CREATE TABLE
    product_recipe(
        id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
        recipe_id INT,
        product_id INT,
        FOREIGN KEY (recipe_id) REFERENCES recipe(id),
        FOREIGN KEY (product_id) REFERENCES product(id)
    );

CREATE TABLE
    status (
        id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
        state VARCHAR(100)
    );