import {Route, Routes} from "react-router-dom";
import { Layout } from "../Layout";
import { MainPage } from "../MainPage";

export const Root = () => {
  return(
    <Routes>
      <Route element={<Layout/>}>
        <Route path="/" element={ <MainPage/> }/>
        {/*<Route path="/form" element={ <Form/>} />*/}
        {/*<Route path="/admin" element={ <Admin/>} />*/}
      </Route>
      {/*<Route path="*" element={ <PageNotFound/> }/>*/}
    </Routes>
  );
}