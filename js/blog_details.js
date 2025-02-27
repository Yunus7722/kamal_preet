// Import Firebase Firestore functions
import { db } from "../firebase_custom_files/firebase-config.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-firestore.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-firestore.js";
import { query, limit } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-firestore.js";

// Function to show shimmer loaders
function showShimmerLoaders() {
    console.log("✨ Showing shimmer loaders...");

    document.getElementById("blog-header").innerHTML = `
        <div class="shimmer-q shimmer-title"></div>
        <div class="shimmer-q shimmer-subtitle"></div>
    `;

    document.getElementById("blog-content").innerHTML = `
        <div class="shimmer-q shimmer-image"></div>
        <div class="shimmer-q shimmer-text"></div>
        <div class="shimmer-q shimmer-text"></div>
    `;
}

// Function to fetch and display blog details
async function fetchBlogDetails() {
    try {
        console.log("🚀 Fetching blog details...");

        // Show shimmer while fetching
        showShimmerLoaders();

        // Get Blog ID from URL
        const urlParams = new URLSearchParams(window.location.search);
        const blogId = urlParams.get("id");

        if (!blogId) {
            console.warn("⚠️ No Blog ID found in URL!");
            document.getElementById("blog-header").innerHTML = "<h2>Blog not found</h2>";
            return;
        }

        console.log(`🔍 Blog ID: ${blogId}`);

        // Fetch blog document from Firestore
        const blogRef = doc(db, "blogs", blogId);
        const docSnap = await getDoc(blogRef);

        if (!docSnap.exists()) {
            console.warn("⚠️ No blog found for ID:", blogId);
            document.getElementById("blog-header").innerHTML = "<h2>Blog not found</h2>";
            return;
        }

        // Extract data
        const blogData = docSnap.data();
        console.log("✅ Blog Data:", blogData);

        // Populate the page with fetched data
        document.getElementById("blog-header").innerHTML = `
            <h2>${blogData.mainTitle || "Untitled Blog"}</h2>
            
            <div class="clearfix">
                <div class="pull-left">
                    <div class="author-info">
                        <div class="author-image">
                            <img src="images/kp_mam_pic.svg" alt="">
                        </div>
                        <strong>Post By : Kamal Preet</strong>
                        27 jan, 2025   Tagged With: Education, Courses
                    </div>
                </div>
                <div class="pull-right">
                    <!-- Social Box -->
                    <ul class="social-box">
                        <span class="fa fa-share-alt"></span>
                       <li class="twitter"><a target="_blank" href="http://twitter.com/" class="fa-brands fa-twitter"></a></li>
<li class="pinterest"><a target="_blank" href="http://pinterest.com/" class="fa-brands fa-pinterest"></a></li>
<li class="facebook"><a target="_blank" href="http://facebook.com/" class="fa-brands fa-facebook-f"></a></li>
<li class="dribbble"><a target="_blank" href="http://dribbble.com/" class="fa-brands fa-dribbble"></a></li>
                    </ul>
                </div>
            </div>
        `;

        document.getElementById("blog-content").innerHTML = `
            <div class="image">
                <img src="${blogData.titleImage}" alt="Blog Banner" />
            </div>
            <div class="content">
                ${blogData.subContent
                    ? blogData.subContent.map(section => `<p>${section.content}</p>`).join("")
                    : "<p>No content available</p>"
                }
            </div>
        `;

    } catch (error) {
        console.error("❌ Error fetching blog details:", error);
    }
}


// Function to fetch and display recent blogs
async function fetchRecentBlogs() {
    try {
        console.log("🚀 Fetching Recent Blogs");

        showShimmerLoaders(); // Show shimmer loaders while fetching data

        const blogsRef = collection(db, "blogs"); // Reference to blogs collection
        // const q = query(blogsRef, orderBy("createdAt", "desc"), limit(3)); // Get 3 most recent blogs
        const q = query(blogsRef, limit(3)); // Fetch any 3 blogs (unordered)
        const querySnapshot = await getDocs(q);
        const recentPostsContainer = document.getElementById("recent-posts");

        recentPostsContainer.innerHTML = ""; // Remove shimmer loaders after fetching data

        querySnapshot.forEach((doc) => {
            const data = doc.data();
            
            // Create recent blog post card dynamically
            const postHTML = `
                <article class="post">
                    <figure class="post-thumb">
                        <img src="${data.cardImage}" alt="Blog Image">
                        <a href="blog-detail.html?id=${doc.id}" class="overlay-box">
                            <span class="icon fa fa-link"></span>
                        </a>
                    </figure>
                    <div class="post-info">${new Date(data.createdAt.seconds * 1000).toLocaleDateString()}</div>
                    <div class="text">
                        <a href="blog-detail.html?id=${doc.id}">${data.mainTitle}</a>
                    </div>
                </article>
            `;

            recentPostsContainer.innerHTML += postHTML;
        });

    } catch (error) {
        console.error("❌ Error fetching recent blog posts:", error);
    }
}

// Ensure the script runs after DOM content loads
// document.addEventListener("DOMContentLoaded", fetchBlogDetails);

// Ensure the script runs after DOM content loads
document.addEventListener("DOMContentLoaded", () => {
    fetchBlogDetails();
    fetchRecentBlogs();
});
