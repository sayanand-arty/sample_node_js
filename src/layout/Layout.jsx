 import { Outlet } from "react-router";

 function layout (){
    return(
        <>
        <div id = 'header'>

        </div>
        <Outlet />
        <div></div>
            </>
    );
 }
 export default Layout;