const {Blog} = require("../models/blogs.models.js");
const Apierror = require("../utils/ApiError.js")

const createBlog = async (req,res) => {
    try {
        const {title,content} = req.body;

        if (!title || !content){
            return res.status(400).json({success:false,message:'bad request'});
        }

        const blog = await Blog.create({
            title,
            content,
            userID : req.user
        })

        return res.status(200).json({success:true,message:'blog uploaded',blog})

    } catch (error) {
        console.log(error)
        return res.status(500).json(new Apierror(500,"Something went wrong!"));
    }
}

const getBlogs = async () => {
    try {
        const blogs = await Blog.find({});
        return blogs;
    } catch (error) {
        return 0;
    }
}

const getBlog = async (id) => {
    try {
        const blog = await Blog.findById(id);
        return blog;
    } catch (error) {
        return 0;
    }
}

module.exports = {
    createBlog,
    getBlogs,
    getBlog
}