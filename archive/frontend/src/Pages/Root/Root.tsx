import {Route, Routes} from "react-router-dom";
import { Layout } from "../../Components/Layout";
import { MainPage } from "../MainPage";
import {Login} from "../Login";
import {Register} from "../Register";
import {NotFound} from "../NotFound";
import {Recovery} from "../Recovery";

export const Root = () => {
  return(
    <Routes>
      <Route path="/" element={ <Login/> }/>
      <Route path="/register" element={ <Register/>} />
      <Route path="/passwordrecovery" element={ <Recovery/>} />
      <Route element={<Layout/>}>
        <Route path="/mainpage" element={ <MainPage/> }/>
      </Route>
      <Route path="*" element={ <NotFound/> }/>
    </Routes>
  );
}