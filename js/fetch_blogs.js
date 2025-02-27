// Import Firebase Firestore functions
import { db } from "../firebase_custom_files/firebase-config.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-firestore.js";

// Function to show shimmer loaders
function showShimmerLoaders() {
    const blogContainer = document.getElementById("blogs-container");
    blogContainer.innerHTML = ""; // Clear previous content

    for (let i = 0; i < 3; i++) { // Show 3 shimmer loaders
        const shimmer = document.createElement("div");
        shimmer.classList.add("news-block", "style-two", "col-lg-4", "col-md-6", "col-sm-12", "blog-shimmer");

        shimmer.innerHTML = `
            <div class="inner-box shimmer">
                <div class="image shimmer" style="height: 200px; border-radius: 10px;"></div>
                <div class="lower-content">
                    <div class="border-layer"></div>
                    <div class="text shimmer" style="height: 20px; width: 80%; margin-top: 10px; border-radius: 5px;"></div>
                    <div class="text shimmer short" style="height: 20px; width: 60%; margin-top: 10px; border-radius: 5px;"></div>
                </div>
            </div>
        `;
        blogContainer.appendChild(shimmer);
    }
}

// Function to fetch and display blogs
async function fetchBlogs() {
    try {
        console.log("🚀 Fetching Blogs list");

        showShimmerLoaders(); // Show shimmer loaders while fetching data

        const blogsRef = collection(db, "blogs"); // Reference to the blogs collection
        const querySnapshot = await getDocs(blogsRef);
        const blogContainer = document.getElementById("blogs-container");

        blogContainer.innerHTML = ""; // Remove shimmer loaders after fetching data

        querySnapshot.forEach((doc) => {
            const data = doc.data();
            
            // Create blog post card dynamically
            const blogCard = document.createElement("div");
            blogCard.classList.add("news-block", "style-two", "col-lg-4", "col-md-6", "col-sm-12");

            blogCard.innerHTML = `
                <div class="inner-box">
                    <div class="image">
                        <a href="blog-detail.html?id=${doc.id}">
                            <img src="${data.cardImage}" alt="Blog Image" />
                        </a>
                    </div>
                    <div class="lower-content">
                        <div class="border-layer"></div>
                        <ul class="post-info">
                            <li>${data.section}</li>
                            <li>Updated ${new Date(data.createdAt.seconds * 1000).toLocaleDateString()}</li>
                        </ul>
                        <h4><a href="blog-detail.html?id=${doc.id}">${data.mainTitle}</a></h4>
                        <a href="blog-detail.html?id=${doc.id}" class="more">More <span class="fa fa-angle-double-right"></span></a>
                    </div>
                </div>
            `;

            blogContainer.appendChild(blogCard);
        });
    } catch (error) {
        console.error("Error fetching blogs:", error);
    }
}

// Call function when the page loads
document.addEventListener("DOMContentLoaded", fetchBlogs);
