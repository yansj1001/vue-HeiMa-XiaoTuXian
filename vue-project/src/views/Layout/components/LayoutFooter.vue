<script setup>

</script>
<template>
    <footer class="app-footer">
        <div class="contact">
            <div class="container">
                <dl>
                    <dt>客服服务</dt>
                    <dd><i class="iconfont icon-kefu"></i>在线客服</dd>
                    <dd><i class="iconfont icon-question"></i>问题反馈</dd>
                </dl>
                <dl>
                    <dt>关注我们</dt>
                    <dd><i class="iconfont icon-weixin"></i>公众号</dd>
                    <dd><i class="iconfont icon-weibo"></i>微博</dd>
                </dl>
                <dl>
                    <dt>下载APP</dt>
                    <dd class="qrcode"><img src="@/assets/images/qrcode.jpg" alt="二维码"></dd>
                    <dd class="download">
                        <span>扫描二维码</span>
                        <span>立马下载APP</span>
                        <a href="javascript:;">下载页面</a>
                    </dd>
                </dl>
                <dl>
                    <dt>服务热线</dt>
                    <dd class="hotline">400-0000-000 <small>周一至周日 8:00-18:00</small></dd>
                </dl>
            </div>
        </div>
        <div class="extra">
            <div class="container">
                <div class="slogan">
                    <a href="javascript:;">
                        <i></i>
                        <span>价格亲民</span>
                    </a>
                    <a href="javascript:;">
                        <i></i>
                        <span>物流快速</span>
                    </a>
                    <a href="javascript:;">
                        <i></i>
                        <span>品质新鲜</span>
                    </a>
                </div>
                <div class="copyright">
                    <p>
                        <a href="javascript:;">关于我们</a>
                        <a href="javascript:;">帮助中心</a>
                        <a href="javascript:;">售后服务</a>
                        <a href="javascript:;">配送与验收</a>
                        <a href="javascript:;">商务合作</a>
                        <a href="javascript:;">搜索推荐</a>
                        <a href="javascript:;">友情链接</a>
                    </p>
                    <p>CopyRight@小兔鲜</p>
                </div>
            </div>
        </div>
    </footer>
</template>

<style scoped lang="scss">
.app-footer {
    overflow: hidden;
    background-color: #f5f5f5;
    padding-top: 20px;

    .contact {
        background-color: #fff;

        .container {
            display: flex;
            padding: 60px 0 40px 25px;
        }

        dl {
            height: 190px;
            text-align: center;
            color: #999;
            padding: 0 70px;
            border-right: 1px solid #f2f2f2;

            &:first-child {
                padding-left: 0;
            }

            &:last-child {
                padding-right: 0;
                border-right: none;
            }
        }

        dt {
            line-height: 1;
            font-size: 18px;
        }

        dd {
            float: left;
            margin: 36px 12px 0 0;
            width: 92px;
            height: 92px;
            padding-top: 10px;
            border: 1px solid #ededed;

            .iconfont {
                font-size: 36px;
                display: block;
                color: #666;
            }

            &:hover {
                .iconfont {
                    color: $xtxColor;
                }
            }

            &:last-child {
                margin-right: 0;
            }
        }

        .qrcode {
            width: 92px;
            height: 92px;
            padding: 7px;
            border: 1px solid #ededed;
        }

        .download {
            padding-top: 5px;
            font-size: 14px;
            width: auto;
            height: auto;
            border: none;

            span {
                display: block;
            }

            a {
                display: block;
                line-height: 1;
                padding: 10px 25px;
                margin-top: 5px;
                color: #fff;
                border-radius: 2px;
                background-color: $xtxColor;
            }
        }

        .hotline {
            padding-top: 20px;
            font-size: 22px;
            color: #666;
            width: auto;
            height: auto;
            border: none;

            small {
                display: block;
                font-size: 15px;
                color: #999;
            }
        }
    }
    .extra{
        background-color: #333;
    }
    .slogan{
        display: flex;
        justify-content: space-between;
        height: 178px;
        line-height: 58px;
        padding: 60px 100px;
        border-bottom: 1px solid #434343;
        a{
            color: #fff;
            height: 58px;
            line-height: 58px;
            font-size: 28px;
            i{
                font-size: 50px;
                margin-right: 10px;
                vertical-align: middle;
                font-weight: 100;
            }
            span{
                vertical-align: middle;
                text-shadow: 0 0 1px #333;
            }
        }
        
    }
    .copyright{
        height: 170px;
        padding-top: 40px;
        text-align: center;
        color: #999;
        font-size: 15px;
        p{
            line-height: 1;
            margin-bottom: 20px;
        }
        a{
            color: #999;
            line-height: 1;
            padding: 0 10px;
            border-right: 1px solid #999;
            &:last-child{
            border-right: none;
            }
            &:hover{
                color: $xtxColor;
            }
        }
        
    }
}
</style>