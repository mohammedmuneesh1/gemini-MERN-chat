// ============================= INSTALLING PACKAGE  START =============================

1)react-router-dom 
2) react-type-animation   :https://www.npmjs.com/package/react-type-animation





// ============================= INSTALLING PACKAGE END =============================






//================================== 23-12-2025 (DAY-1) START ================================== 


1)   <h1 className="text-[128px] 3xl:text-[140px] homePageH1  font-semibold  leading-[0.95]">CORTEX AI</h1>

the font size create too much leading , there for use  "leading-[0.95]"



2)
 TO GIVE GRADIENT COLOR  to the font 

.homePageH1{
    background:linear-gradient(to right, #217bfe,#e55571);
    background-clip:text;
    -webkit-background-clip:text;
    color:transparent;
}



3) what does alternate do on animation ? 


.homePageBotAnimation{
    animation:botAnimate 3s ease-in-out infinite alternate ; 
}



What does alternate mean?
alternate is the animation-direction.
After the animation finishes, it reverses direction instead of jumping back to the start.


intead of starting directly from zero, it start just do the revers 


@keyframes botAnimate{
     0%{
        transform: scale(1) rotate(0deg);
     }
     100%{
        transform:scale(1.1) rotate(-5deg);
     }
}



4)   animation: slideBg 8s ease-in-out infinite alternate;


animation-name: slideBg;
@keyframes slideBg { ... }


 8s → animation-duration

 8s = slow, smooth
1s = fast
100s = ultra slow (orbit type)


ease-in-out → animation-timing-function


animation-timing-function: ease-in-out;


What ease-in-out does:

starts slow, speeds up in the middle, slows down at the end


animation-iteration-count: infinite;

1 → runs once
3 → runs 3 times
infinite → loops forever

animation-direction: alternate;
This is direction control.



5) TYPEANIMATION


   <TypeAnimation
      sequence={[
        // Same substring at the start will only be typed out once, initially
        'Human:We Produce For Mice',
        1000, // wait 1s before replacing "Mice" with "Hamsters"
        'Bot: bot is nice ',
        1000,
        'Human:That was nice ',
        1000,
        'Alien:Thank you for the service',
        1000
      ]}
      className='text-[14px]'
      wrapper="span"
    //   speed={50}       DEFAULT SPEED IS 40 
        //   style={{ fontSize: '2em', display: 'inline-block' }}
      repeat={Infinity}
      cursor={true}
    />





//================================== 23-12-2025 (DAY-1) END ================================== 



//================================== 27-12-2025 (DAY-2) START ================================== 


1) FLEX-1 VS FLEX-4   

IMP: THIS STUFF GAVE THE DASHBOARD SETUP DESIGN 
WITH FLEX-4 TAKING MORE WIDTH WHILE THE FLEX-1 ACT LIKE A MENU 
GERAT ONE TRY OUT 



   <div
     className=' bg-primary
      flex gap-[50px]
      pt-[20px];
      h-full'
      >
      <div
      id="menu"
      className="flex-1">
        <ChatList/>
        </div>
      <div className="flex-4">
        <Outlet/>
      </div>
    </div>




    2) id="file" hidden /> 

        <form 
        className="newForm">
            <label htmlFor="file"></label>
            <input id="file" type="file"  multiple={false} hidden />
        </form>

        3)   -translate-x-1/2   left-1/2 to make the item center




        4) ImageKitIO

        npm install @imagekit/react



import { Image } from '@imagekit/react';

export default function Page() {
  return (
    <Image
      urlEndpoint="https://ik.imagekit.io/your_imagekit_id"
      src="/profile.png"
      width={500}
      height={500}
      alt="Picture of the author"
    />
  )
}

//get the public key and private key and URL-endpoint: from 'DEVELOPER OPTION'



 https://imagekit.io/dashboard/developer/api-keys

PUBLIC KEY WILL BE USED ON FRONTEND AND PRIVATE KEY WILL BE USED ON THE BACKEND 






        

//================================== 27-12-2025 (DAY-2) END ================================== 



//================================== 04-01-2026 (DAY-3) START ================================== 

 toast.loading("Deleting image...", { id: 'delete' });

 --> The { id: 'delete' } is a toast ID that allows you to update or dismiss the same toast instead of creating multiple toasts.


 

//================================== 04-01-2026 (DAY-3) END ================================== 


//================================== 05-01-2026 (DAY-4) START ================================== 



i) react-markdown

react-markdown is used to render Markdown text as React components.


# Title
This is **bold**
- Item 1
- Item 2

It takes this:

<h1>Title</h1>
<p>This is <strong>bold</strong></p>
<ul>
  <li>Item 1</li>
  <li>Item 2</li>
</ul>



react-markdown 


When you SHOULD use it

✔ AI responses
✔ Markdown-based blogs
✔ Documentation pages
✔ Chat messages



ii )  const reader = new FileReader();

This line creates a new instance of the FileReader object. Think of it like getting a specialized tool ready to read files.
reader.onloadend = () => { ... };

This is an event handler. onloadend is a property of the FileReader object.


This is crucial because FileReader operates asynchronously. This means it starts reading the file in the background, and your other JavaScript code continues to run. When the file is finally read, the onloadend function is called to process the result.
Inside onloadend:

reader?.result: After the file has been successfully read, its content is available in the result property of the reader object.


//================================== 05-01-2026 (DAY-4) END ================================== 


//================================== 04-01-2026 (DAY-5) START ================================== 

TANSTACK/RECT-QUERY 


npm i @tanstack/react-query


ROOT LAYOUT 


// Create a client
const queryClient = new QueryClient()

    <QueryClientProvider client={queryClient}>
    </QueryClientProvider>





//================================== 04-01-2026 (DAY-5) END ================================== 


//================================== 08-01-2026 (DAY-6) START ================================== 

const location = useLocation();

OUTPUT
{
  pathname: "/chats/123",
  search: "?tab=media&page=2",
  hash: "#top",
  state: { from: "/login" }, // optional
  key: "abc123"
}

//================================== 08-01-2026 (DAY-6) END ================================== 