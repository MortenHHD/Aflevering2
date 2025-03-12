  /* Constructor funktion der laver album objekter med 4 parametre som er ønsket*/
  function Album(artist, album, totalTracks, year) {
    this.artist = artist;
    this.album = album;
    this.totalTracks = totalTracks;
    this.year = year;        
  }
  
  /* Funktion til at lave en table og indæstte album data*/
  function displayAlbumsInTable(albums, parentid) {
    let parentElement = document.getElementById(parentid);
  
  /* Opretter en tableHTML så den altid kan ændres senere og derefter head, rows og kolonner + en knap*/
    let tableHTML = `

    <button id ="toggleButton">Skjul tabel</button>
    <div id ="albumTableContainer">
    <table border="1">
    <thead>
    <tr> 
    <th>Artist</th>
    <th>Album</th>
    <th>Year</th>
    <th>Total Tracks</th>
    </tr>
    </thead>
    <tbody>`;

  /* Her indsættes albumdata inde i tabellen ved brug af et forEach loop som gør at et album objekt bliver itereret, så bliver der lavet en ny tabel række*/
  /* Gør også brug af template literals som gør at strings bliver tilladt variable*/
  albums.forEach(album => {
    tableHTML += `
  <tr>
  <td>${album.artist}</td>
  <td>${album.album}</td>
  <td>${album.year}</td>
  <td>${album.totalTracks}</td>
  </tr>`;
  });

  tableHTML += `</tbody></table></div>`;

  /* Tabellen bliver sat ind på siden*/
  parentElement.innerHTML = tableHTML;


  /* Her tilføjes funktionalitet til knappen og henter knap og container*/
  let toggleButton = document.getElementById("toggleButton");
  let tableContainer = document.getElementById("albumTableContainer");

  /* Her tilføjes eventlistener så knappen kan blive skjult eller vist*/
  toggleButton.addEventListener("click", function(){
    if (tableContainer.style.display === "none"){
      tableContainer.style.display = "block";
      toggleButton.textContent = "skjul tabel";
    } else {
      tableContainer.style.display = "none";
      toggleButton.textContent = "vis tabel";
    }
  }
  )
}
  /* Henter JSON fil og laver objekter og indsætter i tabellen */
  fetchContent("Data/albums.json").then((albums) => {
    let albumObjects = albums.map(albumData => 
      new Album(
        albumData.artistName,
        albumData.albumName,
        albumData.trackList.length,
        albumData.productionYear
      )
  );

 /* Albums bliver vist i en tabel */
    displayAlbumsInTable(albumObjects, "content");
  });

  
  /* You're a wizard Harry*/
  async function fetchContent(url) {
    let request = await fetch(url);
    let json = await request.json();
    return json;
  }