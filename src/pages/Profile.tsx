import { useParams, NavLink, Switch, Route } from "react-router-dom";
import { UserInfo } from "../components/Profile";
import { ArticleList } from "../components/ArticleList";
import { useGlobalState } from "../components/GlobalStateProvider";
import { useProfile } from "../hooks";

const MyArticles = (props: { username: string }) => {
  return <ArticleList type="author" value={props.username} />;
};

const FavoritedArticles = (props: { username: string }) => {
  return <ArticleList type="favorited" value={props.username} />;
};

export const Profile = () => {
  const { username } = useParams<{ username: string }>();
  const { profile, follow, unfollow } = useProfile(username);
  const { currentUser } = useGlobalState();

  if (!profile) {
    return null;
  }

  const isUser = currentUser
    ? profile.username === currentUser.username
    : false;

  const renderTabs = () => {
    return (
      <ul className="nav nav-pills outline-active">
        <li className="nav-item">
          <NavLink className="nav-link" to={`/@${username}`} exact>
            My Articles
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink className="nav-link" to={`/@${username}/favorites`}>
            Favorited Articles
          </NavLink>
        </li>
      </ul>
    );
  };

  return (
    <div className="profile-page">
      <UserInfo
        profile={profile}
        isUser={isUser}
        onFollow={follow}
        onUnfollow={unfollow}
      />

      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-md-10 offset-md-1">
            <div className="articles-toggle">{renderTabs()}</div>

            <Switch>
              <Route path="/@:username" exact>
                <MyArticles username={username} />
              </Route>
              <Route path="/@:username/favorites">
                <FavoritedArticles username={username} />
              </Route>
            </Switch>
          </div>
        </div>
      </div>
    </div>
  );
};
