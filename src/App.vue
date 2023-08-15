<template>
  <div>
    <router-view />
  </div>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue';

// 1.禁用右键菜单
document.oncontextmenu = new Function("event.returnValue=false");
// 2.禁用鼠标选中
document.onselectstart = new Function("event.returnValue=false");

document.onkeydown = () => {
  console.log(window.event.keyCode);

  for (let i = 9; i < 47; i++) {
    if (window.event && window.event.keyCode == i) {
      return false;
    }
  }
  for (let i = 58; i < 65; i++) {
    if (window.event && window.event.keyCode == i) {
      return false;
    }
  }
  for (let i = 91; i < 300; i++) {
    if (window.event && window.event.keyCode == i) {
      return false;
    }
  }
  // 禁用ctrl+shift+i
  if (window.event.ctrlKey && window.event.shiftKey && window.event.keyCode == 73) {
    return false;
  }
  if (window.event.shiftKey) {
    return false;
  }
  // 禁用ctrl+r
  if (window.event.ctrlKey && window.event.keyCode == 82) {
    return false;
  }
  if (window.event.tabKey && window.event.altKey) {
    return false;
  }
  if (window.event && window.event.keyCode == 18) {
    return false;
  }
}

//为窗口注册失去焦点事件
// window.onblur = function () {
//   console.log(666);
// }
//当关闭窗口时提示是否提交考试
// window.onbeforeunload = function () {
//   console.log('当前数据还没有保存');
//   return "当前数据还没有保存，关闭、刷新或切换窗口会自动完成考试，是否继续?";
// }
//窗口关闭后给出提示
// window.onunload = function () {
//   alert("已成功提交考试！");
// }

// 禁止浏览器后退
onMounted(() => {
  window.history.pushState(null, null, document.URL);
  window.addEventListener('popstate', () => {
    window.history.pushState(null, null, document.URL);
  });
});
onUnmounted(() => {
  window.removeEventListener(
    'popstate',
    () => {
      window.history.pushState(null, null, document.URL);
    },
    false
  );
});


</script>

<style scoped></style>