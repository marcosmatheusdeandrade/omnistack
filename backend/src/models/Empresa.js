import Sequelize, {Model} from 'sequelize'

const config = require('../../config/database.js');
const sequelize = new Sequelize(config);

export default class Empresa extends Model {

}

Empresa.init({
  idEmpresa: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  razaoSocial: {
    type: Sequelize.STRING,
    allowNull: false
  },
  nomerFantasia: {
    type: Sequelize.STRING,
    allowNull: false
  }
}, {
  sequelize,
  freezeTableName: true,
  modelName: 'Empresa'
});
