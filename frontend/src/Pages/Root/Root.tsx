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

export const Root = () => {
  return (
    <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/passwordrecovery" element={<Recovery/>}/>
      <Route element={<Layout/>}>
        <Route path="/mainpage" element={<MainPage/>}/>
        <Route path="/search" element={<Search/>}/>
        <Route path="/profile/:userTag" element={<Profile/>}/>
        <Route path="/createpost" element={<Post/>}/>
        <Route path="/following" element={<Following/>}/>
        <Route path="/groups" element={<Groups/>}/>
        <Route path="/friends" element={<Friends/>}/>
      </Route>
      <Route path="/settings" element={<Settings/>}/>

      <Route path="*" element={<NotFound/>}/>
    </Routes>
  );
}