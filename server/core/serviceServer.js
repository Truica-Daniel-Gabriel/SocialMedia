const updatePost = (imageUrl, location, description, post) => {
    return new Promise((resolve, reject) => {
        if (!location && !imageUrl && !description) {
          reject({ message: "The post need credentials to be edited" });
        }
  
        if (location) {
          post.location = location;
        }
  
        if (imageUrl) {
          post.imageUrl = imageUrl;
        }
  
        if (description) {
          post.description = description;
        }
        resolve(post);
      });
}


module.exports= { 
    updatePost,
}