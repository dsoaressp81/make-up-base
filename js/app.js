
var catalogData;
var catalogDataFiltrado;


function calcularValorReais(val) {
    var valor = val * 5.5;
    var formatado = valor.toLocaleString("pt-BR", {style: "currency", currency: "BRL"});
    return formatado;
}

//EXEMPLO DO CÓDIGO PARA UM PRODUTO
function productItem(product) {
  const item = `<div class="product" data-name="`+ product.name +`" data-brand="`+ product.brand +`" data-type="`+ product.product_type +`" tabindex="508" >
  <figure class="product-figure">
    <img src="`+ product.image_link +`" width="215" height="215" alt="`+ product.name +`" onerror="javascript:this.src='img/unavailable.png'">
  </figure>
  <section class="product-description">
      <h1 class="product-name">`+ product.name +`</h1>
      <div class="product-brands"><span class="product-brand background-brand">`+ product.brand +`</span>
  <span class="product-brand background-price">`+ calcularValorReais(product.price) +`</span></div>
    </section>
    `+  loadDetails(product) +`
  </div>`;

  console.log(item);

  var div = document.getElementById("catalog"); // obtém um elemento div pelo seu id
  //var d = document.createElement("div"); // cria um novo elemento p
  //d.innerHTML = item;
  //div.appendChild(d); // adiciona o elemento p como filho da div
  div.insertAdjacentHTML("beforeend", item);
}

//EXEMPLO DO CÓDIGO PARA OS DETALHES DE UM PRODUTO
function loadDetails(product) {
  let details = `<section class="product-details"><div class="details-row">
        <div>Brand</div>
        <div class="details-bar">
          <div class="details-bar-bg" style="width= 250">`+ product.brand +`</div>
        </div>
      </div><div class="details-row">
        <div>Price</div>
        <div class="details-bar">
          <div class="details-bar-bg" style="width= 250">`+ calcularValorReais(product.price) +`</div>
        </div>
      </div><div class="details-row">
        <div>Rating</div>
        <div class="details-bar">
          <div class="details-bar-bg" style="width= 250">`+ product.rating +`</div>
        </div>
      </div><div class="details-row">
        <div>Category</div>
        <div class="details-bar">
          <div class="details-bar-bg" style="width= 250">`+ product.category +`</div>
        </div>
      </div><div class="details-row">
        <div>Product_type</div>
        <div class="details-bar">
          <div class="details-bar-bg" style="width= 250">`+ product.product_type +`</div>
        </div>
      </div></section>`;

      console.log(details);

      return details;
}

function loadBrand(data) {
  var brands = [];
  data.forEach(function(dato) {
    if (brands.indexOf(dato.brand) == -1) {
      brands.push(dato.brand);
    }
  });

  console.log(brands);

  var slcFilterBrand = document.getElementById("filter-brand"); // obtém um elemento div pelo seu id

  brands.forEach(function(s) {
    var option = new Option(s, s); // cria um novo elemento option
    slcFilterBrand.appendChild(option);
  });

}

// loadtype

function loadType(data) {
  var product_types = [];
  data.forEach(function(dato) {
    if (product_types.indexOf(dato.product_type) == -1) {
      product_types.push(dato.product_type);
    }
  });

  console.log(product_types);

  var slcFilterPdrType = document.getElementById("filter-type"); // obtém um elemento div pelo seu id

  product_types.forEach(function(s) {
    var option = new Option(s, s); // cria um novo elemento option
    slcFilterPdrType.appendChild(option);
  });

}

function loadCatalog() {
  // Faz uma requisição GET para uma API fictícia

    if (catalogData==undefined) {
      fetch('http://makeup-api.herokuapp.com/api/v1/products.json')
      .then(response => response.json()) // Converte a resposta em um objeto JSON  
      .then(function(data) {
          catalogData = data;  
          console.log(catalogData);
          catalogData.slice(0, 100).forEach(obj => {
            console.log(obj);
            productItem(obj);
          });
          loadBrand(catalogData);
          loadType(catalogData);


        }) // Converte a resposta em um objeto JSON
        .catch(error => console.error('Erro:', error)); // Trata possíveis erros
    } else {

      var txtFilterName = document.getElementById("filter-name");
      var txtFilterBrand = document.getElementById("filter-brand");
      var txtFilterType = document.getElementById("filter-type");

      //RESET FILTROS
      catalogDataFiltrado = catalogData;

      //FILTRO POR NOME
      if (txtFilterName.value != "") {
        catalogDataFiltrado = catalogDataFiltrado.filter(c => c.name.toUpperCase().match(txtFilterName.value.toUpperCase())); // filtra os objetos com idade maior   
      };

      //FILTRO POR BRAND
      if (txtFilterBrand.value != "Todos") {
        //window.alert("BRAND");
        catalogDataFiltrado = catalogDataFiltrado.filter(c => c.brand == txtFilterBrand.value); // filtra os objetos com idade maior   
      }

      //FILTRO POR TIPO
      if (txtFilterType.value != "Todos") {
        //window.alert("TIPO");
        catalogDataFiltrado = catalogDataFiltrado.filter(c => c.product_type == txtFilterType.value); // filtra os objetos com idade maior   
      }

      // CARREGANDO A TELA
      catalogDataFiltrado.forEach(obj => {
        console.log(obj);
        productItem(obj);
      });

    }


  }
