<template>
  <div>工作台</div>
  <hr />
  <SelectRole v-model="roleIdList" :limit="2"/>
  <hr />
  <AvatarUploader
    v-model="headImg"
    :accept="['image/jpeg', 'image/jpg', 'image/png', 'image/webp']"
  />
</template>
<script>
export default {
  name: "WorkPlace",
  data() {
    return {
      roleIdList: [],
      headImg:
        "http://127.0.0.1:8001/public/uploads/20230821/0099edf0-3fc1-11ee-bf7f-db496be4b9a9.png",
    };
  },
};
</script>
