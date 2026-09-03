<template>
    <div class="search">
    <input
      :value="modelValue"
      type="text"
      placeholder="搜索商品"
      @input="emit('update:modelValue', $event.target.value)"
      @keyup.enter="submit"
    />
    <button @click="submit">搜索</button>
  </div>
</template>

<script setup>
const props=defineProps({
    modelValue:{type:String,default:''}
})
const emit=defineEmits(['update:modelValue','search'])

function submit(){
    const kw=props.modelValue.trim()
    if(!kw)return
    emit('search',kw)
}
</script>

<style scoped>
/* 从 LayoutHeader 原样搬过来（页头里那套 .search 样式要删掉） */
.search{
  display:flex;
  border: 1px solid #ddd;
  border-radius:20px;
  overflow:hidden;
}
.search input{
  border:none;
  outline:none;
  padding:8px 16px;
  flex:1;
}
.search button{
  border:none;
  outline:none;
  margin:4px;
  border-radius:16px;
  background:#fff6e6;
  color:var(--brand-color);
  font-weight:bold;
  padding:4px 16px;
  cursor:pointer;
  transition:all 0.3s;
}
.search button:hover{
  background:var(--brand-color);
  color:#fff;
}
</style>