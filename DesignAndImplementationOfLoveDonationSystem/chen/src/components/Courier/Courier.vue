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
          path:'/Courier/courierHomePage'
        }
      ]
    },
    {
      text:'上门取物',
      id:"2",
      childents:[
      {
      text:'待取物品',
      path:'/Courier/itemsToBeTaken'
    },
    {
      text:'物品入库',
      path:'/Courier/warehousingOfArticles'
    }
      ]
    },
    {
      text:'任务待取',
      id:"3",
      childents:[
        {
      text:'用户待取',
      path:'/Courier/courierUserPending'
    },
    {
      text:'地区待送',
      path:'/Courier/courierAreaToBeDelivered'
    },
    {
      text:'用户兑换',
      path:'/Courier/userRedemption'
    }
      ]
    },
    {
      text:'仓库取物',
      id:"4",
      childents:[
        {
      text:'仓库详情',
      path:'/Courier/courierwarehouseDetails'
    },
      ]
    },
    {
      id:"5",
      text:'用户兑换',
      childents:[
        {
          text:"兑换待取",
          path:'/Courier/exchangePending'
        },
        {
          text:"兑换已取",
          path:'/Courier/redemptionWithdrawn'
        },
        {
          text:"兑换已送",
          path:'/Courier/redemptionSent'
        }]
    },
    {
      id:"6",
      text:'地区配送',
      childents:[
        {
          text:"地区待取",
          path:'/Courier/regionalPending'
        },
        {
          text:"地区已取",
          path:'/Courier/regionFetched'
        },
        {
          text:"地区已送",
          path:'/Courier/areaSent'
        },
      ]
    },
    {
      id:"7",
      text:'我的',
      childents:[
        {
          text:"我的",
          path:'/Courier/courierMy'
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
    path:'/Courier/courierHomePage'
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