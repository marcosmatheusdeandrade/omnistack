import Sequelize, {Model} from 'sequelize'
import Empresa from './Empresa'

const config = require('../../config/database.js');
console.log(config)
const sequelize = new Sequelize(config);

export default class Filial extends Model {

}

Filial.init({
  idFilial: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  descricao: {
    type: Sequelize.STRING,
    allowNull: false
  },
  idEmpresa: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
}, {
  sequelize,
  freezeTableName: true,
  modelName: 'Filial'
});

Filial.belongsTo(Empresa);