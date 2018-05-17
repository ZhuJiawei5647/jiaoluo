<template>
	<div class="page-user">
		<header>
		    <div class="xny-item">
		        <div class="xny-user-img">
		            <img src="@/assets/userhead.png">
		        </div>
		        <div class="xny-item-body">
		            <div class="xny-art-title">{{user.username}}</div>
					<div class="xny-info"><span>{{rank.rankName}}</span><img :src="getRankUrl(rank.rank)"></div>
					<div class="xny-msg"><span class="xny-msg-item">{{rank.rankInfo}}</span></div>    
		        </div>
		        <div class="xny-icon jifen">
		            <img src="@/assets/score_1.png">
		            <span>{{rank.integral}}</span>
		        </div>
		    </div>
            <div class="xny-biaoqian">
                <div class="xny-biaoqian-item">
                    <div class="xny-biaoqian-box">
                        <i>{{rank.corneraccount}}</i>
                        <br>
                        <span>占领的角落</span>
                    </div>
                </div>
                <div class="xny-biaoqian-item">
                    <img src="@/assets/evlop.png">
                </div>
                <div class="xny-biaoqian-item">
                    <div class="xny-biaoqian-box">
                        <i>{{rank.articleaccount}}</i>
                        <br>
                        <span>发布的文章</span>
                    </div>
                </div>
            </div>
		</header>
        <group style="padding-bottom: 40px">
            <cell v-for="(item, index) in list" is-link :key="index">
                <img slot="icon" width="20" style="display:block;margin-right:5px;" :src="item.image">
                <span slot="title">
                    <span style="vertical-align:middle;">{{ item.text }}</span>
                    <badge v-if="item.badge" :text="item.badge" style="float:right; margin-top:6px;"></badge>
                </span>
            </cell>
        </group>
	</div>
</template>
<script>
    import { Cell, Group, Badge } from 'vux'
	import { mapState } from 'vuex'
    import store from '@/vuex/store'

    let load = () => {
        return new Promise((resolve, reject) => {
            var user = store.state.cookie.userInfo
            store.dispatch('GET_RANK', user.id).then(data => data.data)
            .then(rank => {
                store.dispatch('GET_UNREAD').then(data => {
                    var unread = data.data
                    resolve({user, rank, unread})
                })
            })
        })
    }

	export default {
		data () {
			return {
				user: {},
				rank: {},
                unread: {}
			}
		},
		computed: {
			list () {
				return this.getList(this.user, this.unread);
			}
		},
        components: { Cell, Group, Badge },
		methods: {
            getRankUrl (rank) {
                switch (rank) {
                    case 0: return require('@/assets/ic_user level_0.png');
                    case 1: return require('@/assets/ic_user level_1.png');
                    case 2: return require('@/assets/ic_user level_2.png');
                    case 3: return require('@/assets/ic_user level_3.png');
                    case 4: return require('@/assets/ic_user level_4.png');
                    case 5: return require('@/assets/ic_user level_5.png');
                    case 6: return require('@/assets/ic_user level_6.png');
                }
            },
            getList (user, unread) {
                return [
                    {
                        text: '消息通知'
                        ,image: require('@/assets/msg.png')
                        ,url: 'advice'
                        ,badge: unread.unreadRemind
                    },
                    {
                        text: '文章管理'
                        ,image: require('@/assets/wenzhang.png')
                        ,url: 'article'
                    },
                    {
                        text: '角落占领'
                        ,image: require('@/assets/zhanling.png')
                        ,url: 'author?authorid='+ user.id +'&tab=2'
                    },
                    
                    {
                        text: '圈子加入'
                        ,image: require('@/assets/quanadd.png')
                        ,url: 'quan'
                    },

                    {
                        text: '喜欢的故事'
                        ,image: require('@/assets/xihuan.png')
                        ,url: 'articlelist'
                    },
                    {
                        text: '关注的作者'
                        ,image: require('@/assets/yonghu.png')
                        ,url: 'guanzhu'
                    },
                    {
                        text: '用户设置'
                        ,image: require('@/assets/shezhi.png')
                        ,url: 'setup'
                    }, 
                    {
                        text: '域名测试'
                        ,image: require('@/assets/shezhi.png')
                        ,url: '/detail?id=224'
                    } 
                  
                ]
            }
		},
        activated () {
            load().then(({user, rank, unread}) => {
                this.user = user;
                this.rank = rank;
                this.unread = unread;
            })
        },
        beforeRouteEnter: (() => {
            let initNum = 0;
            return (to, from, next) => {
                if (initNum === 1) return initNum++;
                if (initNum === 2) return next();
                initNum++;
                load().then(({user, rank, unread}) => {
                    next(vm => {
                        vm.user = user;
                        vm.rank = rank;
                        vm.unread = unread;
                    })
                })
            }
        })()
	}
