var username;
var resultado = { 
    nome: "",
    apelido: "",
    imgPerfil: "",
    nSeguidores: "",
    nRepositorios: "",
    repositorios: [],
    linkRepositorios: []
};
var profileInfo = document.querySelector(`.profile-info`);

function pesquisa() {
    var input = document.querySelector(`input`);
    username = input.value;
    var req = axios.get(`https://api.github.com/users/${username}`);
    req.then(dadosUsuario).catch(errorInput);

    var repos = axios.get(`https://api.github.com/users/${username}/repos`);
    repos.then(dadosRepos);

    input.value = "";
}

function errorInput(resposta) {
    alert(`Usuário não encontrado... \nFavor inserir um usuário válido!`);
}

function dadosUsuario(resposta) {

    resultado.nome = resposta.data.name;
    resultado.apelido = resposta.data.login;
    resultado.imgPerfil = resposta.data.avatar_url;
    resultado.nSeguidores = resposta.data.followers;
    resultado.nRepositorios = resposta.data.public_repos;
}

function dadosRepos(resposta) {
    var data = resposta.data;

    data.forEach(obj => {
        resultado.repositorios.push(obj.name);
        resultado.linkRepositorios.push(obj.git_url);
    });

    renderPesquisa();
}

function renderPesquisa() {

    renderUsuario();
    
    profileInfo.appendChild(profile);
}

function renderUsuario() {

    profile = document.createElement(`div`);
    profile.classList.add(`profile`);
    profile.innerHTML += `
    <div class="img">
        <img src="${resultado.imgPerfil}">
    </div>
    <div class="dados">
        <p>Name: ${resultado.nome}</p>
        <p>Username: ${resultado.apelido}</p>
        <p>Followers: ${resultado.nSeguidores}</p>
        <p>Repositories count: ${resultado.nRepositorios}</p>
    </div>`;

    renderRepos();
}

function renderRepos() {
    var divRep = document.createElement(`div`);
    divRep.classList.add("repositorios");
    divRep.innerHTML = `<p>Newest Repositories:</p>`;
    var ul = document.createElement(`ul`);

    var repos = resultado.repositorios;
    repos.forEach((item, i) => {
        var li = document.createElement("li");
        li.innerHTML = `<a href="${resultado.linkRepositorios[i]}">${item}</a>`;
        if(i >= 4) return;
        ul.appendChild(li);
    });

    divRep.appendChild(ul);
    profile.appendChild(divRep);

    resultado = { 
        nome: "",
        apelido: "",
        imgPerfil: "",
        nSeguidores: "",
        nRepositorios: "",
        repositorios: [],
        linkRepositorios: []
    };
}