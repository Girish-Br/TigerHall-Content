export const fetchContent = async (query: string, page: number) => {
    const response = await fetch('https://api.tigerhall.net/v2/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: `
          query {
            content(query: "${query}", page: ${page}) {
              id
              title
            }
          }
        `
      })
    });
  
    const data = await response.json();
    return data.content;
  };
  