const express=require('express')
const {db}=require('../../MySQL/mysql.js')
const courierRouter=express.Router()
const fs=require('fs')
const path=require('path')

courierRouter.post('/courier/login',(req,res)=>{
    
    if(req.body.identity=="courier"){
        db.query(`select account,password from courier where account='${req.body.account}' and password='${req.body.password}';`,(err,results)=>{
          console.log(results)
            if(results.length==0){
              res.send("登录失败")
          }else{
            res.send("登录成功")
          }
            
          
        })
        
    }else{
        
    }
}) 
courierRouter.post('/courier/register',(req,res)=>{
    console.log(req.body)
    if(req.body.identity=="courier"){
        db.query(`insert into courier (account,password) values ('${req.body.account}','${req.body.password}');`,(err,results)=>{
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
courierRouter.post('/courier/data',(req,res)=>{
  console.log(req.body.account)
  db.query(`select account,region,headPortrait,name from courier where account='${req.body.account}';`,(err,results)=>{
    console.log(results)
    res.send(results)
  })
})
courierRouter.post('/courier/update',(req,res)=>{
  db.query(`update courier set region='${req.body.region.province.value+req.body.region.city.value+req.body.region.area.value}',headPortrait='${req.body.picturesurl}',name='${req.body.names}' where account='${req.body.account}'`,(err,results)=>{
  console.log(err)
  })
  })
  courierRouter.post('/courier/itemsToBeTaken',(req,res)=>{
    let data
   
    db.query(`select region from courier where account='${req.body.account}';`,(err,results)=>{
      data=results[0]
      
      db.query(`select account,photo,region,address,itemdescribe,itemtype from itemstobetaken where region='${data.region}';`,(err,results)=>{//shabi
        console.log(results)
        res.send(results)
      })
    })
    })
    courierRouter.post('/courier/userTasks',(req,res)=>{
      let data
      
      db.query(`select account,photo,region,address,itemdescribe,itemtype from itemstobetaken where account='${req.body.user}' and photo='${req.body.photo}';`,(err,results)=>{
        data=results
        db.query(`delete from itemstobetaken where account='${req.body.user}' and photo='${req.body.photo}';`,(err,results)=>{
          if(err){console.log(err)}
        })
        console.log(data)
         db.query(`insert into couriertakething (courier,account,photo,region,address,itemdescribe,state,itemtype) values ('${req.body.courier}','${data[0].account}','${data[0].photo}','${data[0].region}','${data[0].address}','${data[0].itemdescribe}',0,'${data[0].itemtype}');`,(err,results)=>{
          if(err){console.log(err)}
        })  
      })
      db.query(`update useritemstatus set state=2 where account='${req.body.user}' and photo='${req.body.photo}';`,(err,results)=>{
        if(err){console.log(err)}
      }) 
    })
    courierRouter.post('/courier/receivingAndWarehousing',(req,res)=>{
     
         if(req.body.state==0){
          db.query(`select account,photo,region,address,itemdescribe,itemtype from couriertakething where courier='${req.body.account}' and state=0;`,(err,results)=>{
        
            res.send(results)
          })
         }else{
          db.query(`select account,photo,region,address,itemdescribe,itemtype from couriertakething where courier='${req.body.account}' and state=1;`,(err,results)=>{
            res.send(results)
          })
         }
    })
    courierRouter.post('/courier/retrieved',(req,res)=>{
      db.query(`update couriertakething set state=1 where courier='${req.body.courier}' and account='${req.body.user}' and photo='${req.body.photo}';`,(err,results)=>{
        if(err){console.log(err)}
      }) 
      db.query(`update useritemstatus set state=3 where account='${req.body.user}' and photo='${req.body.photo}';`,(err,results)=>{
        if(err){console.log(err)}
      })
      //获得积分
      db.query(`select integral from user where account='${req.body.user}';`,(err,results)=>{
        let data=results[0]
        db.query(`update user set integral=${data.integral+5} where account='${req.body.user}';`,(err,results)=>{
          if(err){console.log(err)}
        }) 
      })
      db.query(`update useritemstatus set state=3 where account='${req.body.user}' and photo='${req.body.photo}';`,(err,results)=>{
        if(err){console.log(err)}
      })  
    })
    courierRouter.post('/courier/warehousing',(req,res)=>{
     /*  let data
      db.query(`select account,photo,itemdescribe,itemtype from couriertakething where courier='${req.body.courier}' and account='${req.body.user}' and photo='${req.body.photo}';`,(err,results)=>{
        data=results[0]
        db.query(`select names from warehouselist where warehouse='${req.body.names}';`,(err,results)=>{
          db.query(`insert into ${results[0].names} (account,photo,itemdescribe,itemtype,goodsShelves) values ('${data.account}','${data.photo}','${data.itemdescribe}','${data.itemtype}','${req.body.goodsShelves}');`)
        })
        db.query(`delete from couriertakething where courier='${req.body.courier}' and account='${req.body.user}' and photo='${req.body.photo}';`,(err,results)=>{
          if(err){console.log(err)}
        })
      })
      db.query(`update useritemstatus set state=4 where account='${req.body.user}' and photo='${req.body.photo}';`,(err,results)=>{
        if(err){console.log(err)}
      }) 
      db.query(`select * from assigntasktable where accountRegion='${req.body.user}' and goodsMaterial='${req.body.photo}';`,(err,results)=>{
       if(results.length==1){
        db.query(`update assigntasktable set state=1 where accountRegion='${req.body.user}' and goodsMaterial='${req.body.photo}'`,(err,results)=>{

        })
       }
      }) */
      res.send('入库成功')
    })
    courierRouter.get('/courier/regionList',(req,res)=>{
      db.query(`select region,address,material from regionlist;`,(err,results)=>{
        res.send(results)
      })
    })
    courierRouter.post('/courier/regionalTasks',(req,res)=>{
      let data
      console.log(req.body)
      db.query(`select region,address,material from regionlist where region='${req.body.region}' and address='${req.body.address}';`,(err,results)=>{
        data=results[0]
        db.query(`insert into logisticiansandregions (courier,region,address,material,state) values ('${req.body.account}','${data.region}','${data.address}','${data.material}',0);`,(err,results)=>{
          if(err){console.log(err)}
        })

         db.query(`delete from regionlist where region='${req.body.region}' and address='${req.body.address}';`,(err,results)=>{
          if(err){console.log(err)}
        })  
      })
    })
    courierRouter.post('/courier/regionalDistribution',(req,res)=>{
      db.query(`select region,address,material from logisticiansandregions where courier='${req.body.account}' and state=${req.body.state};`,(err,results)=>{
        res.send(results)
      })
    })
    courierRouter.post('/courier/regionalDistributionupdate',(req,res)=>{
      db.query(`update logisticiansandregions set state='${req.body.state}' where courier='${req.body.account}' and region='${req.body.region}' and address='${req.body.address}';`,(err,results)=>{
        if(err){console.log(err)}
      }) 
      if(req.body.state==2){
        db.query(`select material from logisticiansandregions where region='${req.body.region}' and address='${req.body.address}';`,(err,results)=>{
          let data=results[0]
       db.query(`select * from assigntasktable where accountRegion='${req.body.region}' and goodsMaterial='${data.material}';`,(err,results)=>{
          if(results.length==1){
           db.query(`update assigntasktable set state=1 where accountRegion='${req.body.region}' and goodsMaterial='${data.material}'`,(err,results)=>{
             
           })
          }
         })
        })
        
      }
    })
    courierRouter.post('/courier/warehouseDetails',(req,res)=>{
      let data
      db.query(`select names from warehouselist where warehouse='${req.body.names}';`,(err,results)=>{
        data=results[0]
        db.query(`select account,photo,itemdescribe,itemtype,goodsShelves from ${data.names};`,(err,results)=>{
          res.send(results)
        })
      })
    })
    courierRouter.post('/courier/Outbound',(req,res)=>{
     /*  let data
      db.query(`select names from warehouselist where warehouse='${req.body.names}';`,(err,results)=>{
        data=results[0]
        db.query(`delete from ${data.names} where account='${req.body.account}' and photo='${req.body.photo}';`,(err,results)=>{
          if(err){console.log(err)}
        }) 
      })
      db.query(`update useritemstatus set state=5 where account='${req.body.account}' and photo='${req.body.photo}';`,(err,results)=>{
        if(err){console.log(err)}
      })  */
      res.send('出库成功')
    })
    courierRouter.post('/courier/userRedemption',(req,res)=>{
      if(req.body.courier=='00000000000'){
        db.query(`select region from courier where account='${req.body.account}';`,(err,results)=>{
          data=results[0]
        db.query(`select account,region,address,names from exchangetable where region='${data.region}' and courier='00000000000';`,(err,results)=>{
          console.log(results,'33333')
          res.send(results)
        })
      })
      }else if(req.body.courier!='00000000000'&&req.body.a==0){
        db.query(`update exchangetable set courier='${req.body.courier}',state=${req.body.state} where account='${req.body.account}' and names='${req.body.names}';`,(err,results)=>{
          if(err){console.log(err)}
        }) 
      }else if(req.body.courier!='00000000000'&&req.body.a==1){
        db.query(`select account,region,address,names from exchangetable where courier='${req.body.courier}' and state=${req.body.state};`,(err,results)=>{
          console.log(results)
          res.send(results)

        })
      }
    })
    courierRouter.post('/user/commodity',(req,res)=>{
      db.query(`select * from shopping,exchangetable where exchangetable.account='${req.body.account}'`,(err,results)=>{
res.send(results)
      })
    })
module.exports={courierRouter}