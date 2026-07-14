<script setup>defineProps({icon:{default:'◇'},title:String,text:String,action:{default:'返回首页'},retry:Boolean}); defineEmits(['action'])</script>
<template><section class="status-panel"><span>{{icon}}</span><h2>{{title}}</h2><p>{{text}}</p><button class="primary-button" @click="$emit('action')">{{action}}</button></section></template>
