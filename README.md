# Guess the Character

This is a small guess the Disney character game, built with NodeJS and React.

## Getting started

There are two ways to get this app up and running locally:

### With Docker

To get this app running using Docker, first make sure you have Docker installed. For more information, visit [The Docker website.](https://docs.docker.com/get-docker/)
Once you have docker installed, run `docker image build -t guess-the-character .`. This should start building the image.
Once the image has been built run `docker run -p 3000:3000 guess-the-character`. Once the container has started running you should be able to access the app at [http://localhost:3000.](http://localhost:3000)

### With Node and npm

This app requires node >= 14.
This app runs the backend and frontend together by bundling both using webpack and Babel. The first step to getting this app running is to run `npm install`. Once this has been done you should have all of your node modules available. Next step is to run `npm run build`. This should produce a dist directory which is where the compiled NodeJS and React code lives.
Next step, run `npm start` and you should be able to access the app at [http://localhost:3000.](http://localhost:3000).

## Testing

Testing has been set up on the server side of the app, but not the client side. I had planned to set up testing on both the server and client side, however I was missing some key knowledge in testing context in React, meaning that I wasn't really able to set up any tests as they all relied on that context.

If I had time to research how to do this testing on the frontend, and had the time to write the tests themselves, my plan was to create tests for each component individually to test the functionality of each component. For the lowest level components this would've involved examining how state changes the appearance of these components, and for higher level components it would be testign whether certain child components were appearing in certain conditions.

In addition to these tests, I was also going to set up separate tests against the context of the app, that being the actions and reducers. I was then also going to test the api service to check that all of the functions in that were returning the expected responses in the expected format.

Finally, although I did do most of this manually, I would also set up some behvioral tests to check how certain workflows of the app would perform. For this I would probably go through a few scenarios, writing in test form the same journey a user would take through the app.

## Rationale behind using certain technologies

I used my chosen technologies for a few reasons. Firstly, given the time constraints I opted to use NodeJS and React as these are two frameworks I am experienced in writing. This assures that I knew for the most part that I was able to write the app quickly and efficiently without the need for much outside research (although there was some).

Secondly, I elected in the end to use a predominantly REST based framework for the backend. This was because given the data flows in the app, it made most sense to me to expose the various modules of data through REST endpoints. There was no personal data stored in this app either, which meant there were relatively low security concerns for the app. If I had more time I was planning on opting for an MVC framework for the backend to be used depending on whetehr the user has JS enable or not. If the user had JS disabled then none of the react frontend would work, so my plan was to redo the app using standard html forms and data processing using controllers. However in the end I didn't have time to complete this so abandoned the idea.

I chose to use webpack to bundle the code together because I felt overall it was a cleaner way of serving the app. Since the app is so small, I thought havign to have a separate instance running for the frontend and the backend seemed a bit unnecessary, while using webpack to compile everything meant that not only could the app be served from one instance to run both teh frontend and the backend, but it was fast to serve and had good fallbacks for older browsers.

This was my first time building webpack into an app myself, so I'm bound to have made a few mistakes in the configuration. However there was a lot I learned which I could put to good use next time, and I think overall it was the best way forward for the app. If OI had more time, I would've liked to have overcome a couple of issues I had, namely with serving nunjucks templates after bundling with webpack, and also using react on the frontend without having to server the JS as static files.

I also opted for implementing Docker into then app for a few reasons. Firstly, giving developers a way of building and serving the app without having to worry about environment discrepencies is huge. I wanted the app to be served with a couple of commands and start working seamlessly without any extra configuration. The second reason is that creating a Docker image makes it much easier to host the app. Many providers, such as heroku, allow apps to be containerized using Docker out of the box, which makes the entire process for hosting the app take a few minutes. Even in other hosting platforms, such as AWS, you can create a build process for the app fairly quickly which can launch your Docker image as an ECS container in less than an hour.
