$(function(){
    listCart()
})

function listCart(){
    var tbody = document.getElementById("tbody_cart")
    var total_price = 0 
    var deserialized_cart = JSON.parse(localStorage.getItem("cart"))
    deserialized_cart.forEach(obj => {
        var tr = document.createElement("tr")
        
        var td_id = document.createElement("td")
        td_id.appendChild(document.createTextNode(obj.produto.id))

        var td_bar_code = document.createElement("td")
        td_bar_code.appendChild(document.createTextNode(obj.produto.bar_code))

        var td_nome = document.createElement("td")
        td_nome.appendChild(document.createTextNode(obj.produto.product_name))

        var td_brand = document.createElement("td")
        td_brand.appendChild(document.createTextNode(obj.produto.product_brand))

        var td_price = document.createElement("td")
        td_price.appendChild(document.createTextNode(obj.produto.product_price))

        var td_quantity = document.createElement("td")
        td_quantity.appendChild(document.createTextNode(obj.quantidade))


        tr.appendChild(td_id)
        tr.appendChild(td_bar_code)
        tr.appendChild(td_nome)
        tr.appendChild(td_brand)
        tr.appendChild(td_price)
        tr.appendChild(td_quantity)

        total_price = total_price + (obj.produto.product_price * obj.quantidade)
        tbody.appendChild(tr)
    })

    var total = document.getElementById("valor_compra")
    total.innerText = total_price
}