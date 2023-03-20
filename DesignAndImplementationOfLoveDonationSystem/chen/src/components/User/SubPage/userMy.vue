<template>
<div class="userMy">
  <el-descriptions class="margin-top" title="个人信息" :column="4" direction="vertical">
  <el-descriptions-item label="用户名">{{tableData.name}}</el-descriptions-item>
  <el-descriptions-item label="账号">{{tableData.account}}</el-descriptions-item>
  <el-descriptions-item label="地区" :span="2">{{tableData.region}}</el-descriptions-item>
  <el-descriptions-item label="详细地址">{{tableData.address}}</el-descriptions-item>
<el-descriptions-item label="积分" style="width:100px">{{tableData.integral}}</el-descriptions-item>
<el-descriptions-item label="头像" :span="2" class="personal"><img :src="tableData.headPortrait" style="height:50px"></el-descriptions-item>
</el-descriptions>
  <el-button type="primary" @click="dialogFormVisible = true" style="margin:5px">修改个人信息</el-button>

<el-dialog title="修改信息" :visible.sync="dialogFormVisible">
  <el-form>
    <el-form-item label="选择地区" :label-width="formLabelWidth">
       <VDistpicker @selected="onSelected"></VDistpicker>
    </el-form-item>
    <el-form-item label="详细地址" :label-width="formLabelWidth">
      <el-input v-model="address" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="用户名称" :label-width="formLabelWidth">
      <el-input v-model="names" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="用户头像" :label-width="formLabelWidth">
      <el-upload
  class="avatar-uploader"
  action="https://jsonplaceholder.typicode.com/posts/"
  :show-file-list="false"
  :on-change="onchangemd"
  >
  <img v-if="picturesurl" :src="picturesurl" class="avatar">
  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
</el-upload>
  <input type="file" @change="onchangemd" class="picture">

    </el-form-item>
    
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="modify">确 定</el-button>
  </div>
</el-dialog>
</div>
</template>

<script>
import qs from 'qs'
import  VDistpicker  from 'v-distpicker';
import axios from '@/axios/axios';
export default {
name:'userMy',
data(){
  return {
    time:'',
    region:{
          province:"", city:"", area:""
        },
        picturesurl:'',
        address:'',
        names:'',
        tableData:{},
        dialogTableVisible: false,
        dialogFormVisible: false,
        formLabelWidth: '120px'
  }
},
components:{
  VDistpicker
},
methods:{
  modify(){
    this.dialogFormVisible=false
    let data=qs.stringify({
      account:this.$store.state.user.account,
        region:this.region,
        picturesurl:this.picturesurl,
        address:this.address,
        names:this.names,
    })
    axios.post('/user/update',data).then(response=>{
      
    },err=>{

    })
  },
  onchangemd(e){
        console.log(e.target.files)//这个就是选中文件信息
        let formdata = new FormData()
        Array.from(e.target.files).map(item => {
         console.log(item)
         formdata.append("file", item)  //将每一个文件图片都加进formdata
       })
       axios.post("/user/donation", formdata).then(res => {
        this.picturesurl=res.data
       console.log(res.data)
       })
    },
      onSelected(val){
    this.region.province=val.province
    this.region.city=val.city
    this.region.area=val.area
    }
    },
    mounted(){
   this.time=setInterval(function(){
    let data=qs.stringify({account:this.$store.state.user.account})
      axios.post('/user/data',data).then(response=>{
        console.log(response.data)
        this.tableData=response.data[0]
      })
   },500)
    },
    beforeDestroy(){
      clearInterval(this.time)
    }
}

</script>

<style>
.userMy{
  margin: 5px;
}
.distance{
  width: 100px;
}
</style>