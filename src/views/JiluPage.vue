<template>
  <div class="top">
    <div class="top_left" style="margin-top: 10px;margin-left: 20px;">
      <el-button type="primary" @click="ret()">返回</el-button>
    </div>
    <div class="top_right">
      <div class="top_right_name">
        <p>{{ username }}</p>
      </div>
      <div class="top_right_tuichu">
        <el-popconfirm confirm-button-text="Yes" cancel-button-text="No" :icon="InfoFilled" icon-color="#626AEF"
          title="确定要退出吗?" @confirm="confirmEvent" @cancel="cancelEvent">
          <template #reference>
            <p>退出登录</p>
          </template>
        </el-popconfirm>
      </div>
    </div>
  </div>
  <!-- 表格 -->
  <div>
    <el-table :data="jllist" style="width: 100%">
      <el-table-column prop="name" label="姓名" min-width="130" align="center" />
      <el-table-column prop="stage_name" label="练习阶段" min-width="130" align="center" />
      <el-table-column prop="qualified" label="合格数量" min-width="130" sortable sort-orders align="center" />
      <el-table-column prop="" label="练习截图" min-width="130" align="center">
        <template #default="scope">
          <div>
            <el-image style="width: 50px; height: 50px" :src="scope.row.img" :zoom-rate="1.2"
              :preview-src-list="[scope.row.img]" preview-teleported="true" :initial-index="0" fit="cover" />
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="result" label="练习成绩" min-width="180" align="center" />
      <el-table-column prop="status" label="状态" min-width="180" align="center" />
      <el-table-column prop="createtime" label="练习时间" min-width="180" align="center" />
    </el-table>
  </div>
</template>

<script setup>
import { ref,onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router'
import axios from 'axios';
import qs from 'qs';

const userid = ref(''); //用户id
const username = ref(''); //用户名称

userid.value = sessionStorage.getItem("userid");
username.value = sessionStorage.getItem("username");

const router = useRouter();
const jllist = ref([]);
// 记录列表
axios({
  method: "post", //请求方式
  url: "/api/practice/history", //url
  data: qs.stringify({
    uid: userid.value,
  }),
})
  .then((res) => {
    console.log(res.data.list, '记录'); //成功回调
    jllist.value = res.data.list;
  })
  .catch((err) => {
    console.log(err); //失败回调
  });

const confirmEvent = () => {
  sessionStorage.removeItem("userid");
  sessionStorage.removeItem("username");
  router.replace('/');
}

// 返回
const ret = () => {
  router.replace('home');
}

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

<style scoped>
.top {
  width: 100%;
  height: 50px;
  margin-top: -10px;
  display: flex;
  background-color: #FAFAFA;
}

.top_left {
  width: 85%;
  height: 100%;
}

.top_right {
  width: 15%;
  height: 100%;
  display: flex;
}

.top_right_name {
  width: 70px;
  height: 50px;
  text-align: center;
  border-radius: 10px;
  color: #409EFF;
  background-color: #ECF5FF;
}

.top_right_tuichu {
  width: 70px;
  height: 50px;
  margin-left: 10px;
  text-align: center;
}
</style>