<template>
   <div class="picker">
     <div v-if="selectedLabel==='区域'">1111</div>
     <div v-if="selectedLabel==='方式'">2222</div>
     <div v-if="selectedLabel==='租金'">3333</div>
     <div v-if="selectedLabel==='筛选'">4444</div>
   </div>
</template>

<script>
export default {
  props: {
    isShow: Boolean,
    selectedLabel: String
  }
}
</script>

<style>

</style>
