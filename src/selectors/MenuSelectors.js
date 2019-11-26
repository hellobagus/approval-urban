const selectMenu = state => state.menuReducer.menu;
const selectDetail = state => state.detailReducer.detail;
const selectOtorisasi = state => state.otorisasiReducer.otorisasi;

export {
    selectMenu,
    selectDetail,
    selectOtorisasi
};
