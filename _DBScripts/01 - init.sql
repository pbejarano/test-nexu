CREATE TABLE `brands` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `created_at` timestamp DEFAULT (now())
);

CREATE TABLE `models` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `average_price` DECIMAL(10,4) NOT NULL,
  `id_brand` integer NOT NULL,
  `created_at` timestamp DEFAULT (now())
);

ALTER TABLE `models` ADD FOREIGN KEY (`id_brand`) REFERENCES `brands` (`id`);
ALTER TABLE `brands` ADD UNIQUE (nombre);