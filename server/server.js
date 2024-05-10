const express = require("express");
const {ApolloServer} = require("@apollo/server");
const bodyParser = require("body-parser");
const cors = require("cors");
const { expressMiddleware } = require("@apollo/server/express4");
const cookieParser = require("cookie-parser");
const connectDB = require("./src/database/database.js");
const userRouter = require("./src/routes/users.routes.js");
const blogRouter = require("./src/routes/blogs.routes.js");
const { getBlogs } = require("./src/controllers/blogs.controllers.js");
const { default: mongoose } = require("mongoose");
const { User } = require("./src/models/users.models.js");

const startServer = async () => {
    const app = express();
    
    connectDB();
    
    // ################## typeDefs #################
    
    const typeDefs = `
        type Users {
            id : ID!
            name : String!
            email : String!
            contact : String!
        }
    
        type Blogs {
            id : ID!
            userID : ID!
            title : String!
            content : String!
            author : Users!
        }
    
        type Query {
            getBlogs : [Blogs]
            getUsers : [Users]
            getUser(id : ID!) : Users
        }
    `
    // ############# Resolvers ##############

    const resolvers = {
        Query : {
            getBlogs : getBlogs,
            getUsers : async () => await User.find({}),
            getUser : async (_,{id}) => await User.findById(id)
        },
        Blogs : {
            author : async (blog) => await User.findById(blog.userID)
        }
    }
    
    
    const server = new ApolloServer({
        typeDefs,
        resolvers
    });

    await server.start()
    
    app.use(cors({
        origin : '*',
        methods : ['GET','POST']
    }));
    app.use(bodyParser.json());
    app.use(cookieParser());
    
    app.use("/graphql",expressMiddleware(server));
    app.use("/api/v1/user",userRouter);
    app.use("/api/v1/blog",blogRouter);
    
    app.listen(8000,()=>{
        console.log("Server started at port: 8000");
    })
}

startServer()