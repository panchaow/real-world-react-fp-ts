import { Home } from "./pages/Home";
import { Switch, Route } from "react-router-dom";
import { Header } from "./components/Header";
import { Register } from "./pages/Register";
import { Settings } from './pages/Settings';
import { Login } from "./pages/Login";
import { CreateEditor, EditEditor } from './pages/Editor';
import { Profile } from './pages/Profile';
import { Article } from './pages/Article';

import { useGlobalState } from "./components/GlobalStateProvider";

function App() {
  const { appLoaded } = useGlobalState();
  if (appLoaded) {
    return (
      <div>
        <Header />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/settings" component={Settings} />
          <Route path="/editor/:slug" component={EditEditor} />
          <Route path="/editor" component={CreateEditor} />
          <Route path="/@:username" component={Profile} />
          <Route path="/article/:slug" component={Article} />
        </Switch>
      </div>
    );
  } else {
    return <Header />;
  }
}

export default App;
