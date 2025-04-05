const baseUrl = process.env.NEXT_PUBLIC_SERVER_BASE_URL;

export async function getBlogs() {
    const res = await fetch(`${baseUrl}/blogs`, {
        cache: 'no-store',
    });

    if (!res.ok) {
        throw new Error('Failed to fetch Faq');
    }

    return res.json();
}

// Create a blog
export async function createBlog(blogData) {
    const res = await fetch(`${baseUrl}/blogs`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
        body: blogData,
    });

    const data = await res.json();
    return Response.json(data);
}

// Update a blog by ID
export async function updateBlog(blogId, blogData) {
    const res = await fetch(`${baseUrl}/blogs/${blogId}`, {
        method: 'PUT', // Use PUT for updating
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
        body: blogData, // Blog data passed as the request body
    });

    const data = await res.json();
    return Response.json(data);
}


// Get a single blog by Slug
export async function getBlogBySlug(slug) {
    const res = await fetch(`${baseUrl}/blogs/${slug}`, {
        cache: 'no-store',
    });

    if (!res.ok) {
        throw new Error('Failed to fetch Single blog');
    }

    return res.json();
}

// delete single blog by id
export async function deleteBlogById(id) {
    const res = await fetch(`${baseUrl}/blogs/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!res.ok) {
        throw new Error('Failed to delete blog post');
    }

    return res.json();
}