const fetch = require('node-fetch')

module.exports = async function getAllProjects() {
  const data = await fetch("https://admin.drewdahlman.com/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      query: `{
    projects {
      nodes {
        ProjectContent {
          heroImage {
            srcSet
          }
          title
          blocks {
            ... on Project_Projectcontent_Blocks_Copy {
              content
              blockType: fieldGroupName
            }
            ... on Project_Projectcontent_Blocks_Images {
              display
              blockType: fieldGroupName
              images {
                sourceUrl
              }
            }
            ... on Project_Projectcontent_Blocks_CopyImage {
              copy
              blockType: fieldGroupName
              imageSize
              layout
              image {
                srcSet
              }
            }
            ... on Project_Projectcontent_Blocks_CopyVideo {
              copy
              blockType: fieldGroupName
              image {
                id
                srcSet
              }
            }
            ... on Project_Projectcontent_Blocks_SingleImage {
              blockType: fieldGroupName
              image {
                srcSet
              }
            }
            ... on Project_Projectcontent_Blocks_Video {
              content
              blockType: fieldGroupName
              source
            }
            ... on Project_Projectcontent_Blocks_CodeEmbed {
              content
              copy
              blockType: fieldGroupName
              options
            }
          }
        }
      }
    }
  }
`,
    }),
  });

  const response = await data.json();
  return response.data.projects.nodes.map(project => project.ProjectContent );
};
