module.exports = {
  dialect: 'postgres',
  host: '192.168.99.100',
  username: 'postgres',
  password: 'docker',
  database: 'gym',
  define: {
    timestamps: true,
    undercored: true,
    underscoreAll: true,
  },
};
