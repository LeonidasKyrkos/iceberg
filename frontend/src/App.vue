<template>
    <main id="app">
        <navigation></navigation>
        <router-view />
    </main>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import gql from "graphql-tag";

import Navigation from "@/components/Navigation/Navigation.vue";

@Component({
    components: {
        Navigation,
    },
    apollo: {
        NODE_TREE: gql`
            query {
                NODE_TREE
            }
        `,
    },
})
export default class App extends Vue {}
</script>