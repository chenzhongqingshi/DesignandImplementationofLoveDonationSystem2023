const formidable = require('formidable');
const path=require('path')
const form = new formidable.IncomingForm();
form.uploadDir = path.join(__dirname, '../../chen/dist/pictures');
form.keepExtensions = true;
form.encoding='utf-8'
module.exports={form}