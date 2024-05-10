import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { useQuery, gql } from "@apollo/client";

function App() {
  const [count, setCount] = useState(0);
  const GET_BLOG = gql`
    query getblogs {
      getBlogs {
        title
        content
        author {
          name
          email
        }
      }
    }
  `;

  const {loading,error,data} = useQuery(GET_BLOG);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <>
      {
        data?.getBlogs?.map((b)=>{
          return (
            <div>
              <h1>{b.title}</h1>
              <p>{b.content}</p>
              <br/>
              <code>{b.author.name}</code>
              <code>{b.author.email}</code>
            </div>
          )
        })
      }
    </>
  );
}

export default App;
