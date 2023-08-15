<template>
    <div style="margin-left: 40%;margin-top:20%;">
        <el-col :span="6">
            <el-card shadow="hover">
                <el-input v-model="namevalue" placeholder="姓名" />
                <el-input v-model="passvalue" placeholder="密码" type="password" style="margin-top: 20px;" />
                <el-button type="primary" style="width: 90%; margin-left: 5%; margin-top: 20px;"
                    @click="denglu()">登录</el-button>
            </el-card>
        </el-col>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import axios from 'axios';
import qs from 'qs';
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

const router = useRouter();

const namevalue = ref(''); //姓名
const passvalue = ref(''); //密码

const denglu = () => {
    axios({
        method: "post", //请求方式
        url: "/api/user/login", //url
        data: qs.stringify({
            name: namevalue.value,
            pass: passvalue.value
        }),
    })
        .then((res) => {
            console.log(res.data); //成功回调
            if (res.data.code == 1) {
                ElMessage.success('登录成功');

                sessionStorage.setItem("userid", res.data.info.id);
                sessionStorage.setItem("username", res.data.info.name);
                router.push('home');
            } else {
                ElMessage.error('请检查账号密码是否正确')
            }
        })
        .catch((err) => {
            console.log(err); //失败回调
        });
}

const userid = ref(''); //用户id
const username = ref(''); //用户名称

userid.value = sessionStorage.getItem("userid");
username.value = sessionStorage.getItem("username");
console.log(userid.value,'userid.value');

if (userid.value == null) {
  console.log('空');
} else {
  router.push('/');
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

<style lang="scss" scoped></style>