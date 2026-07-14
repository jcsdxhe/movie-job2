<script setup>
import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import * as echarts from 'echarts'
import PageShell from '../components/PageShell.vue'
import { job5Analytics as data } from '../data/job5Analytics'
import { demoMovies } from '../data/demoMovies'

const trendRef = ref(), actionRef = ref(), hourRef = ref(), userRef = ref(), movieRef = ref(), ratingRef = ref()
const charts = []
const movieNames = new Map(demoMovies.map(movie => [Number(movie.movieid), movie.moviename]))
const movieLabel = id => movieNames.get(Number(id)) || `电影 #${id}`
const axis = { axisLine: { lineStyle: { color: '#353846' } }, axisLabel: { color: '#8f94a5' }, splitLine: { lineStyle: { color: 'rgba(255,255,255,.06)' } } }

function init(el, option) {
  const chart = echarts.init(el)
  chart.setOption({
    backgroundColor: 'transparent',
    textStyle: { fontFamily: 'Noto Sans SC, Microsoft YaHei', color: '#dfe3ee' },
    tooltip: { trigger: 'axis', backgroundColor: '#151824', borderColor: '#34394a', textStyle: { color: '#fff' } },
    animationDuration: 700,
    ...option
  })
  charts.push(chart)
}

onMounted(async () => {
  await nextTick()
  init(trendRef.value, {
    grid: { left: 40, right: 22, top: 34, bottom: 35 }, xAxis: { type: 'category', data: data.dailyActivity.map(x => x.name), ...axis }, yAxis: { type: 'value', minInterval: 1, ...axis },
    series: [{ type: 'line', smooth: true, data: data.dailyActivity.map(x => x.value), symbolSize: 8, lineStyle: { width: 3, color: '#ff5265' }, itemStyle: { color: '#ff5265' }, areaStyle: { color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: 'rgba(255,82,101,.4)' }, { offset: 1, color: 'rgba(255,82,101,0)' }]) } }]
  })
  init(actionRef.value, {
    tooltip: { trigger: 'item' }, legend: { bottom: 4, textStyle: { color: '#a8adbb' } },
    series: [{ type: 'pie', radius: ['46%', '72%'], center: ['50%', '45%'], label: { position: 'inside', color: '#fff', fontWeight: 700, lineHeight: 18, formatter: '{b}\n{d}%' }, labelLine: { show: false }, data: data.actionTypes, color: ['#ff5265', '#5f7cff'] }]
  })
  init(hourRef.value, {
    grid: { left: 38, right: 18, top: 28, bottom: 35 }, xAxis: { type: 'category', data: data.hourlyActivity.map(x => x.name), ...axis }, yAxis: { type: 'value', minInterval: 1, ...axis },
    series: [{ type: 'bar', data: data.hourlyActivity.map(x => x.value), barMaxWidth: 24, itemStyle: { borderRadius: [7, 7, 0, 0], color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: '#8a68ff' }, { offset: 1, color: '#4b5bdc' }]) } }]
  })
  const users = [...data.activeUsers].reverse()
  init(userRef.value, {
    grid: { left: 64, right: 24, top: 18, bottom: 24 }, xAxis: { type: 'value', minInterval: 1, ...axis }, yAxis: { type: 'category', data: users.map(x => x.name), ...axis },
    series: [{ type: 'bar', data: users.map(x => x.value), barWidth: 12, label: { show: true, position: 'right', color: '#dfe3ee' }, itemStyle: { borderRadius: 7, color: '#38c6b0' } }]
  })
  const movies = [...data.topMovies].reverse()
  init(movieRef.value, {
    grid: { left: 92, right: 24, top: 18, bottom: 24 }, xAxis: { type: 'value', minInterval: 1, ...axis }, yAxis: { type: 'category', data: movies.map(x => movieLabel(x.id)), axisLabel: { color: '#8f94a5', width: 76, overflow: 'truncate' }, axisLine: axis.axisLine },
    series: [{ type: 'bar', data: movies.map(x => x.value), barWidth: 12, label: { show: true, position: 'right', color: '#dfe3ee' }, itemStyle: { borderRadius: 7, color: '#ff9f43' } }]
  })
  init(ratingRef.value, {
    grid: { left: 45, right: 18, top: 25, bottom: 70 }, xAxis: { type: 'category', data: data.topRatedMovies.map(x => movieLabel(x.id)), axisLabel: { color: '#8f94a5', rotate: 35, interval: 0, width: 70, overflow: 'truncate' }, axisLine: axis.axisLine }, yAxis: { type: 'value', min: 0, max: 5, ...axis },
    series: [{ type: 'bar', data: data.topRatedMovies.map(x => x.value), barMaxWidth: 26, itemStyle: { borderRadius: [6, 6, 0, 0], color: '#ffd166' } }]
  })
  window.addEventListener('resize', resize)
})

function resize() { charts.forEach(chart => chart.resize()) }
onBeforeUnmount(() => { window.removeEventListener('resize', resize); charts.forEach(chart => chart.dispose()) })
</script>

<template>
  <PageShell>
    <section class="dashboard-page">
      <div class="dashboard-hero">
        <div><span class="live-dot"></span><span class="eyebrow">JOB5 · SPARK ANALYTICS</span><h1>电影行为可视化大屏</h1><p>基于 Kafka / 本地日志降级链路与 Spark 六维聚合结果</p></div>
        <div class="freshness"><span>数据快照</span><b>{{ data.updatedAt }}</b><small>{{ data.source }}</small></div>
      </div>

      <div class="kpi-grid">
        <article><span>总互动量</span><b>{{ data.kpis.totalEvents }}</b><small>点击与评分事件</small></article>
        <article><span>活跃用户</span><b>{{ data.kpis.activeUsers }}</b><small>去重用户数</small></article>
        <article><span>涉及电影</span><b>{{ data.kpis.involvedMovies }}</b><small>去重电影数</small></article>
        <article><span>平均评分</span><b>{{ data.kpis.averageScore }}</b><small>共 {{ data.kpis.scoreEvents }} 次评分</small></article>
        <article><span>最新日活</span><b>20</b><small>较前一日 +33.3%</small></article>
      </div>

      <div class="dashboard-grid">
        <article class="chart-card wide"><header><div><h2>每日活跃趋势</h2><p>观察互动量随日期的变化</p></div><span>峰值 20</span></header><div ref="trendRef" class="chart"></div></article>
        <article class="chart-card"><header><div><h2>行为类型分布</h2><p>评分与点击占比</p></div></header><div ref="actionRef" class="chart"></div></article>
        <article class="chart-card wide"><header><div><h2>小时活跃度</h2><p>按操作发生小时聚合</p></div><span>09时最活跃</span></header><div ref="hourRef" class="chart"></div></article>
        <article class="chart-card"><header><div><h2>活跃用户排行</h2><p>按交互次数排序</p></div></header><div ref="userRef" class="chart tall"></div></article>
        <article class="chart-card"><header><div><h2>热门电影排行</h2><p>按点击与评分总次数</p></div></header><div ref="movieRef" class="chart tall"></div></article>
        <article class="chart-card wide"><header><div><h2>高评分电影</h2><p>评分事件平均分 Top 10</p></div><span>满分 5.0</span></header><div ref="ratingRef" class="chart"></div></article>
      </div>

      <div class="dashboard-note"><b>统计口径</b><span>数据粒度为单次用户行为；时间范围 {{ data.range[0] }} 至 {{ data.range[1] }}。结果与 job5 的 Spark 分组、排序和 Top 10 逻辑保持一致。</span></div>
    </section>
  </PageShell>
</template>
