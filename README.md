# MovieRama

<p align="center">
<img src="https://i.ibb.co/z4n6xtd/logo512.png" height="130px" alt="Movierama"/>
</p>

🎬 **MovieRama** is yet another movie catalog where users can check the movies of the week, search for movies and view details about them. All the information presented in this application is being fetched by [MovieDB](https://www.themoviedb.org/). So, kudos to them.

### Plain HTML, JS, CSS Version:

This version of Movierama has been developed with no dependencies on third party libraries. Thus, no bundling nor testing is included on that version. It was a great opportunity to learn some new things on JavaScript and also realise how helpful all those fully fledged frameworks are.

### React Version

On the other hand we have this version. Since React can make things simplier (or not🤣) for the developer, this version is enriched with more features than the plain one as well as it is easier to maintain and scale. Still I tried to keep the dependencies to bare minimum. The only dependencies used are **axios**, **styled-components** and **react-hotkeys**. This version also contains Unit Testing on most of the components, done by **Jest**. You can find a live demo of the app [here](https://movierama-ebektasiadis.vercel.app/ "here").

####Environmental Variables:
Variable Name | Required | Description
|---|---|---|
REACT_APP_MOVIEDB_API_KEY | ✅ | The API key that is being used when making requests to MovieDB.

## Feature Versions

- 🎬 Search with filters such as **actors**, **categories**, **rating**
- 🎬 Layout selection through **Grid**, **Category based rows**, **Poster Only**
- 🎬 Theme Switch between **Light**, **Dark** and a super cool **Neon**
- 🎬 **Watch Later** list
- 🎬 Access to **TV Series**
- 🎬 Rework on Movie Modal to fit **more information** on an **easier-to-digest** way
- 🎬 End to end testing using **Cypress**

## Screenshots

<p align="center">
<img src="https://i.ibb.co/YXCnP2q/movierama1080p.png" height="300px" alt="Desktop landing page">

<img src="https://i.ibb.co/CJtXgBZ/modal1080p.png" height="300px" alt="Mobile version">
</p>
