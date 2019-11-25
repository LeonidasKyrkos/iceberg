<template>
    <form class="node">
        <div v-if="!$apolloData.queries.nodes.loading" class="node__inner">
            <text-input
                :state="node.title"
                id="title"
                name="title"
                label="Title"
                @input="handleInput"
            ></text-input>
            <text-input
                :state="node.shortTitle"
                id="shorttitle"
                name="shorttitle"
                label="Short title"
            ></text-input>
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
    public timeouts: { [key: string]: number } = {};

    public get node() {
        return this.nodes[0];
    }

    private handleInput(input: string, value: string) {
        if (this.timeouts[input]) {
            clearTimeout(this.timeouts[input]);
        }

        this.timeouts[input] = window.setTimeout(() => {
            this.submitMutation(input, value);
        }, 2500);
    }

    private submitMutation(input: string, value: string) {
        switch (input) {
            case "title":
                this.submitTitleMutation(value);
                break;
        }
    }

    private submitTitleMutation(value: string) {
        this.$apollo.mutate({
            mutation: gql`
                mutation($payload: Object!) {
                    UPDATE_NODE(payload: $payload) {
                        id
                        title
                    }
                }
            `,
            variables: {
                payload: {
                    title: value,
                },
            },
        });
    }
}
</script>

<style lang="scss" scoped>
$module: "node";

.#{$module} {
}
</style>