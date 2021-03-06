module.exports = function(sequelize, DataTypes) {
  var employ_badge = sequelize.define("employ_badge", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    sender_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    recipient_name: { 
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: "employ_basics",
        key: "name"
      }
    },
    badgeid: {
      type: DataTypes.STRING,
      allowNull: false
    },
    badgeurl: {
      type: DataTypes.STRING,
      allowNull: false
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  });
  return employ_badge;
};
