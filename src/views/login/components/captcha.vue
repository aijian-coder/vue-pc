<template>
     <div class="captcha__cap" @click="refresh()" v-html="svg"></div>
</template>
<script>
import axios from "axios";
// import request from "../../../utils/request";
import request from "utils/request";

export default{
    data(){
        return{
            svg: "",
        }
    },
    methods:{
        refresh() {
            axios
                .get("/api/admin/base/open/captcha")
                .then((response) => {
                    // console.log("response", response);
                    const { data } = response;
                    // 判断业务状态码
                    if (data.code !== 1000) {
                        return alert(data.message);
                    }
                    // 将 data.data.data => this.svg
                    this.svg = data.data.data;

                    // console.log("this.svg", this.svg);
                })
                .catch((error) => {
                    console.log("error", error);
                });
        },
    },
    created() {
    this.refresh();
  },
    

  

}
</script>

<style scoped lang="scss">
  .captcha__cap {
        width: 140px;
        height: 40px;
        background: #ccc;

        ::v-deep(svg) {
            width: 100%;
            height: 100%;
        }
    }
</style>