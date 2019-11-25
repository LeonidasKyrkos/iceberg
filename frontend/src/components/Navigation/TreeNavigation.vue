<template>
    <nav class="tree-navigation">
        <node-tree :node-tree="nodeTree"></node-tree>
    </nav>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import gql from "graphql-tag";

import NodeTree from "@/components/NodeTree.vue";

@Component({
    components: {
        NodeTree,
    },
    apollo: {
        NODE_TREE: gql`
            query {
                NODE_TREE @client
            }
        `,
    },
})
export default class TreeNavigation extends Vue {
    private NODE_TREE!: string;

    get nodeTree() {
        if (this.NODE_TREE) {
            return JSON.parse(this.NODE_TREE);
        }
        return [];
    }
}
</script>

<style lang="scss" scoped>
$module: "tree-navigation";

.#{$module} {
}
</style>