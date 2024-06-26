import { useEffect } from "react";
import "./App.css";
import ResultList from "./components/ResultList";
import SearchBox from "./components/SearchBox";
import Facet from "./components/Facet";
import {
  searchBox as SearchBoxController,
  resultList as ResultListController,
  facet as FacetController,
  pager as PagerController,
  instantResults as InstantResultsController,
} from "./controllers/controllers";
import { headlessEngine } from "./Engine";
import Pager from "./components/Pager";

declare global {
  function coveoua(action?: string, fieldName?: any, fieldValue?: any): any;
}

const logViewEvent = () => {
  coveoua("set", "page", "/");
  coveoua("send", "pageview");
};

function App() {
  useEffect(() => {
    headlessEngine.executeFirstSearch();
    logViewEvent();
  }, []);

  return (
    <div className="app">
      <header className="app-header">
        <img src={require("./assets/barca.svg").default} alt="barcaLogo" />
        <div className="search-section">
          <SearchBox
            controllerSearchbox={SearchBoxController}
            controllerInstantResults={InstantResultsController}
          />
        </div>
      </header>
      <div className="app-body">
        <div className="main-section">
          <div className="facet-section column">
            <Facet controller={FacetController} title="Category" />
          </div>
          <div className="results-section column">
            <ResultList controller={ResultListController} />
            <Pager controller={PagerController} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
