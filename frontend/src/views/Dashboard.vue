<template>
    <div class="dashboard"></div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import Navigation from "@/components/Navigation/Navigation.vue";

@Component({
    components: {
        Navigation,
    },
})
export default class Dashboard extends Vue {}
</script>

<style lang="scss" scoped>
$module: "dashboard";

.#{$module} {
}
</style>