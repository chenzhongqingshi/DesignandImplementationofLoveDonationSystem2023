<template>
<div>
  <el-container>
  <el-header class="home"><div class="title">爱心捐赠系统</div>
  <el-dropdown class="info">
  <span class="el-dropdown-link"><div class="headPortrait"><div>天下滨江</div><i><img src="./2.jpg"></i></div>
    
  </span>
  <el-dropdown-menu slot="dropdown">
    <el-dropdown-item>我的</el-dropdown-item>
    
    <el-dropdown-item>退出登录</el-dropdown-item>
    
  </el-dropdown-menu>
</el-dropdown>
  </el-header>
  <el-container>
    <el-aside width="200px">
      <el-menu router unique-opened>
        
          <el-submenu :index="item.id" v-for="item in navigationBar">
        <template slot="title"><i class="el-icon-message" style="color:#1accff;margin-right:5px"></i>{{item.text}}</template>
          <el-menu-item v-for="i in item.childents" :index="i.path">{{i.text}}</el-menu-item>
      </el-submenu>
          
      </el-menu>
        </el-aside>
    <el-main class="p1"><router-view></router-view></el-main>
  </el-container>
</el-container>
</div>
</template>

<script>
export default {
name:'User',
data(){
return{
  navigationBar:[
    {
      text:'首页',
      id:"1",
      
      childents:[
        {
          text:"首页",
          path:'/User/userHomePage'
        }
      ]
    },
    {
      text:'物品捐赠',
      id:"2",
      childents:[
      {
      text:'上传物品',
      path:'/User/uploadItems'
    },
    {
      text:'物品状态',
      path:'/User/itemStatus'
    }
      ]
    },
    {
      text:'历史捐赠',
      id:"3",
      childents:[
        {
      text:'捐赠成功',
      path:'/User/donationSucceeded'
    },
    {
      text:'捐赠失败',
      path:'/User/donationFailed'
    }
      ]
    },
    {
      text:'积分兑换',
      id:"4",
      childents:[
        {
      text:'商城',
      path:'/User/shoppingMall'
    },
    {
      text:'兑换商品',
      path:'/User/exchangeItems'
    }
      ]
    },
    {
      id:"5",
      text:'我的',
      childents:[
        {
          text:"我的",
          path:'/User/userMy'
        }
      ]

    },
  ]
}
},
methods:{
  menuClick(index){
  this.$router.push({
    path:index
  })
  }
},
mounted(){
  this.$router.push({
    path:'/User/userHomePage'
  })
}
}
</script>

<style>
.home{
  background:#409eff;
  display:flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 15px;
  box-sizing: border-box;
}
.home .title{
  font-size: 30px;
  font-family:'Courier New', Courier, monospace;
  color:white
}
.home .info{
cursor: pointer;
}
.el-dropdown-link img{
  width:48px;
  height: 48px;
  border-radius: 24px;
}
.headPortrait{
display: flex;
align-items: center;
justify-content: center;

}
.headPortrait div{
  margin-right: 5px;
}
.p1{
  padding:0px;
}
</style>