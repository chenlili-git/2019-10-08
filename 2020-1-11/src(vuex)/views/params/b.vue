<template>
    <div>
        ---{{id}}----
        ###{{$route.params.id}}
        <div>我是B路由（是公共的）</div>
        <hr/>
        <img v-if="$route.params.id==1" src="../../assets/1.jpg" alt="" srcset="">
        <img v-if="$route.params.id==2" src="../../assets/2.jpg" alt="" srcset="">
    </div>
</template>

<script>
    export default {
        name:'bb',
        created() {
            console.log('组件加载');
        },
        props:['id'],
        beforeRouteUpdate(to,from,next){
            console.log('守卫',to.params.id);
            //next();
            //如果从1跳到2 用户没有2的权限  就让页面跳回首页
            if(from.params.id==='1'){
                next('/')
            }else{
                next();
            }
        }
    }
</script>

<style scoped>

</style>