const express=require('express')
const path=require('path')
const {userRouter}=require('./Router/userRouter/userRouter.js')
const {administratorsRouter}=require("./Router/administratorsRouter/administratorsRouter.js")
const {courierRouter}=require("./Router/courierRouter/courierRouter.js")
const app=express()
const bodyParser = require('body-parser');
//拦截所有请求
//extends:true 方法内部使用第三方模块请求的参数
app.use(bodyParser.urlencoded({ extends: false }))
const {rewritestatic}=require("./Rewritestatic/rewritestatic.js")
//const {deletepicture}=require('./Deletepicture/deletepicture.js')
app.use(rewritestatic(express.static(path.join(__dirname,'../chen/dist'))))
//app.use(express.static(path.join(__dirname,'../chen/dist')))
//app.use('/chen',deletepicture)

app.use(userRouter)
app.use(administratorsRouter)
app.use(courierRouter)
app.listen(8000,()=>{
    console.log('服务器启动成功！')
})
