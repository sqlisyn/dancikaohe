<template>
    <div class="top">
    <div class="top_left"></div>
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
    <div style="width: 100px;">
        <el-button @click="dialogTableVisible = true" type="primary"
            style="width: 400px;height: 60px;margin-top: 200px;margin-left: 550px;">练习</el-button>
            <el-button @click="targetjilu()" type="primary"
            style="width: 400px;height: 60px;margin-top: 60px;margin-left: 550px;">练习记录</el-button>
        <el-dialog v-model="dialogTableVisible" width="20%" :close-on-click-modal="false" :show-close="false" title="请选择阶段"
            center align-center>
            <el-select v-model="selectvalue" class="m-2" placeholder="请选择阶段" style="margin-left: 30px;">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="no()">取消</el-button>
                    <el-button type="primary" @click="yes()">
                        确认
                    </el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

const userid = ref(''); //用户id
const username = ref(''); //用户名称

userid.value = sessionStorage.getItem("userid");
username.value = sessionStorage.getItem("username");

const router = useRouter();

const dialogTableVisible = ref(false);
const selectvalue = ref('');
// 记录按钮
const targetjilu=()=>{
  router.push('jilupage');
}

const yes = () => {
    dialogTableVisible.value = false;
    if (selectvalue.value == '') {
        ElMessage.error('请选择阶段');
    } else (
        router.push({ path: 'optionpage', query: { optionId: selectvalue.value } })
    )
}
const no = () => {
    dialogTableVisible.value = false
}

const options = [
    {
        value: '1',
        label: 'HTML,CSS',
    },
    {
        value: '2',
        label: 'JS,JQuery',
    },
    {
        value: '3',
        label: 'Web前端',
    },
    {
        value: '4',
        label: 'PHP,MySQL',
    },
]

const confirmEvent = () => {
  sessionStorage.removeItem("userid");
  sessionStorage.removeItem("username");
  router.replace('/');
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

// import { useRouter } from 'vue-router'
// import axios from 'axios';
// import qs from 'qs';

// //先在setup中定义
// const router = useRouter();
// const userid = ref(''); //用户id
// const username = ref(''); //用户名称

// userid.value = sessionStorage.getItem("userid");
// username.value = sessionStorage.getItem("username");
// console.log(userid.value,'userid.value');

// const enterFullscreen = () => {
//     document.documentElement.requestFullscreen();
//     console.log(66666);
// }

// window.onload = function () {
//     console.log('页面加载完毕')
//     // watchChangeSize();
// }
// window.onresize = function () {
//     console.log('监听变化')
//     watchChangeSize();
// }

// function watchChangeSize() {
//     //可视区的宽/高(DOM)
//     //offsetHeight（带边框）和clientHeight（不带边框）区别参考上一篇文章
//     var offsetWid = document.documentElement.clientWidth;
//     var offsetHei = document.documentElement.clientHeight;
//     console.log(offsetWid, '宽');
//     console.log(offsetHei, '高');
//     if (offsetHei < 800) {
//         console.log('xiao');
//     }
// }


// watchEffect(() => {
//     const isFullScreen = document.fullscreenElement !== null;
//     console.log('浏览器是否全屏：', isFullScreen);
//     console.log(document.fullscreenElement);
// });


// if (!document.fullscreenElement) {
//     document.addEventListener("keydown", function (e) {
//         console.log(e);
//         if (e.key == "1") {
//             e.preventDefault();
//         }
//         if (e.key == "2") {
//             e.preventDefault();
//         }
//         if (e.key == "3") {
//             e.preventDefault();
//         }
//         if (e.key == "4") {
//             e.preventDefault();
//         }
//         if (e.key == "5") {
//             e.preventDefault();
//         }
//         if (e.key == "6") {
//             e.preventDefault();
//         }
//         if (e.key == "7") {
//             e.preventDefault();
//         }
//         if (e.key == "8") {
//             e.preventDefault();
//         }
//         if (e.key == "9") {
//             e.preventDefault();
//         }
//         if (e.key == "Enter") {
//             e.preventDefault();
//         }
//         if (e.key == "+") {
//             e.preventDefault();
//         }
//         if (e.key == "-") {
//             e.preventDefault();
//         }
//         if (e.key == "_") {
//             e.preventDefault();
//         }
//         if (e.key == "——") {
//             e.preventDefault();
//         }
//         if (e.key == "Delete") {
//             e.preventDefault();
//         }
//         if (e.key == "F1") {
//             e.preventDefault();
//         }
//         if (e.key == "F2") {
//             e.preventDefault();
//         }
//         if (e.key == "F3") {
//             e.preventDefault();
//         }
//         if (e.key == "F4") {
//             e.preventDefault();
//         }
//         if (e.key == "F5") {
//             e.preventDefault();
//         }
//         if (e.key == "F6") {
//             e.preventDefault();
//         }
//         if (e.key == "F7") {
//             e.preventDefault();
//         }
//         if (e.key == "F8") {
//             e.preventDefault();
//         }
//         if (e.key == "F9") {
//             e.preventDefault();
//         }
//         if (e.key == "F10") {
//             e.preventDefault();
//         }
//         if (e.key == "F11") {
//             e.preventDefault();
//             console.log('F11');
//         }
//         if (e.key == "F12") {
//             e.preventDefault();
//         }
//         if (e.key == "Control") {
//             e.preventDefault();
//         }
//         if (e.key == "Fn") {
//             e.preventDefault();
//         }
//         if (e.key == "Alt") {
//             e.preventDefault();
//         }
//         if (e.key == "Window") {
//             e.preventDefault();
//         }
//         if (e.key == "Tab") {
//             e.preventDefault();
//         }
//         if (e.key == "`") {
//             e.preventDefault();
//         }
//         if (e.key == "Process") {
//             e.preventDefault();
//             console.log(666);
//         }
//         if (e.key == "Escape") {
//             e.preventDefault();
//         }
//         if (e.key == "Shift") {
//             e.preventDefault();
//             console.log(999);
//         }
//     });
// } else {
//     console.log('退出');
// }

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