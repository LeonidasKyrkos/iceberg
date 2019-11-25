import Vue from "vue";
import Vuex, { StoreOptions } from "vuex";
import { RootState } from "./models/RootState";

Vue.use(Vuex);

const store: StoreOptions<RootState> = {
    state: {
        user: {
            role: "admin",
            teams: ["admin", "developer"],
        },
        nodes: [],
    },
    mutations: {},
    actions: {},
};

export default new Vuex.Store<RootState>(store);
