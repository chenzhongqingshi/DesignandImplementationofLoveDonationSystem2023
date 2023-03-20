const express=require('express')
const {db}=require('../../MySQL/mysql.js')
const userRouter=express.Router()
const fs=require('fs')
const path=require('path')
const {form} =require('../../Formidable/formidable.js')
userRouter.post('/user/login',(req,res)=>{
  console.log(req.body)
    if(req.body.identity=="user"){

        db.query(`select account,password from user where account='${req.body.account}' and password='${req.body.password}';`,(err,results)=>{
              if(err){
                console.log(err)
                res.send("登录失败")
              }else{
                if(results.length==0){
                  res.send("登录失败")
              }else{
                res.send("登录成功")
              }
                
              }
        })
        
    }else{
        
    }
}) 
userRouter.post('/user/register',(req,res)=>{
    console.log(req.body)
    if(req.body.identity=="user"){
        db.query(`insert into user (account,password) values ('${req.body.account}','${req.body.password}');`,(err,results)=>{
              if(err){
                console.log(err)
                res.send("注册失败")
              }else{
                console.log(results)
                res.send("注册成功")
              }
        })
        
    }else{
        
    }
}) 
//上传图片的路由
userRouter.post('/user/donation',(req,res)=>{
    
    form.parse(req,(err,filelds,file)=>{
if(err){
    console.log(err)
    res.send('上传失败！')
}else{
    let filename=file.file.originalFilename
     let arr=filename.split('.')
     let name=''
     for(let i=0;i<arr.length-1;i++){
    name=name+arr[i]
     }
     let date=new Date()
     let newname=name+'_'+date.getMonth() + "_" + date.getDay() + "_" + date.getHours() + "_" + date.getMinutes()+'.'+arr[arr.length-1]
     
     fs.renameSync(file.file.filepath, path.join(form.uploadDir,newname))
     console.log(`/pictures/${newname}`)
    res.send(`/pictures/${newname}`)
}
    })

})
userRouter.post('/user/uploadItems',(req,res)=>{
    
  console.log(req.body)
  /*  db.query(`insert into itempending (account,photo,region,address,itemdescribe,itemtype) values ('${req.body.account}','${req.body.picturesurl}','${req.body.region.province.value+req.body.region.city.value+req.body.region.area.value}','${req.body.address}','${req.body.itemDescription}','${req.body.itemType}');`,(err,results)=>{
    if(err){
      console.log(err)
      res.send("上传失败")
    }else{
      console.log(results)
      res.send("上传成功")
    } */
//}) 
/* db.query(`insert into useritemstatus (account,photo,region,address,itemdescribe,itemtype,state) values ('${req.body.account}','${req.body.picturesurl}','${req.body.region.province.value+req.body.region.city.value+req.body.region.area.value}','${req.body.address}','${req.body.itemDescription}','${req.body.itemType}',0);`,(err,results)=>{

})  */
res.send("上传成功")
})
userRouter.post('/user/data',(req,res)=>{
  db.query(`select account,region,address,headPortrait,integral,name from user where account='${req.body.account}';`,(err,results)=>{
    res.send(results)
  })
})
userRouter.post('/user/update',(req,res)=>{
db.query(`update user set region='${req.body.region.province.value+req.body.region.city.value+req.body.region.area.value}',address='${req.body.address}',headPortrait='${req.body.picturesurl}',name='${req.body.names}' where account='${req.body.account}'`,(err,results)=>{
console.log(err)
})
})
userRouter.get('/user/shopping',(req,res)=>{
  db.query(`select names,photo,integral,details from shopping;`,(err,results)=>{
    res.send(results)
  })

})
userRouter.post('/user/exchange',(req,res)=>{
  let data
  db.query(`select region,address,integral from user where account='${req.body.account}';`,(err,results)=>{
    data=results[0]
    console.log(data,'66666')
    db.query(`insert into exchangetable (account,region,address,names,courier,state) values ('${req.body.account}','${data.region}','${data.address}','${req.body.item.names}','00000000000',0);`,(err,results)=>{
      if(err){console.log(err)}
    })
    db.query(`update user set integral=${data.integral-req.body.item.integral}`,(err,results)=>{
      console.log(err)
      })
  })
  
})
userRouter.post('/user/itemStatus',(req,res)=>{
  db.query(`select photo,itemtype,itemdescribe,state from useritemstatus where account='${req.body.account}';`,(err,results)=>{
    
    res.send(results)
  })
})
userRouter.post('/user/success',(req,res)=>{
  db.query(`select photo,itemtype,itemdescribe from useritemstatus where account='${req.body.account}' and state=5;`,(err,results)=>{
    
    res.send(results)
  })
})
userRouter.post('/user/fail',(req,res)=>{
  db.query(`select photo,itemtype,itemdescribe,remarks from failedtopassthereview where account='${req.body.account}';`,(err,results)=>{
    console.log(results,'wocao')
    res.send(results)
  })
})
module.exports={userRouter}