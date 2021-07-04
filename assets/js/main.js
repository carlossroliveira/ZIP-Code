(() => {
  const buttton = document.querySelector("[data-btn]");
  const reset = document.querySelector("[data-reset]");
  const inputCep = document.querySelector("[data-cep]");

  const uf = document.querySelector("[data-uf]");
  const logradouro = document.querySelector("[data-logradouro]");
  const complemento = document.querySelector("[data-complemento]");
  const localidade = document.querySelector("[data-localidade]");
  const DDD = document.querySelector("[data-DDD]");
  const bairro = document.querySelector("[data-bairro]");

  const handleZipCode = (event) => {
    event.preventDefault();
    const cep = inputCep.value;
    zipCodeSearch(cep);
    validateZipCode(cep);
  };

  const clearZipCode = () => {
    complemento.value = "";
    logradouro.value = "";
    localidade.value = "";
    inputCep.value = "";
    bairro.value = "";
    DDD.value = "";
    uf.value = "";
    inputCep.focus();
    removeClassError();
  };

  function removeClassError() {
    complemento.classList.remove("error");
    logradouro.classList.remove("error");
    localidade.classList.remove("error");
    bairro.classList.remove("error");
    DDD.classList.remove("error");
    uf.classList.remove("error");
  }

  const validateZipCode = (cep) => {
    if (cep.length === 8) {
      console.log("okay");
    } else {
      Swal.fire({
        icon: "error",
        title: "CEP  inválido",
      });
      inputCep.value = "";
    }
  };

  async function zipCodeSearch(cep) {
    try {
      const diceResponse = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const diceJSON = await diceResponse.json();

      uf.value = diceJSON.cep
        ? diceJSON.cep
        : uf.classList.add("error") || `Sem CEP`;

      logradouro.value = diceJSON.logradouro
        ? diceJSON.logradouro
        : logradouro.classList.add("error") || `Sem Logradouro`;

      complemento.value = diceJSON.complemento
        ? diceJSON.complemento
        : complemento.classList.add("error") || `Sem Complemento`;

      localidade.value = diceJSON.localidade
        ? diceJSON.localidade
        : localidade.classList.add("error") || `Sem Localidade`;

      DDD.value = diceJSON.ddd
        ? diceJSON.ddd
        : DDD.classList.add("error") || `Sem DDD`;

      bairro.value = diceJSON.bairro
        ? diceJSON.bairro
        : bairro.classList.add("error") || `Sem Bairro`;
    } catch (error) {
      console.log(error);
    }
  }

  buttton.addEventListener("click", handleZipCode);
  reset.addEventListener("click", clearZipCode);
})();
