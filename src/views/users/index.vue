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
      <el-input
        v-model="query"
        placeholder="请输入内容"
        class="input-with-select"
        style="width:300px;margin-right:15px"
        @keyup.enter.native="search"
      >
        <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
      </el-input>
      <el-button type="success" @click="addDialogFormVisible = true">添加用户</el-button>
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
        <template>
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
            <el-button type="primary" icon="el-icon-delete" @click="deluserbyid(scope.row.id)"></el-button>
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
      :total="total"
    ></el-pagination>
    <!-- 添加用户对话框 -->
    <el-dialog title="添加用户" :visible.sync="addDialogFormVisible">
      <el-form :model="addForm" :label-width="'100px'" :rules="rules" ref="addForm">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addForm.username" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addForm.password" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addForm.email" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="mobile">
          <el-input v-model="addForm.mobile" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// 引入接口方法
import { getUserList, addUser, delUser } from '@/api/user_api.js'

export default {
  data () {
    return {
      // 标记添加用户对话框的显示或隐藏
      addDialogFormVisible: false,
      // 添加用户数据对象
      addForm: {
        username: '',
        password: '',
        email: '136@cd.com',
        mobile: '13545637130'
      },
      // 定义总记录数
      total: 0,
      // 用户搜索关键字
      query: '',
      // 当前页码
      pagenum: 1,
      // 每页显示的记录数
      pagesize: 1,

      value2: true,
      userList: [],
      // 添加新增用户表单元素的验证规则
      rules: {
        username: [
          { required: true, message: '请填写用户名', trigger: 'blur' }
        ],
        password: [{ required: true, message: '请填写密码', trigger: 'blur' }],
        /**
        wuhu0723@126.com
          学习正则就是学习它的元字符
        1.占位符，说明这个位置需要填入满足要求的字符
        \w:合法字符： 0-9 a-z A-Z _   \W：非法字符
        \d:数字：0-9   \D:非数字
        2.修饰符：修饰前面的字符所出现的次数，前面的字符默认是指前面的一个字符，除非你使用()包含
        +：修饰前面的字符出现1次或多次
        ？：修饰前面的字符出现0次或1次
        {n,m}:修饰前面的字符最少出现n次，最多出现m次
        {n}:修饰前面的字符出现n次
        {n,}修饰前面的字符最少出现n次，最多没有限制
        */
        email: [
          {
            required: true,
            message: '请填写邮箱号',
            trigger: 'blur',
            pattern: /\w+[@]\w+[.]\w{2,3}/
          }
        ],
        mobile: [
          { required: true, message: '请填写手机号', trigger: 'blur' },
          {
            pattern: /^1[345678]\d{9}$/,
            message: '请填写正确的手机号(11位数字)',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  // 钩子函数
  // 设置表格的数据源
  mounted () {
    this.init()
  },
  methods: {
    //  删除单个用户
    deluserbyid (id) {
      // 给出删除用户提示
      this.$confirm('此操作将永久删除该用户，是否继续？', '删除提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          // 如果点击确定，就会执行.then
          // 真正执行删除操作
          delUser(id)
            .then(res => {
              if (res.data.meta.status === 200) {
                this.$message({
                  type: 'success',
                  message: '删除成功'
                })
                this.pagenum =
                  Math.ceil(this.total - 1 / this.pagesize) < this.pagenum
                    ? --this.pagenum
                    : this.pagenum
                this.init()
              }
            })
            // eslint-disable-next-line handle-callback-err
            .catch(err => {
              this.$message({
                type: 'error',
                message: '删除失败'
              })
            })
        })
        .catch(() => {
          // 如果点击取消就会执行.catch
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    // 添加用户数据
    addUser () {
      // 1 再次实现数据的验证
      this.$refs.addForm.validate(valid => {
        if (valid) {
          addUser(this.addForm)
            .then(res => {
              if (res.data.meta.status === 201) {
                // 让对话框隐藏
                this.addDialogFormVisible = false
                // 重置表单元素的数据
                this.$refs.addForm.resetFields()
                // 实现数据 刷新
                this.init()
              } else {
                this.$message({
                  type: 'error',
                  message: res.data.meta.msg
                })
              }
            })
            .catch(err => {
              console.log(err)
            })
        } else {
          return false
        }
      })
      // 2 调用接口方法实现数据的添加
    },
    // 搜索
    search () {
      this.pagenum = 1
      this.init()
    },
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
