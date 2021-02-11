export default (sequelize, DataTypes) => {
    const User = sequelize.define(
        'User',
        {
            email: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            first_name: {
                type: DataTypes.STRING,
                allowNull: true
            },
            last_name: {
                type: DataTypes.STRING,
                allowNull: true
            },
            password: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            phone_number: {
                allowNull: true,
                type: DataTypes.STRING
            },
            
        },
        {}
    );

    return User;
};