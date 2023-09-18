import {Route, Routes} from "react-router-dom";
import { Layout } from "../../Components/Layout";
import { MainPage } from "../MainPage";
import {Login} from "../Login";
import {Register} from "../Register";
import {NotFound} from "../NotFound";

export const Root = () => {
  return(
    <Routes>
      <Route path="/" element={ <Login/> }/>
      <Route path="/register" element={ <Register/>} />
      <Route element={<Layout/>}>
        <Route path="/mainpage" element={ <MainPage/> }/>
        {/*<Route path="/admin" element={ <Admin/>} />*/}
      </Route>
      <Route path="*" element={ <NotFound/> }/>
    </Routes>
  );
}