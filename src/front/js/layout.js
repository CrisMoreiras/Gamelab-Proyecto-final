import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import { Home } from "./pages/home";
import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";


import { VideogamesList } from "./videogames/videogameList";
import { Videogame } from "./videogames/videogame";
import { FormVideogame } from "./videogames/formVideogame";
import { ConsoleList } from "./pages/consoles/consoleList";
import { Console } from "./pages/consoles/console";
import { FormConsole } from "./pages/consoles/formConsole";
import { ConsoleEdit } from "./pages/consoles/consoleEdit";

import { Genres_list } from "./genres/genresList";
import { Genres } from "./genres/genres";
import { FormGenres } from "./genres/formGenres";
import { FormEditGenres } from "./genres/formEditGenres";

//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    if (!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL />;

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                    <Routes>
                        <Route element={<Home />} path="/" />

                        {/* <Route element={<Demo />} path="/demo" />
                        // <Route element={<Single />} path="/single/:theid" /> */}
                        <Route element={<VideogamesList />} path="/videogames" />
                        <Route element={<Genres_list />} path="/genresList" />
                        <Route element={<Genres />} path="/genresList/:theid" />
                        <Route element={<FormGenres />} path="formGenres/" />
                        <Route element={<FormEditGenres />} path="genres/:theid" /> 
                        <Route element={<Videogame />} path="/videogames/:theid/" />
                        <Route element={<FormVideogame />} path="videogames/edit" />
                        <Route element={<h1>Not found!</h1>} />
                        <Route element={<ConsoleList />} path="/consoles" />
                        <Route element={<Console />} path="/consoles/:theid/" />
                        <Route element={<FormConsole />} path="consoles/edit" />
                        <Route element={<ConsoleList />} path="/consoles" />
                        <Route element={<ConsoleEdit />} path="/consoles/edit/:consoleId" />
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
