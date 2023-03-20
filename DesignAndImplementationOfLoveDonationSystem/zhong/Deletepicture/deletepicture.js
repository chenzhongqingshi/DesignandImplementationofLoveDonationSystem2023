const fs=require('fs')
const path=require('path')
function deletepicture(req,res,next){
   
   setTimeout(() => {
      fs.unlink(path.join(__dirname,`../../chen/dist/chen/${req.url}`),function(err){
if(err){
console.log(err)
}
next()
   }, 1000);
    
})
   }

module.exports={deletepicture}