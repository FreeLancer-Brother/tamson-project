export const state = () => ({
    configs: {
        header: null,
        footer: null,
        floatButtons: null,
    },
    brandMenuData: [],
    serviceMenuData: [],
})

export const mutations = {
    SET_CONFIGS(store, data) {
        if (data.key && data.data) store.configs[data.key] = data.data;
    },
    SET_BRAND_MENU_DATA(store, data) {
        store.brandMenuData = data;
    },
    SET_SERVICE_MENU_DATA(store, data) {
        store.serviceMenuData = data;
    }
}

// Actions
export const actions = {
    // Fetch User Account
    async nuxtServerInit({ commit, axios }) {
        const configData = await Promise.all([
            this.$axios.$get("/frontend/header/brand"),
            this.$axios.$get("/frontend/header/service"),
            this.$axios.$get("/frontend/configs/header"),
            this.$axios.$get("/frontend/configs/footer"),
            this.$axios.$get("/frontend/configs/float-buttons"),
            this.$axios.$get("/frontend/configs/common"),
        ]);
        try {
            const response = configData[0];
            commit('SET_BRAND_MENU_DATA', (response && response.data) || []);
        } catch (err) {
        }
        try {
            const response = configData[1];
            commit('SET_SERVICE_MENU_DATA', (response && response.data) || []);
        } catch (err) {
        }
        try {
            const response = configData[2];
            commit('SET_CONFIGS', {
                key: 'header',
                data: (response && response.data) || null,
            });
        } catch (err) {
        }
        try {
            const response = configData[3];
            commit('SET_CONFIGS', {
                key: 'footer',
                data: (response && response.data) || null,
            });
        } catch (err) {
        }
        try {
            const response = configData[4];
            commit('SET_CONFIGS', {
                key: 'floatButtons',
                data: (response && response.data) || null,
            });
        } catch (err) {
        }
        try {
            const response = configData[5];
            commit('SET_CONFIGS', {
                key: 'common',
                data: (response && response.data) || null,
            });
        } catch (err) {
        }
    }
};