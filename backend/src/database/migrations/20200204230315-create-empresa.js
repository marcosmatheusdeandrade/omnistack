'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const EmpresaTable = queryInterface.createTable('Empresa', {
      idEmpresa: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      razaoSocial: {
        type: Sequelize.STRING,
        allowNull: false
      },
      nomerFantasia: {
        type: Sequelize.STRING,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date(),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date(),
      },
    });

    return EmpresaTable;
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
