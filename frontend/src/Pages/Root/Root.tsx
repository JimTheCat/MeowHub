import {Route, Routes} from "react-router-dom";
import {Layout} from "../../Components/Layout";
import {MainPage} from "../MainPage";
import {Login} from "../Login";
import {Register} from "../Register";
import {NotFound} from "../NotFound";
import {Recovery} from "../Recovery";
import {Profile} from "../Profile";
import {Search} from "../Search";
import {Post} from "../Post";
import {Following} from "../Following";
import {Groups} from "../Groups";
import {Friends} from "../Friends";
import {Settings} from "../Settings";
import {Messenger} from "../Messenger";
import {ProtectedRoute} from "../../Components/ProtectedRoute";
import {PublicRoute} from "../../Components/PublicRoute";
import {useAuthStore} from "../../Services/authStore.ts";

export const Root = () => {

  const auth = useAuthStore();

  return (
    <Routes>
      {/*Public routes*/}
      <Route element={<PublicRoute isAuthenticated={auth.isLogged()}/>}>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/passwordrecovery" element={<Recovery/>}/>
        <Route path="/privacy" element={<div>Privacy</div>}/>
      </Route>

      {/*Protected routes*/}
      <Route path="/" element={<ProtectedRoute/>}>
        <Route element={<Layout/>}>
          <Route path="/mainpage" element={<MainPage/>}/>
          <Route path="/search" element={<Search/>}/>
          <Route path="/profile/:userTag" element={<Profile/>}/>
          <Route path="/createpost" element={<Post/>}/>
          <Route path="/following" element={<Following/>}/>
          <Route path="/groups" element={<Groups/>}/>
          <Route path="/friends" element={<Friends/>}/>
          <Route path="/messages" element={<Messenger/>}/>
          <Route path="/messages/:conversationId" element={<Messenger/>}/>
        </Route>
        <Route path="/settings" element={<Settings/>}/>
      </Route>

      {/*Not found route*/}
      <Route path="*" element={<NotFound/>}/>

    </Routes>
  );
}