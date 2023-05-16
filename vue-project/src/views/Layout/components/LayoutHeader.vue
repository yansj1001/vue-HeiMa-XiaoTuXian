<script setup>

</script>

<template>
    <header class="app-header">
        <div class="container">
           <h1 class="logo">
            <RouterLink to="/">小兔鲜</RouterLink>
           </h1>
            <ul class="app-header-nav">
                <li><RouterLink to="/">首页</RouterLink></li>
                <li><RouterLink to="/">居家</RouterLink></li>
                <li><RouterLink to="/">美食</RouterLink></li>
                <li><RouterLink to="/">服饰</RouterLink></li>
            </ul>
            <div class="search">
                <i class="iconfont icon-search"></i>
                <input type="text" placeholder="搜一搜">
            </div>
            <!-- 头部购物车 -->
        </div>
    </header>
</template>
<style scoped lang="scss">
.app-header{
    background-color: #fff;
    .container{
        display: flex;
        align-items: center;
    }
    .logo{
        width: 200px;
        a{
            display: block;
            text-indent: -9999px;
            width: 100%;
            height: 132px;
            background: url('@/assets/images/logo.png') no-repeat center 18px / contain;
        }
    }
    .app-header-nav{
        width: 820px;
        display: flex;
        position: relative;
        padding-left: 40px;
        z-index: 998;
        li{
            margin-left: 40px;
            width: 38px;
            text-align: center;
            a{
                display: inline-block;
                font-size: 16px;
                height: 32px;
                line-height: 32px;
            }
            a:hover{
                color: $xtxColor;
                border-bottom: 1px solid $xtxColor;
            }
            .active{
                color: $xtxColor;
                border-bottom: 1px solid $xtxColor;
            }
        }
    }
    .search{
        width: 170px;
        height: 32px;
        position: relative;
        border-bottom: 1px solid #e7e7e7;
        line-height: 32px;
        .icon-search{
            font-size: 18px;
            margin-left: 5px;
        }
        input{
            width: 140px;
            margin-left: 5px;
            color: #666;
        }
    }
}
</style>