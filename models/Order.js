const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static assoicate() {}

    toJSON() {
      return { ...this.get(), id: undefined };
    }
  }

  Order.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      from_airport: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      from_country: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      to_airport: {
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
    },
    {
      // Other model options go here
      sequelize,
      tableName: "orders",
      modelName: "Order",
    }
  );
  return Order;
};
