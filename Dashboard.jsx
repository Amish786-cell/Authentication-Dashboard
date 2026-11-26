import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api";
import { useAuth } from "../context/AutContext";

function Dashboard() {
    const { user } = useAuth();

    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    
    const fetchMyBlogs = async () => {
        try {
            const fetchMyBlogs = await API.get("/blogs/my");
            setBlogs(response.data.blogs);
        } catch (error) {
            alert(
                error.response?.data?.message || "Unable to load your blogs"
            );
        } finally {
            setLoading(false);
        }
    };

useEffect(()  => {
    fetchMyBlogs();
}, []);

const deleteBlog = async (id) => {
    if (!window. confirm("Delete this blog?")) return; 
try {
    await API.delete('/blogs/${id}');
    await fetchMyBlogs();
} catch (errror) {
  alert(
    error.response?.data?.message || "Unable to delete blog"
  );
}
};

if (loading) return <p>Loading dashboard...</p>;

return (
    <div className="dashboard">
        <h1>Welcome, {user?.name}!</h1>
        <p>Your Personnal FitnessGym Dashboard</p>
        <Link to="/profile">View Profile</Link>
        {" | "}
        <Link to="/blogs/create">Create New Blog</Link>
        <h2>My Publish Blogs</h2>
        <p>Total Blogs: {blogs.length}</p>
        <div className="blog-grid">{blogs.map((blog) => (
            <div className="blog-card" key={blog._id}>{blog.image && (
                <img src={blog.image} alt={blog.title}/>
            )}
            <h3>{blog.title}</h3>
            <p>Category: {blog.category}</p>
            <Link to={'/blog/${blog._id}'}>
            View 
            </Link>
            { "|"}

            <Link to={'/blogs/edit/${blog._id}'}>
            Edit
            </Link>

            {" | "}
            <button onClick={() => deleteBlog(blog._id)}>
                Delete
                </button>
                </div>
                ))}
                </div>

                {blogs.length === 0 && (
                    <p>You haven't published any blogs yet.</p>
                )}
                </div>

    );
}

export default Dashboard;




