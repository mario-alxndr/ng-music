export const getItunesItem = async ({limit, term}: {limit: number, term?: string}) => {
    console.log('term', term);
    let url = `https://itunes.apple.com/search?limit=${limit}`;
    
    if(!!term) {
      url+=`&term=${encodeURIComponent(term)}`;
    }

    console.log('url', url);
    const response = await fetch(url);
    const data = await response.json();
  
    return data;
  };
  