<script setup>
import {ref} from 'vue'
import { ElMessage } from 'element-plus'
import 'element-plus/theme-chalk/el-message.css'
import {useRouter} from 'vue-router'
import {useUserStore} from '@/stores/user'
//创建表单对象，此处需要依据接口提供的数据的字段来配置
const form = ref({
    account:'',
    password:'',
    agree:false
})
//获取router实例对象
const router = useRouter()
//获取用户数据的pinia实例对象
const useStore = useUserStore()
//创建规则对象，依据产品需求来创建规则
const rules = ref({
    //required代表是否必填，message代表不满足条件时的提示，trigger表示触发校验的时机
    account:[
        {required:true,message:'用户名不能为空',trigger:'blur'}
    ],
    password:[
        {required:true,message:'密码不能为空',trigger:'blur'},
        {min:6,max:14,message:'密码长度在6-14位之间',trigger:'blur'}
    ],
    agree:[
      {
        validator:(rule,val,callback)=>{
          return val?callback():callback(new Error('请先勾选同意协议'))
        }
      }
    ]
})
//获取表单对象，使用ref标识获取
const formRef = ref(null)
//编写点击登录按钮触发的事件
const doLogin = () => {
  const {account,password} = form.value
  //在该表单组件中内置了一个validate方法，用来统一验证表单，会传入一个valid参数，只有在所有校验都通过才为true，否则为false
  formRef.value.validate(async (valid)=>{
    //此处使用if判断，为true则表示所有校验都通过，可以进入登录的逻辑
    if(valid){
      //调用API,判断是否登录成功
      await useStore.getUserInfo({account,password})
      //登录成功后弹出的提示
      ElMessage({type:'success',message:'登录成功'})
      //登陆成功后的路由跳转
      router.replace({path:'/'})
    }
  })
}
</script>


<template>
  <div>
    <header class="login-header">
      <div class="container m-top-20">
        <h1 class="logo">
          <RouterLink to="/">小兔鲜</RouterLink>
        </h1>
        <RouterLink class="entry" to="/">
          进入网站首页
          <i class="iconfont icon-angle-right"></i>
          <i class="iconfont icon-angle-right"></i>
        </RouterLink>
      </div>
    </header>
    <section class="login-section">
      <div class="wrapper">
        <nav>
          <a href="javascript:;">账户登录</a>
        </nav>
        <div class="account-box">
          <div class="form">
            <!-- 此处使用的是element-plus中封装好的form组件 -->
            <!-- 此处使用:model绑定form对象，可以将该对象生成为一个prop对象，在item中进行规则绑定时可以通过prop来选择规则 -->
            <!-- 使用ref绑定该表单元素 -->
            <el-form ref="formRef" :model="form" :rules="rules" label-position="right" label-width="60px"
              status-icon>
              <!-- 此处的prop属性值为account，代表使用的是account的规则 -->
              <el-form-item prop="account" label="账户">
                <el-input v-model="form.account"/>
              </el-form-item>
              <!-- 此处的prop属性值为password，代表使用的是password的规则 -->
              <el-form-item prop="password" label="密码">
                <!-- 密码需要将type的属性设置为password,并且设置show-password属性 -->
                <el-input type="password" show-password v-model="form.password"/>
              </el-form-item>
              <el-form-item label-width="22px" prop="agree">
                <el-checkbox  size="large" v-model="form.agree">
                  我已同意隐私条款和服务条款
                </el-checkbox>
              </el-form-item>
              <!-- 此处添加按钮点击事件，执行统一校验以及登录逻辑 -->
              <el-button size="large" class="subBtn" @click="doLogin">点击登录</el-button>
            </el-form>
          </div>
        </div>
      </div>
    </section>

    <footer class="login-footer">
      <div class="container">
        <p>
          <a href="javascript:;">关于我们</a>
          <a href="javascript:;">帮助中心</a>
          <a href="javascript:;">售后服务</a>
          <a href="javascript:;">配送与验收</a>
          <a href="javascript:;">商务合作</a>
          <a href="javascript:;">搜索推荐</a>
          <a href="javascript:;">友情链接</a>
        </p>
        <p>CopyRight &copy; 小兔鲜儿</p>
      </div>
    </footer>
  </div>
