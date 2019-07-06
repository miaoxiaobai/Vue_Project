<template>
  <div class="users">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索区域 -->
    <div style="margin: 15px 0">
      <el-input placeholder="请输入内容" class="input-with-select" style="width:300px;margin-right:15px">
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
      <el-button type="success">添加用户</el-button>
    </div>
    <!-- 表格区域 -->
    <!-- 设置表格的数据源 -->
    <!-- 1. 定义一个数据：userLIst，他是一个数组 -->
    <el-table :data="userList" border style="width: 100%">
      <!-- 设置表格的id列 -->
      <el-table-column type="index" width="50"></el-table-column>
      <!-- 2. 设置列的prop属性 -->
      <!-- 将每一列的prop属性设置你想展示的数据属性名称 -->
      <el-table-column prop="username" label="姓名" width="280"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="280"></el-table-column>
      <el-table-column prop="mobile" label="电话"></el-table-column>
      <el-table-column label="用户状态" width="100">
        <template slot-scope="scope">
          <el-switch v-model="value2" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="编辑" placement="top">
            <el-button type="primary" icon="el-icon-edit"></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="分配角色" placement="top">
            <el-button type="primary" icon="el-icon-share"></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="删除" placement="top">
            <el-button type="primary" icon="el-icon-delete"></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页区域 -->
 <el-pagination
      @size-change="handleSizeChang"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="[1, 2, 3, 4]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total='total'>
    </el-pagination>
  </div>
</template>

<script>
// 引入接口方法
import { getUserList } from "@/api/user_api.js";

export default {
  data () {
    return {
      // 定义总记录数
      total: 0,
      // 用户搜索关键字
      query: '',
      // 当前页码
      pagenum: 1,
      // 每页显示的记录数
      pagesize: 1,

      value2: true,
      userList: []
    }
  },
  // 钩子函数
  // 设置表格的数据源
  mounted () {
    this.init()
  },
  methods: {
    // 数据初始化
    init () {
      // 获取所有用户数据
      getUserList({
        query: this.query,
        pagenum: this.pagenum,
        pagesize: this.pagesize
      })
      // .then(成功的回调，接受成功的参数)
        .then(res => {
          console.log(res)
          // 赋值
          this.userList = res.data.data.users
          this.total = res.data.data.total
        })
      // .catch(失败的回调，接受失败的参数)
        .catch(err => {
          console.log(err)
        })
    },
    // 切换size下拉列表时触发
    handleSizeChang (val) {
      // 重置pagesize
      this.pagesize = val
      // 再次拉取数据
      this.init()
    },
    // 切换当前页码
    handleCurrentChange (val) {
      // 将pagenum重置，再次发起数据请求
      this.pagenum = val
      this.init()
    }
  }
}
</script>

<style lang="less" scoped>
</style>
