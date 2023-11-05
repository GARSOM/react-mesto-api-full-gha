const allowedCors = [
  'http://localhost:3001',
  'http://localhost:3000',
  'http://mesto-garsom.nomoredomainsrocks.ru/',
];

module.exports.corsOptions = {
  origin: allowedCors,
  allowedHeaders: ['Origin', 'Content-Type'],
  methods: ['GET', 'PUT', 'PATCH', 'POST', 'DELETE', 'HEAD'],
  credentials: true,
};