</template>

<style scoped lang='scss'>
.login-header {
  background: #fff;
  border-bottom: 1px solid #e4e4e4;

  .container {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
  }

  .logo {
    width: 200px;

    a {
      display: block;
      height: 132px;
      width: 100%;
      text-indent: -9999px;
      background: url("@/assets/images/logo.png") no-repeat center 18px / contain;
    }
  }

  .sub {
    flex: 1;
    font-size: 24px;
    font-weight: normal;
    margin-bottom: 38px;
    margin-left: 20px;
    color: #666;
  }

  .entry {
    width: 120px;
    margin-bottom: 38px;
    font-size: 16px;

    i {
      font-size: 14px;
      color: $xtxColor;
      letter-spacing: -5px;
    }
  }
}

.login-section {
  background: url('@/assets/images/login-bg.png') no-repeat center / cover;
  height: 488px;
  position: relative;

  .wrapper {
    width: 380px;
    background: #fff;
    position: absolute;
    left: 50%;
    top: 54px;
    transform: translate3d(100px, 0, 0);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);

    nav {
      font-size: 14px;
      height: 55px;
      margin-bottom: 20px;
      border-bottom: 1px solid #f5f5f5;
      display: flex;
      padding: 0 40px;
      text-align: right;
      align-items: center;

      a {
        flex: 1;
        line-height: 1;
        display: inline-block;
        font-size: 18px;
        position: relative;
        text-align: center;
      }
    }
  }
}

.login-footer {
  padding: 30px 0 50px;
  background: #fff;

  p {
    text-align: center;
    color: #999;
    padding-top: 20px;

    a {
      line-height: 1;
      padding: 0 10px;
      color: #999;
      display: inline-block;

      ~a {
        border-left: 1px solid #ccc;
      }
    }
  }
}

.account-box {
  .toggle {
    padding: 15px 40px;
    text-align: right;

    a {
      color: $xtxColor;

      i {
        font-size: 14px;
      }
    }
  }

  .form {
    padding: 0 20px 20px 20px;

    &-item {
      margin-bottom: 28px;

      .input {
        position: relative;
        height: 36px;

        >i {
          width: 34px;
          height: 34px;
          background: #cfcdcd;
          color: #fff;
          position: absolute;
          left: 1px;
          top: 1px;
          text-align: center;
          line-height: 34px;
          font-size: 18px;
        }

        input {
          padding-left: 44px;
          border: 1px solid #cfcdcd;
          height: 36px;
          line-height: 36px;
          width: 100%;

          &.error {
            border-color: $priceColor;
          }

          &.active,
          &:focus {
            border-color: $xtxColor;
          }
        }

        .code {
          position: absolute;
          right: 1px;
          top: 1px;
          text-align: center;
          line-height: 34px;
          font-size: 14px;
          background: #f5f5f5;
          color: #666;
          width: 90px;
          height: 34px;
          cursor: pointer;
        }
      }

      >.error {
        position: absolute;
        font-size: 12px;
        line-height: 28px;
        color: $priceColor;

        i {
          font-size: 14px;
          margin-right: 2px;
        }
      }
    }

    .agree {
      a {
        color: #069;
      }
    }

    .btn {
      display: block;
      width: 100%;
      height: 40px;
      color: #fff;
      text-align: center;
      line-height: 40px;
      background: $xtxColor;

      &.disabled {
        background: #cfcdcd;
      }
    }
  }

  .action {
    padding: 20px 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .url {
      a {
        color: #999;
        margin-left: 10px;
      }
    }
  }
}

.subBtn {
  background: $xtxColor;
  width: 100%;
  color: #fff;
}
</style>