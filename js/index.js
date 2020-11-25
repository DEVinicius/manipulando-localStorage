//Salvar produto no LocalStorage
var id = 1
var save_product = document.getElementById("save_product")
save_product.addEventListener("click", function(){
    var product_name = document.getElementById("name").value
    var product_brand = document.getElementById("brand").value
    var product_price = document.getElementById("price").value

    //verificar se localstorage existe
    if(localStorage.getItem("products") != null)
    {
        var deserialize_products = JSON.parse(localStorage.getItem("products"))
        var new_product = {
            "id":id,
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

$(function(){
    listProducts()
})

function deleteProduct(id_produto)
{
    alert(id_produto)
}

function addToChart(produto)
{
    console.log(produto)
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
            deleteProduct(obj.id)
        })

        button_delete.appendChild(document.createTextNode("Delete"))

        var button_add_chart = document.createElement("button")
        button_add_chart.classList.add("btn")
        button_add_chart.classList.add("btn-primary")
        button_add_chart.appendChild(document.createTextNode("+ Comprar"))
        button_add_chart.addEventListener("click", function(){
            addToChart(obj)
        })
        td_action.appendChild(button_add_chart)
        td_action.appendChild(button_delete)

        tr.appendChild(td_id)
        tr.appendChild(td_name)
        tr.appendChild(td_brand)
        tr.appendChild(td_price)
        tr.appendChild(td_action)
        tbody.appendChild(tr)
    })

}