</script>
<style lang="less">
.page-user{
	width: 100%;
	height: 100%;
    background-color: #f2f2f2;
    overflow-y: scroll;

    .xny-user-img {
        float: left;
        padding: 12px;
    }

    .xny-user-img img {
        width: 50px;
        height: 50px;
        border: 1px solid #ddd;
        border-radius: 50%;
    }

    .xny-item-body {
        margin-left: 74px;
    }

    header{
        background-color: #fff;
    }
    .unlogin{
        width: 100%;
        height: 100px;
        font-size: 20px;
        line-height: 100px;
        text-align: center;
        color: #666;
        background-color: #e0e0e0;
    }
    .xny-item{
        background-color: #fff;
        position: relative;
    }

    .xny-item .jifen{
        position: absolute;
        top: 20px;
        right: 20px;
    }

    .xny-item-body .xny-art-title{
        padding-top: 12px;
        font-size: 18px;
        color: #1d2088;
        line-height: 34px;
    }
    .xny-info{
        height: 30px;
        line-height: 30px;
        overflow: hidden;
    }
    .xny-info span{
        display: inline-block;
        padding: 0 10px;
        margin-right: 5px;
        height: 30px;
        line-height: 30px;
        border-radius: 5px;
        color:#fff;
        background-color: #808080;
        float: left;
    }
    .xny-info img{
        float: left;
        width: 40px;
        margin-top: -5px;
    }
    .xny-biaoqian{
        display: flex;
    }
    .xny-biaoqian-item{
        flex: 1;
        text-align: center;
    }
    .xny-biaoqian-item img{
        width: 70px;
    }
    .xny-biaoqian-box{
        width: 70px;
        padding: 20px 0;
        margin: 0 auto;
        text-align: center;
        line-height: 25px;
    }
    .xny-biaoqian-box i{
        display: inline-block;
        width: 25px;
        height: 25px;
        border-radius: 50%;
        font-size: 16px;
        line-height: 25px;
        font-style: normal;
        color: #fff;
        background-color: #3BB287;
    }
    .xny-biaoqian-box span{
        font-size: 12px;
        color: #808080;
    }
    .user-list{
        padding: 16px 0;
    }
    .user-item{
        overflow: hidden;
        background-color: #fff;
        border-bottom: 2px solid #f2f2f2;
    }
    .user-image-box{
        float: left;
        padding: 10px 20px;
    }
    .user-image-box img{
        display: block;
        width: 20px;
        height: 20px;
    }
    .user-content{
        padding-left: 60px;
    }
    .user-content p{
        font-size: 16px;
        line-height: 40px;
        color: #111;
    }
    .user-content p i{
        position: relative;
        top: -6px;
        left: -4px;
        display: inline-block;
        width: 16px;
        height: 16px;
        font-size: 12px;
        line-height: 16px;
        text-align: center;
        font-style: normal;
        border-radius: 50%;
        background-color: #E50110;
        color: #fff;
    }
}
</style>