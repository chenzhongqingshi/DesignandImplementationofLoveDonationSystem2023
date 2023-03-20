const express=require('express')
const {db}=require('../../MySQL/mysql.js')
const administratorsRouter=express.Router()
const fs=require('fs')
const path=require('path')
administratorsRouter.post('/administrators/login',(req,res)=>{
   
    if(req.body.identity=="administrators"){
        db.query(`select account,password from administrators where account='${req.body.account}' and password='${req.body.password}';`,(err,results)=>{
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
administratorsRouter.post('/administrators/register',(req,res)=>{
    console.log(req.body)
    if(req.body.identity=="administrators"){
        db.query(`insert into administrators (account,password) values ('${req.body.account}','${req.body.password}');`,(err,results)=>{
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
administratorsRouter.get('/administrators/pending',(req,res)=>{
      db.query(`select account,photo,region,address,itemdescribe,itemtype from itempending;`,(err,results)=>{
        console.log(results)
          res.send(results)
      })
})
administratorsRouter.post('/administrators/clickToPass',(req,res)=>{
  let data
   db.query(`select account,photo,region,address,itemdescribe,itemtype from itempending where account='${req.body.account}' and photo='${req.body.photo}';`,(err,results)=>{
    data=results
    console.log(data)
      db.query(`delete from itempending where account='${req.body.account}' and photo='${req.body.photo}';`,(err,results)=>{}) 
      db.query(`insert into itemstobetaken (account,photo,region,address,itemdescribe,itemtype) values ('${data[0].account}','${data[0].photo}','${data[0].region}','${data[0].address}','${data[0].itemdescribe}','${data[0].itemtype}');`,(err,results)=>{
        if(err){console.log(err)}
      }) 
      db.query(`insert into approved (account,photo,region,address,itemdescribe,itemtype) values ('${data[0].account}','${data[0].photo}','${data[0].region}','${data[0].address}','${data[0].itemdescribe}','${data[0].itemtype}');`,(err,results)=>{
        if(err){console.log(err)}
      })
      db.query(`update useritemstatus set state=1 where account='${req.body.account}' and photo='${req.body.photo}';`,(err,results)=>{
        if(err){console.log(err)}
      }) 
    
}) 

})
administratorsRouter.post('/administrators/auditFailed',(req,res)=>{
  let data=[]
   db.query(`select account,photo,region,address,itemdescribe,itemtype from itempending where account='${req.body.account}' and photo='${req.body.photo}';`,(err,results)=>{
    data=results
    db.query(`delete from itempending where account='${req.body.account}' and photo='${req.body.photo}';`,(err,results)=>{
      if(err){console.log(err)}
    })
    db.query(`insert into failedtopassthereview (account,photo,region,address,itemdescribe,remarks,itemtype) values ('${data[0].account}','${data[0].photo}','${data[0].region}','${data[0].address}','${data[0].itemdescribe}','${req.body.remarks}','${data[0].itemtype}');`,(err,results)=>{
      if(err){console.log(err)}
    })  
})
db.query(`update useritemstatus set state=-1 where account='${req.body.account}' and photo='${req.body.photo}';`,(err,results)=>{
  if(err){console.log(err)}
})
})
administratorsRouter.get('/administrators/adopt',(req,res)=>{
  db.query(`select account,photo,region,address,itemdescribe,itemtype from approved;`,(err,results)=>{
    console.log(results)
    res.send(results)
  })
})
administratorsRouter.get('/administrators/fail',(req,res)=>{
  db.query(`select account,photo,region,address,itemdescribe,itemtype from failedtopassthereview;`,(err,results)=>{
    console.log(results)
    res.send(results)
  })
})
administratorsRouter.post('/administrators/newWarehouse',(req,res)=>{
  db.query(`insert into warehouselist (warehouse,region,address,names,number) values ('${req.body.warehouse}','${req.body.region.province.value+req.body.region.city.value+req.body.region.area.value}','${req.body.address}','${req.body.names}',0);`,(err,results)=>{
    if(err){console.log(err)}
  })
  db.query(`create table ${req.body.names} (account varchar(11),photo varchar(30),itemdescribe varchar(255),itemtype varchar(10),goodsshelves varchar(15));`,(err,results)=>{
    if(err){console.log(err)}
  })  
})
administratorsRouter.get('/administrators/warehouse',(req,res)=>{
  db.query(`select warehouse,region,address,names,number from warehouselist;`,(err,results)=>{
    res.send(results)
  })
})
administratorsRouter.post('/administrators/warehouseDetails',(req,res)=>{

  db.query(`select names from  warehouselist where warehouse='${req.body.warehouse}';`,(err,results)=>{
    let names=results[0].names
    console.log(names)
    db.query(`select account,photo,itemdescribe,itemtype,goodsshelves from ${names};`,(err,results)=>{
    console.log(results)
    res.send(results)
  })
  })
  
})
administratorsRouter.post('/administrators/newRgeion',(req,res)=>{
  db.query(`insert into regionlist (region,address,material) values ('${req.body.region.province.value+req.body.region.city.value+req.body.region.area.value}','${req.body.address}','${req.body.material}');`,(err,results)=>{
    if(err){console.log(err)}
  })
})
administratorsRouter.get('/administrators/regionList',(req,res)=>{
  db.query(`select region,address,material from regionlist;`,(err,results)=>{
    res.send(results)
  })
})


administratorsRouter.get('/administrators/userUnclaimed',(req,res)=>{
  db.query(`select account,photo,region,address,itemdescribe,itemtype from itemstobetaken;`,(err,results)=>{
    console.log(results)
      res.send(results)
  })
  

})
administratorsRouter.post('/administrators/courier',(req,res)=>{
  db.query(`select account,name from courier where region='${req.body.region}';`,(err,results)=>{
    res.send(results)
  })
})
administratorsRouter.get('/administrators/courier',(req,res)=>{
  db.query(`select account,name from courier;`,(err,results)=>{
    console.log(results,'111')
    res.send(results)
  })
})
administratorsRouter.post('/administrators/userTasks',(req,res)=>{
  let data
  
  db.query(`select account,photo,region,address,itemdescribe,itemtype from itemstobetaken where account='${req.body.account}' and photo='${req.body.photo}';`,(err,results)=>{
    data=results
    db.query(`delete from itemstobetaken where account='${req.body.account}' and photo='${req.body.photo}';`,(err,results)=>{
      if(err){console.log(err)}
    })
     db.query(`insert into couriertakething (courier,account,photo,region,address,itemdescribe,state,itemtype) values ('${req.body.courier}','${data[0].account}','${data[0].photo}','${data[0].region}','${data[0].address}','${data[0].itemdescribe}',0,'${data[0].itemtype}');`,(err,results)=>{
      if(err){console.log(err)}
    })
    db.query(`insert into assigntasktable (courier,type,accountRegion,goodsMaterial,state) values ('${req.body.courier}',0,'${data.account}','${data.photo}',0);`,(err,results)=>{
      if(err){console.log(err)}
    })   
  })
  db.query(`update useritemstatus set state=2 where account='${req.body.account}' and photo='${req.body.photo}';`,(err,results)=>{
    if(err){console.log(err)}
  }) 
})
administratorsRouter.get('/administrators/regionList',(req,res)=>{
  db.query(`select region,address,material from regionlist;`,(err,results)=>{
    res.send(results)
  })
})
administratorsRouter.post('/administrators/regionalTasks',(req,res)=>{
  let data
  
  db.query(`select region,address,material from regionlist where region='${req.body.region}' and address='${req.body.address}';`,(err,results)=>{
    data=results[0]
    db.query(`insert into logisticiansandregions (courier,region,address,material,state) values ('${req.body.courier}','${data.region}','${data.address}','${data.material}',0);`,(err,results)=>{
      if(err){console.log(err)}
    })

     db.query(`delete from regionlist where region='${req.body.region}' and address='${req.body.address}';`,(err,results)=>{
      if(err){console.log(err)}
    })
    db.query(`insert into assigntasktable (courier,type,accountRegion,goodsMaterial,state) values ('${req.body.courier}',1,'${data.region}','${data.material}',0);`,(err,results)=>{
      if(err){console.log(err)}
    })  
  })
})

administratorsRouter.post('/administrators/assignTaskTable',(req,res)=>{
  db.query(`select courier,type,accountRegion,goodsMaterial,state from assigntasktable where state='${req.body.state}';`,(err,results)=>{
    res.send(results)
  })
})
administratorsRouter.get('/administrators/regionalDistribution',(req,res)=>{

  db.query(`select region,address,material from logisticiansandregions where state=2;`,(err,results)=>{
    res.send(results)
  })

})
module.exports={administratorsRouter}