(() => {
    const artistSet = new Set();
    const artistCounts = {};
    
    data.forEach(item => {
      const artist = item.artistAlbum.split(" • ")[0].split(', ')[0];
    
      artistSet.add(artist);
      artistCounts[artist] = (artistCounts[artist] || 0) + 1;
    });
    
    // existing outputs
    console.log(artistSet);
    console.log(artistCounts);
    
    // third output: artists sorted by appearance count
    const artistsByFrequency = Object.entries(artistCounts)
      .sort((a, b) => b[1] - a[1])
      .map(([artist, count]) => ({ artist, count }));
    
    console.log(artistsByFrequency);
})();