import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import axios from 'axios';

const postsDirectory = path.join(process.cwd(), 'posts');

export function getSortedPostsData() {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory);
  console.log(fileNames);
  const allPostsData = fileNames.map((fileName) => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, '');

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);
// console.log(matterResult.data);
    // Combine the data with the id
    return {
      id,
      ...matterResult.data,
    };
  });
  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}



// export const getSortedPostsData = async () => {
//     // const res = await fetch('https://pokeapi.co/api/v2/pokemon/ditto')

//     // return  await res.json()
// //precisa fazer o map para criar o objeto
//     const res = await fetch("https://pokeapi.co/api/v2/pokemon");
//     const response = await res.json();
//     console.log(response.results);
//     return { ...catFacts.results }
// };


// const result = await axios.get("https://pokeapi.co/api/v2/pokemon/ditto")
//     .then(response => {
//         console.log(response.data.stats)
//     })
//     .catch(error => {
//         console.log(error.response)
//     })
//     return {result}


