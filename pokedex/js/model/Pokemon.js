class Pokemon {
  constructor(obj) {
    obj = obj || {};
    this.id = obj.id;
    this.nome = obj.nome;
    this.tipo = obj.tipo;
    this.peso = obj.peso;
    this.altura = obj.altura;
    this.imagem = obj.imagem;
  }
}
