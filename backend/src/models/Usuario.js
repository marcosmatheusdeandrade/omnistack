import Sequelize, {Model} from 'sequelize'
import Filial from './Filial'

const config = require('../../config/database.js');
const sequelize = new Sequelize(config);

export default class Usuario extends Model {

}

Usuario.init({
  idUsuario: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  idFilial: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  nome: {
    type: Sequelize.STRING,
    allowNull: false
  },
  login: {
    type: Sequelize.STRING,
    allowNull: false
  },
  senha: {
    type: Sequelize.STRING,
    allowNull: false
  },
  emailContato: {
    type: Sequelize.STRING,
    allowNull: false
  },
  telefone: {
    type: Sequelize.STRING,
    allowNull: false
  },

}, {
  sequelize,
  freezeTableName: true,
  modelName: 'Usuario'
});

Usuario.belongsTo(Filial, {foreignKey: 'idFilial', targetKey: 'idFilial'});

sequelize.sync();