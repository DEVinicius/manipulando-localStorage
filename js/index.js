//Salvar produto no LocalStorage
var id = 1

$(function(){
    listProducts()
})

var save_product = document.getElementById("save_product")
save_product.addEventListener("click", function(){
    var product_name = document.getElementById("name").value
    var product_brand = document.getElementById("brand").value
    var product_price = document.getElementById("price").value
    var product_bar_code = document.getElementById("bar_code").value

    //verificar se localstorage existe
    if(localStorage.getItem("products") != null)
    {
        var deserialize_products = JSON.parse(localStorage.getItem("products"))
        var new_product = {
            "id":id,
            "bar_code":product_bar_code,
            "product_name": product_name,
            "product_brand":product_brand,
            "product_price":product_price
        }
        deserialize_products.push(new_product)
        localStorage.setItem("products", JSON.stringify(deserialize_products))
    }
    else
    {
        var initial_product = [
            {
                "id":id,
                "bar_code":product_bar_code,
                "product_name": product_name,
                "product_brand":product_brand,
                "product_price":product_price
            }
        ]

        localStorage.setItem("products", JSON.stringify(initial_product))
    }
    id = id +1 
    listProducts()

})


function deleteProduct(id_produto)
{
    var deserialized_local_storage = JSON.parse(localStorage.getItem("products"))
    var array = []
    deserialized_local_storage.forEach(obj => {
        if (obj.id != id_produto){
            array.push(obj)
        }
    });

    deserialized_local_storage = array
    localStorage.setItem("products", JSON.stringify(deserialized_local_storage))
    listProducts()
}

function addToChart(produto)
{
    if(localStorage.getItem("cart") != null){
        //verificar se o produto já existe no carrinho
        var deserialized_cart = JSON.parse(localStorage.getItem("cart"))
        var situation = true

        deserialized_cart.forEach(obj => {
            if(obj.produto.bar_code == produto.bar_code)
            {
                situation = false
            }
        })

        if(situation)
        {
            deserialized_cart.push(
                {
                    produto, 
                    "quantidade":1
                }
            )
        }
        else
        {
            deserialized_cart.forEach(obj => {
                if(obj.produto.bar_code == produto.bar_code)
                {
                    obj.quantidade = obj.quantidade + 1
                }
            })
        }

        localStorage.setItem("cart", JSON.stringify(deserialized_cart))

    }else{
        var first_product = [
            {
                produto,
                "quantidade":1
            }
        ]

        localStorage.setItem("cart", JSON.stringify(first_product))
    }
    alert(`${produto.product_name} Adicionado com succeso ao carrinho`)
}

//Listar produtos na tabela
function listProducts(){
    var tbody = document.getElementById("body_table")
    var deserialized_local_storage = JSON.parse(localStorage.getItem("products"))
    //create <tr></tr>
    $("#body_table").empty()
    deserialized_local_storage.forEach(obj => {
        var tr = document.createElement("tr")
        
        //create <th></th>
        var td_id = document.createElement("td")
        td_id.appendChild(document.createTextNode(obj.id))

        var td_bar_code = document.createElement("td")
        td_bar_code.appendChild(document.createTextNode(obj.bar_code))

        var td_name = document.createElement("td")
        td_name.appendChild(document.createTextNode(obj.product_name))

        var td_brand = document.createElement("td")
        td_brand.appendChild(document.createTextNode(obj.product_brand))

        var td_price = document.createElement("td")
        td_price.appendChild(document.createTextNode(obj.product_price))

        var td_action = document.createElement("td")
        var button_delete = document.createElement("button")
        button_delete.classList.add("btn")
        button_delete.classList.add("btn-danger")

        button_delete.addEventListener("click", function(){
            if(confirm(`Deseja mesmo Remover ${obj.product_name} da Lista de Produtos ?`))
            {
                deleteProduct(obj.id)
            }
        })

        button_delete.appendChild(document.createTextNode("Delete"))

        var button_add_chart = document.createElement("button")
        button_add_chart.classList.add("btn")
        button_add_chart.classList.add("btn-primary")
        button_add_chart.appendChild(document.createTextNode("+ Comprar"))
        button_add_chart.addEventListener("click", function(){
            if(confirm(`Deseja mesmo adicionar ${obj.product_name} ao Carrinho?`)){
                addToChart(obj)
            }
        })
        td_action.appendChild(button_add_chart)
        td_action.appendChild(button_delete)

        tr.appendChild(td_id)
        tr.appendChild(td_bar_code)
        tr.appendChild(td_name)
        tr.appendChild(td_brand)
        tr.appendChild(td_price)
        tr.appendChild(td_action)
        tbody.appendChild(tr)
    })

}