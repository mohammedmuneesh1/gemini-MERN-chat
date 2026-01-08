
PS D:\LEARN-PROJECTS\VERCEL-TYPESCRIPT-BACKEND-HOSTING> npm init -y
Wrote to D:\LEARN-PROJECTS\VERCEL-TYPESCRIPT-BACKEND-HOSTING\package.json:

{
  "name": "vercel-typescript-backend-hosting",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "description": ""
}



PS D:\LEARN-PROJECTS\VERCEL-TYPESCRIPT-BACKEND-HOSTING> npm i -D typescript tsx @types/node @types/dotenv

added 9 packages, and audited 10 packages in 21s

2 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
PS D:\LEARN-PROJECTS\VERCEL-TYPESCRIPT-BACKEND-HOSTING> npx tsc --init  

Created a new tsconfig.json                                                                                             
                                                                                                                     TS 
You can learn more at https://aka.ms/tsconfig


vercel.json

{
    "builds":[
        {
            "src":"dist/server.js",
            "use":"@vercel/node"
        }
    ],
    "routes":[
        {
            "src":"/(.*)",
            "dest":"dist/server.js"
        }
    ]
}

npm i -g vercel@latest

after this line do    "vercel --prod"



PS D:\LEARN-PROJECTS\VERCEL-TYPESCRIPT-BACKEND-HOSTING> vercel --prod
Vercel CLI 49.1.2
? Set up and deploy “D:\LEARN-PROJECTS\VERCEL-TYPESCRIPT-BACKEND-HOSTING”? yes
? Which scope should contain your project? Muneesh's projects
? Link to existing project? no
? What’s your project’s name? vercel-typescript-backend-hosting
? In which directory is your code located? ./
? Do you want to change additional project settings? no
🔗  Linked to muneeshs-projects-0c5e57cb/vercel-typescript-backend-hosting (created .vercel and added it to .gitignore)
🔍  Inspect: https://vercel.com/muneeshs-projects-0c5e57cb/vercel-typescript-backend-hosting/D5rADYM692kW4jiCDjBKTnfvLYkb [3s]
✅  Production: https://vercel-typescript-backend-hosting-axstvsoi8.vercel.app [15s]
❗️  Due to `builds` existing in your configuration file, the Build and Development Settings defined in your Project Settings will not apply. Learn More: https://vercel.link/unused-build-settings












to remove caching or untrack file that already pushed to repo by forgetting to add on the .gitignore , then 


git rm --cached .env

PS D:\PERSONAL PROJECTS\MOVIE-TICKET-BACKEND> git rm --cached .env
rm '.env'
PS D:\PERSONAL PROJECTS\MOVIE-TICKET-BACKEND> git rm --cached .env.development
>> git rm --cached .env.production
rm '.env.development'
rm '.env.production'



//============================================== 04-01-2025 START ==============================================


IMAGEKIT.IO


import ImageKit from "imagekit";

const imageKitIOClient = new ImageKit({
  publicKey: process.env.IMAGE_KIT_PUBLIC_KEY as string,
  privateKey: process.env.IMAGE_KIT_PRIVATE_KEY as string,
  urlEndpoint: process.env.IMAGE_KIT_URL_ENDPOINT as string,
});

export default imageKitIOClient;



//THE GEMINI AI 

pricing:
https://ai.google.dev/gemini-api/docs/pricing
https://aistudio.google.com/

https://aistudio.google.com/api-keys



Free Tier Limits (Gemini API):
Rate Limits:

15 requests per minute (RPM)
1 million tokens per minute (TPM)
1,500 requests per day (RPD)


Models Available in Free Tier:

Gemini 1.5 Flash - Fastest, optimized for speed
Gemini 1.5 Pro - Most capable, balanced performance
Gemini 1.0 Pro - Earlier version


Up to 2 million tokens context window (Gemini 1.5 Pro/Flash)

"hello" = 1 token
"chatbot" = 2 tokens ("chat" + "bot")
"understanding" = 3 tokens ("under" + "stand" + "ing")
"AI" = 1 token
"don't" = 2 tokens ("don" + "'t")


npm install @google/generative-ai




//============================================== 04-01-2025 END ==============================================



//============================================== 07-01-2025 START ==============================================

import express from "express";
import path from "path";

const app = express();
const __dirname = path.resolve();



app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "index.html"));
});

app.listen(3000);


project/
 ├─ server.js
 └─ client/
     └─ index.html


* route → fallback when nothing matches


//============================================== 07-01-2025 END ==============================================

