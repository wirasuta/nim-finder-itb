const searchinput = document.querySelector("#searchinput");
const searchbutton = document.querySelector("#searchbutton");
const test = document.querySelector("#test");
const resbody = document.querySelector("#resbody");
const restable = document.querySelector("#res-table");
const disclaimer = document.querySelector("#disclaimer");

function updateTable(resarr, query){
    if (query === searchinput.value){
        searchbutton.classList.remove("is-loading");
        while (resbody.firstChild) resbody.removeChild(resbody.firstChild);
        if (resarr.length > 0){
            if (resarr.length === 100){
                disclaimer.style.display = "inline";
            }else{
                disclaimer.style.display = "none";
            }
            resarr.forEach(mhs => {
                const newRow = resbody.insertRow(resbody.rows.length);
                const nama  = newRow.insertCell(0);
                nama.appendChild(document.createTextNode(mhs.name));
                const jurusan  = newRow.insertCell(1);
                jurusan.appendChild(document.createTextNode(mhs.jurusan));
                const nim  = newRow.insertCell(2);
                let nim_txt;
                if (mhs.nim_jurusan !== null){
                    nim_txt = mhs.nim_jurusan + " " + mhs.nim_tpb;
                }else{
                    nim_txt = mhs.nim_tpb;
                }
                nim.appendChild(document.createTextNode(nim_txt));
            });
        }else{
            const newRow = resbody.insertRow(resbody.rows.length);
            const searching  = newRow.insertCell(0);
            searching.innerHTML = "No Result Found :(";
            disclaimer.style.display = "none";
            searching.colSpan = 3;
        }
    }
}

function fetchNimFinder(){
    const query = searchinput.value;
    while (resbody.firstChild) {
            resbody.removeChild(resbody.firstChild);
        }
    const newRow = resbody.insertRow(resbody.rows.length);
    const searching  = newRow.insertCell(0);
    searching.innerHTML = "Searching ...";
    searching.colSpan = 3;
    searchbutton.classList.add("is-loading");

    fetch(`https://wirasuta.com/nim/nim.php?r=${query}`)
            .then( res => res.json())
            .then( resarr => updateTable(resarr, query));
    return;
}

searchinput.addEventListener("input", () => {
    if (searchinput.value.length > 2){
        restable.style.display = "table";
        fetchNimFinder();   
    }else if (searchinput.value.length <= 2){
        searchbutton.classList.remove("is-loading");
        while (resbody.firstChild) {
            resbody.removeChild(resbody.firstChild);
        }
        restable.style.display = "none";
        disclaimer.style.display = "none";
    }
});

searchbutton.addEventListener("click", () => {
    if (searchinput.value.length > 2){
        restable.style.display = "table";
        fetchNimFinder();   
    }else if (searchinput.value.length <= 2){
        searchbutton.classList.remove("is-loading");
        while (resbody.firstChild) {
            resbody.removeChild(resbody.firstChild);
        }
        restable.style.display = "none";
        disclaimer.style.display = "none";
    }
});