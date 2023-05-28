<script setup>
import {useUserStore} from '@/stores/user'
import {useRouter} from 'vue-router'
//获取router实例，用于跳转路由
const router = useRouter()
const userStore = useUserStore()
//退出登录的逻辑，该事件为组件自带事件，当点击确定时，会自动触发该事件
const confirm = () => {
    //首先清除用户信息，由于用户信息使用插件与localstorage关联了，所以此处仅修改pinia中的数据即可
    userStore.clearUserInfo()
    //跳转至登录页
    router.replace({path:'/login'})
}
</script>
<template>
    <nav class="app-topnav">
        <div class="container">
            <ul>
                <!-- 此处对登录状态进行判断，为true则限制以下内容 -->
                <template v-if="userStore.userInfo.token">
                    <li><a href="javascript:;"><i class="iconfont icon-user"></i>{{ userStore.userInfo.account }}</a></li>
                    <!-- 此处使用element-plus的确认框组件，内含事件confirm，当点击确认时，会触发该事件 -->
                    <li><el-popconfirm @confirm="confirm" title="你确定要退出登录吗?" confirm-button-text="确认" cancel-button-text="取消">
                            <template #reference>
                                <a href="javascript:;">退出登录</a>
                            </template>
                        </el-popconfirm></li>
                    <li><a href="javascript:;">我的订单</a></li>
                    <li><a href="javascript:;" @click="$router.push('/member')">会员中心</a></li>
                </template>
                <!-- 若没有登录则显示以下内容 -->
                <template v-else>
                    <!-- $router.push('路由路径')该方法可以实现跳转至指定路由 -->
                    <li><a href="javascript:;" @click="$router.push('/login')">请先登录</a></li>
                    <li><a href="javascript:;">帮助中心</a></li>
                    <li><a href="javascript:;">关于我们</a></li>
                </template>
            </ul>
        </div>
    </nav>
</template>
<style scoped lang="scss">
.app-topnav{
    background-color: #333;
    ul{
        display: flex;
        justify-content: flex-end;
        align-items: center;
        height: 53px;
        li{
            a{
                padding: 0 15px;
                color: #cdcdcd;
                display: inline-block;
                line-height: 1;
            }
            i{
                font-size: 14px;
                margin-right: 2px;
            }
            a:hover{
                color: $xtxColor;
            }
            ~li{
                a{
                    border-left: 2px solid #666;
                }
            }
        }
    }
}

</style>