//inicialização de variáveis
var acertos=0;
var errados=0;
var perdidos=0;
var janela=900; //ms
var intervalo=2000; //ms
var timer = null;
var jogoAtivo=false;

//aguarda carregamento da página e chama as funções
onload=function(){
    document.getElementById('start').addEventListener('click', start);
    document.getElementById('idGramado').addEventListener('mousedown', marteloBaixo);
    document.getElementById('idGramado').addEventListener('mouseup', marteloCima);
    document.getElementById('buraco0').addEventListener('click', martelada);
    document.getElementById('buraco1').addEventListener('click', martelada);
    document.getElementById('buraco2').addEventListener('click', martelada);
    document.getElementById('buraco3').addEventListener('click', martelada);
    document.getElementById('buraco4').addEventListener('click', martelada);
    document.getElementById('restart').addEventListener('click', restart);
}

function start(){
    jogoAtivo=true;
    //atribuir uma variavel ao evento do clique
    var botao = document.getElementById('start');
    //desabilita o evento pq já foi chamado
    botao.removeEventListener('click', start);
    botao.disabled=true;
    sobeToupeira();
}

function sobeToupeira(){
    if(!jogoAtivo){
        return
    }
    var buraco = Math.floor(Math.random()*5); //sorteia um valor racional de 0 a 1, multiplica por 5, depois trunca para baixo, ou seja, o resultado só pode ser de 0 a 4.
    var objBuraco = document.getElementById('buraco'+buraco); //concatena a string buraco com o número sorteado e chama o id do html
    objBuraco.src = 'images/hole-mole.png';
    timer = setTimeout(tiraToupeira, janela, buraco);
    setTimeout(sobeToupeira, janela);

}

function tiraToupeira(buraco){
    var objBuraco = document.getElementById('buraco'+buraco);
    objBuraco.src = 'images/hole.png';
    perdidos++; //incrementa perdidos pq se chamou essa função foi pq passou o tempo na função sobeToupeira e o usuário não acertou.
    mostraPontuacao();
}

function mostraPontuacao(){
    mostraPontuacaoDe('acertos', acertos);
    mostraPontuacaoDe('perdidos', perdidos);
    mostraPontuacaoDe('errados', errados);
    mostraPontuacaoDe('saldo', Math.max(acertos-errados-perdidos,0)); //mostra o valor máximo
}

function mostraPontuacaoDe(display, valor){
    let centena = parseInt(valor/100);
    let dezena = parseInt((valor/10)%10);
    let unidade = valor%10;

    // pega SÓ AS IMAGENS do TD
    let imgs = document.getElementById(display).getElementsByTagName("img");

    let objCentena = imgs[0];
    let objDezena  = imgs[1];
    let objUnidade = imgs[2];

    objCentena.src = 'images/caractere_'+centena+'.gif';
    objCentena.alt = centena;

    objDezena.src = 'images/caractere_'+dezena+'.gif';
    objDezena.alt = dezena;

    objUnidade.src = 'images/caractere_'+unidade+'.gif';
    objUnidade.alt = unidade;
}

function marteloBaixo(){
    document.getElementById('idGramado').style.cursor = 'url(images/hammerDown.png), default';
}

function marteloCima(){
    document.getElementById('idGramado').style.cursor = 'url(images/hammer.png), default';
}

function martelada(evento){
    if(!jogoAtivo){
        return
    }

    if (evento.target.src.includes('hole-mole')){ //se o click foi dado na imagem que contem a toupeira (mole):
        //acertou a martelada
        acertos++;
        evento.target.src = 'images/hole.png' //depois que acerta, tira a toupeira
        clearTimeout(timer); //e zera o cronometro
    }
    else {
        //errou
        errados++;
    }
    mostraPontuacao();
}

function restart(){
    jogoAtivo=false;
    location.reload();

}
