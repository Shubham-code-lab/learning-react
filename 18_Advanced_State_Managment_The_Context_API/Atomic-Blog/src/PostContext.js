import { createContext, useState, useContext } from 'react';
import { faker } from "@faker-js/faker";

//CUSTOM CONTEXT PROVIDER


function createRandomPost() {
    console.log("called");
    return {
      title: `${faker.hacker.adjective()} ${faker.hacker.noun()}`,
      body: faker.hacker.phrase(),
    };
  }

// context PROVIDER
// we can pass default value but that value can't be change over time so we pass null or keep it empty
const PostContext = createContext();

function PostProvider({children}){
    const [posts, setPosts] = useState(() =>
        Array.from({ length: 30 }, () => createRandomPost())
      );
      const [searchQuery, setSearchQuery] = useState("");
    
      // Derived state. These are the posts that will actually be displayed
      const searchedPosts =
        searchQuery.length > 0
          ? posts.filter((post) =>
              `${post.title} ${post.body}`
                .toLowerCase()
                .includes(searchQuery.toLowerCase())
            )
          : posts;
    
      function handleAddPost(post) {
        setPosts((posts) => [post, ...posts]);
      }
    
      function handleClearPosts() {
        setPosts([]);
      }

      return (
        // context VALUE
        <PostContext.Provider value={{ 
            posts: searchedPosts,
            onAddPost: handleAddPost,
            onClearPosts: handleClearPosts,
            searchQuery,
            setSearchQuery
        }}>
            {children}
        </PostContext.Provider>
    );
}

// Context CONSUMER 
function usePosts(){
    const context = useContext(PostContext); 
    // if we try to access the consumer outside of it scope i.e:- you can't use it in App component as it is only avaible to it's children
    if(context === undefined) throw new Error("PostContext was used outside the PostProvider");
    return context;
}

export {PostProvider, PostContext, usePosts};
