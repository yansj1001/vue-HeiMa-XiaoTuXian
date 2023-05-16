<script setup>

</script>
<template>
    <nav class="app-topnav">
        <div class="container">
            <ul>
                <!-- 此处对登录状态进行判断，为true则限制以下内容 -->
                <template v-if="true">
                    <li><a href="javascript:;"><i class="iconfont icon-user"></i>周杰伦</a></li>
                    <li><el-popconfirm title="你确定要退出登录吗?" confirm-button-text="确认" cancel-button-text="取消">
                            <template #reference>
                                <a href="javascript:;">退出登录</a>
                            </template>
                        </el-popconfirm></li>
                    <li><a href="javascript:;">我的订单</a></li>
                    <li><a href="javascript:;">会员中心</a></li>
                </template>
                <!-- 若没有登录则显示以下内容 -->
                <template v-else>
                    <li><a href="javascript:;">请先登录</a></li>
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