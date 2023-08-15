<template>
    <div class="top" v-show="topshow">
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
    <div v-show="kaishishow" style="width: 100%;height: 60px;display: grid;display: flex;place-content:center">
        <div style="align-self:center;">
            <el-button type="primary" @click="kais()">开始</el-button>
        </div>
    </div>

    <div v-show="buttonshow" style="display: flex;">
        <div style="width: 95%;height: 60px;display: grid;display: flex;place-content:center">
            <div style="align-self:center;">
                <el-button type="primary" @click="sub()" :disabled="subdis">提交</el-button>
            </div>
            <div style="align-self:center;margin-left: 10px;">
                <el-button type="primary" plain @click="res()" :disabled="resdis">重置</el-button>
            </div>
            <div style="align-self:center;margin-left: 10px;">
                <el-button type="primary" plain @click="ret()" :disabled="tcdis">退出</el-button>
            </div>
        </div>
        <div
            style="width: 4%; height: 40px; margin-top: 10px;background-color: #ECF5FF;color: #409EFF;text-align: center;line-height: 40px; border-radius: 10px;">
            <span>{{ nokongnumber }}/{{ inputlist.length }}</span>
        </div>
    </div>

    <div id="my-node" class="content" v-show="inputshow">
        <div class="contents" v-for="(item, index) in inputlist" :key="index">
            <div class="contents_p">
                <p>{{ item.chinese }}</p>
            </div>
            <div class="contents_inp">
                <el-input v-model="item.key" :disabled="inputdis"
                    @input="nonumber(), item.key = item.key.replace(/[^a-zA-Z]/g, '')" />
            </div>
            <div class="iconimg" v-if="item.key == item.words" @click="texs(index)" v-show="icons">
                <img src="https://pic.imgdb.cn/item/648961a41ddac507ccf7473e.png" alt="">
            </div>
            <div class="iconimg" v-if="item.key !== item.words" @click="texs(index)" v-show="icons">
                <img src="https://pic.imgdb.cn/item/6489618a1ddac507ccf6feb8.png" alt="">
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios';
import qs from 'qs';
import domtoimage from "dom-to-image";
import { ElMessage } from 'element-plus'

const userid = ref(''); //用户id
const username = ref(''); //用户名称

userid.value = sessionStorage.getItem("userid");
username.value = sessionStorage.getItem("username");
//首先在setup中定义
const route = useRoute();
const optionId = ref('');
const router = useRouter();
const inputlist = ref([]);
// const inputval = ref('');
const buttonshow = ref(false);
const inputshow = ref(false);
const kaishishow = ref(true);
const icons = ref(false); //对错图标
const inputdis = ref(false); //input禁用
const imge = ref('');
const duinumber = ref(0);//对题数
const nokongnumber = ref(0);//不是空题数
const resdis = ref(false);//重置按钮禁用
const subdis = ref(false);//提交按钮禁用
const tcdis = ref(false); //退出按钮禁用
const topshow = ref(true);

// 开始按钮
const kais = () => {
    kaishishow.value = false;
    document.documentElement.requestFullscreen();
    buttonshow.value = true;
    inputshow.value = true;
    tcdis.value = true;
    topshow.value = false
    axios({
        method: "post", //请求方式
        url: "/api/practice/index ", //url
        data: qs.stringify({
            stage_id: optionId.value
        }),
    })
        .then((res) => {
            console.log(res.data.list); //成功回调
            inputlist.value = res.data.list;
            if (tcdis.value == true && subdis.value == false) {
                window.onresize = function () {
                    console.log('监听变化')
                    watchChangeSize();
                }
            }
        })
        .catch((err) => {
            console.log(err); //失败回调
        });

}

const texs = (i) => {
    console.log(i);
}
// 不空题数
const nonumber = () => {
    let numb = inputlist.value.filter(function (item) {
        return item.key !== undefined && item.key !== '';
    });
    nokongnumber.value = numb.length;
    console.log(nokongnumber.value, 'nokongnumber.value ');
}


