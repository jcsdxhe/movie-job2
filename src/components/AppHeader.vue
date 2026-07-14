<script setup>
import { useRouter } from 'vue-router'; import { useMovieStore } from '../stores/movie'
const router=useRouter(), store=useMovieStore(); const logout=()=>{store.logout();router.push('/login')}
</script>
<template><header class="header"><RouterLink class="brand" to="/"><span class="brand-mark">&#9654;</span><span>光影推荐</span></RouterLink><nav><RouterLink to="/">电影首页</RouterLink><RouterLink to="/recommend">为你推荐</RouterLink><RouterLink to="/favorites">我的收藏 <b v-if="store.favorites.length">{{store.favorites.length}}</b></RouterLink></nav><div class="user"><RouterLink class="avatar avatar-link" to="/settings" title="用户设置">{{store.user?.username?.slice(0,1)?.toUpperCase()}}</RouterLink><RouterLink class="username-link" to="/settings">{{store.user?.username}}</RouterLink><button class="link-button" @click="logout">退出</button></div></header></template>
