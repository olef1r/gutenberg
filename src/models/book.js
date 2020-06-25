export default (sequelize, DataTypes) => {
  const Books = sequelize.define(
    'Books',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      authors: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      publisher: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      publication_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      language: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      subject: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      license_rights: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {}
  );
  return Books;
};
