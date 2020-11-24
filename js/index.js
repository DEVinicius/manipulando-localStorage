//Salvar produto no LocalStorage
var save_product = document.getElementById("save_product")
save_product.addEventListener("click", function(){
    var product_name = document.getElementById("name").value
    var product_brand = document.getElementById("brand").value
    var product_price = document.getElementById("price").value

    //verificar se localstorage existe
    if(localStorage.getItem("products") != null)
    {

    }
    else
    {
        var inicial_cart = [
            {
                "product_name": product_name,
                "product_brand":product_brand,
                "product_price":product_price
            }
        ]

        localStorage.setItem("products", JSON.stringify(inicial_cart))
    }


})

//Listar produtos na tabela
function listProducts(){

}