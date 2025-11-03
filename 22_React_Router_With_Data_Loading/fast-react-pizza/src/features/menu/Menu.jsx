import { getMenu } from "../../services/apiRestaurant";
import { useLoaderData } from "react-router-dom";
import MenuItem from "./MenuItem";

function Menu() {
  //useLoaderData hook to get data from loader function
  const menu = useLoaderData();
  return (
    <ul>
      {menu.map((pizza) => (
        <MenuItem pizza={pizza} key={pizza.id} />
      ))}
    </ul>
  );
}

//loader function we can write it anywhere and use it in createBrowserRouter loader property
export async function loader(){
  const menu = await getMenu();
  return menu;
}

export default Menu;
