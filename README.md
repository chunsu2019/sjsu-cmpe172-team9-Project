## University Name - SJSU 
## Course: Enterprise Software - CMPE172/ Fall 2021
## Team Members: Chunyou Su, Hao Lan, JianBin Wu

# Project Introduction 
-  We believe that the Internet provides a platform to showcase their good imagination, and different people can collide with each other to come up with many interesting points of view. This is also the original intention of our application. Our goal was to make a website that allows users to write stories, short and long. Other people can edit and add upon to these stories. And in doing so, creating branches for each story. A story can have many branches. Users can give a rating or like to each branch in any part of a story. The story path with the highest rating will be displayed and serve as the main plot. Users have the option to view other branches of the story. We want to make a website for people to share their ideas and creativity and inspire others. Also, we want our website to provide people with creative inspirations. 
-  To implement our application, we built a web application using three tier architecture. We had used JavaScript as the frontend to build up our client tier, Node.Js as middleware tier and mongoDB for Database. We choose AWS for the cloud provider of our Database. Our team also uses Heroku to host our application and uses Docker as the container of our application.
  
# Sample Demo Screenshots 
- Register
![register](https://user-images.githubusercontent.com/70332991/142042376-7ddc7bac-6515-4e79-bdb6-032840228ede.png)

- Login
![login](https://user-images.githubusercontent.com/70332991/142042406-1134f3f2-8ee1-4be5-b87c-f2808fe3897a.png)

- Home
![home](https://user-images.githubusercontent.com/70332991/142042432-23ebc4b9-9611-4432-8695-0343118c6ec4.png)

- View All Story
![viewStory](https://user-images.githubusercontent.com/70332991/142042446-f81edba9-bf9c-444b-8d18-4387b4d1f95a.png)

- Read Story & Comment
![read](https://user-images.githubusercontent.com/70332991/142044357-6604244d-4190-4888-8e65-be0546b0b279.png)

- Write New Story
![NewStory1](https://user-images.githubusercontent.com/70332991/142043763-e838779a-2517-46d8-9dfc-cbfbfdf1895a.png)

- Edit Story
![EditStory](https://user-images.githubusercontent.com/70332991/142042518-90ab886f-7f2a-49fe-8270-21033aed43a0.png)
 
![editStory2 1](https://user-images.githubusercontent.com/70332991/142043733-134328ff-9de1-4fe7-89a6-38b0e2b8acfa.png)


# Folder structure
• FrontEnd (views, public) 
• BackEnd (routes, app.js, middleware.js)
• Scripts 
o DB Schema (models)
o Docker build script (.devcontainer)
• Readme

# Instructions to run the project locally.
-   Download this project and unzip it in a folder
-   Download and Install Node.js
-   cd to the directory where "app.js" located using terminal/command prompt
-   Run command `node app.js`
-   Access http://localhost:3000/login_page in the browser

# System Diagram
![systemDiagram](https://user-images.githubusercontent.com/70332991/142039418-35941212-471a-4242-b18b-fafaf976271b.png)

# Class Diagram
![classDiagram](https://user-images.githubusercontent.com/70332991/142040236-5943f762-8e43-4976-9d19-a940c8908f84.png)

# Sequence Diagrams
![sequenceDiagram1](https://user-images.githubusercontent.com/70332991/142040275-0f0d7134-3fa8-4883-921b-25d24d9aae54.png)
![sequenceDiagram2](https://user-images.githubusercontent.com/70332991/142040304-38fde91a-1d5f-4906-8050-4973679be60a.png)
![sequenceDiagram3](https://user-images.githubusercontent.com/70332991/142040331-e49c62cc-8f84-43d4-a706-7ee7408aeaee.png)

# Db Schema
![dbSchemaDiagram](https://user-images.githubusercontent.com/70332991/142040342-8b7a6b7b-116e-46bd-8e18-b970459a9b04.png)
