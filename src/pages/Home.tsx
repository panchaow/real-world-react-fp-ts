import { useReducer, Reducer } from "react";
import { Banner } from "../components/Home/Banner";
import { Tags } from "../components/Home/Tags";

import { useConfig } from "../components/ConfigProvider";
import { useGlobalState } from "../components/GlobalStateProvider";

import { ArticleList } from "../components/ArticleList";

interface State {
  tab: "all" | "feed" | "tag";
  tag: string | null;
  page: number;
}

const applyTabFilter = (tag: string) => ({
  type: "APPLY_TAG_FILTER" as const,
  payload: tag,
});

const changeTab = (tab: "all" | "feed") => ({
  type: "CHANGE_TAB" as const,
  payload: tab,
});

const setPage = (page: number) => ({
  type: "SET_PAGE" as const,
  payload: page,
});

type Action = ReturnType<
  typeof applyTabFilter | typeof changeTab | typeof setPage
>;

const reducer: Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case "CHANGE_TAB":
      return {
        ...state,
        tab: action.payload,
        tag: null,
        page: 0,
      };
    case "APPLY_TAG_FILTER":
      return {
        ...state,
        tab: "tag",
        tag: action.payload,
        page: 0,
      };
    case "SET_PAGE":
      return {
        ...state,
        page: action.payload,
      };
    default:
      throw new Error(`unsupported action: ${action}`);
  }
};

const initializer = (initialTab: "all" | "feed"): State => {
  return {
    tab: initialTab,
    tag: null,
    page: 0,
  };
};

export const Home = () => {
  const { appName } = useConfig();
  const [state, dispatch] = useReducer(reducer, "all", initializer);
  const { currentUser } = useGlobalState();

  const onClickTag = (tag: string) => {
    dispatch({
      type: "APPLY_TAG_FILTER",
      payload: tag,
    });
  };

  const filter =
    state.tab === "feed"
      ? { type: "feed" as const }
      : state.tab === "tag"
      ? { type: "tag" as const, value: state.tag }
      : { type: "all" as const };

  return (
    <div className="home-page">
      {!currentUser && <Banner appName={appName} />}
      <div className="container page">
        <div className="row">
          <div className="col-md-9">
            <div className="feed-toggle">
              <ul className="nav nav-pills outline-active">
                <li className="nav-item">
                  <button
                    type="button"
                    className={
                      state.tab === "feed" ? "nav-link active" : "nav-link"
                    }
                    onClick={() => dispatch(changeTab("feed"))}
                  >
                    Your Feed
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    type="button"
                    className={
                      state.tab === "all" ? "nav-link active" : "nav-link"
                    }
                    onClick={() => {
                      dispatch(changeTab("all"));
                    }}
                  >
                    Global Feed
                  </button>
                </li>

                {state.tag && (
                  <li className="nav-item">
                    <button type="button" className="nav-link active">
                      <i className="ion-pound" /> {state.tag}
                    </button>
                  </li>
                )}
              </ul>
            </div>
            <ArticleList {...(filter as any)} />
          </div>
          <div className="col-md-3">
            <div className="sidebar">
              <p>Popular Tags</p>

              <Tags onClickTag={onClickTag} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
