<template>
  <div class="block">

   <el-carousel :interval="4000" type="card" height="200px">
    <el-carousel-item v-for="item in d" :key="item">
      <img :src="item" style="height:100%;width:100%">
    </el-carousel-item>
  </el-carousel>
  <div class="firstPageText">
  <el-container>
  <el-header height="150px"><h4><i class="el-icon-tableware" style="margin:5px;color:#409eff"></i>贫困的意义</h4><p style="font-family:宋体">&nbsp&nbsp按照《梅里曼，韦伯斯特大学生词典》的解释，“贫困”是一个人缺少通常的或社会可接收的货币量或物质财富的状态”。这个定义包含两个重要思想，第一，贫困的定义在不同社会的不同时期是不同的；第二，定义的重点放在购买商品和服务的能力，即货币(或它们的所有权关系)即物质拥有上。英国的汤森这样界定“所有居民中那些缺乏获得各种食物、参加社会活动和最起码的生活和社交条件的资源的个人、家庭和群体就是所谓贫困的。”</p></el-header>
  <el-container>
    <el-aside width="50%"><h4><i class="el-icon-position" style="margin:5px;color:#409eff"></i>系统理念</h4><p style="font-family:宋体">&nbsp&nbsp本系统是一款基于Vue.js+Node.js的爱心捐赠系统，让用户能够将家中的旧衣物旧鞋等废弃物品通过此平台，捐赠给更有需求的山区留守儿童，避免了资源浪费，实现了资源的流动，间接的改善了山区留守儿童的生活，让他们得到关爱。我国山区留守儿童的现状仍不容乐观，由于山区留守儿童所处的环境，他们在家庭与学校生活中容易出现心理健康、行为表现、学习态度等方面的问题。他们在生活中能得到的物质资源也比较匮乏，很多山区儿童都没有足够的衣物抵御寒冬，他们一年四季也没有多少件像样的衣服，背着破乱的背包穿着拖鞋或凉鞋翻山越岭去上学。山区留守儿童是弱势群体，需要得到社会的关注和帮助。</p></el-aside>
    <el-main><h4><i class="el-icon-chat-round" style="margin:5px;color:#409eff"></i>要闻</h4><p style="font-family:宋体">&nbsp&nbsp2020年12月3日，在中共中央政治局常务委员会会议上，习近平总书记宣布，党的十八大以来，党中央团结带领全党全国各族人民，把脱贫攻坚摆在治国理政突出位置，充分发挥党的领导和我国社会主义制度的政治优势，采取了许多具有原创性、独特性的重大举措，组织实施了人类历史上规模最大、力度最强的脱贫攻坚战。经过8年持续奋斗，我们如期完成了新时代脱贫攻坚目标任务，现行标准下农村贫困人口全部脱贫，贫困县全部摘帽，消除了绝对贫困和区域性整体贫困，近1亿贫困人口实现脱贫，取得了令全世界刮目相看的重大胜利。</p></el-main>
  </el-container>
</el-container>
  </div>
  </div>
</template>

<script>
export default {
name:"userHomePage",
data(){
  return{
    d:["/ch/home.jpg","/ch/home1.jpg","/ch/home3.jpg"]
  }
}
}
</script>

<style>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 30px;
    margin: 0;
  }
  
  .el-carousel__item:nth-child(2n) {
    background-color: #ffff;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #fff;
  }

  

   .firstPageText .el-header, .el-footer {
    background-color: #e9eff1;
    color: #333;
    text-align: left;
    line-height: 30px;
  }
  
  .firstPageText .el-aside {
    background-color: #e6fbfb;
    color: #333;
    text-align: left;
    line-height: 30px;
    padding-left: 15px;
  }
  
  .firstPageText .el-main {
    background-color: #f6f8fa;
    color: #333;
    text-align: left;
    line-height: 30px;
       padding-top: 0px;
  }
  
  .firstPageText > .el-container {
    margin-bottom: 40px;
  }
  
  .firstPageText .el-container:nth-child(5) .el-aside,
  .firstPageText .el-container:nth-child(6) .el-aside {
    line-height: 30px;
  }
  
  .firstPageText .el-container:nth-child(7) .el-aside {
    line-height: 30px;
  }
  .block{
    background-color: #f8f4f4;
    margin: 0px;
  }
</style>