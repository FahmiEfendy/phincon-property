"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          id: "0ac505aa-8ab1-43a9-b031-13a4af886ea9",
          email: "johndoe@gmail.com",
          fullName: "John Doe",
          password:
            "$2y$10$2UFa0AZ5qnDaZN9fP8wJh.8kgyfYPYnRBAC67wF2Ewjde.nii/v26", // johndoe123
          role: "Seller",
          image_url:
            "https://res.cloudinary.com/dgn6szubx/image/upload/v1709520887/image/profile/jama6ywkbqzlni2xctvd.png",
          image_id: "image/profile/jama6ywkbqzlni2xctvd",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "8d41c667-5a29-4a37-ad08-c5ceff1aa158",
          email: "aiden@gmail.com",
          fullName: "Aiden",
          password:
            "$2y$10$wMp9b7hI8JXIFwKWnu4NYOkX87BEhkZCJ1sZmemHZUrQoj17NDLfK", // aiden123
          role: "Seller",
          image_url:
            "https://res.cloudinary.com/dgn6szubx/image/upload/v1709521120/image/profile/zxdh2rhlmqmw93mgbwx0.jpg",
          image_id: "image/profile/zxdh2rhlmqmw93mgbwx0",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
