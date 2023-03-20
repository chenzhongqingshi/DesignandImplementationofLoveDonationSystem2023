const { rejects } = require('assert')
const fs=require('fs')
const { resolve } = require('path')
function rewritestatic(static){
    return function(req,res,next){
        
        function goback(){
            
        }
          static(req,res,goback)
          setTimeout(function(){
            next()
          },10)
          
          
        }
    }

module.exports={rewritestatic}