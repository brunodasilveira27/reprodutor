const icones = [];

const musicas = {

  1 : { artista : 'MC Felipe Boladão', musica : 'Tá difícil', url : './arquivos/fb-tadificil.mp3' },
  2 : { artista : 'MC Felipe Boladão', musica : 'A viagem', url : './arquivos/fb-aviagem.mp3' },
  3 : { artista : 'MC Felipe Boladão', musica : 'É, eu sei', url : './arquivos/fb-eeusei.mp3' }

};

function criar_mensagem(conteudo) {

  const dv = document.createElement('div');
        dv.classList.add('mensagem', 'flex', 'column');
        dv.innerText = conteudo;
        
        document.body.append(dv);

};

function remover_elemento(elemento) {

  if(elemento.length) {
  
     for(let i = 0; i < elemento.length; i ++) {
     
         elemento[i].remove();
     
     };
  
  };

};

function orientacao() {

  const o = window.orientation;
  
  if(o != 0) {
  
     criar_mensagem('Por favor, coloque o dispositivo em modo retrato. (tela em pé)');
  
  }
  
  else {
  
    remover_elemento(document.querySelectorAll('.mensagem'));
  
  };

};

const adicionar_classes = function(elemento, classes) {

  classes.forEach((c) => {
  
    elemento.classList.add(c);
    
  });

};

const remover_classes = function(elemento, classes) {

  classes.forEach((c) => {
  
    elemento.classList.remove(c);
  
  });

};

const porcentagem = function(m, d) {

  return Math.floor((m * 100) / d);

};

const reprodutor = {

  atual : 1,
  tocando : false,
  pausada : false,
  audio : new Audio(),
  
  preparar() {
  
    icones[0].artista.innerText = musicas[this.atual].artista;
    icones[0].musica.innerText = musicas[this.atual].musica;
    this.audio.src = musicas[this.atual].url;
    
  },
  
  tocar_musica() {
  
    if(!this.pausada) {
    
       this.preparar();
       adicionar_classes(icones[0].tocar, ['none']);
       remover_classes(icones[0].pausar, ['none']);
       this.audio.play();
    
    }
    
    else {
    
       adicionar_classes(icones[0].tocar, ['none']);
       remover_classes(icones[0].pausar, ['none']);
       this.audio.currentTime = this.pausada.tempo;
       this.audio.play();
    
    };
    
    this.audio.addEventListener('timeupdate', function() {
    
        icones[0].progresso.style.width = porcentagem(reprodutor.audio.currentTime, reprodutor.audio.duration) + '%';
    
    });
  
  },
  
  pausar_musica() {
  
    adicionar_classes(icones[0].pausar, ['none']);
    remover_classes(icones[0].tocar, ['none']);
    this.pausada = { tempo : this.audio.currentTime };
    this.audio.pause();
  
  },
  
  proxima_musica() {
  
    let disponiveis = 0;
    
    for(let chave in musicas) {
    
        disponiveis ++;
    
    };
    
    if(this.atual < disponiveis) {
    
       this.atual ++;
    
    }
    
    else {
    
        this.atual = 1;
    
    };
    
    this.preparar();
    this.tocar_musica();
  
  },
  
  anterior_musica() {
  
    let disponiveis = 0;
    
    for(let chave in musicas) {
    
        disponiveis ++;
    
    };
    
    if(this.atual > 1) {
    
       this.atual --;
    
    }
    
    else {
    
       this.atual = disponiveis;
    
    };
    
    this.preparar();
    this.tocar_musica();
  
  }
  
};

window.addEventListener('orientationchange', function() {

  orientacao();

});

window.onload = function() {

  orientacao();
  
  icones.push({
  
    anterior : document.querySelector('#anterior'),
    tocar : document.querySelector('#tocar'),
    pausar : document.querySelector('#pausar'),
    proxima : document.querySelector('#proxima'),
    artista : document.querySelector('#i-artista'),
    musica : document.querySelector('#i-musica'),
    progresso : document.querySelector('#progresso')
  
  });
  
  reprodutor.preparar();
  
  icones[0].tocar.addEventListener('click', function() {
  
    reprodutor.tocar_musica();
  
  });
  
  icones[0].pausar.addEventListener('click', function() {
  
    reprodutor.pausar_musica();
  
  });
  
  icones[0].proxima.addEventListener('click', function() {
  
    reprodutor.proxima_musica();
  
  });
  
  icones[0].anterior.addEventListener('click', function() {
  
    reprodutor.anterior_musica();
  
  });

};