-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(300) NOT NULL,
    `password` VARCHAR(100) NOT NULL,
    `username` VARCHAR(20) NULL,
    `address` VARCHAR(200) NULL,
    `phone_number` INTEGER NULL,
    `policy_agreed` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `users_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
