// import React from 'react'

import Header from "./Header";
import CartOverview from "../features/cart/CartOverview";
import { Outlet, useNavigation } from "react-router-dom";
import Loader from "./Loader";

export default function AppLayout() {
    //global application navigation state to display loader 
    const navigation = useNavigation();
    const isLoading = navigation.state === "loading";
    console.log(isLoading);
  return (
    <div>
        {isLoading && <Loader />}

        <Header />
        <main>
            {/* Outlet is a special component that renders the child routes */}
            <Outlet />
        </main>
        <CartOverview />
    </div>
  )
}
