"use strict";

module.exports = {
  async up(queryInterface, DataTypes) {
    /**
     * Add altering commands here.
     *
     * Example:
     */
    await queryInterface.createTable("orders", {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      from_airport: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      to_airport: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      from_country: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      to_country: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      total: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "total is required",
          },
        },
      },
      stripe_id: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Stripe ID is required",
          },
        },
      },
      status: {
        type: DataTypes.STRING,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    });
  },

  async down(queryInterface, DataTypes) {
    /**
     * Add reverting commands here.
     *
     * Example:
     */
    await queryInterface.dropTable("orders");
  },
};
