module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('sales', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
        foreignKey: true,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      seller_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
        foreignKey: true,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      total_price: {
        type: Sequelize.DECIMAL(9, 2),
        allowNull: false,
      },
      delivery_address: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      delivery_number: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      sale_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    });
  },
  down: async (queryInterface, _Sequelize) => {
    await queryInterface.dropTable('sales');
  },
};
