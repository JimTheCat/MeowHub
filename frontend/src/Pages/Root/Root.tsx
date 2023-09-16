import {Route, Routes} from "react-router-dom";
import { Layout } from "../../Components/Layout";
import { MainPage } from "../MainPage";
import {Login} from "../Login";

export const Root = () => {
  return(
    <Routes>
      <Route path="/" element={ <Login/> }/>
      <Route element={<Layout/>}>
        <Route path="/mainpage" element={ <MainPage/> }/>
        {/*<Route path="/form" element={ <Form/>} />*/}
        {/*<Route path="/admin" element={ <Admin/>} />*/}
      </Route>
      {/*<Route path="*" element={ <PageNotFound/> }/>*/}
    </Routes>
  );
}