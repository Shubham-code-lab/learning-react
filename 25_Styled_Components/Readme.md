npm create vite@4
y
React
the-wild-oasis
React
Javascript
cd the-wild-oasis 
npm i
npm install --save-dev vite-plugin-eslint eslint-config-react-app eslint

create a file ".eslintrc.json"
{
    "extends": "react-app"
}

import eslint plugin in the vite.config.js

npm i styled-components 

npm run dev

Vs code extension that understand styled component syntax "vscode-styled-components"

npm i react-router-dom@6

npm i react-icons


SUPABASE :-
Service that allows developers to easily create a back-end with a Postgres database. which is SQL (relational DB). So we join tables using foreign keys.
Automatically create a database and API so we can easily request and receive data from the server.
Not just an API: Supabase also comes with easy-to-use user authentication and file storage.


1] Create New Project :-
Project name: the-wild-oasis
Database password: yVUr79EQ2EghIaRW
Region: Asia-Pacific    //region closest to you

Table editor:-
We can create table and data to it

API doc :-
under Tables and views click on any table then on 
top right corner click on Bash
top right corner click on hide key and select JWT-based legacy keys (anon)
then copy that curl and paste it in terminal but it not give any data due to row level security (was there during creating table)

Authentication :-
Configuration -> policies -> create new policies (only for temporary later we will add authentication this is just for our curl to be executed in the terminal)
for any table 


API Doc :-
copy the code from Introduction paste it in one of the js file(supabase.js)
npm i --save @supabase/supabase-js

Project Settings :-
under API Keys in Legacy anon, service_role API keys tab use anon public

check how we use it in supabase.js and apiCabin.js

Storage :-
Create file bucket  (turn on Public bucket)
