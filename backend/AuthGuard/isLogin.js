const path = require('path');
const rootPath = path.resolve(__dirname,'..'); //取得上一層路徑位置 
module.exports = (req, res, next) => {
  if (req.session.email) {
    console.log('authenticated')
    res.status(200).sendFile(path.join(rootPath, 'dist', 'index.html'));
    next()
  } 
  else {
    console.log('not authenticated')
    res.status(200).sendFile(path.join(rootPath, 'dist', 'index.html'));
  }
}