export const cors = (req, res, next) => {
  const allowedOrigins = ['http://localhost:3000', 'https://codemagics.ru', 'https://app.codemagics.ru', 'https://demo.codemagics.ru']
  const origin = req.header('origin')?.toLowerCase();
  if (allowedOrigins.includes(origin))
    res.setHeader('Access-Control-Allow-Origin', origin);
  
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
}
