<template>
  <svg-icon type="mdi" :path="path" width="20" height="20" fill="currentColor">
  </svg-icon>
</template>

<script lang="ts">
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiTrashCanOutline } from '@mdi/js';

export default {
  name: "my-component",
  components: {
    SvgIcon
  },
  data() {
    return {
       path: mdiTrashCanOutline,
    }
  }
}
</script>
