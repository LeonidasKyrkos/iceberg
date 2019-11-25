<template>
    <ul class="node-tree">
        <li v-for="leaf in nodeTree" :key="leaf.id" class="node-tree__leaf">
            <leaf :leaf="leaf" :node-tree="nodeTree"></leaf>
        </li>
    </ul>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

import Leaf from "@/components/NodeLeaf.vue";

@Component({
    components: {
        Leaf,
    },
})
export default class NodeTree extends Vue {
    @Prop() private readonly nodeTree!: Array<[]>;

    constructor() {
        super();
    }
}
</script>

<style lang="scss" scoped>
$module: "node-tree";

.#{$module} {
    /deep/ .node-tree {
        margin-left: em(12);
    }
}
</style>