require("@babel/polyfill");
import Search from "./model/Search";
import { elements } from "./view/base";
import * as searchView from "./view/searchView";
/**
 * web app төлөв
 * хайлтын күэрийь үр дүн
 * тухайн үзүүлж байгаа жор
 * захиалж байгаа жорын найрлаганууд
 */
const state = {};

const controlSearch = async () => {
  // 1 вэбээс хайлтын түлхүүр үгийг гаргаж авна
  const query = searchView.getInput();
  if (query) {
    // шинээр хайлтын объектйг үүсгэж өгнө
    state.search = new Search(query);
    // хайлт хийхэд зориулж дэлгэцийг бэлтгэж өгнө.
    searchView.clearSearch();
    searchView.clearSearchResult();
    //  хайлтыг гүйцэтгэнэ
    await state.search.doSearch();
    // хайлтын үр дүнг дэлгэцэнд үзүүлнэ
    if (state.search.result === undefined) alert("Хайлтаар илэрцгүй ...");
    else searchView.renderRecipes(state.search.result);
  }
};

elements.searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  controlSearch();
});