// 截屏
const drawImage = () => {
    var node = document.getElementById("my-node");
    node.style.backgroundColor = '#fff'
    domtoimage.toJpeg(node)
        .then((dataUrl) => {
            // 上传图片
            axios({
                method: "post", //请求方式
                url: "/api/test/base64img", //url
                data: qs.stringify({
                    base: dataUrl,
                }),
            })
                .then((res) => {
                    console.log(res.data, '图片'); //成功回调
                    imge.value = res.data.url;
                    axios({
                        method: "post", //请求方式
                        url: "/api/practice/record", //url
                        data: qs.stringify({
                            uid: userid.value,
                            name: username.value,
                            stage_id: optionId.value,
                            stage_name: '前端',
                            img: res.data.url,
                            result: 1,
                            qualified: duinumber.value
                        }),
                    })
                        .then((res) => {
                            console.log(res, '提交结果'); //成功回调
                            if (res.data.code == 1) {
                                tcdis.value = false;
                            }
                        })
                        .catch((err) => {
                            console.log(err); //失败回调
                        });
                })
        })
        .catch(function (error) {
            console.error("oops, something went wrong!", error);
        });
}

// 提交按钮
const sub = () => {
    for (let i = 0; i < inputlist.value.length; i++) {
        if (inputlist.value[i].key == inputlist.value[i].words) {
            duinumber.value += 1;
            console.log(duinumber.value, 'duinumber.value');
        }
    }
    tj();
    icons.value = true;
    inputdis.value = true;
    resdis.value = true;
    subdis.value = true;
    drawImage();
    ElMessage.success('提交成功等待退出按钮亮起');
}

//为窗口注册失去焦点事件
window.onblur = function () {
    if (tcdis.value == true && subdis.value == false) {
        sub();
        ElMessage.error('失去焦点自动提交');
    }
}

// 重置按钮
const res = () => {
    for (let i = 0; i < inputlist.value.length; i++) {
        inputlist.value[i].key = '';
    }
    nokongnumber.value = 0;
}

// 提交
const tj = () => {

}
// 退出按钮
const ret = () => {
    router.replace('home');
}
// 键盘事件
document.onkeydown = () => {
    nonumber();
}

optionId.value = route.query.optionId;
console.log(optionId.value, 'optionId.value');
// 退出账户
const confirmEvent = () => {
    sessionStorage.removeItem("userid");
    sessionStorage.removeItem("username");
    router.replace('/');
}

const watchChangeSize = () => {
    //可视区的宽/高(DOM)
    //offsetHeight（带边框）和clientHeight（不带边框）区别参考上一篇文章
    var offsetWid = document.documentElement.clientWidth;
    var offsetHei = document.documentElement.clientHeight;
    console.log(offsetWid, '宽');
    console.log(offsetHei, '高');
    if (offsetHei < 850) {
        if (tcdis.value == true && subdis.value == false) {
            sub();
            ElMessage.error('退出全屏自动提交');
        }
        console.log('小');
    } else {
        console.log('大');
    }
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

window.onbeforeunload = function () {
    if (tcdis.value == true && subdis.value == false) {
        sub();
        ElMessage.error('页面刷新自动提交');
    }
}
window.onunload = function () {
    alert("已成功提交考试！");
}

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

/* 内容 */
.content {
    width: 98%;
    margin-left: 1%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
}

.contents {
    width: 24%;
    height: 60px;
    display: flex;
}

.contents_p {
    width: 27%;
    font-size: 13px;
    align-self: center;
}

.contents_inp {
    width: 50%;
    font-size: 13px;
    align-self: center;
}

/* 图标 */
.iconimg {
    width: 20px;
    height: 20px;
}

.iconimg img {
    width: 100%;
    height: 100%;
}
</style>