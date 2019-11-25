<template>
    <form class="node">
        <div v-if="!$apolloData.queries.nodes.loading" class="node__inner">
            <text-input :state="node.title" id="title" name="title" label="Title"></text-input>
        </div>
    </form>
</template>

<script lang='ts'>
import { Component, Vue } from "vue-property-decorator";
import gql from "graphql-tag";

import TextInput from "@/components/Controls/TextInput.vue";

@Component({
    components: {
        TextInput,
    },
    apollo: {
        nodes: {
            query: gql`
                query nodes($ids: [Int]) {
                    nodes(ids: $ids) {
                        id
                        type
                        parent_node
                        title
                        shortTitle
                    }
                }
            `,
            variables() {
                return {
                    ids: [parseInt(this.$route.params.id, 10)],
                };
            },
        },
    },
})
export default class Node extends Vue {
    public nodes = [];

    public get node() {
        return this.nodes[0];
    }
}
</script>

<style lang="scss" scoped>
$module: "node";

.#{$module} {
}
</style>