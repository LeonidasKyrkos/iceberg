export interface INode {
    readonly id?: number;
    title?: string;
    short_title?: string;
    type?: number;
    readonly parent_node?: string;
}
